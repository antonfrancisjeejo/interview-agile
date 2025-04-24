/* eslint-disable react/no-unescaped-entities */
'use client'
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { LightbulbIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InsightItem {
  time: string;
  text: string;
  insight: string;
}


export function CoachingInsightsPanel() {
  // Mock insights data - in a real app, this would come from a prop or API
  const insightsData: InsightItem[] = [
    { 
      time: "00:12",
      text: "I'm interested in learning more about your product offering.",
      insight: "Good opening, but consider specifying which aspects of our solutions you're most interested in to better guide the conversation."
    },
    { 
      time: "00:35",
      text: "I'm particularly interested in your enterprise solutions and pricing models.",
      insight: "Nice job getting specific. Consider asking a follow-up question about their current challenges to establish pain points."
    },
    { 
      time: "01:15",
      text: "That sounds promising. Could you also tell me about implementation timelines?",
      insight: "Good question about logistics. Ask about their specific timeline requirements to better position your response."
    },
    { 
      time: "02:05",
      text: "That's quicker than I expected. What kind of support do you offer during and after implementation?",
      insight: "Strong follow-up question showing interest. Consider mentioning a specific challenge your team might face to make this more relevant."
    },
    { 
      time: "03:01",
      text: "That sounds comprehensive. Let's schedule a more detailed demo with my team next week.",
      insight: "Great job advancing to the next step! Try using assumptive close language: 'Would Tuesday or Thursday work better for the demo?'"
    },
    { 
      time: "03:30",
      text: "Tuesday at 2PM works perfectly. I'll make sure the key decision makers are available.",
      insight: "Strong confirmation. Next time, try to get specific names of who will be attending to establish greater commitment."
    }
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-amber-50/90 to-amber-100/50 dark:from-amber-900/40 dark:to-amber-800/20 sticky top-0 z-10 shadow-sm">
        <h3 className="text-base font-bold text-amber-800 dark:text-amber-200">Coaching Insights</h3>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-3">
          {insightsData.map((item, idx) => (
            <Card key={idx} className="p-3 bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 shadow-sm hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start gap-2">
                <LightbulbIcon className="h-4 w-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400">
                      {item.time}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                      "{item.text.length > 40 ? item.text.substring(0, 40) + '...' : item.text}"
                    </span>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">{item.insight}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
