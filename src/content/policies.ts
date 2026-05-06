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
    updatedAt: "May 2026",
    intro:
      "At 3D Products, all orders are processed only after confirmation and payment as per our payment policy. Please review the refund and cancellation terms below carefully before placing your order.",
    sections: [
      {
        heading: "Refund Policy",
        body: "Once an order is successfully placed, no refunds will be issued under any circumstances. Customers are requested to review product details carefully before placing the order. Only exchanges or replacements are allowed if the product is received damaged or defective and valid proof is provided.",
      },
      {
        heading: "Cancellation Policy",
        body: "Orders cannot be cancelled once they are confirmed. For Cash on Delivery (COD) orders, the advance amount paid to confirm the order is non-refundable. Customised or made-to-order products cannot be cancelled after production begins.",
      },
    ],
  },
  shipping: {
    title: "Shipping Policy",
    updatedAt: "May 2026",
    intro:
      "Here is everything you need to know about how we process and ship your 3D Products order.",
    sections: [
      {
        heading: "Order Processing",
        body: "Orders are processed after successful payment confirmation. COD orders require a minimum 50% advance payment to confirm the order.",
      },
      {
        heading: "Dispatch Timeline",
        body: "Orders are dispatched within the promised timeframe. Processing time may vary depending on order quantity and product type.",
      },
      {
        heading: "Delivery",
        body: "Delivery timelines depend on the customer's location and courier availability. Delays caused by logistics partners, weather conditions, or unforeseen circumstances are beyond our control.",
      },
      {
        heading: "Packaging",
        body: "All products are checked carefully and securely packed before dispatch to ensure safe delivery.",
      },
    ],
  },
  return: {
    title: "Return Policy",
    updatedAt: "May 2026",
    intro:
      "We provide a 10-day return or exchange window from the date of delivery, subject to the conditions outlined below.",
    sections: [
      {
        heading: "Required Video Proof",
        body: "Customers must record a proper unboxing video that clearly shows: the sealed package before opening, the complete unboxing process, and the condition of the product received.",
      },
      {
        heading: "Exchange or Return Process",
        body: "Customers requesting a return or exchange must also record a repacking video while packing the product. Damaged or defective products will only qualify for exchange if valid video proof is submitted. Requests without proper proof will not be accepted.",
      },
      {
        heading: "Important Conditions",
        body: "Products must be unused and returned in their original packaging. Customised products are not eligible for return or exchange.",
      },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    updatedAt: "May 2026",
    intro:
      "At 3D Products, customer privacy is important to us. This policy explains what information we collect and how we use it.",
    sections: [
      {
        heading: "Information Collection",
        body: "We may collect the following information: name, contact number, shipping address, email address, and payment-related details required for order processing.",
      },
      {
        heading: "Use of Information",
        body: "Customer information is used only for order confirmation, shipping and delivery updates, customer support, and improving our services.",
      },
      {
        heading: "Data Protection",
        body: "Customer information is kept secure and confidential. We do not sell, rent, or share personal information with third parties except where required for delivery or legal purposes.",
      },
      {
        heading: "Consent",
        body: "By using our services and placing an order, customers agree to our privacy practices.",
      },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    updatedAt: "May 2026",
    intro:
      "By placing an order with 3D Products, you agree to the terms and conditions outlined below.",
    sections: [
      {
        heading: "1. Order Confirmation",
        body: "All orders are confirmed only after payment as per the payment terms mentioned below. Once an order is placed, it is considered final.",
      },
      {
        heading: "2. Payment Terms",
        body: "Orders are processed after receiving payment. For Cash on Delivery (COD) orders, a minimum of 50% advance payment of the total bill is required to confirm the order. The remaining amount can be paid at the time of delivery.",
      },
      {
        heading: "3. Return & Exchange Policy",
        body: "We offer a 10-day return or exchange window from the date of delivery. The customer must record a clear unboxing video showing the sealed package before opening, the entire unboxing process, and the condition of the product inside. For exchanges or returns, the customer must also record a video while repacking the product. Damaged or defective items will only be eligible for exchange if valid video proof is provided. Requests without proper video proof will not be accepted.",
      },
      {
        heading: "4. No Refund Policy",
        body: "Once an order is placed, no refunds will be provided under any circumstances. Only exchanges or replacements are allowed as per the return & exchange policy.",
      },
      {
        heading: "5. Customised Orders",
        body: "All customised or made-to-order products are non-returnable, non-exchangeable, and non-refundable. Customers are advised to review all details carefully before confirming customised orders.",
      },
      {
        heading: "6. Product Condition & Responsibility",
        body: "We ensure all products are checked and properly packed before dispatch. Any damage claims must be supported with valid unboxing video proof. We are not responsible for issues reported without proper evidence.",
      },
      {
        heading: "7. Delivery",
        body: "Orders are dispatched within the promised timeline. Delivery timelines may vary depending on location and logistics.",
      },
      {
        heading: "8. Acceptance of Terms",
        body: "By placing an order, the customer agrees to all the terms and conditions mentioned above.",
      },
    ],
  },
};
