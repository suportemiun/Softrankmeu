import StepCard from "./StepCard";

export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: "Escolha o serviço",
      description: "Selecione o modo, rank e extras (coaching, replay, etc)."
    },
    {
      number: 2,
      title: "Pagamento seguro", 
      description: "Pague com cartão ou boleto. O valor fica em custódia até a entrega."
    },
    {
      number: 3,
      title: "Receba resultados",
      description: "Verifique o relatório e libere o pagamento. Suporte 24/7 disponível."
    }
  ];

  return (
    <section id="how" className="py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center space-y-4 mb-12">
          <h3 className="text-3xl font-bold">Como funciona em 3 passos</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step) => (
            <StepCard 
              key={step.number}
              number={step.number}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
