import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, MessageCircle, TrendingUp } from "lucide-react";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-mm-neutral-50">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-mm-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-semibold text-mm-neutral-800">MentionMates</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-gray-600 hover:text-mm-primary transition-colors">How it Works</a>
              <a href="#success-stories" className="text-gray-600 hover:text-mm-primary transition-colors">Success Stories</a>
              <Button variant="ghost" className="text-gray-600 hover:text-mm-primary">Sign In</Button>
              <Button 
                className="btn-primary"
                onClick={() => setLocation("/onboarding")}
                data-testid="button-get-started"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl lg:text-5xl font-bold text-mm-neutral-800 leading-tight mb-6">
                Grow Your Followers Without Ads — 
                <span className="text-mm-primary"> By Teaming Up With Other Creators</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Find the perfect collaboration partner in minutes. Swap audiences. Grow together.
              </p>
              <div className="mb-8">
                <Button 
                  size="lg"
                  className="btn-primary px-8 py-4 text-lg"
                  onClick={() => setLocation("/onboarding")}
                  data-testid="button-find-collab"
                >
                  Find My First Collab Partner
                  <TrendingUp className="ml-2 h-5 w-5" />
                </Button>
              </div>
              <p className="text-sm text-gray-500">Free to join. Your first match in 24 hours.</p>
            </div>
            
            <div className="relative animate-slide-up">
              <div className="relative bg-gradient-to-br from-blue-50 to-orange-50 rounded-2xl p-8">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {/* Creator 1 */}
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                      alt="Male creator collaborating" 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" 
                    />
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium">TechGuru</p>
                      <p className="text-xs text-gray-500">5.8K followers</p>
                    </div>
                  </div>
                  
                  {/* Handshake icon */}
                  <div className="bg-white rounded-full p-3 shadow-lg animate-bounce-gentle">
                    <MessageCircle className="w-6 h-6 text-mm-primary" />
                  </div>
                  
                  {/* Creator 2 */}
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                      alt="Female creator collaborating" 
                      className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg" 
                    />
                    <div className="mt-2 text-center">
                      <p className="text-sm font-medium">LinaFit</p>
                      <p className="text-xs text-gray-500">4.2K followers</p>
                    </div>
                  </div>
                </div>
                
                {/* Growth stat */}
                <div className="bg-white rounded-lg p-4 text-center shadow-sm">
                  <div className="flex items-center justify-center space-x-2 text-mm-mint">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-lg font-semibold">+27%</span>
                  </div>
                  <p className="text-xs text-gray-500">reach in first month</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-mm-neutral-800 mb-4">
              Creators Grow Faster Together — Here's Why It Works
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="text-center card-hover bg-mm-neutral-50 border-0">
              <CardContent className="p-8">
                <div className="bg-mm-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Zap className="w-8 h-8 text-mm-primary" />
                </div>
                <h3 className="text-xl font-semibold text-mm-neutral-800 mb-4">Smart Matching</h3>
                <p className="text-gray-600">We connect you with creators in your niche & follower range</p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-hover bg-mm-neutral-50 border-0">
              <CardContent className="p-8">
                <div className="bg-mm-coral/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <MessageCircle className="w-8 h-8 text-mm-coral" />
                </div>
                <h3 className="text-xl font-semibold text-mm-neutral-800 mb-4">Easy Collaboration</h3>
                <p className="text-gray-600">Chat instantly & get ready-to-use collab ideas</p>
              </CardContent>
            </Card>
            
            <Card className="text-center card-hover bg-mm-neutral-50 border-0">
              <CardContent className="p-8">
                <div className="bg-mm-mint/10 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8 text-mm-mint" />
                </div>
                <h3 className="text-xl font-semibold text-mm-neutral-800 mb-4">Shared Growth</h3>
                <p className="text-gray-600">Your content is shown to their audience — and theirs to yours</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="bg-mm-neutral-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <Card className="bg-white card-hover border-0">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                    alt="Successful female fitness creator" 
                    className="w-16 h-16 rounded-full object-cover" 
                  />
                  <div>
                    <h4 className="font-semibold text-mm-neutral-800">@Lina_Fit</h4>
                    <p className="text-gray-600">Fitness • Instagram</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">
                  "gained <span className="font-semibold text-mm-mint">580 followers</span> in 2 weeks after her first MentionMates collab."
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white card-hover border-0">
              <CardContent className="p-8">
                <div className="mb-6">
                  <p className="text-sm text-gray-600 mb-2">@JasminBlog</p>
                  <div className="bg-gradient-to-r from-mm-primary/10 to-mm-mint/10 rounded-lg p-4">
                    <svg viewBox="0 0 400 200" className="w-full h-24">
                      <polyline 
                        points="20,150 60,120 100,100 140,80 180,60 220,40 260,30 300,25 340,20 380,15" 
                        fill="none" 
                        stroke="#3B82F6" 
                        strokeWidth="3" 
                        strokeLinecap="round"
                      />
                      <circle cx="380" cy="15" r="4" fill="#3B82F6"/>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700">
                  "JasminBlog's reach increased by <span className="font-semibold text-mm-primary">98%</span> from her MentionMates collab."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Early Adopters CTA */}
      <section className="bg-mm-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            We're Matching Our First 100 Creators — Don't Miss Out
          </h2>
          <div className="bg-white/10 rounded-2xl p-8 mb-8">
            <h3 className="text-xl font-semibold text-white mb-6">Early users get:</h3>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-mm-mint" />
                <span>Priority matching</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-mm-mint" />
                <span>Featured showcase</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-mm-mint" />
                <span>30% lifetime discount</span>
              </div>
            </div>
          </div>
          <Button 
            size="lg"
            className="bg-white text-mm-primary hover:bg-gray-50 px-8 py-4 text-lg font-semibold"
            onClick={() => setLocation("/onboarding")}
            data-testid="button-join-early"
          >
            Join Free & Get My First Match
            <TrendingUp className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>
    </div>
  );
}
