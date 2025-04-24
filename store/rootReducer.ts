import { combineReducers } from "redux";
import PromptSlice from "@/store/services/prompt/promptSlice";
import AnalyticsSlice from "@/store/services/analytics/analyticsSlice";
import DashboardSlice from "@/store/services/dashboard/dashboardSlice";
import AuthSlice from "@/store/services/auth/authSlice";
import SalesRepsSlice from "@/store/services/sales-representatives/salesRepresentativesSlice";

import ThemeSlice from "@/store/services/theme/ThemeSlice";

const RootReducer = combineReducers({
  PromptSlice,
  ThemeSlice,
  AnalyticsSlice,
  DashboardSlice,
  AuthSlice,
  SalesRepsSlice,
});

export default RootReducer;
