import { AppLayout } from "../../../components/layouts/app-layout.tsx";
import { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { SearchBar } from "../../../components/ui/SearchBar.tsx";

interface Location {
  name: string;
  address: string;
  city: string;
  country: string;
  timezone: string;
}

const LocationsPage = () => {
  const [locations] = useState<Location[]>([
    {
      name: "Apartment",
      address: "Stara ulica 1",
      city: "Murska Sobota",
      country: "Slovenia",
      timezone: "Europe/Ljubljana",
    },

  ]);
  const [globalFilter, setGlobalFilter] = useState(null);

  const actionTemplate = () => (
    <div className="flex gap-2 items-center justify-center">
      <Button icon="pi pi-pencil" rounded severity="warning" />
      <Button icon="pi pi-trash" rounded severity="danger" />
      <Button icon="pi pi-qrcode" rounded />
    </div>
  );

  const tableHeader = (
    <div className="flex justify-between items-center w-full">
      <div className="flex gap-6 items-center justify-center">
        <h3 className="text-lg font-semibold">Manage Locations</h3>
        <Button icon="pi pi-plus-circle" label="New" severity="success" />
      </div>
      <SearchBar onInput={(e) => setGlobalFilter(e.target.value)} />
    </div>
  );

  return (
    <AppLayout>
      <div className="w-full">
          <DataTable
            value={locations}
            header={tableHeader}
            globalFilter={globalFilter}
            paginator
            rows={7}
            removableSort
            tableStyle={{ minWidth: "75rem" }}
            className="rounded-lg overflow-hidden"
          >
            <Column field="name" header="Name" sortable style={{ width: '16%' }} />
            <Column field="address" header="Address" style={{ width: '16%' }} />
            <Column field="city" header="City" sortable style={{ width: '16%' }} />
            <Column field="country" header="Country" sortable style={{ width: '16%' }} />
            <Column field="timezone" header="Timezone" style={{ width: '16%' }} />
            <Column header="Actions" body={actionTemplate} alignHeader="center" align="center"/>
          </DataTable>
      </div>
    </AppLayout>
  );
}

export default LocationsPage;