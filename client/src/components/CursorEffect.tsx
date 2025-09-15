import { useEffect, useState, useRef } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const animationId = useRef<number>();

  useEffect(() => {
    let pointId = 0;

    const updateMousePosition = (e: MouseEvent) => {
      const newPoint = { x: e.clientX, y: e.clientY, id: pointId++ };
      setMousePosition(newPoint);
      setIsVisible(true);
      
      setTrail(prev => [...prev, newPoint].slice(-20)); // Mantém apenas os últimos 20 pontos
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Animação suave do rastro
    const animateTrail = () => {
      setTrail(prev => {
        if (prev.length === 0) return prev;
        
        return prev.map((point, index) => {
          if (index === prev.length - 1) return point;
          
          const nextPoint = prev[index + 1];
          const factor = 0.1; // Velocidade de interpolação
          
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
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Rastro */}
      {trail.map((point, index) => {
        const opacity = (index + 1) / trail.length;
        const size = 2 + (opacity * 3);
        
        return (
          <div
            key={point.id}
            className="absolute bg-black rounded-full"
            style={{
              left: point.x - size / 2,
              top: point.y - size / 2,
              width: size,
              height: size,
              opacity: opacity * 0.8,
              transition: 'all 0.1s ease-out'
            }}
          />
        );
      })}
      
      {/* Ponto principal */}
      <div
        className="absolute w-3 h-3 bg-black rounded-full"
        style={{
          left: mousePosition.x - 6,
          top: mousePosition.y - 6,
        }}
      />
    </div>
  );
}