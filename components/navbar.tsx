"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Github, BookOpen, Cpu, Lock, FileText, Play } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const resources = [
  {
    title: "Architecture",
    href: "#architecture",
    description: "Three-layer proof infrastructure",
    icon: Cpu,
  },
  {
    title: "What's Hidden",
    href: "#threat-model",
    description: "Observer view vs reality",
    icon: Lock,
  },
  {
    title: "Standards",
    href: "#standards",
    description: "Protocol specifications",
    icon: FileText,
  },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-foreground/10 shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 h-16 flex items-center justify-between">
        <a
          href="#"
          className="text-sm font-bold uppercase tracking-wider hover:text-foreground/80 transition-colors"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          ROOT14
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-foreground/60">
                  Learn
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                    {resources.map((resource) => (
                      <li key={resource.title}>
                        <NavigationMenuLink asChild>
                          <a
                            href={resource.href}
                            className={cn(
                              "block select-none space-y-1 rounded-sm p-3 leading-none no-underline outline-none transition-colors hover:bg-accent/5 hover:text-foreground focus:bg-accent/5 focus:text-foreground group"
                            )}
                          >
                            <div className="flex items-center gap-2 mb-1">
                              <resource.icon className="h-4 w-4 text-foreground/40 group-hover:text-foreground/60 transition-colors" />
                              <div className="text-sm font-semibold leading-none tracking-tight">
                                {resource.title}
                              </div>
                            </div>
                            <p className="line-clamp-2 text-xs leading-snug text-foreground/50 uppercase tracking-wider">
                              {resource.description}
                            </p>
                          </a>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#use-cases"
                  className={cn(navigationMenuTriggerStyle(), "text-foreground/60")}
                >
                  Use Cases
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/demo"
                  className={cn(navigationMenuTriggerStyle(), "text-foreground/60")}
                >
                  <Play className="h-4 w-4 mr-2" /> Demo
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="https://root14-docs.vercel.app/"
                  className={cn(navigationMenuTriggerStyle(), "text-foreground/60")}
                >
                  <BookOpen className="h-4 w-4 mr-2" /> Docs
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink
                  href="https://github.com/abhirupinspace/root-14-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(navigationMenuTriggerStyle(), "text-foreground/60")}
                >
                  <Github className="h-4 w-4 mr-2" />
                  GitHub
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <a
            href="/dashboard"
            className="bg-accent text-background px-5 py-2.5 text-[11px] font-bold uppercase tracking-widest hover:bg-foreground/90 transition-all hover:shadow-lg hover:shadow-accent/20"
          >
            <BookOpen className="inline-block h-3.5 w-3.5 mr-2 -mt-0.5" />
            Get Started
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground/60 hover:text-foreground transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-foreground/10 overflow-hidden shadow-lg"
          >
            <div className="px-6 py-6 space-y-6">
              <div className="space-y-3">
                <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">
                  Learn
                </p>
                <div className="space-y-2 pl-3">
                  {resources.map((resource) => (
                    <a
                      key={resource.title}
                      href={resource.href}
                      className="flex items-start gap-3 text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors group"
                      onClick={() => setMobileOpen(false)}
                    >
                      <resource.icon className="h-4 w-4 mt-0.5 text-foreground/40 group-hover:text-foreground/60 transition-colors" />
                      <div>
                        <div className="font-semibold">{resource.title}</div>
                        <div className="text-[10px] text-foreground/40 normal-case tracking-wide mt-0.5">
                          {resource.description}
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              <a
                href="#use-cases"
                className="block text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Use Cases
              </a>

              <a
                href="/demo"
                className="block text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Play className="inline-block h-4 w-4 mr-2 -mt-0.5" />
                Demo
              </a>

              <a
                href="https://github.com/abhirupinspace/root-14-core"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs uppercase tracking-widest text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <Github className="inline-block h-4 w-4 mr-2 -mt-0.5" />
                GitHub
              </a>

              <a
                href="/dashboard"
                className="block bg-accent text-background px-5 py-3 text-xs font-bold uppercase tracking-widest text-center hover:bg-foreground/90 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                <BookOpen className="inline-block h-3.5 w-3.5 mr-2 -mt-0.5" />
                Get Started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
