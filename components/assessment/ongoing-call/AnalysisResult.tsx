/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

const AnalysisResult = ({ analysis }: { analysis: any }) => {
  if (!analysis || !analysis.results) return null;

  const { summary, topics, intents, sentiments } = analysis.results;

  return (
    <div className="w-full mx-auto bg-white shadow-lg rounded-2xl p-6 border">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Analysis Result</h2>

      {/* Summary */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Summary</h3>
        <p className="text-gray-600 bg-gray-100 p-2 rounded-md">
          {summary.text}
        </p>
      </div>

      {/* Topics */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Topics</h3>
        {topics.segments.length > 0 ? (
          <ul className="list-disc pl-4 text-gray-600">
            {topics.segments.map((segment: any, index: any) => (
              <li key={index}>
                <span className="font-medium">{segment.text}</span>:{" "}
                {segment.topics.map((t: any) => t.topic).join(", ")}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No topics detected.</p>
        )}
      </div>

      {/* Intents */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-700">Intents</h3>
        {intents.segments.length > 0 ? (
          <ul className="list-disc pl-4 text-gray-600">
            {intents.segments.map((segment: any, index: any) => (
              <li key={index}>{segment.text}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No intents detected.</p>
        )}
      </div>

      {/* Tone */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Tone</h3>

        <p className="text-gray-500 text-sm">
          Tone:{" "}
          <span className="font-medium">
            {sentiments.average.sentiment_score >= 0.5
              ? "Friendly"
              : sentiments.average.sentiment_score >= -0.1
              ? "Professional"
              : "Rude"}
          </span>
        </p>
      </div>

      {/* Sentiments */}
      <div>
        <h3 className="text-lg font-semibold text-gray-700">Sentiment</h3>
        <p className="text-gray-600">
          Overall Sentiment:{" "}
          <span className="font-medium">{sentiments.average.sentiment}</span>
        </p>
        <p className="text-gray-500 text-sm">
          Sentiment Score: {sentiments.average.sentiment_score.toFixed(2)}
        </p>
      </div>
    </div>
  );
};

export default AnalysisResult;
