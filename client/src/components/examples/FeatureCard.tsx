import FeatureCard from '../FeatureCard';

export default function FeatureCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <FeatureCard 
        icon="🛡️" 
        title="Verificados" 
        description="Todos os boosters passam por verificação de identidade e skill antes de aceitar serviços." 
      />
      <FeatureCard 
        icon="💎" 
        title="Proteção ao Comprador" 
        description="Reembolso parcial/total em casos verificáveis de violação do serviço." 
      />
      <FeatureCard 
        icon="📊" 
        title="Relatórios" 
        description="Receba vídeo e análise pós-serviço mostrando o progresso e pontos de melhoria." 
      />
    </div>
  );
}
