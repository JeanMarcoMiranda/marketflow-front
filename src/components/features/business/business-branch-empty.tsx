import { Button } from "@/components/ui/button";
import { Plus, Store, MapPin, Building } from "lucide-react";
import { motion } from "framer-motion";

const BusinessBranchEmpty = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center py-16 space-y-6"
    >
      {/* Animated Icon */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="relative"
      >
        {/* Background circles */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse" />
        <div className="absolute inset-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-full blur-lg animate-pulse" />

        {/* Main icon container */}
        <div className="relative h-24 w-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
          <Store className="h-12 w-12 text-white" />

          {/* Floating mini icons */}
          <motion.div
            animate={{
              y: [-2, 2, -2],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute -top-2 -right-2 h-6 w-6 bg-green-500 rounded-full flex items-center justify-center shadow-md"
          >
            <Plus className="h-3 w-3 text-white" />
          </motion.div>

          <motion.div
            animate={{
              y: [2, -2, 2],
              rotate: [0, -5, 5, 0]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
            className="absolute -bottom-1 -left-2 h-5 w-5 bg-orange-500 rounded-full flex items-center justify-center shadow-md"
          >
            <MapPin className="h-2.5 w-2.5 text-white" />
          </motion.div>
        </div>
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-3 max-w-md"
      >
        <h3 className="text-2xl font-bold text-slate-900">
          No Locations Yet
        </h3>
        <p className="text-slate-600 leading-relaxed">
          Start expanding your business presence by adding your first location.
          You can manage inventory, track performance, and serve customers from multiple branches.
        </p>
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="flex flex-col sm:flex-row gap-3"
      >
        <Button
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Your First Location
        </Button>

        <Button
          variant="outline"
          className="hover:bg-slate-50 border-slate-300 hover:border-slate-400 transition-colors px-6"
        >
          <Building className="mr-2 h-4 w-4" />
          Learn More
        </Button>
      </motion.div>

      {/* Feature highlights */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8 pt-8 border-t border-slate-200 max-w-2xl"
      >
        {[
          { icon: Store, title: "Multiple Locations", desc: "Manage all branches from one place" },
          { icon: MapPin, title: "Location Tracking", desc: "GPS coordinates and mapping" },
          { icon: Building, title: "Inventory Control", desc: "Track stock across locations" }
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 + index * 0.1 }}
            className="text-center space-y-2"
          >
            <div className="h-10 w-10 mx-auto bg-slate-100 rounded-lg flex items-center justify-center">
              <feature.icon className="h-5 w-5 text-slate-600" />
            </div>
            <h4 className="font-medium text-slate-900 text-sm">{feature.title}</h4>
            <p className="text-xs text-slate-600">{feature.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default BusinessBranchEmpty;