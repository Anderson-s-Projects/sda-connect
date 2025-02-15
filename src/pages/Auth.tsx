import AdventistNav from "@/components/AdventistNav";
import { useState } from "react";
import { Link } from "react-router-dom";

const Auth = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="min-h-screen">
      <AdventistNav />
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-4xl font-bold mb-4">Authentication</h1>
        <p className="mb-8">Please log in to continue.</p>
        <Link
          to="/main"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Log In
        </Link>
      </div>
    </div>
  );
};

export default Auth;
