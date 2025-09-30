import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { AppLayout } from "../../../components/layouts/app-layout.tsx";
import type { Location } from "../../../types";
import { Divider } from "primereact/divider";
import { LocationDetailsTabContent } from "../../../components/ui/location/LocationDetailsTabContent.tsx";
import { LocationDetailsTabSkeleton } from "../../../components/ui/location/LocationDetailsTabSkeleton.tsx";
import { QRTab } from "../../../components/ui/location/QRTab.tsx";
import {ReservationTable} from "../../../components/ui/reservation/ReservationTable.tsx";

const LocationDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [location, setLocation] = useState<Location | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch(`/api/locations/${id}`);

        if (!response.ok)
          throw new Error("Failed to fetch location");

        const data: Location = await response.json();
        setLocation(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLocation();
  }, [id]);

  return (
    <AppLayout>
      {location ? (
        <div className="w-full flex justify-center">
          <div className="w-full bg-white shadow-md rounded-xl overflow-hidden">
            <div className="px-8 mt-4">
              <h2 className="text-xl font-semibold">{location.name}</h2>
              <Divider />
            </div>

            <div className="px-8">
              <TabView>
                <TabPanel header="Details" leftIcon="pi pi-info-circle mr-3">
                  <div className="p-6">
                    <LocationDetailsTabContent name={location.name} address={location.address} city={location.city} country={location.country} timezone={location.timezone} notes={location.notes} />
                  </div>
                </TabPanel>

                <TabPanel header="Reservations" leftIcon="pi pi-calendar mr-3">
                  <ReservationTable locationId={location.id}/>
                </TabPanel>

                <TabPanel header="QR Code" leftIcon="pi pi-qrcode mr-3">
                  <QRTab qrCodeValue={location.qrCodeValue} locationName={location.name}/>
                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      ) : (
        <LocationDetailsTabSkeleton />
      )}
    </AppLayout>
  );
};

export default LocationDetailsPage;
