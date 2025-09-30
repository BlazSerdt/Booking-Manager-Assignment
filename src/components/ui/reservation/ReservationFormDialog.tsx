import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Divider } from "primereact/divider";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {useEffect} from "react";
import type { ReservationFormDialogProps } from "../../../types";
import {Dropdown} from "primereact/dropdown";

const reservationSchema = z.object({
  guestName: z.string().min(1, "Guest name is required"),
  guestPhone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9-]+$/, "Invalid format (e.g. 111-222-333)"),
  guestEmail: z.email("Invalid email address"),
  checkIn: z.date().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, {
    message: "Check-in cannot be a past date",
  }),
  checkOut: z.date().refine((date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date >= today;
  }, {
    message: "Check-out cannot be a past date",
  }),
  status: z
    .enum(["Booked", "Checked in", "Checked out", "Cancelled"])
    .optional(),
})
  .refine((data) => data.checkOut > data.checkIn, {
    message: "Check-out must be after check-in",
    path: ["checkOut"],
  });

export type ReservationFormData = z.infer<typeof reservationSchema>;

export const ReservationFormDialog = ({ visible, onHide, initialReservation, onSave }: ReservationFormDialogProps) => {
  const { control, handleSubmit, reset, formState: { errors }, } = useForm<ReservationFormData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: initialReservation || {
      guestName: "",
      guestPhone: "",
      guestEmail: "",
      checkIn: new Date(),
      checkOut: new Date(),
      status: "Booked",
    },
  })

  const onSubmit = (data: ReservationFormData) => {
    onSave(data);
    onHide();
  };

  useEffect(() => {
    reset(initialReservation || {
      guestName: "",
      guestPhone: "",
      guestEmail: "",
      checkIn: new Date(),
      checkOut: new Date(),
      status: "Booked",
    });
  }, [initialReservation, visible, reset]);

  const statusOptions = [
    { label: "Booked", value: "Booked" },
    { label: "Checked in", value: "Checked in" },
    { label: "Checked out", value: "Checked out" },
    { label: "Cancelled", value: "Cancelled" },
  ];

  const footer = (
    <div className="flex justify-end gap-2 mt-2">
      <Button
        label="Cancel"
        icon="pi pi-times"
        severity="danger"
        onClick={() => {
          reset(initialReservation || { guestName: "", guestPhone: "", guestEmail: "", checkIn: new Date(), checkOut: new Date(), });
          onHide();
        }}
      />
      <Button label="Save" icon="pi pi-check" onClick={handleSubmit(onSubmit)} />
    </div>
  );

  return (
    <Dialog
      header={initialReservation ? "Edit reservation" : "Create reservation"}
      footer={footer}
      visible={visible}
      onHide={onHide}
    >
      <form className="flex flex-col" role="form" aria-label="Reservation form">
        <Divider align="left">
          <div className="flex items-center">
            <i className="pi pi-user mr-2"></i>
            <p>Guest information</p>
          </div>
        </Divider>

        <div className="flex flex-col gap-2 mb-6">
          <div className="flex items-center gap-4">
            <Controller
              name="guestName"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-0.5 w-full">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guestName" className="font-semibold">Name</label>
                    <InputText
                      {...field}
                      id="guestName"
                      type="text"
                      placeholder="Guest name"
                      invalid={!!errors.guestName}
                    />
                  </div>
                  {errors.guestName
                    ? <small className="text-red-500">{errors.guestName.message}</small>
                    : <small className="invisible">No error</small>}
                </div>
              )}
            />
            <Controller
              name="guestPhone"
              control={control}
              render={({ field }) => (
                <div className="flex flex-col gap-0.5 w-full">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="guestPhone" className="font-semibold">Phone number</label>
                    <InputText
                      {...field}
                      id="guestPhone"
                      type="text"
                      placeholder="Guest phone"
                      invalid={!!errors.guestPhone}
                    />
                  </div>
                  {errors.guestPhone
                    ? <small className="text-red-500">{errors.guestPhone.message}</small>
                    : <small className="invisible">No error</small>}
                </div>
              )}
            />
          </div>
          <Controller
            name="guestEmail"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="guestEmail" className="font-semibold">Email</label>
                  <InputText
                    {...field}
                    id="guestEmail"
                    type="email"
                    placeholder="Guest email"
                    invalid={!!errors.guestEmail}
                  />
                </div>
                {errors.guestEmail && <small className="text-red-500">{errors.guestEmail.message}</small>}
              </div>
            )}
          />
        </div>

        <Divider align="left">
          <div className="flex items-center">
            <i className="pi pi-calendar mr-2"></i>
            <p>Reservation information</p>
          </div>
        </Divider>

        <div className="flex gap-4 mb-6">
          <Controller
            name="checkIn"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="checkIn" className="font-semibold">Check in</label>
                  <Calendar
                    {...field}
                    id="checkIn"
                    showIcon
                    placeholder="Check in"
                    dateFormat="dd/mm/yy"
                    minDate={new Date()}
                    invalid={!!errors.checkIn}
                  />
                </div>
                {errors.checkIn && <small className="text-red-500">{errors.checkIn.message}</small>}
              </div>
            )}
          />
          <Controller
            name="checkOut"
            control={control}
            render={({ field }) => (
              <div className="flex flex-col gap-0.5">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="checkOut" className="font-semibold">Check out</label>
                  <Calendar
                    {...field}
                    id="checkOut"
                    showIcon
                    placeholder="Check out"
                    dateFormat="dd/mm/yy"
                    minDate={new Date()}
                    invalid={!!errors.checkOut}
                  />
                </div>
                {errors.checkOut && <small className="text-red-500">{errors.checkOut.message}</small>}
              </div>
            )}
          />
        </div>

        {initialReservation && (
          <div className="flex flex-col gap-2 mb-4">
            <label className="font-semibold">Status</label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Dropdown
                  {...field}
                  options={statusOptions}
                  placeholder="Select status"
                />
              )}
            />
          </div>
        )}
      </form>
    </Dialog>
  );
}