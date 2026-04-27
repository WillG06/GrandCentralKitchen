import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface Props {
  src: string;
  alt: string;
  className?: string;
  intensity?: number; // 0 - 1
}

const ParallaxImage = ({ src, alt, className = "", intensity = 0.25 }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity * 100}%`, `${intensity * 100}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ y }}
        className="absolute inset-0 h-[130%] w-full object-cover -top-[15%]"
      />
    </div>
  );
};

export default ParallaxImage;
