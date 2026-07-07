import { useMemo, useState, type ReactNode } from "react";
import { AppContext } from "./appContextCore";

export function AppProvider({ children }: { children: ReactNode }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const value = useMemo(
    () => ({ globalSearch, setGlobalSearch, sidebarCollapsed, setSidebarCollapsed }),
    [globalSearch, sidebarCollapsed],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
