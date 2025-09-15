import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Circle, ArrowRight, Clapperboard, FileText, Users } from "lucide-react";

// Import real League of Legends rank images
import ironRank from "@assets/Season_2022_-_Iron_1757959424037.png";
import bronzeRank from "@assets/Season_2022_-_Bronze_1757959424032.png";
import silverRank from "@assets/Season_2022_-_Silver_1757959424031.png";
import goldRank from "@assets/Season_2022_-_Gold_1757959424036.png";
import platinumRank from "@assets/Season_2022_-_Platinum_1757959424033.png";
import emeraldRank from "@assets/Esmeralda_1757959424030.png";
import diamondRank from "@assets/Season_2022_-_Diamond_1757959424035.png";
import masterRank from "@assets/Season_2022_-_Master_1757959424034.png";
import grandmasterRank from "@assets/Season_2022_-_Grandmaster_1757959424035.png";
import challengerRank from "@assets/Season_2022_-_Challenger_1757959424033.png";

export default function StepCalculator() {
  const divisions = ["IV", "III", "II", "I"]; // Do menor (IV) para maior (I)
  const tiers = [
    { name: "Ferro", price: 7, divisions, image: ironRank },
    { name: "Bronze", price: 8, divisions, image: bronzeRank },
    { name: "Prata", price: 10, divisions, image: silverRank },
    { name: "Ouro", price: 15, divisions, image: goldRank },
    { name: "Platina", price: 20, divisions, image: platinumRank },
    { name: "Esmeralda", price: 35, divisions, image: emeraldRank },
    { name: "Diamante", price: 70, divisions, image: diamondRank },
    { name: "Mestre", price: 0, divisions: [], image: masterRank },
    { name: "Grão Mestre", price: 500, divisions: [], image: grandmasterRank },
    { name: "Desafiante", price: 1000, divisions: [], image: challengerRank },
  ];

  const [currentStep, setCurrentStep] = useState(1);
  const [currentTier, setCurrentTier] = useState("");
  const [currentDiv, setCurrentDiv] = useState("");
  const [desiredTier, setDesiredTier] = useState("");
  const [desiredDiv, setDesiredDiv] = useState("");
  const [watchGames, setWatchGames] = useState(false);
  const [gameReport, setGameReport] = useState(false);
  const [duoBoost, setDuoBoost] = useState(false);
  const [price, setPrice] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<string[]>([]);

  const calculatePrice = () => {
    console.log('Calculating price...'); // todo: remove mock functionality
    
    const startTierIndex = tiers.findIndex(t => t.name === currentTier);
    const endTierIndex = tiers.findIndex(t => t.name === desiredTier);
    
    let total = 0;
    let details: string[] = [];

    // Check if same tier
    if (startTierIndex === endTierIndex) {
      const tier = tiers[startTierIndex];
      if (tier.divisions.length > 0) {
        const startDivIndex = divisions.indexOf(currentDiv);
        const endDivIndex = divisions.indexOf(desiredDiv);
        
        if (startDivIndex >= endDivIndex) {
          setPrice(0);
          setBreakdown(["Seleção inválida: precisa selecionar uma divisão maior"]);
          return;
        }
        
        const divisionCount = endDivIndex - startDivIndex;
        total = tier.price * divisionCount;
        details.push(`${tier.name} ${currentDiv} → ${tier.name} ${desiredDiv}: ${divisionCount} divisões × R$${tier.price} = R$${total}`);
      } else {
        setPrice(0);
        setBreakdown(["Seleção inválida: tier já é o objetivo"]);
        return;
      }
    } else {
      if (startTierIndex >= endTierIndex) {
        setPrice(0);
        setBreakdown(["Seleção inválida: precisa selecionar um tier maior"]);
        return;
      }

      const currentTierData = tiers[startTierIndex];
      if (currentTierData.divisions.length > 0) {
        const startDivIndex = divisions.indexOf(currentDiv);
        const divisionsToComplete = (divisions.length - 1) - startDivIndex + 1;
        total += currentTierData.price * divisionsToComplete;
        details.push(`${currentTierData.name} ${currentDiv} → ${currentTierData.name} I + Promoção: ${divisionsToComplete} × R$${currentTierData.price} = R$${currentTierData.price * divisionsToComplete}`);
      }

      for (let i = startTierIndex + 1; i < endTierIndex; i++) {
        const tier = tiers[i];
        if (tier.divisions.length > 0) {
          const fullTierCost = tier.price * 4;
          total += fullTierCost;
          details.push(`${tier.name} completo: 4 divisões × R$${tier.price} = R$${fullTierCost}`);
        } else {
          if (tier.name === "Mestre") {
            details.push("Mestre (preço sob consulta)");
          }
        }
      }

      const targetTierData = tiers[endTierIndex];
      if (targetTierData.divisions.length > 0) {
        const endDivIndex = divisions.indexOf(desiredDiv);
        const divisionsInTarget = endDivIndex + 1;
        total += targetTierData.price * divisionsInTarget;
        details.push(`${targetTierData.name} IV → ${targetTierData.name} ${desiredDiv}: ${divisionsInTarget} × R$${targetTierData.price} = R$${targetTierData.price * divisionsInTarget}`);
      } else {
        if (targetTierData.name === "Grão Mestre") {
          total += 500;
          details.push("Grão Mestre → R$500");
        } else if (targetTierData.name === "Desafiante") {
          total += 1000;
          details.push("Desafiante → R$1000");
        }
      }
    }

    let extraCost = 0;
    if (watchGames) {
      extraCost += 30;
      details.push(`Assista aos jogos: +R$30`);
    }
    if (gameReport) {
      extraCost += 25;
      details.push("Relatório de jogo: +R$25");
    }
    if (duoBoost) {
      const duoCost = Math.ceil(total * 0.2);
      extraCost += duoCost;
      details.push(`Duo Boost (+20%): +R$${duoCost}`);
    }

    total += extraCost;

    if (total > 2500) {
      details.push("Subtotal excedeu R$2500, aplicando limite máximo.");
      total = 2500;
    }

    setPrice(total);
    setBreakdown(details);
    setCurrentStep(5);
  };

  const steps = [
    { number: 1, title: "Rank Atual", completed: !!(currentTier && (tiers.find(t => t.name === currentTier)?.divisions.length === 0 || currentDiv)) },
    { number: 2, title: "Rank Desejado", completed: !!(desiredTier && (tiers.find(t => t.name === desiredTier)?.divisions.length === 0 || desiredDiv)) },
    { number: 3, title: "Serviços Extras", completed: true },
    { number: 4, title: "Revisar", completed: !!(currentTier && desiredTier) },
    { number: 5, title: "Resultado", completed: price !== null }
  ];

  const currentTierData = tiers.find(t => t.name === currentTier);
  const desiredTierData = tiers.find(t => t.name === desiredTier);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 flex-wrap">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center p-2">
          <div 
            className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
              currentStep === step.number 
                ? 'border-foreground bg-foreground text-background' 
                : step.completed 
                  ? 'border-foreground bg-background text-foreground' 
                  : 'border-muted-foreground bg-background text-muted-foreground'
            }`}
          >
            {step.completed && currentStep !== step.number ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <span className="font-bold text-sm">{step.number}</span>
            )}
          </div>
          <div className="ml-2 text-sm font-medium hidden sm:block">
            {step.title}
          </div>
          {index < steps.length - 1 && (
            <ArrowRight className="mx-2 sm:mx-4 w-4 h-4 text-muted-foreground" />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Selecione seu Rank Atual</CardTitle>
        <p className="text-muted-foreground text-center">
          Escolha o tier e divisão onde você está atualmente
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-4 border rounded-lg cursor-pointer hover-elevate transition-all ${
                currentTier === tier.name ? 'border-foreground bg-muted' : 'border-border'
              }`}
              onClick={() => {
                setCurrentTier(tier.name);
                if (tier.divisions.length === 0) {
                  setCurrentDiv("I");
                } else if (!currentDiv) {
                  setCurrentDiv("IV");
                }
              }}
              data-testid={`tier-${tier.name.toLowerCase()}`}
            >
              <div className="text-center space-y-2">
                <img 
                  src={tier.image} 
                  alt={tier.name}
                  className="w-16 h-16 mx-auto object-contain"
                />
                <div className="font-medium text-sm">{tier.name}</div>
                {tier.price > 0 && <div className="text-xs text-muted-foreground">R${tier.price}/div</div>}
              </div>
            </div>
          ))}
        </div>

        {currentTierData && currentTierData.divisions && currentTierData.divisions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Selecione sua Divisão</h3>
            <div className="flex justify-center gap-4">
              {divisions.map((div) => (
                <Button
                  key={div}
                  variant={currentDiv === div ? "default" : "outline"}
                  size="lg"
                  onClick={() => setCurrentDiv(div)}
                  className="text-lg py-6 px-8"
                  data-testid={`current-div-${div}`}
                >
                  {div}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={() => setCurrentStep(2)}
            disabled={!steps[0].completed}
            className="px-12 py-6 text-lg"
            data-testid="button-next-step1"
          >
            Próximo
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep2 = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Selecione seu Rank Desejado</CardTitle>
        <p className="text-muted-foreground text-center">
          Escolha o tier e divisão que você quer alcançar
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {tiers.map((tier) => (
            <div
              key={tier.name}
              className={`p-4 border rounded-lg cursor-pointer hover-elevate transition-all ${
                desiredTier === tier.name ? 'border-foreground bg-muted' : 'border-border'
              }`}
              onClick={() => {
                setDesiredTier(tier.name);
                if (tier.divisions.length === 0) {
                  setDesiredDiv("I");
                } else if (!desiredDiv) {
                  setDesiredDiv("IV");
                }
              }}
              data-testid={`desired-tier-${tier.name.toLowerCase()}`}
            >
              <div className="text-center space-y-2">
                <img 
                  src={tier.image} 
                  alt={tier.name}
                  className="w-16 h-16 mx-auto object-contain"
                />
                <div className="font-medium text-sm">{tier.name}</div>
                {tier.price > 0 && <div className="text-xs text-muted-foreground">R${tier.price}/div</div>}
              </div>
            </div>
          ))}
        </div>

        {desiredTierData && desiredTierData.divisions && desiredTierData.divisions.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-center">Selecione a Divisão Desejada</h3>
            <div className="flex justify-center gap-4">
              {divisions.map((div) => (
                <Button
                  key={div}
                  variant={desiredDiv === div ? "default" : "outline"}
                  size="lg"
                  onClick={() => setDesiredDiv(div)}
                  className="text-lg py-6 px-8"
                  data-testid={`desired-div-${div}`}
                >
                  {div}
                </Button>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button 
            variant="outline"
            size="lg" 
            onClick={() => setCurrentStep(1)}
            className="px-12 py-6 text-lg"
            data-testid="button-back-step2"
          >
            Voltar
          </Button>
          <Button 
            size="lg" 
            onClick={() => setCurrentStep(3)}
            disabled={!steps[1].completed}
            className="px-12 py-6 text-lg"
            data-testid="button-next-step2"
          >
            Próximo
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep3 = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Serviços Extras</CardTitle>
        <p className="text-muted-foreground text-center">
          Escolha os serviços adicionais que deseja incluir
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className={`p-6 border rounded-lg cursor-pointer hover-elevate transition-all flex flex-col h-full ${
              watchGames ? 'border-foreground bg-muted' : 'border-border'
            }`}
            onClick={() => setWatchGames(!watchGames)}
            data-testid="service-watch-games"
          >
            <div className="text-center space-y-4 flex-grow">
              <Clapperboard className="mx-auto w-8 h-8 text-foreground" />
              <h3 className="font-semibold text-lg">Assista aos jogos</h3>
              <p className="text-sm text-muted-foreground">
                Receba links para assistir às partidas do seu booster ao vivo.
              </p>
            </div>
            <div className="mt-4">
              <Badge variant={watchGames ? "default" : "outline"}>+R$30</Badge>
            </div>
          </div>

          <div 
            className={`p-6 border rounded-lg cursor-pointer hover-elevate transition-all flex flex-col h-full ${
              gameReport ? 'border-foreground bg-muted' : 'border-border'
            }`}
            onClick={() => setGameReport(!gameReport)}
            data-testid="service-game-report"
          >
            <div className="text-center space-y-4 flex-grow">
              <FileText className="mx-auto w-8 h-8 text-foreground" />
              <h3 className="font-semibold text-lg">Relatório de jogo</h3>
              <p className="text-sm text-muted-foreground">
                Análise detalhada do desempenho e pontos de melhoria.
              </p>
            </div>
            <div className="mt-4">
              <Badge variant={gameReport ? "default" : "outline"}>+R$25</Badge>
            </div>
          </div>

          <div 
            className={`p-6 border rounded-lg cursor-pointer hover-elevate transition-all flex flex-col h-full ${
              duoBoost ? 'border-foreground bg-muted' : 'border-border'
            }`}
            onClick={() => setDuoBoost(!duoBoost)}
            data-testid="service-duo-boost"
          >
            <div className="text-center space-y-4 flex-grow">
              <Users className="mx-auto w-8 h-8 text-foreground" />
              <h3 className="font-semibold text-lg">Duo Boost</h3>
              <p className="text-sm text-muted-foreground">
                Jogue junto com o booster para uma experiência de aprendizado em tempo real.
              </p>
            </div>
            <div className="mt-4">
              <Badge variant={duoBoost ? "default" : "outline"}>+20%</Badge>
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-4">
          <Button 
            variant="outline"
            size="lg" 
            onClick={() => setCurrentStep(2)}
            className="px-12 py-6 text-lg"
            data-testid="button-back-step3"
          >
            Voltar
          </Button>
          <Button 
            size="lg" 
            onClick={() => setCurrentStep(4)}
            className="px-12 py-6 text-lg"
            data-testid="button-next-step3"
          >
            Revisar
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep4 = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Revisar Pedido</CardTitle>
        <p className="text-muted-foreground text-center">
          Confirme os detalhes antes de calcular o preço final
        </p>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Rank Atual</h3>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              {currentTierData && (
                <img 
                  src={currentTierData.image} 
                  alt={currentTier}
                  className="w-12 h-12 object-contain"
                />
              )}
              <div>
                <div className="font-medium">{currentTier}</div>
                {currentDiv && currentTierData?.divisions.length > 0 && <div className="text-sm text-muted-foreground">Divisão {currentDiv}</div>}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Rank Desejado</h3>
            <div className="flex items-center gap-4 p-4 border rounded-lg">
              {desiredTierData && (
                <img 
                  src={desiredTierData.image} 
                  alt={desiredTier}
                  className="w-12 h-12 object-contain"
                />
              )}
              <div>
                <div className="font-medium">{desiredTier}</div>
                {desiredDiv && desiredTierData?.divisions.length > 0 && <div className="text-sm text-muted-foreground">Divisão {desiredDiv}</div>}
              </div>
            </div>
          </div>
        </div>

        {(watchGames || gameReport || duoBoost) && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Serviços Extras</h3>
            <div className="flex flex-wrap gap-2">
              {watchGames && <Badge variant="default">Assista aos jogos (+R$30)</Badge>}
              {gameReport && <Badge variant="default">Relatório de jogo (+R$25)</Badge>}
              {duoBoost && <Badge variant="default">Duo Boost (+20%)</Badge>}
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button 
            variant="outline"
            size="lg" 
            onClick={() => setCurrentStep(3)}
            className="px-12 py-6 text-lg"
            data-testid="button-back-step4"
          >
            Voltar
          </Button>
          <Button 
            size="lg" 
            onClick={calculatePrice}
            className="px-12 py-6 text-lg"
            data-testid="button-calculate-price"
          >
            Calcular Preço
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const renderStep5 = () => (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Resultado do Cálculo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="text-center space-y-4">
          <div className="text-5xl font-bold text-foreground" data-testid="final-price">
            R$ {price}
          </div>
          <p className="text-muted-foreground">
            Valor total do seu elojob com todos os serviços selecionados
          </p>
        </div>

        {breakdown.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-center">Detalhamento</h3>
            <div className="bg-muted rounded-lg p-6">
              <ul className="space-y-2">
                {breakdown.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <Circle className="w-3 h-3 mt-1 text-muted-foreground fill-current" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <Button 
            variant="outline"
            size="lg" 
            onClick={() => {
              setCurrentStep(1);
              setPrice(null);
              setBreakdown([]);
              setCurrentTier("");
              setCurrentDiv("");
              setDesiredTier("");
              setDesiredDiv("");
              setWatchGames(false);
              setGameReport(false);
              setDuoBoost(false);
            }}
            className="px-12 py-6 text-lg"
            data-testid="button-new-calculation"
          >
            Nova Simulação
          </Button>
          <Button 
            size="lg" 
            onClick={() => alert('Entre em contato conosco para finalizar o pedido!')}
            className="px-12 py-6 text-lg"
            data-testid="button-contact"
          >
            Finalizar Pedido
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <section id="calculator" className="py-16">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-4xl font-bold">Selecione as divisões e conclua seu pedido</h3>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Descubra o valor do seu elojob em apenas algumas etapas. 
            Processo simples e transparente.
          </p>
        </div>

        {renderStepIndicator()}

        <div className="mt-12">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}
          {currentStep === 5 && renderStep5()}
        </div>
      </div>
    </section>
  );
}
