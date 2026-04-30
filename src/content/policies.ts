// Policy page content. Add a new entry keyed by slug to publish a new policy.
// Each section becomes a heading + paragraph block on the page.

export type PolicySection = {
  heading: string;
  body: string;
};

export type PolicyContent = {
  title: string;
  intro: string;
  sections: PolicySection[];
  updatedAt: string;
};

export const policyContent: Record<string, PolicyContent> = {
  "refund-cancellation": {
    title: "Refund & Cancellation Policy",
    updatedAt: "April 2026",
    intro:
      "We want every 3D HUB order to delight you. If something isn't right, here is how refunds and cancellations work.",
    sections: [
      {
        heading: "Order Cancellation",
        body: "Orders can be cancelled free of charge within 12 hours of placing them, provided they have not yet entered production. Custom and made-to-order items cannot be cancelled once production begins.",
      },
      {
        heading: "Refund Eligibility",
        body: "Refunds are available for damaged, defective, or incorrect items. Please raise a request within 7 days of delivery with photos of the product and packaging.",
      },
      {
        heading: "Refund Timeline",
        body: "Approved refunds are processed within 5–7 business days to the original payment method. Bank settlement may take an additional 2–3 business days.",
      },
      {
        heading: "Non-Refundable Items",
        body: "Personalized, customized, or clearance items are not eligible for refunds unless they arrive damaged or defective.",
      },
    ],
  },
  shipping: {
    title: "Shipping Policy",
    updatedAt: "April 2026",
    intro:
      "We ship pan-India through trusted courier partners. Here's what to expect after you place your order.",
    sections: [
      {
        heading: "Processing Time",
        body: "Ready-to-ship items are dispatched within 1–2 business days. Custom orders are dispatched within 5–10 business days depending on complexity.",
      },
      {
        heading: "Delivery Time",
        body: "Standard delivery takes 3–7 business days across India. Remote pin codes may take an additional 2–3 days.",
      },
      {
        heading: "Shipping Charges",
        body: "Free shipping on all prepaid orders above ₹500. A flat ₹50 shipping fee applies to orders below this value.",
      },
      {
        heading: "Order Tracking",
        body: "Once dispatched, you will receive a tracking link via email and SMS. You can also view order status from your account.",
      },
    ],
  },
  return: {
    title: "Return Policy",
    updatedAt: "April 2026",
    intro:
      "Returns are accepted for eligible items in their original condition. Please review the conditions below before raising a return.",
    sections: [
      {
        heading: "Return Window",
        body: "You may request a return within 7 days of delivery. Items must be unused, in original packaging, and include all tags and accessories.",
      },
      {
        heading: "How to Initiate a Return",
        body: "Email support@3dhub.com with your order ID and reason for return. Our team will arrange a reverse pickup wherever serviceable.",
      },
      {
        heading: "Inspection & Approval",
        body: "Returned items are inspected within 48 hours of receipt. Approved returns are refunded or exchanged based on your preference.",
      },
      {
        heading: "Items Not Eligible",
        body: "Customized prints, gift cards, and clearance items cannot be returned unless they arrive damaged or defective.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updatedAt: "April 2026",
    intro:
      "Your privacy matters to us. This policy explains what data we collect and how we use it to deliver the 3D HUB experience.",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect account details (name, email, phone), shipping address, and order history. Payment data is handled by our PCI-DSS compliant payment partners and never stored on our servers.",
      },
      {
        heading: "How We Use Your Data",
        body: "Your data is used to process orders, provide customer support, send order updates, and improve our products. We do not sell your data to third parties.",
      },
      {
        heading: "Cookies",
        body: "We use cookies to remember your cart, wishlist, and preferences. You can clear cookies anytime from your browser settings.",
      },
      {
        heading: "Your Rights",
        body: "You may request access, correction, or deletion of your personal data by emailing support@3dhub.com.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updatedAt: "April 2026",
    intro:
      "By using 3D HUB you agree to the following terms. Please read them carefully.",
    sections: [
      {
        heading: "Use of the Website",
        body: "You agree to use this website for lawful purposes only and not to misuse, copy, or redistribute its content without written permission.",
      },
      {
        heading: "Pricing & Availability",
        body: "Prices and availability are subject to change without notice. We reserve the right to cancel orders if a pricing or stock error is detected.",
      },
      {
        heading: "Intellectual Property",
        body: "All designs, images, and content on 3D HUB are owned by us or our licensors and are protected by copyright laws.",
      },
      {
        heading: "Limitation of Liability",
        body: "3D HUB is not liable for any indirect or consequential damages arising from the use of our products or website beyond the value of the order placed.",
      },
    ],
  },
};
