
import { Link } from "react-router-dom";
import AdventistNav from "@/components/AdventistNav";

const NotFound = () => {
  return (
    <div className="min-h-screen">
      <AdventistNav />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="mb-8">The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
