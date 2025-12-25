import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    title: "From Classroom to Career: Why Industry–Academia Collaboration Is Critical in the AI Era",
    slug: "industry-academia-collaboration-ai-era",
    description:
      "Exploring the critical gap between academic learning and industry expectations in AI, and how Frostrek is bridging this divide through strategic partnerships with RJIT and ITM University.",
    date: "Dec 20, 2025",
    tag: "AI & Education",
  },
  {
    title: "How AI Is Transforming Modern Businesses",
    slug: "how-ai-is-transforming-modern-businesses",
    description:
      "From automation to intelligence—exploring how AI is reshaping business operations, decision-making, and competitive advantage in the modern era.",
    date: "Sept 15, 2025",
    tag: "AI & ML",
  },
  {
    title: "LLM Post-Training: What Happens After Fine-Tuning?",
    slug: "llm-post-training",
    description:
      "A deep dive into post-training strategies like RLHF, alignment, and evaluation pipelines.",
    date: "Sept 10, 2025",
    tag: "LLMs",
  },
  {
    title: "Designing Scalable Frontends with React",
    slug: "scalable-react-frontends",
    description:
      "Best practices to structure React applications for scalability, performance, and maintainability.",
    date: "Sept 5, 2025",
    tag: "Frontend",
  },
];

const Blog = () => {
  return (
    <section className="relative px-6 py-24 bg-[#0B0B0E] text-slate-50 overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,255,255,0.14),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.12),transparent_60%)]" />
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-semibold"
        >
          <span className="bg-gradient-to-r from-cyan-300 via-indigo-400 to-teal-300 bg-clip-text text-transparent">
            Insights & Articles
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-slate-300/80"
        >
          Deep dives, learnings, and perspectives on AI, engineering, and
          building intelligent systems.
        </motion.p>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15, duration: 0.7 }}
            whileHover={{
              y: -8,
              boxShadow: "0 20px 40px rgba(6,182,212,0.18)",
            }}
            className="group relative rounded-[28px] bg-white/[0.04] backdrop-blur-xl
                       border border-white/5 p-8 transition-all duration-300
                       flex flex-col"
          >
            {/* Tag */}
            <span
              className="inline-block mb-5 text-xs font-semibold uppercase tracking-wider
                             px-4 py-1.5 rounded-full bg-cyan-400/10 text-cyan-300"
            >
              {post.tag}
            </span>

            {/* Title */}
            <h3
              className="text-2xl font-semibold leading-snug mb-4
                           group-hover:text-cyan-300 transition-colors min-h-[80px]"
            >
              {post.title}
            </h3>

            {/* Description */}
            <p className="text-slate-300/80 leading-relaxed text-sm flex-grow">
              {post.description}
            </p>

            {/* Footer */}
            <div className="mt-8 flex items-center justify-between text-sm text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                {post.date}
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="flex items-center gap-1 font-medium
             text-cyan-300 group-hover:gap-2 transition-all"
              >
                Read more <ArrowRight size={14} />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default Blog;