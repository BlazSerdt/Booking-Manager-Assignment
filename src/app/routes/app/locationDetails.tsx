import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { TabView, TabPanel } from "primereact/tabview";
import { AppLayout } from "../../../components/layouts/app-layout";
import type { Location } from "../../../types";
import { Divider } from "primereact/divider";
import { LocationDetailsTabContent } from "../../../components/ui/location/LocationDetailsTabContent.tsx";
import {Skeleton} from "primereact/skeleton";

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
              <h2 className="text-xl font-semibold">{location?.name}</h2>
              <Divider />
            </div>

            <div className="px-8">
              <TabView>
                <TabPanel header="Details" leftIcon="pi pi-info-circle mr-3">
                  <div className="p-6">
                    <LocationDetailsTabContent name={location?.name} address={location?.address} city={location?.city} country={location?.country} timezone={location?.timezone} />
                  </div>
                </TabPanel>
                <TabPanel header="Reservations" leftIcon="pi pi-calendar mr-3">

                </TabPanel>
                <TabPanel header="QR Code" leftIcon="pi pi-qrcode mr-3">

                </TabPanel>
              </TabView>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <div className="w-full bg-white shadow-md rounded-xl overflow-hidden">
            <div className="px-8 mt-4">
              <Skeleton width="12rem" height="2rem" className="mb-2" />
              <Divider />
            </div>

            <div className="px-8 p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-start gap-3">
                  <Skeleton shape="circle" size="2rem" className="mt-2" />
                  <div>
                    <Skeleton width="6rem" height="1rem" className="mb-2" />
                    <Skeleton width="10rem" height="1.5rem" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}


    </AppLayout>
  );
};

export default LocationDetailsPage;
