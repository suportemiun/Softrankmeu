import FeatureCard from "./FeatureCard";

export default function Features() {
  const features = [
    {
      icon: "🛡️",
      title: "Verificados",
      description: "Todos os boosters passam por verificação de identidade e skill antes de aceitar serviços."
    },
    {
      icon: "💎",
      title: "Proteção ao Comprador", 
      description: "Reembolso parcial/total em casos verificáveis de violação do serviço."
    },
    {
      icon: "📊",
      title: "Relatórios",
      description: "Receba vídeo e análise pós-serviço mostrando o progresso e pontos de melhoria."
    }
  ];

  return (
    <section id="features" className="py-16">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold">Por que escolher o Softrank?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Foco em segurança, profissionais verificados, rastreabilidade e suporte humano. 
            Nós cuidamos do processo — você aproveita os resultados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard 
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
