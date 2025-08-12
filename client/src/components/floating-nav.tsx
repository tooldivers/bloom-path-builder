import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Users, MessageCircle, Menu, X } from "lucide-react";

interface FloatingNavProps {
  onGetStarted?: () => void;
}

export default function FloatingNav({ onGetStarted }: FloatingNavProps) {
  const [, setLocation] = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { icon: Home, label: "Home", href: "#hero" },
    { icon: Users, label: "How it Works", href: "#how-it-works" },
    { icon: MessageCircle, label: "Success Stories", href: "#success-stories" },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed top-6 right-6 z-50 lg:hidden">
        <Button
          variant="outline"
          size="sm"
          className={`bg-white/80 backdrop-blur-sm border-gray-200 transition-all duration-300 ${
            isScrolled ? 'shadow-lg' : 'shadow-md'
          }`}
          onClick={() => setIsOpen(!isOpen)}
          data-testid="button-mobile-nav"
        >
          {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </Button>
      </div>

      {/* Desktop Floating Navigation */}
      <nav className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 hidden lg:block transition-all duration-300 ${
        isScrolled ? 'translate-y-0' : 'translate-y-2'
      }`}>
        <div className="bg-white/90 backdrop-blur-md rounded-full px-6 py-3 shadow-lg border border-gray-200/50">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mm-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-lg font-semibold text-mm-neutral-800">MentionMates</span>
            </div>

            {/* Navigation Items */}
            <div className="flex items-center space-x-6">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-full text-gray-600 hover:text-mm-primary hover:bg-mm-primary/5 transition-all duration-200"
                  data-testid={`link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              className="btn-primary px-6 py-2 text-sm"
              onClick={onGetStarted}
              data-testid="button-nav-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation Slide-out */}
      <div className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsOpen(false)} />
        
        <div className={`absolute top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-mm-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">M</span>
                </div>
                <span className="text-lg font-semibold text-mm-neutral-800">MentionMates</span>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Navigation Items */}
            <div className="space-y-4 mb-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className="flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-gray-600 hover:text-mm-primary hover:bg-mm-primary/5 transition-all duration-200"
                  data-testid={`mobile-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>

            {/* CTA Button */}
            <Button 
              className="w-full btn-primary py-3"
              onClick={() => {
                onGetStarted?.();
                setIsOpen(false);
              }}
              data-testid="button-mobile-get-started"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}