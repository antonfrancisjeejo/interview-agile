import { TeamsProps } from "@/apiServices/useFetchCompanyTeams";

export interface TeamState {
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
  teams: TeamsProps[];
  team: TeamsProps | null;
}
