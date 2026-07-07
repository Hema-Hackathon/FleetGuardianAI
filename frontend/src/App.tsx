import { BrowserRouter } from "react-router-dom";
import { AppProvider } from "./store/AppContext";
import { AppRoutes } from "./routes/AppRoutes";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
