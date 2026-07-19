import { useState } from "react";
import { useForm } from "react-hook-form";
import { ClipboardCheck } from "lucide-react";
import { createPreventiveWorkOrder, type CreatedWorkOrder } from "../../services/firePreventionService";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { Select } from "../common/Select";

interface WorkOrderFormValues {
  vehicleId: string;
  priority: string;
  action: string;
  owner: string;
}

export function WorkOrderForm({ vehicleId, suggestedAction }: { vehicleId: string; suggestedAction: string }) {
  const [created, setCreated] = useState<CreatedWorkOrder | null>(null);
  const [submitError, setSubmitError] = useState<{ vehicleId: string; message: string } | null>(null);
  const { register, handleSubmit, reset, formState } = useForm<WorkOrderFormValues>({
    defaultValues: {
      vehicleId,
      priority: "High",
      action: suggestedAction,
      owner: "EV Safety Cell",
    },
  });

  async function onSubmit(values: WorkOrderFormValues) {
    setSubmitError(null);

    if (!values.action.trim()) {
      setSubmitError({ vehicleId, message: "Preventive action is required." });
      return;
    }

    if (!values.owner.trim()) {
      setSubmitError({ vehicleId, message: "Owner is required." });
      return;
    }

    try {
      const workOrder = await createPreventiveWorkOrder(values);
      setCreated(workOrder);
      reset(values);
    } catch {
      setSubmitError({ vehicleId, message: "Work order could not be created. Please check the details and try again." });
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-300">
          Vehicle
          <Input {...register("vehicleId")} readOnly />
        </label>
        <label className="space-y-1 text-sm text-slate-300">
          Priority
          <Select {...register("priority")}>
            <option>Critical</option>
            <option>High</option>
            <option>Medium</option>
            <option>Info</option>
          </Select>
        </label>
      </div>
      <label className="space-y-1 text-sm text-slate-300">
        Preventive action
        <Input {...register("action")} data-testid="work-order-action" />
      </label>
      <label className="space-y-1 text-sm text-slate-300">
        Owner
        <Input {...register("owner")} data-testid="work-order-owner" />
      </label>
      <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
        <ClipboardCheck className="h-4 w-4" />
        {formState.isSubmitting ? "Creating Preventive Maintenance Order..." : "Create Preventive Maintenance Order"}
      </Button>
      {submitError?.vehicleId === vehicleId ? (
        <div className="rounded-md border border-red-400/25 bg-red-500/10 p-3 text-sm text-red-100">
          {submitError.message}
        </div>
      ) : null}
      {created?.vehicleId === vehicleId ? (
        <div className="rounded-md border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm text-emerald-100" aria-live="polite">
          Preventive maintenance order {created.id} created for {created.vehicleId} at {created.createdAt}.
        </div>
      ) : null}
    </form>
  );
}
