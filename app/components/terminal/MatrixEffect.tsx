import React, { useRef, useEffect, useCallback } from 'react';

interface MatrixEffectProps {
  onComplete: () => void; // Callback to signal completion of the effect
  duration?: number; // Optional duration in milliseconds
}

const MatrixEffect: React.FC<MatrixEffectProps> = ({ onComplete, duration = 10000 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
  const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const nums = '0123456789';
  const characters = katakana + latin + nums;
  const FONT_SIZE = 16;
  const GREEN_COLOR = '#00FF00'; // From theme

  const draw = useCallback((ctx: CanvasRenderingContext2D, drops: number[], canvasWidth: number, canvasHeight: number) => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Semi-transparent black for fading effect
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    ctx.fillStyle = GREEN_COLOR;
    ctx.font = `${FONT_SIZE}px VT323, monospace`; // Use VT323 font

    for (let i = 0; i < drops.length; i++) {
      const text = characters[Math.floor(Math.random() * characters.length)];
      ctx.fillText(text, i * FONT_SIZE, drops[i] * FONT_SIZE);

      if (drops[i] * FONT_SIZE > canvasHeight && Math.random() > 0.975) {
        drops[i] = 0; // Reset drop to top
      }
      drops[i]++;
    }
  }, [characters]); // characters dependency

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    const columns = Math.floor(canvasWidth / FONT_SIZE);
    const drops: number[] = [];
    for (let x = 0; x < columns; x++) {
      drops[x] = 1;
    }

    const render = () => {
      draw(ctx, drops, canvasWidth, canvasHeight);
      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    const handleResize = () => {
      canvasWidth = window.innerWidth;
      canvasHeight = window.innerHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      // Recalculate columns and reset drops if needed
      const newColumns = Math.floor(canvasWidth / FONT_SIZE);
      drops.length = 0; // Clear existing drops
      for (let x = 0; x < newColumns; x++) {
        drops[x] = Math.floor(Math.random() * (canvasHeight / FONT_SIZE)); // Randomize starting position
      }
    };

    window.addEventListener('resize', handleResize);

    // Stop effect after duration or on key press
    timeoutRef.current = setTimeout(onComplete, duration);

    const handleKeyPress = (e: KeyboardEvent) => {
      // Allow specific keys if needed, otherwise any key stops
      // if (e.key === 'Escape') { ... }
      onComplete();
    };
    window.addEventListener('keydown', handleKeyPress);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [onComplete, duration, draw]); // draw is a dependency

  return <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full bg-black z-50"></canvas>;
};

export default MatrixEffect;
