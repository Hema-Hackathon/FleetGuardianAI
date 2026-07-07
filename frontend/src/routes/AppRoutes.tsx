import { Navigate, Route, Routes } from "react-router-dom";
import { AppShell } from "../layouts/AppShell";
import { FirePreventionPage } from "../modules/fire-prevention/FirePreventionPage";
import { DashboardPage } from "../pages/DashboardPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { PrototypeModulePage } from "../pages/PrototypeModulePage";

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="fleet" element={<PrototypeModulePage modulePath="/fleet" />} />
        <Route path="monitoring" element={<PrototypeModulePage modulePath="/monitoring" />} />
        <Route path="fire-prevention" element={<FirePreventionPage />} />
        <Route path="incident-response" element={<PrototypeModulePage modulePath="/incident-response" />} />
        <Route path="investigation" element={<PrototypeModulePage modulePath="/investigation" />} />
        <Route path="maintenance" element={<PrototypeModulePage modulePath="/maintenance" />} />
        <Route path="compliance" element={<PrototypeModulePage modulePath="/compliance" />} />
        <Route path="analytics" element={<PrototypeModulePage modulePath="/analytics" />} />
        <Route path="ai-assistant" element={<PrototypeModulePage modulePath="/ai-assistant" />} />
        <Route path="administration" element={<PrototypeModulePage modulePath="/administration" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
