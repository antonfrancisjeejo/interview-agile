import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Play, Zap, Mic, Timer, Volume2 } from "lucide-react";

// Sample tone data for the graph
const toneData = [
  { time: "0:00", value: 65 },
  { time: "1:00", value: 70 },
  { time: "2:00", value: 60 },
  { time: "3:00", value: 80 },
  { time: "4:00", value: 75 },
  { time: "5:00", value: 85 },
  { time: "6:00", value: 70 },
];

interface VoiceAnalysisCardProps {
  isMobile?: boolean;
}

export function VoiceAnalysisCard({ isMobile }: VoiceAnalysisCardProps) {
  return (
    <Card className="shadow-sm hover:shadow-md transition-all duration-300">
      <CardHeader className={`pb-0 ${isMobile ? "p-3" : "p-4"}`}>
        <CardTitle className="flex items-center gap-2 text-base md:text-lg">
          <Mic className="h-5 w-5 text-primary" />
          Live Voice Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className={`pt-2 space-y-2 ${isMobile ? "p-3" : "p-4"}`}>
        {/* Metrics Row */}
        <div className="grid grid-cols-3 gap-1 text-xs md:text-sm bg-muted/30 p-1.5 md:p-2 rounded-md">
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">Tone:</span>
            <span>Friendly</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">Speed:</span>
            <span>145 WPM</span>
          </div>
          <div className="flex flex-col items-center justify-center">
            <span className="font-medium">Energy:</span>
            <span>Moderate</span>
          </div>
        </div>

        {/* Tone Graph - Smaller height on mobile */}
        <div className="bg-muted/30 p-1.5 md:p-2 rounded-md">
          <p className="text-xs md:text-sm font-medium mb-1 text-center">
            Tone over Time
          </p>
          <div className={`${isMobile ? "h-[70px]" : "h-[100px]"}`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={toneData}
                margin={{ top: 5, right: 10, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  opacity={0.3}
                />
                <XAxis dataKey="time" tick={{ fontSize: isMobile ? 8 : 10 }} />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    fontSize: isMobile ? "8px" : "10px",
                    padding: "2px 4px",
                  }}
                  itemStyle={{ padding: 0, margin: 0 }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "2px" }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  dot={{ r: isMobile ? 1 : 2 }}
                  activeDot={{ r: isMobile ? 3 : 4 }}
                  name="Tone"
                  unit="%"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-2 text-xs md:text-sm bg-muted/30 p-1.5 md:p-2 rounded-md">
          <div className="flex items-center justify-center gap-1">
            <Timer className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
            <span className="font-medium mr-1">Pauses:</span> 4
          </div>
          <div className="flex items-center justify-center gap-1">
            <Volume2 className="h-3 w-3 md:h-4 md:w-4 text-amber-500" />
            <span className="font-medium mr-1">Filler Words:</span> 6
          </div>
        </div>

        {/* AI Suggestions - Simplified on mobile */}
        <div className="bg-muted/30 p-2 md:p-3 rounded-md">
          <p className="text-xs md:text-sm font-medium mb-1 md:mb-2">
            AI Suggestions:
          </p>
          <ul className="text-[10px] md:text-xs space-y-1 md:space-y-1.5 ml-1 md:ml-2">
            {!isMobile ? (
              <>
                <li className="flex items-start gap-1">
                  <span className="text-primary">•</span> Slow down during
                  complex points.
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-primary">•</span> Smile during the
                  opening for energy lift.
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-primary">•</span> Reduce filler words by
                  pausing more deliberately.
                </li>
              </>
            ) : (
              <>
                <li className="flex items-start gap-1">
                  <span className="text-primary">•</span> Slow down at complex
                  points
                </li>
                <li className="flex items-start gap-1">
                  <span className="text-primary">•</span> Smile for energy lift
                </li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className={`pt-0 gap-2 ${isMobile ? "p-3" : "p-4"}`}>
        <Button
          variant="outline"
          size={isMobile ? "sm" : "default"}
          className="flex-1 text-[10px] md:text-xs font-normal h-7 md:h-8"
        >
          <Play className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" />{" "}
          {isMobile ? "Replay" : "Replay with Analysis"}
        </Button>
        <Button
          variant="default"
          size={isMobile ? "sm" : "default"}
          className="flex-1 text-[10px] md:text-xs font-normal h-7 md:h-8"
        >
          <Zap className="h-2.5 w-2.5 md:h-3 md:w-3 mr-1" />{" "}
          {isMobile ? "Improve" : "Improve Now!"}
        </Button>
      </CardFooter>
    </Card>
  );
}
