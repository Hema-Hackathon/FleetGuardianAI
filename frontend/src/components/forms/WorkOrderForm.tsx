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
  const { register, handleSubmit, reset, formState } = useForm<WorkOrderFormValues>({
    defaultValues: {
      vehicleId,
      priority: "High",
      action: suggestedAction,
      owner: "EV Safety Cell",
    },
    values: {
      vehicleId,
      priority: "High",
      action: suggestedAction,
      owner: "EV Safety Cell",
    },
  });

  async function onSubmit(values: WorkOrderFormValues) {
    const workOrder = await createPreventiveWorkOrder(values);
    setCreated(workOrder);
    reset(values);
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
        <Input {...register("action", { required: true })} />
      </label>
      <label className="space-y-1 text-sm text-slate-300">
        Owner
        <Input {...register("owner", { required: true })} />
      </label>
      <Button type="submit" className="w-full" disabled={formState.isSubmitting}>
        <ClipboardCheck className="h-4 w-4" />
        Create Work Order
      </Button>
      {created ? (
        <div className="rounded-md border border-emerald-400/25 bg-emerald-500/10 p-3 text-sm text-emerald-100">
          {created.id} created for {created.vehicleId} at {created.createdAt}.
        </div>
      ) : null}
    </form>
  );
}
