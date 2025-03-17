import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BookOpen, 
  Users, 
  MessageSquare
} from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: "currency" | "bookings" | "users" | "messages" | "views" | "orders";
  trend?: number;
}

const StatsCard = ({ title, value, description, icon, trend }: StatsCardProps) => {
  // Determine if trend is positive, negative, or neutral
  const isTrendPositive = trend && trend > 0;
  const isTrendNegative = trend && trend < 0;
  
  // Choose icon based on prop
  const getIcon = () => {
    switch (icon) {
      case "currency":
        return <DollarSign className="h-5 w-5" />;
      case "bookings":
        return <BookOpen className="h-5 w-5" />;
      case "users":
        return <Users className="h-5 w-5" />;
      case "messages":
        return <MessageSquare className="h-5 w-5" />;
      case "views":
        return <Users className="h-5 w-5" />;
      case "orders":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <DollarSign className="h-5 w-5" />;
    }
  };

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h3 className="text-2xl font-bold mt-1">{value}</h3>
            <p className="text-sm text-gray-500 mt-1">{description}</p>
          </div>
          <div className={cn(
            "w-10 h-10 rounded-full flex items-center justify-center",
            icon === "currency" ? "bg-blue-100 text-blue-600" : "",
            icon === "bookings" ? "bg-purple-100 text-purple-600" : "",
            icon === "users" ? "bg-green-100 text-green-600" : "",
            icon === "messages" ? "bg-yellow-100 text-yellow-600" : "",
            icon === "views" ? "bg-indigo-100 text-indigo-600" : "",
            icon === "orders" ? "bg-pink-100 text-pink-600" : "",
          )}>
            {getIcon()}
          </div>
        </div>
        
        {trend !== undefined && (
          <div className="mt-4 flex items-center">
            {isTrendPositive ? (
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
            ) : isTrendNegative ? (
              <TrendingDown className="h-4 w-4 text-red-500 mr-1" />
            ) : null}
            
            <span className={cn(
              "text-sm font-medium",
              isTrendPositive ? "text-green-600" : "",
              isTrendNegative ? "text-red-600" : "",
              !isTrendPositive && !isTrendNegative ? "text-gray-500" : ""
            )}>
              {isTrendPositive ? '+' : ''}{trend}% from last month
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
