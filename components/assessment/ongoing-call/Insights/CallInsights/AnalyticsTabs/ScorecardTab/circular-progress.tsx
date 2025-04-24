
import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressSegment {
  color: string;
  percentage: number;
}

interface CircularProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  segments?: ProgressSegment[];
  value?: number;
  maxValue?: number;
  size?: "sm" | "md" | "lg" | "xl";
  strokeWidth?: number;
  valueColor?: string;
  trailColor?: string;
  children?: React.ReactNode;
  textColor?: string;
}

export function GradientCircularProgress({
  segments,
  value,
  maxValue = 100,
  size = "md",
  strokeWidth = 10, // Changed from 8 to 10 pixels
  valueColor = "#3b82f6",
  trailColor = "transparent",
  textColor = "#4fd1c5", // Default teal text color
  className,
  children,
  ...props
}: CircularProgressProps) {
  // Size mapping - adjusted to create properly sized circles
  const sizeMap = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-full h-full",
    xl: "w-56 h-56",
  };
  
  // Calculate the circle's circumference (adjusted to work with viewBox)
  const radius = 44; // Keeping the radius the same
  const circumference = 2 * Math.PI * radius;
  
  // Handle either segments or single value
  const segmentsToRender = segments || 
    (value !== undefined ? [{ color: valueColor, percentage: (value / maxValue) * 100 }] : []);
  
  // Calculate segments positions
  let currentOffset = 0;
  
  return (
    <div className={cn("relative", sizeMap[size], className)} {...props}>
      <svg className="w-full h-full" viewBox="0 0 100 100">
        {/* Background circle */}
        {trailColor !== "transparent" && (
          <circle 
            cx="50" 
            cy="50" 
            r={radius}
            fill="none" 
            stroke={trailColor} 
            strokeWidth={strokeWidth} 
          />
        )}
        
        {/* Progress segments */}
        {segmentsToRender.map((segment, index) => {
          const dashLength = (segment.percentage / 100) * circumference;
          const dashArray = `${dashLength} ${circumference - dashLength}`;
          const dashOffset = -currentOffset;
          currentOffset += dashLength;
          
          // For gradient segments
          
          return (
            <circle 
              key={index}
              cx="50" 
              cy="50" 
              r={radius}
              fill="none" 
              stroke={segment.color} 
              strokeWidth={strokeWidth} 
              strokeDasharray={dashArray} 
              strokeDashoffset={dashOffset}
              transform="rotate(-90 50 50)" 
              strokeLinecap="round"
            />
          );
        })}
        
        {/* Define gradients if needed */}
        <defs>
          <linearGradient id="blueRedOrange" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="50%" stopColor="#EF4444" />
            <stop offset="100%" stopColor="#F97316" />
          </linearGradient>
        </defs>
      </svg>
      
      <div className="absolute inset-0 flex items-center justify-center" style={{ color: textColor }}>
        {children}
      </div>
    </div>
  );
}
