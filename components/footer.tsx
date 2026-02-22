"use client";

import { Github, Twitter, BookOpen, Mail, ExternalLink, Globe } from "lucide-react";

const footerLinks = {
  protocol: [
    { label: "Architecture", href: "#architecture" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Protocol Comparison", href: "#protocol-comparison" },
    { label: "Standards", href: "#standards" },
  ],
  developers: [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Documentation", href: "https://root14-docs.vercel.app", external: true },
    { label: "GitHub", href: "https://github.com/abhirupinspace/root-14-core", external: true },
    { label: "Use Cases", href: "#use-cases" },
    { label: "API Reference", href: "#architecture" },
  ],
  resources: [
    { label: "About Stellar", href: "https://stellar.org", external: true },
    { label: "Soroban Docs", href: "https://soroban.stellar.org", external: true },
    { label: "Privacy Tech", href: "#threat-model" },
    { label: "ZK Proofs", href: "#architecture" },
  ],
};

const socialLinks = [
  { label: "GitHub", href: "https://github.com/abhirupinspace/root-14-core", icon: Github },
  { label: "Twitter", href: "https://x.com/root14zk", icon: Twitter },
  { label: "Email", href: "mailto:hello@root14.dev", icon: Mail },
];

export function Footer() {
  return (
    <footer className="relative border-t border-foreground/10 bg-background">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h3 className="text-lg font-bold uppercase tracking-wider mb-3">
                Root14
              </h3>
              <p className="text-xs leading-relaxed text-foreground/50 uppercase tracking-wider max-w-sm">
                Complete privacy solution for Stellar. Every transaction
                shielded. Every balance hidden.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2">
              {["Groth16", "BLS12-381", "Soroban", "UTXO"].map((tech) => (
                <span
                  key={tech}
                  className="border border-foreground/20 px-3 py-1 text-[10px] uppercase tracking-widest text-foreground/40 bg-background/60 hover:border-foreground/30 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground/40 hover:text-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Protocol Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold mb-4">
              Protocol
            </h4>
            <ul className="space-y-3">
              {footerLinks.protocol.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Developer Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold mb-4">
              Developers
            </h4>
            <ul className="space-y-3">
              {footerLinks.developers.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink size={10} className="opacity-40 group-hover:opacity-60 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold mb-4">
              Resources
            </h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-xs uppercase tracking-wider text-foreground/60 hover:text-foreground transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    {link.external && (
                      <ExternalLink size={10} className="opacity-40 group-hover:opacity-60 transition-opacity" />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-16 pt-8 border-t border-foreground/10">
          <div className="flex items-start gap-3 p-4 border border-foreground/20 bg-background/80 backdrop-blur-sm">
            <Globe className="h-4 w-4 text-foreground/40 mt-0.5 flex-shrink-0" />
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-bold">
                Development Status
              </p>
              <p className="text-xs leading-relaxed text-foreground/40 uppercase tracking-wider">
                Root14 is currently in active development. The protocol is not
                yet audited and should not be used in production environments.
                All cryptographic implementations are subject to change.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-foreground/10 bg-background/60">
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6">
              <span className="text-[10px] uppercase tracking-widest text-foreground/30">
                © 2026 Root14 Protocol
              </span>
              <span className="hidden md:block text-foreground/20">·</span>
              <a
                href="https://stellar.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] uppercase tracking-widest text-foreground/30 hover:text-foreground/50 transition-colors inline-flex items-center gap-1"
              >
                Built on Stellar
                <ExternalLink size={9} />
              </a>
            </div>

            <div className="flex items-center gap-6">
              <span className="text-[10px] uppercase tracking-widest text-foreground/20">
                v0.1.0
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
