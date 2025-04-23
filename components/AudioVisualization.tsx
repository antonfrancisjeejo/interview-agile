"use client";

import { useEffect, useRef } from "react";

interface AudioVisualizationProps {
  isActive: boolean;
}

const AudioVisualization = ({ isActive }: AudioVisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!isActive || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#3b82f6";

      const barCount = 50;
      const barWidth = width / barCount;
      const spacing = 2;

      for (let i = 0; i < barCount; i++) {
        const barHeight = Math.random() * height;
        const x = i * (barWidth + spacing);
        ctx.fillRect(x, height - barHeight, barWidth, barHeight);
      }

      animationFrameRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isActive]);

  return (
    <canvas ref={canvasRef} width={300} height={50} className="w-full h-12" />
  );
};

export default AudioVisualization;
