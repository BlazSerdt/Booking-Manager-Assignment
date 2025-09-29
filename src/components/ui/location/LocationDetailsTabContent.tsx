import type {LocationDetailsTabContentProps} from "../../../types";

export const LocationDetailsTabContent = ({name, address, city, country, timezone } : LocationDetailsTabContentProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      <div className="flex items-start gap-3">
        <i className="pi pi-home text-purple-500" style={{ fontSize: '1.25rem' }}></i>
        <div>
          <h3 className="mb-1 uppercase text-sm font-semibold">Name</h3>
          <p className="text-lg">{name}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <i className="pi pi-map-marker text-red-500" style={{ fontSize: '1.25rem' }}></i>
        <div>
          <h3 className="mb-1 uppercase text-sm font-semibold">Address</h3>
          <p className="text-lg">{address}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <i className="pi pi-building text-green-500" style={{ fontSize: '1.25rem' }}></i>
        <div>
          <h3 className="mb-1 uppercase text-sm font-semibold">City</h3>
          <p className="text-lg">{city}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <i className="pi pi-globe text-blue-500" style={{ fontSize: '1.25rem' }}></i>
        <div>
          <h3 className="mb-1 uppercase text-sm font-semibold">Country</h3>
          <p className="text-lg">{country}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <i className="pi pi-clock text-orange-500" style={{ fontSize: '1.25rem' }}></i>
        <div>
          <h3 className="mb-1 uppercase text-sm font-semibold">Timezone</h3>
          <p className="text-lg">{timezone}</p>
        </div>
      </div>
    </div>
  );
}