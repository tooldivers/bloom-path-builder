import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Filter, Send, MessageCircle } from "lucide-react";
import CreatorCard from "@/components/creator-card";
import { useWebSocket } from "@/hooks/use-websocket";
import type { Creator, Match, Message } from "@shared/schema";

export default function DashboardPage() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const [selectedCreator, setSelectedCreator] = useState<Creator | null>(null);
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  
  const currentCreatorId = localStorage.getItem("currentCreatorId");
  
  const { data: currentCreator } = useQuery<Creator>({
    queryKey: ["/api/creators", currentCreatorId],
    enabled: !!currentCreatorId,
  });

  const { data: matches = [] } = useQuery<(Match & { creator: Creator })[]>({
    queryKey: ["/api/creators", currentCreatorId, "matches"],
    enabled: !!currentCreatorId,
  });

  const { data: allCreators = [] } = useQuery<Creator[]>({
    queryKey: ["/api/creators"],
  });

  const handleWebSocketMessage = useCallback((message: any) => {
    if (message.type === "message") {
      setMessages(prev => [...prev, message.message]);
    }
  }, []);

  const { sendMessage, isConnected } = useWebSocket(currentCreatorId || "", handleWebSocketMessage);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedCreator || !currentCreatorId) return;
    
    sendMessage({
      type: "message",
      senderId: currentCreatorId,
      recipientId: selectedCreator.id,
      content: messageInput,
    });
    
    setMessageInput("");
  };

  const featuredCreators = allCreators.slice(0, 3);

  return (
    <div className="min-h-screen bg-mm-neutral-50">
      {/* Welcome Modal */}
      <Dialog open={showWelcomeModal} onOpenChange={setShowWelcomeModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-mm-neutral-800">
              Welcome to MentionMates!
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-gray-600 mb-6">
              Your personalized dashboard is ready! Browse curated collaboration opportunities, send partnership requests, and start building meaningful creator relationships that drive real growth.
            </p>
            <Button 
              className="w-full btn-primary"
              onClick={() => setShowWelcomeModal(false)}
              data-testid="button-got-it"
            >
              Got It
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dashboard Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-mm-neutral-800">
                Your Creator Network Hub
              </h1>
              <p className="text-gray-600">Discover perfect collaboration partners matched to your niche and audience</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="bg-mm-neutral-100 text-gray-700 hover:bg-gray-200">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              {currentCreator && (
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-mm-primary rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {currentCreator.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{currentCreator.name}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* CTA Button */}
          <div className="mt-6">
            <Button 
              size="lg"
              className="btn-primary px-8 py-4 w-full md:w-auto"
              data-testid="button-send-invite"
            >
              Start Your First Partnership
            </Button>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      {currentCreatorId && (
        <div className="bg-mm-neutral-100 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-mm-mint' : 'bg-gray-400'}`} />
              <span className="text-sm text-gray-600">
                {isConnected ? 'Connected to real-time messaging' : 'Connecting...'}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Active Creators Notice */}
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
            <p className="text-mm-primary font-medium">
              4 of your matches are looking for a collab this week — don't miss your shot
            </p>
          </div>
        </div>

        {/* Creators List */}
        <div className="space-y-4">
          {featuredCreators.map((creator) => (
            <CreatorCard
              key={creator.id}
              creator={creator}
              onMessage={() => setSelectedCreator(creator)}
              isCurrentUser={creator.id === currentCreatorId}
            />
          ))}
          
          {featuredCreators.length === 0 && (
            <Card>
              <CardContent className="p-8 text-center">
                <p className="text-gray-500">No creators found. Check back soon for new matches!</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Load More */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500 mb-4">3 — 7 more matches available</p>
          <Button variant="outline" data-testid="button-load-more">
            Load More Creators
          </Button>
        </div>
      </div>

      {/* Messaging Modal */}
      <Dialog open={!!selectedCreator} onOpenChange={() => setSelectedCreator(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-3">
              {selectedCreator && (
                <>
                  <img 
                    src={selectedCreator.profileImage || `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=40&h=40`}
                    alt={selectedCreator.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <span>Message {selectedCreator.name}</span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {/* Messages */}
            <div className="h-64 overflow-y-auto mb-4 space-y-2">
              {messages.length === 0 ? (
                <p className="text-gray-500 text-center">Start a conversation!</p>
              ) : (
                messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-2 rounded-lg max-w-xs ${
                      msg.senderId === currentCreatorId
                        ? 'bg-mm-primary text-white ml-auto'
                        : 'bg-gray-100'
                    }`}
                  >
                    {msg.content}
                  </div>
                ))
              )}
            </div>
            
            {/* Message Input */}
            <div className="flex space-x-2">
              <Input
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                data-testid="input-message"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!messageInput.trim() || !isConnected}
                data-testid="button-send-message"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
