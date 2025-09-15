import StepCard from '../StepCard';

export default function StepCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <StepCard 
        number={1}
        title="Escolha o serviço"
        description="Selecione o modo, rank e extras (coaching, replay, etc)."
      />
      <StepCard 
        number={2}
        title="Pagamento seguro"
        description="Pague com cartão ou boleto. O valor fica em custódia até a entrega."
      />
      <StepCard 
        number={3}
        title="Receba resultados"
        description="Verifique o relatório e libere o pagamento. Suporte 24/7 disponível."
      />
    </div>
  );
}
