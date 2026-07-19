import { createContext } from "react";

export interface AppContextValue {
  globalSearch: string;
  setGlobalSearch: (value: string) => void;
  refreshVersion: number;
  requestRefresh: () => void;
  sidebarCollapsed: boolean;
  setSidebarCollapsed: (value: boolean) => void;
}

export const AppContext = createContext<AppContextValue | undefined>(undefined);
