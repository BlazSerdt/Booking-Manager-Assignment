import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Card className="p-4 max-w-md text-center">
        <div className="flex flex-col items-center justify-center mb-4">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <h2 className="text-xl font-semibold mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-6">
            Sorry, the page you are looking for doesn’t exist.
          </p>
        </div>
        <Button
          label="Go Back"
          icon="pi pi-arrow-left"
          onClick={() => navigate("/app/dashboard")}
        />
      </Card>
    </div>
  );
};

export default NotFoundPage;