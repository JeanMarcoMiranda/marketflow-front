import { useState } from "react";
import { Branch } from "@/api/types/response.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Box,
  Clock,
  Edit,
  Eye,
  Phone,
  Store,
  MapPin,
  Calendar,
  Activity
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BusinessBranchCardProps {
  branch: Branch;
  viewMode?: 'grid' | 'list';
}

const BusinessBranchCard = ({ branch, viewMode = 'grid' }: BusinessBranchCardProps) => {
  const [imageError, setImageError] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getOperatingHours = () => {
    if (!branch.operating_hours) return 'Hours not set';
    // Assuming operating_hours has day properties
    return branch.operating_hours.monday || 'Hours not set';
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        <Card className="hover:shadow-md transition-all duration-200 border-slate-200/60 hover:border-slate-300">
          <CardContent className="p-6">
            <div className="flex items-center gap-6">
              {/* Image/Icon */}
              <div className="flex-shrink-0">
                {branch.image_url && !imageError ? (
                  <img
                    src={branch.image_url}
                    alt={`${branch.name} image`}
                    className="h-16 w-16 rounded-lg object-cover ring-2 ring-slate-200"
                    onError={() => setImageError(true)}
                  />
                ) : (
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center ring-2 ring-slate-200">
                    <Store className="h-8 w-8 text-slate-600" />
                  </div>
                )}
              </div>

              {/* Main Info */}
              <div className="flex-grow space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900">{branch.name}</h3>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <MapPin className="h-3 w-3" />
                      <span>{branch.address}, {branch.city}</span>
                    </div>
                  </div>
                  <Badge
                    variant={branch.status === 'active' ? 'default' : 'secondary'}
                    className="flex items-center gap-1"
                  >
                    <Activity className="h-3 w-3" />
                    {branch.status}
                  </Badge>
                </div>

                <div className="flex items-center gap-6 text-sm text-slate-600">
                  {branch.contact_number && (
                    <div className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      <span>{branch.contact_number}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <Box className="h-3 w-3" />
                    <span>Capacity: {branch.inventory_capacity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>{getOperatingHours()}</span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 400 }}
      className="h-full"
    >
      <Card className="hover:shadow-xl transition-all duration-300 h-full border-slate-200/60 hover:border-slate-300 group overflow-hidden">
        {/* Image Section */}
        <div className="relative overflow-hidden">
          {branch.image_url && !imageError ? (
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              src={branch.image_url}
              alt={`${branch.name} image`}
              className="w-full h-48 object-cover"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center group-hover:from-blue-100 group-hover:via-purple-100 group-hover:to-pink-100 transition-colors duration-300">
              <Store className="h-16 w-16 text-slate-400 group-hover:text-slate-500 transition-colors" />
            </div>
          )}

          {/* Status Badge */}
          <Badge
            className={cn(
              "absolute top-3 right-3 shadow-sm",
              branch.status === 'active'
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-gray-500 hover:bg-gray-600'
            )}
          >
            <Activity className="h-3 w-3 mr-1" />
            {branch.status}
          </Badge>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl group-hover:text-blue-600 transition-colors">
              {branch.name}
            </CardTitle>
            <CardDescription className="flex items-start gap-1 text-sm">
              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span className="line-clamp-2">{branch.address}, {branch.city}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3 flex-grow">
            <div className="space-y-2">
              {branch.contact_number && (
                <div className="flex items-center text-sm text-slate-600">
                  <Phone className="mr-2 h-4 w-4 text-slate-400" />
                  <span>{branch.contact_number}</span>
                </div>
              )}

              <div className="flex items-center text-sm text-slate-600">
                <Box className="mr-2 h-4 w-4 text-slate-400" />
                <span>Capacity: {branch.inventory_capacity || 'Not set'}</span>
              </div>

              <div className="flex items-center text-sm text-slate-600">
                <Clock className="mr-2 h-4 w-4 text-slate-400" />
                <span className="truncate">{getOperatingHours()}</span>
              </div>

              {branch.created_at && (
                <div className="flex items-center text-sm text-slate-500">
                  <Calendar className="mr-2 h-4 w-4 text-slate-400" />
                  <span>Created {formatDate(branch.created_at)}</span>
                </div>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex justify-between pt-4 border-t border-slate-100">
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-slate-50 hover:border-slate-300 transition-colors"
            >
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-colors"
            >
              <Eye className="mr-2 h-4 w-4" />
              View
            </Button>
          </CardFooter>
        </div>
      </Card>
    </motion.div>
  );
};

export default BusinessBranchCard;