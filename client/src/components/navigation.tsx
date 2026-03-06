import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Moon, Sun } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const scrollToSection = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      data-testid="navigation"
      className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3"
    >
      <div
        className={`max-w-7xl w-full rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-background/70 backdrop-blur-2xl shadow-lg shadow-primary/5 border border-border/60"
            : "bg-background/40 backdrop-blur-xl border border-transparent"
        }`}
      >
        <div className="px-5 lg:px-7">
          <div className="flex items-center justify-between gap-4 h-14 lg:h-16">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center gap-2 group"
              data-testid="link-home"
            >
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm tracking-tight">
                  FIO
                </span>
              </div>
              <span className="font-bold text-lg tracking-tight text-foreground">
                Creatives
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-primary to-chart-2 opacity-80 -ml-1 mt-auto mb-2" />
            </button>

            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative px-3 py-2 text-sm font-medium text-muted-foreground transition-colors rounded-md hover-elevate group"
                  data-testid={`link-${link.label.toLowerCase()}`}
                >
                  {link.label}
                  <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-gradient-to-r from-primary to-chart-2 rounded-full transition-all duration-300 group-hover:w-3/4" />
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Button
                size="icon"
                variant="ghost"
                onClick={toggleDarkMode}
                data-testid="button-theme-toggle"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>

              <button
                className="hidden lg:inline-flex items-center justify-center px-5 py-2 text-sm font-medium text-white rounded-md bg-gradient-to-r from-primary to-chart-2 transition-all duration-300 hover:opacity-90 hover:shadow-md hover:shadow-primary/20"
                onClick={() => scrollToSection("#contact")}
                data-testid="button-nav-cta"
              >
                Get in Touch
              </button>

              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    size="icon"
                    variant="outline"
                    className="lg:hidden rounded-full"
                    data-testid="button-mobile-menu"
                  >
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-80 p-0 border-l border-border/50">
                  <div className="p-6 bg-gradient-to-b from-primary/5 to-transparent border-b border-border/40">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-md bg-gradient-to-br from-primary to-chart-2 flex items-center justify-center">
                        <span className="text-primary-foreground font-bold text-sm tracking-tight">
                          FIO
                        </span>
                      </div>
                      <span className="font-bold text-lg tracking-tight text-foreground">
                        Creatives
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 p-4">
                    {navLinks.map((link) => (
                      <button
                        key={link.href}
                        onClick={() => scrollToSection(link.href)}
                        className="px-4 py-4 text-left text-base font-medium text-foreground rounded-md hover-elevate"
                        data-testid={`link-mobile-${link.label.toLowerCase()}`}
                      >
                        {link.label}
                      </button>
                    ))}
                    <button
                      className="mt-4 w-full flex items-center justify-center px-5 py-3 text-sm font-medium text-white rounded-md bg-gradient-to-r from-primary to-chart-2 transition-all duration-300 hover:opacity-90 hover:shadow-md hover:shadow-primary/20"
                      onClick={() => scrollToSection("#contact")}
                      data-testid="button-mobile-cta"
                    >
                      Get in Touch
                    </button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
