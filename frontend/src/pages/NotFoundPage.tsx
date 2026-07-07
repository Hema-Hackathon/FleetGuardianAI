import { Link } from "react-router-dom";
import { RouteOff } from "lucide-react";
import { Button } from "../components/common/Button";
import { EmptyState } from "../components/common/EmptyState";

export function NotFoundPage() {
  return (
    <div className="mx-auto max-w-2xl py-20">
      <EmptyState title="Page not found" message="The requested FleetGuardian AI route does not exist." icon={RouteOff} />
      <div className="mt-5 flex justify-center">
        <Link to="/dashboard"><Button>Return to Dashboard</Button></Link>
      </div>
    </div>
  );
}
