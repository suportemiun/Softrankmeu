export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2 space-y-4">
            <div className="font-bold text-lg">SOFTRANK</div>
            <p className="text-muted-foreground max-w-md leading-relaxed">
              Softrank — Elojob profissional para League of Legends. 
              Em breve: mais jogos. Segurança, qualidade e resultados garantidos.
            </p>
            <div className="text-sm text-muted-foreground">
              © {currentYear} Softrank. Todos os direitos reservados.
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="font-medium">Empresa</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-about">Sobre</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-careers">Carreiras</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-privacy">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-terms">Termos de Uso</a></li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <div className="font-medium">Ajuda</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-support">Suporte</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-contact">Contato</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-faq">FAQ</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors" data-testid="link-discord">Discord</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
