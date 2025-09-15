
import { useEffect, useState, useRef } from 'react';

interface InkSplash {
  x: number;
  y: number;
  id: number;
  timestamp: number;
  intensity: number;
}

export default function CursorEffect() {
  const [splashes, setSplashes] = useState<InkSplash[]>([]);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastMoveTime = useRef<number>(0);
  const animationId = useRef<number>();

  useEffect(() => {
    let splashId = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      const timeDelta = now - lastMoveTime.current;
      
      if (timeDelta > 0) {
        const distance = Math.sqrt(
          Math.pow(e.clientX - lastMousePos.current.x, 2) + 
          Math.pow(e.clientY - lastMousePos.current.y, 2)
        );
        
        const speed = distance / timeDelta;
        
        // Só cria respingo se o mouse estiver se movendo rápido
        if (speed > 1.5 && timeDelta < 50) {
          const intensity = Math.min(speed / 3, 1);
          
          const newSplash: InkSplash = {
            x: e.clientX,
            y: e.clientY,
            id: splashId++,
            timestamp: now,
            intensity
          };
          
          setSplashes(prev => [...prev, newSplash].slice(-15));
        }
      }
      
      lastMousePos.current = { x: e.clientX, y: e.clientY };
      lastMoveTime.current = now;
    };

    // Limpa respingos antigos automaticamente
    const cleanupSplashes = () => {
      const now = Date.now();
      setSplashes(prev => prev.filter(splash => now - splash.timestamp < 3000));
      animationId.current = requestAnimationFrame(cleanupSplashes);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationId.current = requestAnimationFrame(cleanupSplashes);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {splashes.map((splash) => {
        const age = Date.now() - splash.timestamp;
        const fadeProgress = age / 3000; // 3 segundos para desvanecer
        const opacity = Math.max(0, 1 - fadeProgress);
        const scale = 0.5 + (fadeProgress * 2); // Cresce conforme desvanece
        const size = 100 + (splash.intensity * 200); // Tamanho baseado na intensidade
        
        return (
          <div
            key={splash.id}
            className="absolute rounded-full"
            style={{
              left: splash.x - size / 2,
              top: splash.y - size / 2,
              width: size,
              height: size,
              background: `radial-gradient(circle, 
                rgba(0, 0, 0, ${opacity * 0.8}) 0%, 
                rgba(0, 0, 0, ${opacity * 0.4}) 30%, 
                rgba(0, 0, 0, ${opacity * 0.1}) 60%, 
                transparent 100%)`,
              transform: `scale(${scale})`,
              filter: `blur(${fadeProgress * 3}px)`,
              transition: 'transform 0.1s ease-out',
              animation: `inkSpread 3s ease-out forwards`
            }}
          />
        );
      })}
      
      <style jsx>{`
        @keyframes inkSpread {
          0% {
            transform: scale(0.3);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.6;
          }
          100% {
            transform: scale(2.5);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
