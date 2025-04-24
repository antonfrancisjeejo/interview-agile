/* eslint-disable @typescript-eslint/no-explicit-any */
export interface DashboardStateProps {
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
  chatHistory: any[];
  recentHistory: any;
}
