import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-foreground text-background font-bold px-4 py-2 text-sm tracking-wide">
          SOFTRANK
        </div>
        <nav className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
          <a 
            href="#features" 
            className="hover:text-foreground transition-colors"
            data-testid="link-features"
          >
            Recursos
          </a>
          <a 
            href="#how" 
            className="hover:text-foreground transition-colors"
            data-testid="link-how"
          >
            Como funciona
          </a>
          <a 
            href="#calculator" 
            className="hover:text-foreground transition-colors"
            data-testid="link-calculator"
          >
            Calculadora
          </a>
          <a 
            href="#support" 
            className="hover:text-foreground transition-colors"
            data-testid="link-support"
          >
            Suporte
          </a>
        </nav>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" data-testid="button-login">
          Entrar
        </Button>
        <Button size="sm" data-testid="button-signup">
          Cadastrar
        </Button>
        
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg mt-2 p-4 shadow-lg md:hidden">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground">Recursos</a>
            <a href="#how" className="text-muted-foreground hover:text-foreground">Como funciona</a>
            <a href="#calculator" className="text-muted-foreground hover:text-foreground">Calculadora</a>
            <a href="#support" className="text-muted-foreground hover:text-foreground">Suporte</a>
          </nav>
        </div>
      )}
    </header>
  );
}