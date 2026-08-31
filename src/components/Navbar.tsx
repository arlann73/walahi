import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Journey", href: "#journey" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 py-6 md:px-12 md:py-8 font-mono text-[11px] uppercase tracking-widest text-highlight">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <Link href="/" className="hover:text-primary transition-colors">
            ARLAN
          </Link>
        </div>
        
        <nav className="hidden md:flex gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              className="relative overflow-hidden px-3 py-2 group rounded-sm"
            >
              <span className="relative z-10 transition-colors duration-300">{link.label}</span>
              {/* Hover background expanding from right to left */}
              <span className="absolute inset-0 bg-white/20 origin-right transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] scale-x-0 group-hover:scale-x-100 rounded-sm"></span>
            </Link>
          ))}
        </nav>

        <div className="flex-1 flex justify-end gap-6 items-center">
          <button className="hover:text-primary transition-colors hidden sm:block">
            Sound On
          </button>
          
          <Link 
            href="#contact" 
            className="group border border-highlight/30 px-5 py-3 overflow-hidden bg-transparent transition-colors hover:bg-highlight hover:text-background"
          >
            <div className="relative flex flex-col justify-center items-center h-[1em] overflow-hidden">
              {/* Primary text (moves up and hides on hover) */}
              <div className="flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
              {/* Secondary text (moves up and appears from bottom on hover) */}
              <div className="absolute top-full flex items-center gap-1 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:-translate-y-full">
                <span>Let's Talk</span>
                <ArrowUpRight className="w-3 h-3" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
