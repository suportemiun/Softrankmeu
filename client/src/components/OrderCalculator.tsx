import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Clapperboard, FileText, Users } from "lucide-react";

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

export default function OrderCalculator() {
  const divisions = ["IV", "III", "II", "I"];
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

  const [currentTier, setCurrentTier] = useState("Ferro");
  const [currentDiv, setCurrentDiv] = useState("IV");
  const [desiredTier, setDesiredTier] = useState("Bronze");
  const [desiredDiv, setDesiredDiv] = useState("IV");
  const [price, setPrice] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<string[]>([]);
  
  // Order form states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [watchGames, setWatchGames] = useState(false);
  const [gameReport, setGameReport] = useState(false);
  const [duoBoost, setDuoBoost] = useState(false);

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
        
        // Check if valid progression (IV -> III -> II -> I)
        if (startDivIndex <= endDivIndex) {
          setPrice(0);
          setBreakdown(["Seleção inválida: não é possível regredir na divisão"]);
          return;
        }
        
        // Calculate divisions within same tier
        const divisionCount = startDivIndex - endDivIndex;
        total = tier.price * divisionCount;
        details.push(`${tier.name} ${currentDiv} → ${tier.name} ${desiredDiv}: ${divisionCount} divisões × R$${tier.price} = R$${total}`);
      } else {
        setPrice(0);
        setBreakdown(["Seleção inválida: tier já é o objetivo"]);
        return;
      }
    } else {
      // Different tiers
      if (startTierIndex > endTierIndex) {
        setPrice(0);
        setBreakdown(["Seleção inválida: não é possível regredir de tier"]);
        return;
      }

      // Calculate from current tier to end of current tier
      const currentTierData = tiers[startTierIndex];
      if (currentTierData.divisions.length > 0) {
        const startDivIndex = divisions.indexOf(currentDiv);
        const divisionsToComplete = startDivIndex + 1; // +1 to include promotion
        total += currentTierData.price * divisionsToComplete;
        details.push(`${currentTierData.name} ${currentDiv} → ${currentTierData.name} I + Promoção: ${divisionsToComplete} × R$${currentTierData.price} = R$${currentTierData.price * divisionsToComplete}`);
      }

      // Calculate intermediate full tiers
      for (let i = startTierIndex + 1; i < endTierIndex; i++) {
        const tier = tiers[i];
        if (tier.divisions.length > 0) {
          const fullTierCost = tier.price * 4; // 4 divisions per tier
          total += fullTierCost;
          details.push(`${tier.name} completo: 4 divisões × R$${tier.price} = R$${fullTierCost}`);
        } else {
          // Special tiers like Master
          if (tier.name === "Mestre") {
            details.push("Mestre (preço sob consulta)");
          }
        }
      }

      // Calculate to desired division in target tier
      const targetTierData = tiers[endTierIndex];
      if (targetTierData.divisions.length > 0) {
        const endDivIndex = divisions.indexOf(desiredDiv);
        const divisionsInTarget = 4 - endDivIndex; // From IV to desired division
        total += targetTierData.price * divisionsInTarget;
        details.push(`${targetTierData.name} IV → ${targetTierData.name} ${desiredDiv}: ${divisionsInTarget} × R$${targetTierData.price} = R$${targetTierData.price * divisionsInTarget}`);
      } else {
        // Special handling for Master+
        if (targetTierData.name === "Grão Mestre") {
          total += 500;
          details.push("Grão Mestre → R$500");
        } else if (targetTierData.name === "Desafiante") {
          total += 1000;
          details.push("Desafiante → R$1000");
        }
      }
    }

    // Add extras
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
      extraCost += Math.ceil(total * 0.2);
      details.push(`Duo Boost (+20%): +R$${Math.ceil(total * 0.2)}`);
    }

    total += extraCost;

    if (total > 2500) {
      details.push("Subtotal excedeu R$2500, aplicando limite máximo.");
      total = 2500;
    }

    setPrice(total);
    setBreakdown(details);
  };

  const submitOrder = () => {
    console.log('Submitting order...', { // todo: remove mock functionality
      username,
      email,
      currentTier,
      currentDiv,
      desiredTier,
      desiredDiv,
      price,
      watchGames,
      gameReport,
      duoBoost,
      notes
    });
    alert('Pedido enviado com sucesso! Você receberá um email com as instruções de pagamento.');
  };

  const currentTierData = tiers.find(t => t.name === currentTier);
  const desiredTierData = tiers.find(t => t.name === desiredTier);

  return (
    <section id="calculator" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-3xl font-bold">Calculadora de Preços e Pedido</h3>
          <p className="text-muted-foreground">
            Configure seu elojob, calcule o preço e faça seu pedido. 
            Divisões vão do IV ao I (progressão crescente).
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Calculator Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-center flex items-center justify-center gap-2">
                <span>Configuração do Elojob</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tier Atual</Label>
                  <div className="flex items-center gap-2">
                    {currentTierData && (
                      <img 
                        src={currentTierData.image} 
                        alt={currentTier}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <Select value={currentTier} onValueChange={setCurrentTier}>
                      <SelectTrigger data-testid="select-current-tier">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiers.map(tier => (
                          <SelectItem key={tier.name} value={tier.name}>
                            {tier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {currentTierData && currentTierData.divisions.length > 0 && (
                    <Select value={currentDiv} onValueChange={setCurrentDiv}>
                      <SelectTrigger data-testid="select-current-division">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map(div => (
                          <SelectItem key={div} value={div}>
                            {div}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-medium">Tier Desejado</Label>
                  <div className="flex items-center gap-2">
                    {desiredTierData && (
                      <img 
                        src={desiredTierData.image} 
                        alt={desiredTier}
                        className="w-8 h-8 object-contain"
                      />
                    )}
                    <Select value={desiredTier} onValueChange={setDesiredTier}>
                      <SelectTrigger data-testid="select-desired-tier">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {tiers.map(tier => (
                          <SelectItem key={tier.name} value={tier.name}>
                            {tier.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {desiredTierData && desiredTierData.divisions.length > 0 && (
                    <Select value={desiredDiv} onValueChange={setDesiredDiv}>
                      <SelectTrigger data-testid="select-desired-division">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {divisions.map(div => (
                          <SelectItem key={div} value={div}>
                            {div}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              {/* Extras */}
              <div className="space-y-4">
                <Label className="text-sm font-medium">Serviços Extras</Label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="watchGames" 
                      checked={watchGames}
                      onCheckedChange={(checked) => setWatchGames(checked === true)}
                      data-testid="checkbox-watch-games"
                    />
                    <Label htmlFor="watchGames" className="text-sm font-normal flex items-center gap-2">
                      <Clapperboard className="w-4 h-4" /> Assista aos jogos (+R$30)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="gameReport" 
                      checked={gameReport}
                      onCheckedChange={(checked) => setGameReport(checked === true)}
                      data-testid="checkbox-game-report"
                    />
                    <Label htmlFor="gameReport" className="text-sm font-normal flex items-center gap-2">
                      <FileText className="w-4 h-4" /> Relatório de jogo (+R$25)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="duoBoost" 
                      checked={duoBoost}
                      onCheckedChange={(checked) => setDuoBoost(checked === true)}
                      data-testid="checkbox-duo-boost"
                    />
                    <Label htmlFor="duoBoost" className="text-sm font-normal flex items-center gap-2">
                      <Users className="w-4 h-4" /> Duo Boost (+20%)
                    </Label>
                  </div>
                </div>
              </div>

              <Button 
                onClick={calculatePrice} 
                className="w-full rounded-lg font-semibold py-6"
                data-testid="button-calculate"
              >
                Calcular Preço
              </Button>

              {price !== null && (
                <div className="text-center space-y-4 p-6 bg-muted rounded-lg" data-testid="result-price">
                  <div className="text-3xl font-bold">
                    Total: R$ {price}
                  </div>
                  {breakdown.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Detalhamento:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1 text-left">
                        {breakdown.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="w-1 h-1 bg-current rounded-full mt-2"></span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="text-center">Fazer Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Nome de usuário (LoL)</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Seu nick no League of Legends"
                  data-testid="input-username"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha da conta</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha da sua conta LoL"
                  data-testid="input-password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email para contato</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seu@email.com"
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Observações (opcional)</Label>
                <Textarea
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Horários preferenciais, champions que gosta de jogar, etc."
                  data-testid="textarea-notes"
                />
              </div>

              <Button 
                onClick={submitOrder}
                disabled={!price || !username || !password || !email}
                className="w-full rounded-lg font-semibold py-6"
                data-testid="button-submit-order"
              >
                Finalizar Pedido - R$ {price || 0}
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Ao finalizar o pedido, você receberá instruções de pagamento por email. 
                O serviço só será iniciado após a confirmação do pagamento.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
