import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, Send } from "lucide-react";

const InstagramIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  contactInfo,
  policies,
  quickLinks,
  socialLinks,
} from "@/config/footer";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Please enter a valid email");
      return;
    }
    toast.success("Subscribed! Thanks for joining 3D HUB.");
    setEmail("");
  };

  return (
    <footer className="border-t border-border bg-background/60 mt-20">
      <div className="container mx-auto px-4 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2">
              <img src={logo} alt="3D HUB logo" className="h-10 w-auto object-contain" />
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Premium 3D products, collectibles, and made-to-order custom creations
              crafted with precision and passion.
            </p>
            <div className="flex gap-3 pt-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all hover-glow"
                >
                  {s.icon === "instagram" && <InstagramIcon size={16} />}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Policies
            </h3>
            <ul className="space-y-2.5">
              {policies.map((p) => (
                <li key={p.slug}>
                  <Link
                    to={`/policies/${p.slug}`}
                    className="text-sm text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4 uppercase tracking-wider">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 mb-5">
              <li>
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2 transition-colors"
                >
                  <Mail size={14} /> {contactInfo.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
                  className="text-sm text-muted-foreground hover:text-primary inline-flex items-center gap-2 transition-colors"
                >
                  <Phone size={14} /> {contactInfo.phone}
                </a>
              </li>
            </ul>

            <p className="text-xs text-muted-foreground mb-2">
              Subscribe for drops & offers
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <Input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-9 text-sm"
                required
              />
              <Button type="submit" size="sm" className="h-9 px-3" aria-label="Subscribe">
                <Send size={14} />
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-5 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <p>© 2026 3D HUB. All rights reserved.</p>
          <p>
            Made by <span className="text-primary font-medium">Pragya Ladha</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
