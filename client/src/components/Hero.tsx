import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import heroImage from "@assets/generated_images/League_of_Legends_gameplay_hero_410af987.png";

export default function Hero() {
  return (
    <main className="max-w-6xl mx-auto px-6 pt-6">
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Elojob profissional. 
              <span className="block">Rápido. Seguro.</span>
              <span className="block text-accent">Softrank.</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Serviço premium de Elojob para League of Legends — profissionais verificados, 
              progresso garantido e suporte 24/7. Em breve: todos os jogos.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              size="lg" 
              className="rounded-full text-base font-semibold px-8 py-6"
              data-testid="button-cta-primary"
            >
              Quero subir de elo
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="rounded-full text-base font-semibold px-8 py-6"
              data-testid="button-cta-secondary"
            >
              Como funciona
            </Button>
          </div>

          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Pagamento seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Proteção ao comprador</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
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