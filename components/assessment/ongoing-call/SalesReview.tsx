import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface Section {
  score: number;
  total_question_passed: number;
  questions: Record<string, boolean>;
}

interface AiCoachReview {
  final_suggestions: string;
  what_could_be_improved: string;
  what_was_done_well: string;
}

interface SalesReviewProps {
  data: {
    final_score: number;
    first_impression_and_engagement: Section;
    identifying_customer_needs: Section;
    clarity_and_conversational_flow: Section;
    guiding_towards_a_decision: Section;
    securing_a_next_step: Section;
    ai_coach_review: AiCoachReview;
  };
}

const SalesReview: React.FC<SalesReviewProps> = ({ data }) => {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold">
            Final Score: {data.final_score}
          </h2>
          <Progress value={data.final_score} max={100} className="mt-2" />
        </CardContent>
      </Card>

      {Object.entries(data).map(
        ([key, section]) =>
          (section as Section).score !== undefined && (
            <Card key={key}>
              <CardContent className="p-4">
                <h3 className="text-lg font-medium capitalize">
                  {key.replace(/_/g, " ")}
                </h3>
                <p className="text-gray-600">
                  Score: {(section as Section).score}
                </p>
                <Progress
                  value={(section as Section).score}
                  max={30}
                  className="mt-2"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Questions Passed: {(section as Section).total_question_passed}
                </p>
              </CardContent>
            </Card>
          )
      )}

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium">What Was Done Well</h3>
          <p className="text-gray-600">
            {data.ai_coach_review.what_was_done_well}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium">What Could Be Improved</h3>
          <p className="text-gray-600">
            {data.ai_coach_review.what_could_be_improved}
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-4">
          <h3 className="text-lg font-medium">Final Suggestions</h3>
          <p className="text-gray-600">
            {data.ai_coach_review.final_suggestions}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SalesReview;
