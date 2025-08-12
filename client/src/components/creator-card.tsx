import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Users, Zap } from "lucide-react";
import type { Creator } from "@shared/schema";

interface CreatorCardProps {
  creator: Creator;
  onMessage: () => void;
  isCurrentUser?: boolean;
}

export default function CreatorCard({ creator, onMessage, isCurrentUser }: CreatorCardProps) {
  if (isCurrentUser) return null;

  const formatFollowerCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  return (
    <Card className="bg-white card-hover border-0 shadow-sm" data-testid={`card-creator-${creator.id}`}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src={creator.profileImage || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100`}
              alt={`${creator.name} profile`}
              className="w-16 h-16 rounded-full object-cover"
              data-testid={`img-avatar-${creator.id}`}
            />
            <div>
              <h3 className="text-xl font-semibold text-mm-neutral-800" data-testid={`text-name-${creator.id}`}>
                {creator.name}
              </h3>
              <p className="text-gray-600 font-medium" data-testid={`text-username-${creator.id}`}>
                {creator.username || creator.name}
              </p>
              <div className="flex items-center space-x-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {creator.niche}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {creator.platform}
                </Badge>
                <div className="flex items-center space-x-1 text-gray-500">
                  <Users className="w-3 h-3" />
                  <span className="text-xs" data-testid={`text-followers-${creator.id}`}>
                    {formatFollowerCount(creator.audienceSize)} Followers
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            {creator.isActive && (
              <div className="flex items-center space-x-1 text-mm-mint">
                <Zap className="w-4 h-4" />
                <span className="text-xs font-medium">Active</span>
              </div>
            )}
            <Button 
              className="bg-mm-primary/10 text-mm-primary border border-mm-primary hover:bg-mm-primary hover:text-white transition-colors"
              onClick={onMessage}
              data-testid={`button-message-${creator.id}`}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Message
            </Button>
          </div>
        </div>
        
        {creator.bio && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <p className="text-sm text-gray-600" data-testid={`text-bio-${creator.id}`}>
              {creator.bio}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
