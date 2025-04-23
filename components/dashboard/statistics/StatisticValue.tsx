"use client";

interface StatisticValueProps {
  value: string;
  label: string;
}

export const StatisticValue = ({ value, label }: StatisticValueProps) => (
  <div>
    <p className="text-2xl font-bold">{value}</p>
    <p className="text-sm text-muted-foreground">{label}</p>
  </div>
);
