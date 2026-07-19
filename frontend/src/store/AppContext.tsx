import { useMemo, useState, type ReactNode } from "react";
import { AppContext } from "./appContextCore";

export function AppProvider({ children }: { children: ReactNode }) {
  const [globalSearch, setGlobalSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [refreshVersion, setRefreshVersion] = useState(0);

  function requestRefresh() {
    setRefreshVersion((version) => version + 1);
  }

  const value = useMemo(
    () => ({
      globalSearch,
      setGlobalSearch,
      refreshVersion,
      requestRefresh,
      sidebarCollapsed,
      setSidebarCollapsed,
    }),
    [globalSearch, refreshVersion, sidebarCollapsed],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
