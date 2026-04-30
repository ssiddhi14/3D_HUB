import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { policies } from "@/config/footer";
import { policyContent } from "@/content/policies";

const Policy = () => {
  const { slug = "" } = useParams<{ slug: string }>();
  const meta = policies.find((p) => p.slug === slug);
  const content = policyContent[slug];

  if (!meta) {
    return (
      <div className="min-h-screen bg-gradient-dark pt-24 pb-20 px-4">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-3xl font-bold mb-4">Policy not found</h1>
          <Link to="/" className="text-primary hover:underline">
            Go back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
        >
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card rounded-2xl p-6 md:p-10"
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-gradient">{meta.label}</span>
          </h1>
          {content?.updatedAt && (
            <p className="text-xs text-muted-foreground mb-6">
              Last updated: {content.updatedAt}
            </p>
          )}

          {content ? (
            <>
              <p className="text-muted-foreground leading-relaxed mb-8">
                {content.intro}
              </p>
              <div className="space-y-6">
                {content.sections.map((s) => (
                  <section key={s.heading}>
                    <h2 className="text-lg font-semibold text-foreground mb-2">
                      {s.heading}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.body}
                    </p>
                  </section>
                ))}
              </div>
            </>
          ) : (
            <p className="text-muted-foreground">
              This policy is being prepared and will be published soon.
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Policy;
