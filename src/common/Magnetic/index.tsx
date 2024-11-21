import React, { useEffect, useRef, ReactNode } from 'react';
import gsap from 'gsap';

interface MagneticProps {
  children: ReactNode;
}

const Magnetic: React.FC<MagneticProps> = ({ children }) => {
  const magnetic = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (magnetic.current) {
      const currentMagnetic = magnetic.current; // Store the ref value in a local variable

      const xTo = gsap.quickTo(currentMagnetic, "x", { duration: 1, ease: "elastic.out(1, 0.3)" });
      const yTo = gsap.quickTo(currentMagnetic, "y", { duration: 1, ease: "elastic.out(1, 0.3)" });

      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = currentMagnetic.getBoundingClientRect();
        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);
        xTo(x * 0.35);
        yTo(y * 0.35);
      };

      const handleMouseLeave = () => {
        xTo(0);
        yTo(0);
      };

      currentMagnetic.addEventListener("mousemove", handleMouseMove);
      currentMagnetic.addEventListener("mouseleave", handleMouseLeave);

      // Cleanup the event listeners when the component unmounts
      return () => {
        currentMagnetic.removeEventListener("mousemove", handleMouseMove);
        currentMagnetic.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []); // Empty dependency array ensures this effect runs once when the component mounts

  return React.cloneElement(children as React.ReactElement, { ref: magnetic });
};

export default Magnetic;
