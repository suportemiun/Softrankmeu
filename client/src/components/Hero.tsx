import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLocation } from "wouter";

export default function Hero() {
  const [, setLocation] = useLocation();

  const handleOrderClick = () => {
    setLocation("/order");
  };

  const handleHowItWorksClick = () => {
    const element = document.getElementById("how");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    } else {
      setLocation("/#how");
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-6 pt-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <div className="text-6xl lg:text-7xl font-bold tracking-tighter bg-foreground text-background px-6 py-3 rounded-lg inline-block">
              SOFTRANK
            </div>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Somos a maior plataforma de game ranking do mundo, presentes em 52 países.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="rounded-full text-base font-semibold px-8 py-6"
              data-testid="button-cta-primary"
              onClick={handleOrderClick}
            >
              Quero subir de elo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full text-base font-semibold px-8 py-6"
              data-testid="button-cta-secondary"
              onClick={handleHowItWorksClick}
            >
              Como funciona
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-foreground rounded-full"></div>
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-foreground rounded-full"></div>
              <span>Proteção ao comprador</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-foreground rounded-full"></div>
              <span>Garantia de progresso</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center lg:justify-end">
          <Card className="w-full max-w-[380px] shadow-2xl">
            <CardContent className="p-8 space-y-6">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground">Melhor para</div>
                <h3 className="font-bold text-2xl leading-tight">
                  Subida ranqueada - League of Legends
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Jogador profissional, coaching opcional e relatório pós-partida. 
                  Velocidade e segurança com verificação completa.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-md bg-muted px-3 py-1 text-xs font-medium">
                    Exemplo
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Entrega em 3-7 partidas
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <div className="text-3xl font-bold">R$ 89</div>
                    <div className="text-xs text-muted-foreground">Preço de exemplo</div>
                  </div>
                  <Button 
                    className="rounded-full font-semibold px-6"
                    data-testid="button-order-example"
                    onClick={handleOrderClick}
                  >
                    Pedir agora
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}
