import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function PriceCalculator() {
  const divisions = ["IV", "III", "II", "I"];
  const tiers = [
    { name: "Ferro", price: 7, divisions },
    { name: "Bronze", price: 8, divisions },
    { name: "Prata", price: 10, divisions },
    { name: "Ouro", price: 15, divisions },
    { name: "Platina", price: 20, divisions },
    { name: "Esmeralda", price: 35, divisions },
    { name: "Diamante", price: 70, divisions },
    { name: "Mestre", price: 0, divisions: [] },
    { name: "Grão Mestre", price: 500, divisions: [] },
    { name: "Desafiante", price: 1000, divisions: [] },
  ];

  const [currentTier, setCurrentTier] = useState("Ferro");
  const [currentDiv, setCurrentDiv] = useState("IV");
  const [desiredTier, setDesiredTier] = useState("Bronze");
  const [desiredDiv, setDesiredDiv] = useState("IV");
  const [price, setPrice] = useState<number | null>(null);
  const [breakdown, setBreakdown] = useState<string[]>([]);

  const calculatePrice = () => {
    console.log('Calculating price...'); // todo: remove mock functionality
    
    let startIndex = tiers.findIndex(t => t.name === currentTier);
    let endIndex = tiers.findIndex(t => t.name === desiredTier);

    if (startIndex > endIndex || (startIndex === endIndex && divisions.indexOf(currentDiv) <= divisions.indexOf(desiredDiv))) {
      setPrice(0);
      setBreakdown(["Seleção inválida"]);
      return;
    }

    let total = 0;
    let details: string[] = [];

    for (let i = startIndex; i <= endIndex; i++) {
      let tier = tiers[i];
      if (tier.divisions.length > 0) {
        let startDiv = i === startIndex ? divisions.indexOf(currentDiv) : 0;
        let endDiv = i === endIndex ? divisions.indexOf(desiredDiv) : divisions.length - 1;

        for (let d = startDiv; d <= endDiv; d++) {
          total += tier.price;
          details.push(`${tier.name} ${divisions[d]} → R$${tier.price}`);
        }
      } else {
        // Mestre, Grão Mestre, Desafiante
        if (tier.name === "Grão Mestre") {
          total += 500;
          details.push("Grão Mestre → R$500");
        } else if (tier.name === "Desafiante") {
          total += 1000;
          details.push("Desafiante → R$1000");
        } else {
          details.push("Mestre (preço sob consulta)");
        }
      }
    }

    if (total > 2500) {
      details.push("Subtotal excedeu R$2500, aplicando limite.");
      total = 2500;
    }

    setPrice(total);
    setBreakdown(details);
  };

  const currentTierData = tiers.find(t => t.name === currentTier);
  const desiredTierData = tiers.find(t => t.name === desiredTier);

  return (
    <section id="calculator" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-3xl font-bold">Calculadora de Preços</h3>
          <p className="text-muted-foreground">
            Escolha seu tier atual e o tier desejado para calcular o valor. 
            Divisões vão do IV ao I (decrescente).
          </p>
        </div>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-center">Calcule seu Elojob</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium">Tier Atual</label>
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
                <label className="block text-sm font-medium">Tier Desejado</label>
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

            <Button 
              onClick={calculatePrice} 
              className="w-full rounded-full font-semibold py-6"
              data-testid="button-calculate"
            >
              Calcular Preço
            </Button>

            {price !== null && (
              <div className="text-center space-y-4 p-6 bg-muted rounded-lg" data-testid="result-price">
                <div className="text-2xl font-bold">
                  Total: R$ {price}
                </div>
                {breakdown.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Detalhamento:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1 text-left">
                      {breakdown.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <span className="w-1 h-1 bg-current rounded-full"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
