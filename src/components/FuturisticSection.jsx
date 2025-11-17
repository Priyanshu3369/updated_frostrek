import { useMemo } from "react";
import { motion } from "framer-motion";
import usePerformanceMode from "../hooks/usePerformanceMode";

const palette = {
  cyan: {
    glowA: "rgba(15, 205, 255, 0.25)",
    glowB: "rgba(109, 40, 217, 0.22)",
    grid: "rgba(34, 211, 238, 0.18)",
    accent: "rgba(56, 189, 248, 0.4)",
  },
  amber: {
    glowA: "rgba(253, 186, 116, 0.25)",
    glowB: "rgba(217, 70, 239, 0.2)",
    grid: "rgba(253, 224, 71, 0.14)",
    accent: "rgba(251, 191, 36, 0.4)",
  },
  emerald: {
    glowA: "rgba(16, 185, 129, 0.25)",
    glowB: "rgba(59, 130, 246, 0.2)",
    grid: "rgba(134, 239, 172, 0.12)",
    accent: "rgba(110, 231, 183, 0.35)",
  },
};

const FuturisticSection = ({
  id,
  children,
  className = "",
  containerClassName = "mx-auto flex max-w-7xl flex-col gap-14 px-6 md:px-10",
  accent = "cyan",
  innerRef = null,
  fullWidth = false,
}) => {
  const colors = palette[accent] ?? palette.cyan;
  const performanceMode = usePerformanceMode();

  const particles = useMemo(() => {
    if (performanceMode) {
      return [];
    }

    return Array.from({ length: 18 }, (_, index) => ({
      id: `${id || "section"}-particle-${index}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 4,
      duration: 7 + Math.random() * 4,
      size: 1 + Math.random() * 2,
    }));
  }, [id, performanceMode]);

  return (
    <section
      ref={innerRef}
      id={id}
      className={`relative overflow-hidden pt-4 pb-20 text-[#F8FAFC] ${className}`}
    >
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(10,174,204,0.16),transparent_60%)]"
          style={{ mixBlendMode: "screen" }}
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_rgba(109,40,217,0.16),transparent_65%)]"
          style={{ mixBlendMode: "screen" }}
        />
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: performanceMode ? 0.18 : 0.4 }}
          transition={{ duration: 1.4 }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
            `,
            backgroundSize: performanceMode ? "90px 90px" : "70px 70px",
            maskImage:
              "radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0.3))",
          }}
        />
        <div
          className="absolute inset-0 blur-3xl opacity-60"
          style={{
            background: `radial-gradient(circle at 25% 20%, ${colors.glowA}, transparent 55%),
              radial-gradient(circle at 75% 35%, ${colors.glowB}, transparent 58%)`,
          }}
        />
        {!performanceMode && (
          <>
            <motion.div
              className="absolute inset-x-10 top-0 h-px"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2 }}
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
              }}
            />
            <motion.div
              className="absolute inset-x-10 bottom-0 h-px"
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 }}
              style={{
                background: `linear-gradient(90deg, transparent, ${colors.accent}, transparent)`,
              }}
            />
          </>
        )}
      </div>

      {particles.length > 0 && (
        <motion.div
          className="pointer-events-none absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 1.2 }}
        >
          {particles.map((particle) => (
            <motion.span
              key={particle.id}
              className="absolute h-[2px] w-[2px] rounded-full bg-cyan-200/70 shadow-[0_0_14px_rgba(34,211,238,0.7)]"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 1, 0],
                y: ["0%", "-16%", "0%"],
                x: ["0%", "8%", "-6%", "0%"],
              }}
              transition={{
                duration: particle.duration,
                delay: particle.delay,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: particle.size,
                height: particle.size,
              }}
            />
          ))}
        </motion.div>
      )}

      <div
        className={`relative z-10 ${containerClassName}`}
        style={fullWidth ? { width: "100%" } : { maxWidth: "min(1280px, 94vw)" }}
      >
        {children}
      </div>
    </section>
  );
};

export default FuturisticSection;

