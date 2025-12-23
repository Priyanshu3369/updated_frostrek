import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";

/**
 * Temporary static data
 * (Later you can replace this with API / CMS / markdown)
 */
const blogData = {
  "how-ai-is-transforming-modern-businesses": {
    title: "How AI is Transforming Modern Businesses",
    date: "Sept 15, 2025",
    tag: "AI & ML",
    content: `
Artificial Intelligence is no longer a futuristic concept - it is actively
reshaping how modern businesses operate.

From automating repetitive workflows to enabling intelligent decision-making,
AI is driving efficiency, accuracy, and scalability across industries.

### Key Areas of Impact

• Process Automation and Optimization  
• Predictive Analytics and Forecasting  
• Intelligent Customer Experiences  
• Personalized Product Recommendations  

Organizations that adopt AI early gain a significant competitive advantage,
unlocking new growth opportunities while reducing operational costs.

The future belongs to businesses that integrate AI responsibly and strategically.
`,
  },

  "llm-post-training": {
    title: "LLM Post-Training: What Happens After Fine-Tuning?",
    date: "Sept 10, 2025",
    tag: "LLMs",
    content: `
Post-training is a critical phase in the lifecycle of large language models.

After fine-tuning, models undergo evaluation, alignment, and reinforcement
learning from human feedback (RLHF) to improve safety, usefulness, and reliability.

This stage ensures models perform well in real-world applications and align
with user expectations and ethical standards.
`,
  },

  "scalable-react-frontends": {
    title: "Designing Scalable Frontends with React",
    date: "Sept 5, 2025",
    tag: "Frontend",
    content: `
Scalability in frontend development is about structure, clarity, and performance.

A well-architected React application relies on reusable components, proper state
management, and clean separation of concerns.

Following best practices early prevents technical debt and enables long-term
maintainability.
`,
  },
};

const BlogDetail = () => {
  const { slug } = useParams();
  const blog = blogData[slug];

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0B0B0E] flex items-center justify-center text-slate-300">
        Blog not found
      </div>
    );
  }

  return (
    <section className="relative px-6 py-24 bg-[#0B0B0E] text-slate-50 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Back button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-10"
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition"
          >
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
        </motion.div>

        {/* Blog Card */}
        <motion.article
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="rounded-[28px] bg-white/[0.04] backdrop-blur-xl
                     border border-white/5 p-8 md:p-12"
        >
          {/* Tag */}
          <span className="inline-block mb-4 text-xs font-semibold uppercase tracking-wider
                           px-4 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300">
            {blog.tag}
          </span>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-semibold mb-6 leading-tight
                         bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300
                         bg-clip-text text-transparent">
            {blog.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center gap-3 text-sm text-slate-400 mb-10">
            <Calendar size={14} />
            {blog.date}
          </div>

          {/* Content */}
          <div className="space-y-6 text-slate-300/80 leading-relaxed text-lg whitespace-pre-line">
            {blog.content}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogDetail;
