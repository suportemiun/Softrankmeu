
import { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
  timestamp: number;
}

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationId = useRef<number>();
  const lastMoveTime = useRef<number>(0);

  useEffect(() => {
    let pointId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      const now = Date.now();
      const newPoint = { 
        x: e.clientX, 
        y: e.clientY, 
        id: pointId++, 
        timestamp: now 
      };
      
      setMousePosition(newPoint);
      setIsVisible(true);
      lastMoveTime.current = now;
      
      // Adiciona pontos apenas se o mouse estiver se movendo rapidamente
      if (trail.length === 0 || now - trail[trail.length - 1].timestamp > 16) {
        setTrail(prev => [...prev, newPoint].slice(-25));
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animação suave do rastro com desvanecimento
    const animateTrail = () => {
      const now = Date.now();
      
      setTrail(prev => {
        if (prev.length === 0) return prev;
        
        // Remove pontos muito antigos
        const filtered = prev.filter(point => now - point.timestamp < 1000);
        
        return filtered.map((point, index) => {
          if (index === filtered.length - 1) return point;
          
          const nextPoint = filtered[index + 1];
          const factor = 0.15; // Velocidade de interpolação mais suave
          
          return {
            ...point,
            x: point.x + (nextPoint.x - point.x) * factor,
            y: point.y + (nextPoint.y - point.y) * factor
          };
        });
      });
      
      animationId.current = requestAnimationFrame(animateTrail);
    };

    window.addEventListener('mousemove', updateMousePosition);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    animationId.current = requestAnimationFrame(animateTrail);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [trail.length]);

  if (!isVisible) return null;

  return (
    <>
      {/* Efeito de brilho ao redor do cursor */}
      <div className="fixed inset-0 pointer-events-none z-40">
        <div
          className="absolute rounded-full opacity-30"
          style={{
            left: mousePosition.x - 25,
            top: mousePosition.y - 25,
            width: '50px',
            height: '50px',
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, transparent 70%)',
            filter: 'blur(8px)',
            transition: 'all 0.1s ease-out'
          }}
        />
      </div>

      {/* Rastro principal */}
      <div className="fixed inset-0 pointer-events-none z-50">
        {trail.map((point, index) => {
          const progress = (index + 1) / trail.length;
          const age = Date.now() - point.timestamp;
          const ageOpacity = Math.max(0, 1 - age / 800);
          const opacity = progress * ageOpacity * 0.9;
          const size = 2 + (progress * 4);
          
          return (
            <div
              key={point.id}
              className="absolute rounded-full"
              style={{
                left: point.x - size / 2,
                top: point.y - size / 2,
                width: size,
                height: size,
                background: `linear-gradient(45deg, 
                  rgba(59, 130, 246, ${opacity}), 
                  rgba(147, 51, 234, ${opacity * 0.8}))`,
                opacity: opacity,
                transform: `scale(${0.5 + progress * 0.5})`,
                transition: 'all 0.05s ease-out',
                filter: 'blur(0.5px)',
                boxShadow: `0 0 ${size * 2}px rgba(59, 130, 246, ${opacity * 0.3})`
              }}
            />
          );
        })}
        
        {/* Ponto principal premium */}
        <div
          className="absolute rounded-full"
          style={{
            left: mousePosition.x - 4,
            top: mousePosition.y - 4,
            width: '8px',
            height: '8px',
            background: 'linear-gradient(45deg, #3b82f6, #9333ea)',
            boxShadow: `
              0 0 10px rgba(59, 130, 246, 0.6),
              0 0 20px rgba(147, 51, 234, 0.4),
              inset 0 0 4px rgba(255, 255, 255, 0.3)
            `,
            border: '1px solid rgba(255, 255, 255, 0.2)',
            transition: 'all 0.05s ease-out'
          }}
        />

        {/* Anel externo sutil */}
        <div
          className="absolute rounded-full border border-white/10"
          style={{
            left: mousePosition.x - 8,
            top: mousePosition.y - 8,
            width: '16px',
            height: '16px',
            background: 'rgba(59, 130, 246, 0.05)',
            transition: 'all 0.1s ease-out',
            filter: 'blur(0.5px)'
          }}
        />
      </div>
    </>
  );
}
