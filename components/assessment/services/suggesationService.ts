/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */



// Generate focused AI suggestions based on performance metrics and call history
export const generateFocusedSuggestions = (metrics:any, callHistory:any)=> {
  // Find lowest score areas first for targeted suggestions
  const weakestMetrics = [...metrics].sort((a, b) => a.score - b.score).slice(0, 2);
  
  const suggestions = [];
  
  // First key suggestion - based on lowest performance score
  const lowestMetric = weakestMetrics[0];
  
  if (lowestMetric) {
    // Customize suggestion based on the specific metric name
    if (lowestMetric.name === "Confidence") {
      suggestions.push({
        id: "sug1",
        category: 'objection',
        title: "Improve objection handling confidence",
        description: `Your confidence score is currently at ${lowestMetric.score}/100. Based on your recent calls with Michael Peterson and Emma Wilson, you need to focus on handling pricing objections more confidently.`,
        examples: [
          "When prospect says 'Your solution is too expensive', respond with 'I understand budget is a key consideration. Let me show you our ROI calculator that demonstrates how you'll recover this investment within 4 months.'",
          "Practice the 'feel, felt, found' technique: 'I understand how you feel, other clients felt the same way initially, but they found that our premium features actually saved them money in the long run.'"
        ],
        difficulty: 'intermediate',
        performanceArea: lowestMetric.name,
        currentScore: lowestMetric.score
      });
    } else if (lowestMetric.name === "Delivery") {
      suggestions.push({
        id: "sug1",
        category: 'pitch',
        title: "Enhance your delivery style",
        description: `Your delivery score is only ${lowestMetric.score}/100. In your recent call with Sarah Chen, you spoke too quickly, especially during technical explanations.`,
        examples: [
          "Slow down and pause for 2-3 seconds after introducing key features to let information sink in. Mark these pauses in your script notes.",
          "Practice the 'rule of three' - group benefits into sets of three and emphasize each with a slightly different tone."
        ],
        difficulty: 'beginner',
        performanceArea: lowestMetric.name,
        currentScore: lowestMetric.score
      });
    } else if (lowestMetric.name === "Timing") {
      suggestions.push({
        id: "sug1",
        category: 'closing',
        title: "Improve your timing and closing techniques",
        description: `Your timing score is ${lowestMetric.score}/100. Analysis of your calls with Emma Wilson shows you often miss the right moment to close.`,
        examples: [
          "Use an assumptive close after addressing all objections: 'Should we set up the onboarding call for Tuesday or Thursday?'",
          "Watch for buying signals such as detailed questions about implementation or timeline, and transition to closing immediately when you hear them."
        ],
        difficulty: 'advanced',
        performanceArea: lowestMetric.name,
        currentScore: lowestMetric.score
      });
    } else {
      // Generic suggestion for any other low metric
      suggestions.push({
        id: "sug1",
        category: 'pitch',
        title: `Strengthen your ${lowestMetric.name.toLowerCase()} skills`,
        description: `Your ${lowestMetric.name.toLowerCase()} score is only ${lowestMetric.score}/100. This is your weakest area based on recent performance data.`,
        examples: [
          `Review recordings of your last 3 calls to identify specific ${lowestMetric.name.toLowerCase()} issues`,
          `Schedule a focused coaching session on ${lowestMetric.name.toLowerCase()} with your sales manager`
        ],
        difficulty: 'intermediate',
        performanceArea: lowestMetric.name,
        currentScore: lowestMetric.score
      });
    }
  }
  
  // Second key suggestion - based on call history feedback patterns
  // Extract common feedback from call history
  const feedbackPatterns = callHistory
    .flatMap((call:any) => call.suggestions)
    .reduce((acc: Record<string, number>, suggestion:any) => {
      const key = suggestion.toLowerCase();
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});
  
  // Get most common feedback issues
  const mostCommonIssue = Object.entries(feedbackPatterns)
//   @ts-ignore 
    .sort((a, b) => b[1] - a[1])[0];
  
  if (mostCommonIssue) {
    const [issue, count] = mostCommonIssue;
    
    // Find a specific call that mentions this issue for more context
    const relevantCall = callHistory.find((call:any) => 
      call.suggestions.some((s:any) => s.toLowerCase().includes(issue.substring(0, 15)))
    );
    
    // Determine appropriate category based on the issue content
    let category: 'pitch' | 'objection' | 'closing' | 'rapport' | 'discovery' = 'pitch';
    let difficulty: 'beginner' | 'intermediate' | 'advanced' = 'intermediate';
    
    if (issue.includes("pain point") || issue.includes("question")) {
      category = 'discovery';
    } else if (issue.includes("objection") || issue.includes("concern")) {
      category = 'objection';
      difficulty = 'advanced';
    } else if (issue.includes("close") || issue.includes("follow up")) {
      category = 'closing';
    } else if (issue.includes("rapport") || issue.includes("relationship")) {
      category = 'rapport';
      difficulty = 'beginner';
    }
    
    suggestions.push({
      id: "sug2",
      category,
      title: `Recurring feedback: ${issue.split(' ').slice(0, 4).join(' ')}...`,
      description: `This feedback appeared in ${count} of your recent calls${relevantCall ? `, including with ${relevantCall.personaName}` : ''}.`,
      examples: [
        relevantCall?.suggestions.find((s:any) => 
          s.toLowerCase().includes(issue.substring(0, 15))
        ) || "Review your call recordings for specific instances",
        callHistory[0].suggestions[0] // Add another example from most recent call
      ],
      difficulty
    });
  }
  
  return suggestions;
};
