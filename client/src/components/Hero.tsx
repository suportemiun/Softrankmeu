import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ShieldCheck, Award, Zap } from "lucide-react";

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.section
      className="bg-background w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex flex-col items-center justify-center max-w-5xl mx-auto px-6 text-center py-24 sm:py-32 lg:py-40">
        <motion.div
          variants={itemVariants}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-wider text-foreground"
        >
          SOFTRANK
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg text-muted-foreground max-w-3xl leading-relaxed"
        >
          Somos a maior plataforma de game ranking do mundo, presente em mais de 100 países e milhares de jogos, conectando milhões de jogadores em uma comunidade global de competição e evolução.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <Button
            size="lg"
            className="text-base font-semibold px-8 py-6"
            data-testid="button-cta-primary"
            onClick={handleOrderClick}
          >
            Quero subir de elo
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base font-semibold px-8 py-6"
            data-testid="button-cta-secondary"
            onClick={handleHowItWorksClick}
          >
            Como funciona
          </Button>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="mt-16 flex flex-wrap justify-center items-center gap-x-8 gap-y-4 text-sm text-muted-foreground"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5" />
            <span>Pagamento 100% seguro</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5" />
            <span>Garantia de progresso</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            <span>Entrega Rápida</span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
