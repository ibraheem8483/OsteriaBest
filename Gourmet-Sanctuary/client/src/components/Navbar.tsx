import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/menu", label: "Menu" },
    { href: "/reservations", label: "Reservations" },
  ];

  const isActive = (path: string) => location === path;

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "glass-nav py-3 shadow-sm" : "bg-transparent py-6"
      )}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link href="/" className="group flex items-center gap-2">
          <UtensilsCrossed className={cn("w-6 h-6 transition-colors", scrolled ? "text-primary" : "text-white")} />
          <span 
            className={cn(
              "font-serif text-2xl font-bold tracking-tight transition-colors",
              scrolled ? "text-foreground" : "text-white"
            )}
          >
            Osteria
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary tracking-wide uppercase",
                scrolled ? (isActive(link.href) ? "text-primary" : "text-foreground/80") : (isActive(link.href) ? "text-white font-bold" : "text-white/90")
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/reservations">
            <button className={cn(
              "px-6 py-2.5 rounded-sm font-medium text-sm transition-all duration-300",
              scrolled 
                ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                : "bg-white text-black hover:bg-white/90"
            )}>
              Book a Table
            </button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden z-50 p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <X className={cn("w-6 h-6", scrolled ? "text-foreground" : "text-white")} />
          ) : (
            <Menu className={cn("w-6 h-6", scrolled ? "text-foreground" : "text-white")} />
          )}
        </button>

        {/* Mobile Menu */}
        <div 
          className={cn(
            "fixed inset-0 bg-background/98 backdrop-blur-xl z-40 flex flex-col items-center justify-center gap-8 transition-transform duration-500 ease-in-out md:hidden",
            isOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href} 
              className="font-serif text-3xl text-foreground hover:text-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
