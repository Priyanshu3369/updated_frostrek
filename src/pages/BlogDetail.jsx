import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar } from "lucide-react";

/**
 * Blog data with the new industry-academia collaboration post
 */
const blogData = {
  "industry-academia-collaboration-ai-era": {
    title: "From Classroom to Career: Why Industry–Academia Collaboration Is Critical in the AI Era",
    date: "Dec 20, 2025",
    tag: "AI & Education",
    author: "Akash Mittal",
    authorTitle: "Founder | Frostrek",
    hasImage: true,
    imageUrl: "/blog.jpg",
    content: `I've spent years building and scaling multiple enterprises across AI, data, IT services, and digital platforms. I work closely with global clients, deploy AI systems in production environments, and hire talent at scale. If there's one hard truth I've learned through this journey, it's this:

**The biggest bottleneck in the AI ecosystem today is not technology—it's the gap between academia and industry.**

Students are intelligent, motivated, and capable. Institutions are committed and well-meaning. Yet, many graduates still struggle to transition smoothly from classrooms into real AI careers. This disconnect becomes especially visible in fast-moving domains like Artificial Intelligence, where industry expectations evolve far quicker than academic curricula.

This is exactly why industry–academia collaboration is no longer optional. It is essential. And it is the reason Frostrek has actively partnered with institutions like Rustamji Institute of Technology (RJIT) and ITM University—to help close this gap in a meaningful, scalable way.

## The Gap Is Real and Growing

Let's be honest about the problem.

Academic institutions do an excellent job of building foundations: logic, mathematics, discipline, and conceptual understanding. These are critical. But AI in the real world is not built in isolation, clean datasets, or exam conditions.

In industry, AI systems are shaped by:
• Incomplete and noisy data
• Business constraints and cost trade-offs
• Ethical considerations and quality benchmarks
• Tight deadlines and cross-functional collaboration

Many students graduate having learned about AI—but not having worked with AI the way the industry actually uses it. On the other side, companies expect graduates to be productive quickly, often without investing enough time in early exposure or mentorship.

This creates a frustrating cycle:
• Students feel underprepared
• Companies feel talent is "not industry-ready"
• Institutions feel placements are becoming harder

Breaking this cycle requires intentional partnership, not last-minute placement drives.

## Why Frostrek Chose to Step In

At Frostrek AI, we see talent development as a long-term responsibility, not a short-term hiring tactic. If the industry wants better talent, it must participate earlier—inside campuses, alongside faculty, and during the learning journey.

This belief led us to collaborate with two institutions in Gwalior, each representing a different but equally important model of engagement.

### RJIT: Preparing Students for Real-World AI Environments

Rustamji Institute of Technology (RJIT), established by the Border Security Force, brings a unique culture of discipline, focus, and resilience. During our interactions with RJIT students and faculty, one thing stood out clearly—the students have strong fundamentals and an exceptional mindset.

Through the Industry-Oriented Training Program by Frostrek, final-year students at RJIT are exposed to:
• Practical AI and data workflows
• Industry-style problem statements
• Real expectations around quality, timelines, and accountability
• Mentorship rooted in live industry experience

The goal is not to overload students with tools, but to help them understand how AI decisions are made in production environments. Performance-based outcomes and potential Pre-Placement Offers (PPOs) give students clarity and motivation, while institutions gain stronger employability outcomes.

This model helps students transition from academic confidence to industry confidence—a critical shift often missing in traditional education.

### ITM University: Building Infrastructure for Long-Term Impact

With ITM University, Frostrek's collaboration takes a deeper, infrastructure-driven approach. Through a formal MoU, Frostrek has sponsored and established an Industry Assisted Computer Lab within the Department of Information Technology.

This lab is more than a facility—it is an ecosystem where:
• Students work on hands-on AI and data projects
• Learning is continuously aligned with industry use cases
• Mentorship and guidance are ongoing, not event-based

By embedding industry support directly into the academic environment, ITM students gain sustained exposure rather than one-time interventions. This model ensures that learning evolves alongside industry needs, not years behind them.

## Why These Partnerships Matter in the AI Era

AI is not just another technology layer. It influences decisions, automation, and outcomes at scale. Poorly trained AI professionals don't just write inefficient code—they can build systems with real-world consequences.

That's why industry involvement during education is critical:
• Students learn responsibility alongside capability
• Institutions stay relevant in a rapidly changing tech landscape
• Companies reduce onboarding time and risk
• The overall ecosystem becomes more resilient

These partnerships are not about branding or recruitment alone. They are about building a future-ready workforce.

## The Bigger Picture: From Degrees to Direction

The transition from classroom to career should not feel like a leap of faith. It should feel like a guided progression. Collaborations like those with RJIT and ITM University demonstrate what's possible when industry and academia move from parallel tracks to shared goals.

For students, this means clarity and confidence.
For institutions, it means relevance and results.
For industry, it means sustainable talent pipelines.

## Conclusion: A Shared Responsibility

The future of AI will not be shaped by institutions alone.
It will not be shaped by industry alone.
It will be shaped together.

As entrepreneurs and industry leaders, we must move beyond complaining about skill gaps and start building solutions inside classrooms. As institutions, there must be openness to evolve learning models. And as students, there must be curiosity beyond textbooks.

Frostrek's partnerships with RJIT and ITM University are steps in that direction—toward a future where graduates don't just hold degrees, but step into careers with confidence, competence, and purpose.

**That is how we truly bridge the gap between academia and industry in the AI era.**`,
  },

  "how-ai-is-transforming-modern-businesses": {
    title: "How AI is Transforming Modern Businesses",
    date: "Sept 15, 2025",
    tag: "AI & ML",
    hasImage: false,
    content: `Artificial Intelligence is no longer a futuristic concept - it is actively reshaping how modern businesses operate.

From automating repetitive workflows to enabling intelligent decision-making, AI is driving efficiency, accuracy, and scalability across industries.

### Key Areas of Impact

• Process Automation and Optimization  
• Predictive Analytics and Forecasting  
• Intelligent Customer Experiences  
• Personalized Product Recommendations  

Organizations that adopt AI early gain a significant competitive advantage, unlocking new growth opportunities while reducing operational costs.

The future belongs to businesses that integrate AI responsibly and strategically.`,
  },

  "llm-post-training": {
    title: "LLM Post-Training: What Happens After Fine-Tuning?",
    date: "Sept 10, 2025",
    tag: "LLMs",
    hasImage: false,
    content: `Post-training is a critical phase in the lifecycle of large language models.

After fine-tuning, models undergo evaluation, alignment, and reinforcement learning from human feedback (RLHF) to improve safety, usefulness, and reliability.

This stage ensures models perform well in real-world applications and align with user expectations and ethical standards.`,
  },

  "scalable-react-frontends": {
    title: "Designing Scalable Frontends with React",
    date: "Sept 5, 2025",
    tag: "Frontend",
    hasImage: false,
    content: `Scalability in frontend development is about structure, clarity, and performance.

A well-architected React application relies on reusable components, proper state management, and clean separation of concerns.

Following best practices early prevents technical debt and enables long-term maintainability.`,
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
            {blog.author && (
              <>
                <span className="text-slate-600">•</span>
                <span>{blog.author}</span>
                {blog.authorTitle && (
                  <span className="text-slate-500">| {blog.authorTitle}</span>
                )}
              </>
            )}
          </div>

          {/* Featured Image */}
          {blog.hasImage && blog.imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-10 rounded-2xl overflow-hidden border border-white/10"
            >
              <img 
                src={blog.imageUrl} 
                alt={blog.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>
          )}

          {/* Content */}
          <div className="prose prose-invert prose-lg max-w-none
                          prose-headings:font-semibold prose-headings:text-cyan-200
                          prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                          prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                          prose-p:text-slate-300/90 prose-p:leading-relaxed
                          prose-ul:text-slate-300/90 prose-ul:leading-relaxed
                          prose-strong:text-cyan-300 prose-strong:font-semibold">
            {blog.content.split('\n').map((paragraph, index) => {
              if (paragraph.trim().startsWith('## ')) {
                return <h2 key={index}>{paragraph.replace('## ', '')}</h2>;
              }
              if (paragraph.trim().startsWith('### ')) {
                return <h3 key={index}>{paragraph.replace('### ', '')}</h3>;
              }
              if (paragraph.trim().startsWith('**') && paragraph.trim().endsWith('**')) {
                return <p key={index}><strong>{paragraph.replace(/\*\*/g, '')}</strong></p>;
              }
              if (paragraph.trim().startsWith('•')) {
                return <li key={index} className="ml-6">{paragraph.replace('• ', '')}</li>;
              }
              if (paragraph.trim()) {
                return <p key={index}>{paragraph}</p>;
              }
              return <br key={index} />;
            })}
          </div>
        </motion.article>
      </div>
    </section>
  );
};

export default BlogDetail;