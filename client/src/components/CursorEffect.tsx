
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Particle {
  id: number;
  x: number;
  y: number;
  timestamp: number;
}

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let particleId = 0;
    
    const updateMousePosition = (e: MouseEvent) => {
      const newX = e.clientX;
      const newY = e.clientY;
      
      setMousePosition({ x: newX, y: newY });
      setIsVisible(true);
      
      // Add new particle to trail
      const newParticle: Particle = {
        id: particleId++,
        x: newX,
        y: newY,
        timestamp: Date.now()
      };
      
      setParticles(prev => [...prev, newParticle].slice(-15)); // Keep last 15 particles
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Clean up old particles
    const cleanupInterval = setInterval(() => {
      const now = Date.now();
      setParticles(prev => prev.filter(particle => now - particle.timestamp < 1000));
    }, 100);

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(cleanupInterval);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Main cursor dot */}
      <motion.div
        className="absolute w-4 h-4 bg-primary rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
        }}
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 0.3,
          ease: "easeInOut"
        }}
      />
      
      {/* Outer ring */}
      <motion.div
        className="absolute w-8 h-8 border-2 border-primary/30 rounded-full mix-blend-difference"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 0.5,
          ease: "easeInOut",
          delay: 0.1
        }}
      />

      {/* Trail particles */}
      {particles.map((particle, index) => {
        const age = Date.now() - particle.timestamp;
        const opacity = Math.max(0, 1 - age / 1000);
        const scale = Math.max(0.1, 1 - age / 1000);
        
        return (
          <motion.div
            key={particle.id}
            className="absolute w-2 h-2 bg-primary/60 rounded-full"
            style={{
              left: particle.x - 4,
              top: particle.y - 4,
              opacity: opacity * 0.7,
              transform: `scale(${scale})`,
            }}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 0.1 }}
            transition={{ 
              duration: 1,
              ease: "easeOut"
            }}
          />
        );
      })}
      
      {/* Glow effect */}
      <motion.div
        className="absolute w-12 h-12 bg-primary/20 rounded-full blur-md"
        style={{
          left: mousePosition.x - 24,
          top: mousePosition.y - 24,
        }}
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 0.8,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
    </div>
  );
}
