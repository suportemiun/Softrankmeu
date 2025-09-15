import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { useLocation } from "wouter";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "group block select-none space-y-3 rounded-lg p-4 leading-none no-underline outline-none transition-all duration-200 hover:bg-gradient-to-r hover:from-primary/5 hover:to-primary/10 hover:scale-[1.02] focus:bg-gradient-to-r focus:from-primary/5 focus:to-primary/10 border border-transparent hover:border-primary/20",
            className
          )}
          {...props}
        >
          <div className="text-base font-semibold leading-none text-foreground group-hover:text-primary transition-colors duration-200">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-foreground/80 bg-gradient-to-r from-primary/10 to-primary/5 p-3 rounded-md border border-primary/20 group-hover:from-primary/15 group-hover:to-primary/10 group-hover:border-primary/30 transition-all duration-200">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const isHomePage = location === "/";

  return (
    <header className="max-w-7xl mx-auto px-6 py-6 flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <a href="/" className="rounded-lg bg-foreground text-background font-bold px-4 py-2 text-sm tracking-wide">
          SOFTRANK
        </a>
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-transparent hover:bg-white/10 data-[state=open]:bg-white/15 text-foreground font-medium transition-all duration-200">
                Serviços
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[300px] p-6 bg-background/95 backdrop-blur-sm border border-border/50 shadow-xl rounded-lg">
                  <ListItem href="/order" title="League of Legends">
                    Subir Meu Elo
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href={isHomePage ? "#features" : "/#features"} className="bg-transparent hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 group inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Sobre Nós
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href={isHomePage ? "#how" : "/#how"} className="bg-transparent hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4 group inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors">
                Suporte
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
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
        <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-lg mt-2 p-4 shadow-lg md:hidden z-20">
          <nav className="flex flex-col gap-4 text-sm font-medium">
            <a href="/order" className="text-muted-foreground hover:text-foreground">Subir Meu Elo</a>
            <a href={isHomePage ? "#features" : "/#features"} className="text-muted-foreground hover:text-foreground">Sobre Nós</a>
            <a href={isHomePage ? "#how" : "/#how"} className="text-muted-foreground hover:text-foreground">Suporte</a>
          </nav>
        </div>
      )}
    </header>
  );
}
