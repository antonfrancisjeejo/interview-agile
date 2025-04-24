export interface Assessment {
  id: number;
  name: string;
  description: string;
  questionsCount: number;
  createdBy: number;
  createdAt: string;
  updatedAt: string;
}

export interface AssessmentResponse {
  data: {
    assessments: Assessment[];
  };
  success: boolean;
}
export interface SingleAssessmentResponse {
  data: {
    assessment: Assessment;
  };
  success: boolean;
}

export interface AddAssessmentRequest {
  id?: number;
  name: string;
  description: string;
}

export interface PromptState {
  loading: {
    get: boolean;
    add: boolean;
    update: boolean;
    delete: boolean;
  };
  req_success: {
    get: boolean;
    add: boolean;
    update: boolean;
    delete: boolean;
  };

  prompts: string;
}
