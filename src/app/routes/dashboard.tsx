import { AppLayout } from "../../components/layouts/app-layout.tsx";
import { StatCard } from "../../components/ui/dashboard/StatCard.tsx";
import { useEffect, useState } from "react";
import { useAuth } from "../../components/auth/auth.tsx";
import type { Reservation } from "../../types";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";
import {Card} from "primereact/card";
import {Divider} from "primereact/divider";

const DashboardPage = () => {
  const { user } = useAuth();
  const tenantId = user?.id;

  const [stats, setStats] = useState({
    totalLocations: 0,
    totalReservations: 0,
    bookedReservations: 0,
    cancelledReservations: 0,
  });

  const [locations, setLocations] = useState<Location[]>([]);
  const [reservations, setReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    if (!tenantId) return;

    const fetchData = async () => {
      try {
        const locResponse = await fetch(`/api/locations?tenantId=${tenantId}`);
        if (!locResponse.ok)
          throw new Error("Failed to fetch locations");

        const locData = await locResponse.json() as Location[];

        const resResponse = await fetch(`/api/reservations/all?tenantId=${tenantId}`);
        if (!resResponse.ok)
          throw new Error("Failed to fetch reservations");

        const resData = await resResponse.json() as Reservation[];

        const totalLocations = locData.length;
        const totalReservations = resData.length;
        const bookedReservations = resData.filter(res => res.status === "Booked").length;
        const cancelledReservations = resData.filter(res => res.status === "Cancelled").length;

        setStats({
          totalLocations,
          totalReservations,
          bookedReservations,
          cancelledReservations,
        });
        setLocations(locData);
        setReservations(resData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [tenantId]);

  const recentReservations = [...reservations].reverse().slice(0, 5);
  const recentLocations = [...locations].reverse().slice(0, 5);

  const emptyResMessage = (
    <div className="flex justify-center items-center h-12">
      No reservations available
    </div>
  );

  const emptyLocMessage = (
    <div className="flex justify-center items-center h-12">
      No locations available
    </div>
  );

  return (
    <AppLayout>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard title={user?.role === "super_admin" ? "All locations" : "Total locations"} value={stats.totalLocations} icon="pi pi-map-marker" iconColor="text-purple-500" iconBg="bg-purple-100" />
          <StatCard title={user?.role === "super_admin" ? "All reservations" : "Total reservations"} value={stats.totalReservations} icon="pi pi-calendar" iconColor="text-orange-500" iconBg="bg-orange-100" />
          <StatCard title="Booked reservations" value={stats.bookedReservations} icon="pi pi-check-circle" iconColor="text-green-500" iconBg="bg-green-100" />
          <StatCard title="Cancelled reservations" value={stats.cancelledReservations} icon="pi pi-times-circle" iconColor="text-red-500" iconBg="bg-red-100" />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card title="Recent reservations">
            <DataTable value={recentReservations} emptyMessage={emptyResMessage}>
              <Column field="guestName" header="Guest Name" />
              <Column
                field="checkIn"
                header="Check-In"
                body={(res) => {
                  const date = new Date(res.checkIn);
                  return date.toLocaleDateString('en-GB');
                }}
              />
              <Column
                field="checkOut"
                header="Check-Out"
                body={(res) => {
                  const date = new Date(res.checkOut);
                  return date.toLocaleDateString('en-GB');
                }}
              />
              <Column field="status" header="Status" />
            </DataTable>
          </Card>

          <Card title="Recent locations" >
            <DataTable value={recentLocations} emptyMessage={emptyLocMessage}>
              <Column field="name" header="Name" />
              <Column field="city" header="City" />
              <Column field="country" header="Country" />
              <Column
                header="Reservations"
                body={(loc) => reservations.filter(res => res.locationId === loc.id).length}
              />
            </DataTable>
          </Card>
        </div>

        <Card title="How it works">
          <div className="flex justify-between px-2">
            <div className="text-center max-w-[25%]">
              <h3 className="text-lg mb-2 font-semibold">Dashboard</h3>
              <p>
                Get an overview of your recent locations and reservations, and some important stats.
              </p>
            </div>

            <Divider layout="vertical" className="align-middle">
              <i className="pi pi-arrow-circle-right"></i>
            </Divider>

            <div className="text-center max-w-[25%]">
              <h3 className="text-lg mb-2 font-semibold">Locations</h3>
              <p>
                View all your locations, create new ones, or edit existing properties. Clicking on a location opens the details page.
              </p>
            </div>

            <Divider layout="vertical" className="align-middle">
              <i className="pi pi-arrow-circle-right"></i>
            </Divider>

            <div className="text-center max-w-[25%]">
              <h3 className="text-lg mb-2 font-semibold">Reservations</h3>
              <p>
                Manage reservations for each location. Check upcoming check-ins, see guest details, and track booking statuses.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
