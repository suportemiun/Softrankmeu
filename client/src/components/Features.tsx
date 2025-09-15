
import FeatureCard from "./FeatureCard";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    {
      icon: "🛡️",
      title: "Boosters Verificados",
      description: "Profissionais com identidade confirmada e skills validadas em ranks Diamond+. Processo rigoroso de seleção garante qualidade."
    },
    {
      icon: "💎",
      title: "Garantia Total", 
      description: "Proteção completa do investimento com reembolso garantido e sistema de custódia até confirmação da entrega."
    },
    {
      icon: "📊",
      title: "Acompanhamento Real",
      description: "Relatórios detalhados, replays das partidas e análise de performance para acelerar seu aprendizado."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="features" className="py-24 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          className="text-center space-y-6 mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants} className="space-y-4">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
              Líderes do Mercado
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              A Escolha dos Pros
            </h2>
          </motion.div>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
          >
            Mais de <span className="text-primary font-semibold">500.000+ jogadores</span> já subiram de elo conosco. 
            Segurança máxima, profissionais elite e resultados garantidos.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard 
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          className="mt-16 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>99.7% Taxa de Sucesso</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>Suporte 24/7</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <span>Entrega em 1-3 dias</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
