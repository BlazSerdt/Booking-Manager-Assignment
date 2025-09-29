import { Skeleton } from "primereact/skeleton";
import { Divider } from "primereact/divider";

export const LocationDetailsTabSkeleton = () => {
  return (
    <div className="bg-white shadow-md rounded-xl overflow-hidden">
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
  );
};