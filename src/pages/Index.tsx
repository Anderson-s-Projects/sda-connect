
import { useState, useEffect } from "react";
import { ChevronRight, Heart, Users, Calendar, Book } from "lucide-react";
import { motion } from "framer-motion";

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

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center">
      <nav className="w-full glass fixed top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">SDA Connect</h1>
          <div className="flex gap-4">
            <button className="px-4 py-2 rounded-full text-primary hover:bg-white/50 transition-colors">
              Sign In
            </button>
            <button className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </nav>

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
            <button className="px-8 py-4 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all transform hover:scale-105 inline-flex items-center gap-2">
              Get Started
              <ChevronRight className="h-5 w-5" />
            </button>
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
