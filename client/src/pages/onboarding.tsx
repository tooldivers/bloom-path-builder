import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { Loader2 } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { InsertCreator } from "@shared/schema";

const NICHES = [
  "Fitness & Health",
  "Technology", 
  "Fashion & Style",
  "Travel",
  "Food & Cooking",
  "Business & Finance",
  "Lifestyle",
  "Education"
];

const PLATFORMS = [
  "Instagram",
  "TikTok", 
  "YouTube",
  "Twitter",
  "LinkedIn"
];

export default function OnboardingPage() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    niche: "",
    audienceSizeRange: "",
    goal: "",
    name: "",
    email: "",
    platform: ""
  });
  const { toast } = useToast();

  const createCreatorMutation = useMutation({
    mutationFn: async (data: InsertCreator) => {
      const response = await apiRequest("POST", "/api/creators", data);
      return response.json();
    },
    onSuccess: (creator) => {
      localStorage.setItem("currentCreatorId", creator.id);
      setLocation("/dashboard");
      toast({
        title: "Welcome to MentionMates!",
        description: "Your profile has been created successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to create your profile. Please try again.",
        variant: "destructive",
      });
    }
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.niche || !formData.platform || !formData.audienceSizeRange || !formData.goal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const creatorData: InsertCreator = {
      name: formData.name,
      email: formData.email,
      niche: formData.niche,
      platform: formData.platform,
      audienceSizeRange: formData.audienceSizeRange,
      goal: formData.goal,
      audienceSize: formData.audienceSizeRange === "none" ? 0 : 
                   formData.audienceSizeRange === "micro" ? 500 :
                   formData.audienceSizeRange === "1k" ? 3000 : 7500,
    };

    createCreatorMutation.mutate(creatorData);
  };

  return (
    <div className="min-h-screen bg-mm-neutral-50 flex items-center justify-center p-4">
      {step === 1 && (
        <Card className="w-full max-w-md animate-fade-in border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-mm-neutral-800 mb-2">
                Find Your First Collab Partner in 60 Seconds
              </h2>
              <p className="text-gray-600">
                No audience? No problem. Get matched with creators who are ready to grow together.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Niche</Label>
                <Select onValueChange={(value) => setFormData({...formData, niche: value})}>
                  <SelectTrigger data-testid="select-niche">
                    <SelectValue placeholder="Select your niche" />
                  </SelectTrigger>
                  <SelectContent>
                    {NICHES.map((niche) => (
                      <SelectItem key={niche} value={niche}>{niche}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Audience Size</Label>
                <RadioGroup 
                  className="grid grid-cols-2 gap-2"
                  onValueChange={(value) => setFormData({...formData, audienceSizeRange: value})}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-mm-primary transition-colors">
                    <RadioGroupItem value="none" id="none" data-testid="radio-audience-none" />
                    <Label htmlFor="none" className="text-sm cursor-pointer">None yet</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-mm-primary transition-colors">
                    <RadioGroupItem value="micro" id="micro" data-testid="radio-audience-micro" />
                    <Label htmlFor="micro" className="text-sm cursor-pointer">Under 1K</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-mm-primary transition-colors">
                    <RadioGroupItem value="1k" id="1k" data-testid="radio-audience-1k" />
                    <Label htmlFor="1k" className="text-sm cursor-pointer">1K-5K</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-mm-primary transition-colors">
                    <RadioGroupItem value="5k+" id="5k+" data-testid="radio-audience-5k" />
                    <Label htmlFor="5k+" className="text-sm cursor-pointer">5K+</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Your Goal</Label>
                <RadioGroup 
                  className="grid grid-cols-2 gap-2"
                  onValueChange={(value) => setFormData({...formData, goal: value})}
                >
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-mm-primary transition-colors">
                    <RadioGroupItem value="followers" id="followers" data-testid="radio-goal-followers" />
                    <Label htmlFor="followers" className="text-sm cursor-pointer">Followers</Label>
                  </div>
                  <div className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-blue-50 hover:border-mm-primary transition-colors">
                    <RadioGroupItem value="engagement" id="engagement" data-testid="radio-goal-engagement" />
                    <Label htmlFor="engagement" className="text-sm cursor-pointer">Engagement</Label>
                  </div>
                </RadioGroup>
              </div>
              
              <Button 
                className="w-full btn-primary py-4"
                onClick={() => setStep(2)}
                disabled={!formData.niche || !formData.audienceSizeRange || !formData.goal}
                data-testid="button-show-matches"
              >
                Show My Matches
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {step === 2 && (
        <Card className="w-full max-w-2xl animate-fade-in border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-mm-neutral-800 mb-2">
                92 creators in your niche are active this week
              </h2>
              <p className="text-gray-600">Here are your top matches ready to collaborate:</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {/* Mock matches based on selected niche */}
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-mm-primary transition-colors">
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" 
                    alt="Creator profile" 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div>
                    <h3 className="font-semibold text-mm-neutral-800">Creator Match</h3>
                    <p className="text-sm text-gray-600">{formData.niche} • Instagram • 3.2K followers</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-mm-mint/10 text-mm-mint px-3 py-1 rounded-full text-xs font-medium mb-1">92% Match</div>
                  <p className="text-xs text-gray-500">Active today</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-mm-primary transition-colors">
                <div className="flex items-center space-x-4">
                  <img 
                    src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=80&h=80" 
                    alt="Creator profile" 
                    className="w-12 h-12 rounded-full object-cover" 
                  />
                  <div>
                    <h3 className="font-semibold text-mm-neutral-800">Creator Match</h3>
                    <p className="text-sm text-gray-600">{formData.niche} • TikTok • 2.8K followers</p>
                  </div>
                </div>
                <div className="text-center">
                  <div className="bg-mm-primary/10 text-mm-primary px-3 py-1 rounded-full text-xs font-medium mb-1">87% Match</div>
                  <p className="text-xs text-gray-500">Active this week</p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-mm-primary font-medium">
                These creators are ready to collab with you. Unlock chat in 1 minute
              </p>
            </div>
            
            <Button 
              className="w-full btn-primary py-4"
              onClick={() => setStep(3)}
              data-testid="button-unlock-chat"
            >
              Unlock & Collab Now
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 3 && (
        <Card className="w-full max-w-md animate-fade-in border-0 shadow-xl">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-mm-neutral-800 mb-2">Signing up...</h2>
              <p className="text-gray-600">Finding your top 10 matches...</p>
            </div>
            
            <div className="space-y-6">
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Name</Label>
                <Input 
                  placeholder="Your display name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  data-testid="input-name"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Email</Label>
                <Input 
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  data-testid="input-email"
                />
              </div>
              
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">Preferred Platform</Label>
                <Select onValueChange={(value) => setFormData({...formData, platform: value})}>
                  <SelectTrigger data-testid="select-platform">
                    <SelectValue placeholder="Select platform" />
                  </SelectTrigger>
                  <SelectContent>
                    {PLATFORMS.map((platform) => (
                      <SelectItem key={platform} value={platform}>{platform}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="bg-mm-neutral-100 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Loader2 className="h-4 w-4 animate-spin text-mm-primary" />
                  <span className="text-sm text-gray-600">Finding your top 10 matches...</span>
                </div>
                <Progress value={75} className="w-full" />
              </div>
              
              <Button 
                className="w-full btn-primary py-4"
                onClick={handleSubmit}
                disabled={createCreatorMutation.isPending}
                data-testid="button-full-access"
              >
                {createCreatorMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating Profile...
                  </>
                ) : (
                  "Full Access Dashboard"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
