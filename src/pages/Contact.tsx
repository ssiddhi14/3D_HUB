import { Link } from "react-router-dom";
import { Mail, Phone, ArrowLeft } from "lucide-react";
import { contactInfo, socialLinks } from "@/config/footer";

const InstagramIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="glass-card rounded-2xl p-6 md:p-10">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">Get in Touch</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            We'd love to hear from you. Reach out for orders, custom requests, or feedback.
          </p>

          <div className="space-y-4">
            <a
              href={`mailto:${contactInfo.email}`}
              className="flex items-center gap-3 p-4 glass rounded-xl hover-glow transition-all"
            >
              <Mail className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Email</p>
                <p className="text-sm font-medium">{contactInfo.email}</p>
              </div>
            </a>
            <a
              href={`tel:${contactInfo.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-3 p-4 glass rounded-xl hover-glow transition-all"
            >
              <Phone className="text-primary" size={20} />
              <div>
                <p className="text-xs text-muted-foreground">Phone</p>
                <p className="text-sm font-medium">{contactInfo.phone}</p>
              </div>
            </a>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 p-4 glass rounded-xl hover-glow transition-all"
              >
                <span className="text-primary"><InstagramIcon size={20} /></span>
                <div>
                  <p className="text-xs text-muted-foreground">Social</p>
                  <p className="text-sm font-medium">{s.label}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
