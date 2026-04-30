// Centralized footer configuration. Add new links/policies here and they
// will appear in the footer automatically (and policy pages get auto-routed).

export type FooterLink = {
  label: string;
  to: string;
};

export const quickLinks: FooterLink[] = [
  { label: "Home", to: "/" },
  { label: "Shop", to: "/shop" },
  { label: "Wishlist", to: "/wishlist" },
  { label: "Cart", to: "/cart" },
  { label: "Checkout", to: "/cart" },
  { label: "Contact", to: "/contact" },
];

// Each policy has its own dedicated page. To add a new policy:
// 1. Add an entry here with a unique `slug`.
// 2. Create the content in src/content/policies/<slug>.ts (or it will fall
//    back to a "coming soon" placeholder).
export type Policy = {
  slug: string;
  label: string;
};

export const policies: Policy[] = [
  { slug: "refund-cancellation", label: "Refund & Cancellation Policy" },
  { slug: "shipping", label: "Shipping Policy" },
  { slug: "return", label: "Return Policy" },
  { slug: "privacy", label: "Privacy Policy" },
  { slug: "terms", label: "Terms & Conditions" },
];

export const contactInfo = {
  email: "support@3dhub.com",
  phone: "+91 98765 43210",
};

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" as const },
];
