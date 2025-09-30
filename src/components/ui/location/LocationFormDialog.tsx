import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { useEffect } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LocationFormDialogProps } from "../../../types";

const locationSchema = z.object({
  name: z.string().refine(val => val.trim().length > 0, "Location name is required"),
  address: z.string().refine(val => val.trim().length > 0, "Address is required"),
  city: z.string().refine(val => val.trim().length > 0, "City is required"),
  country: z.string().refine(val => val.trim().length > 0, "Country is required"),
  timezone: z.string().refine(val => val.trim().length > 0, "Timezone is required"),
  notes: z.string().optional(),
});

export type LocationFormData = z.infer<typeof locationSchema>;

export const LocationFormDialog = ({visible, onHide, initialLocation, onSave}: LocationFormDialogProps) => {
  const { control, handleSubmit, reset, formState: { errors }, } = useForm<LocationFormData>({
    resolver: zodResolver(locationSchema),
    defaultValues: initialLocation || {
      name: "",
      address: "",
      city: "",
      country: "",
      timezone: "",
      notes: "",
    },
  });

  const onSubmit = (data: LocationFormData) => {
    onSave(data);
    onHide();
  };

  useEffect(() => {
    reset(initialLocation || {
      name: "",
      address: "",
      city: "",
      country: "",
      timezone: "",
      notes: "",
    });
  }, [initialLocation, visible, reset]);

  const timezones = [
    { label: "Pacific/US", value: "Pacific/US" },
    { label: "Mountain/US", value: "Mountain/US" },
    { label: "Central/US", value: "Central/US" },
    { label: "Eastern/US", value: "Eastern/US" },
    { label: "Rio/Brazil", value: "Rio/Brazil" },
    { label: "UTC", value: "UTC" },
    { label: "London/UK", value: "London/UK" },
    { label: "Berlin/Germany", value: "Berlin/Germany" },
    { label: "Moscow/Russia", value: "Moscow/Russia" },
    { label: "Dubai/UAE", value: "Dubai/UAE" },
    { label: "Mumbai/India", value: "Mumbai/India" },
    { label: "Singapore/Singapore", value: "Singapore/Singapore" },
    { label: "Beijing/China", value: "Beijing/China" },
    { label: "China time/China", value: "China_time/China" },
    { label: "Tokyo/Japan", value: "Tokyo/Japan" },
    { label: "Sydney/Australia", value: "Sydney/Australia" },
    { label: "Auckland/NZ", value: "Auckland/NZ" },
  ];

  const footer = (
    <div className="flex justify-end gap-2 mt-2">
      <Button
        label="Cancel"
        icon="pi pi-times"
        onClick={() => {
          reset(initialLocation || { name: "", address: "", city: "", country: "", timezone: "", notes: "" });
          onHide();
        }}
        severity="danger"
      />
      <Button label="Save" icon="pi pi-check" onClick={handleSubmit(onSubmit)} />
    </div>
  );

  return (
    <Dialog
      header={initialLocation ? "Edit Location" : "New Location"}
      visible={visible}
      onHide={onHide}
      style={{ width: "50vw" }}
      footer={footer}
      modal
    >
      <form className="flex flex-col gap-4" role="form" aria-label="Location form">
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-semibold">Name</label>
                <InputText
                  {...field}
                  id="name"
                  type="text"
                  placeholder="Location name"
                  invalid={!!errors.name}
                />
              </div>
              {errors.name && <small className="text-red-500">{errors.name.message}</small>}
            </div>
          )}
        />

        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Address</label>
                <InputText
                  {...field}
                  id="address"
                  type="text"
                  placeholder="Address"
                  invalid={!!errors.address}
                />
              </div>
              {errors.address && <small className="text-red-500">{errors.address.message}</small>}
            </div>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">City</label>
                  <InputText
                    {...field}
                    id="city"
                    type="text"
                    placeholder="City"
                    invalid={!!errors.city}
                  />
                </div>
                {errors.city && <small className="text-red-500">{errors.city.message}</small>}
              </div>
            )}
          />
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold">Country</label>
                  <InputText
                    {...field}
                    id="coutry"
                    type="text"
                    placeholder="Country"
                    invalid={!!errors.country}
                  />
                </div>
                {errors.country && <small className="text-red-500">{errors.country.message}</small>}
              </div>
            )}
          />
        </div>

        <Controller
          name="timezone"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-0.5">
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Timezone</label>
                <Dropdown
                  id="timezone"
                  placeholder="Select timezone"
                  options={timezones}
                  value={field.value}
                  onChange={(e) => field.onChange(e.value)}
                />
              </div>
              {errors.timezone && <small className="text-red-500">{errors.timezone.message}</small>}
            </div>
          )}
        />

        <Controller
          name="notes"
          control={control}
          render={({ field }) => (
            <div className="flex flex-col gap-2">
              <label className="font-semibold">Notes</label>
              <InputTextarea
                id="notes"
                placeholder="Notes..."
                rows={4}
                autoResize={false}
                {...field}
              />
            </div>
          )}
        />
      </form>
    </Dialog>
  );
};