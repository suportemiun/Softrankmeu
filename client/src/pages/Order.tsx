import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StepCalculator from "@/components/StepCalculator";

export default function Order() {
  return (
    <div className="min-h-screen bg-background text-foreground antialiased">
      <Header />
      <main>
        <StepCalculator />
      </main>
      <Footer />
    </div>
  );
}
