
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Heart, Users, Calendar, Book } from "lucide-react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import AdventistNav from "@/components/AdventistNav";

const Features = [
  {
    icon: Users,
    title: "Community",
    description: "Connect with fellow believers worldwide",
  },
  {
    icon: Heart,
    title: "Spiritual Growth",
    description: "Access resources for your spiritual journey",
  },
  {
    icon: Calendar,
    title: "Events",
    description: "Stay updated with church events and activities",
  },
  {
    icon: Book,
    title: "Bible Study",
    description: "Engage in interactive Bible studies",
  },
];

const Index = () => {
  const [mounted, setMounted] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    setIsAuthenticated(!!session);
  };

  return (
    <div className="min-h-screen flex flex-col items-center">
      <AdventistNav />

      <main className="mt-32 w-full px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-balance">
              Connect, Grow, Share
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join a vibrant community of believers dedicated to spiritual growth
              and fellowship
            </p>
            <Link to="/main">
              <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105 inline-flex items-center gap-2">
                Connect
                <ChevronRight className="h-5 w-5" />
              </button>
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {Features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: mounted ? 1 : 0, y: mounted ? 0 : 20 }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                className="glass-card"
              >
                <feature.icon className="h-10 w-10 text-secondary mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
