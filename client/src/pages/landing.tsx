import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Zap, MessageCircle, TrendingUp } from "lucide-react";
import FloatingNav from "@/components/floating-nav";

export default function LandingPage() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-mm-neutral-50">
      {/* Modern Floating Navigation */}
      <FloatingNav onGetStarted={() => setLocation("/onboarding")} />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h1 className="text-3xl lg:text-4xl font-bold text-mm-neutral-800 leading-tight mb-6">
                Grow Your Followers Without Ads — 
                <span className="text-mm-primary-dark"> By Teaming Up With Other Creators</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
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
              <div className="relative bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-8 h-96 hero-image-hover animate-hero-float">
                <div className="flex items-center justify-center space-x-6 mb-8">
                  {/* Creator 1 */}
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                      alt="Male creator collaborating" 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" 
                    />
                    <div className="mt-3 text-center">
                      <p className="text-sm font-medium">TechGuru</p>
                      <p className="text-xs text-gray-500">5.8K followers</p>
                    </div>
                  </div>
                  
                  {/* Handshake icon */}
                  <div className="bg-white rounded-full p-4 shadow-lg animate-bounce-gentle">
                    <MessageCircle className="w-8 h-8 text-mm-primary" />
                  </div>
                  
                  {/* Creator 2 */}
                  <div className="flex flex-col items-center">
                    <img 
                      src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150" 
                      alt="Female creator collaborating" 
                      className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg" 
                    />
                    <div className="mt-3 text-center">
                      <p className="text-sm font-medium">LinaFit</p>
                      <p className="text-xs text-gray-500">4.2K followers</p>
                    </div>
                  </div>
                </div>
                
                {/* Growth stat */}
                <div className="bg-white rounded-xl p-6 text-center shadow-lg">
                  <div className="flex items-center justify-center space-x-2 text-mm-mint">
                    <TrendingUp className="w-5 h-5" />
                    <span className="text-2xl font-semibold">+27%</span>
                  </div>
                  <p className="text-sm text-gray-500">reach in first month</p>
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
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-mm-neutral-800 mb-4">
              Real Creators, Real Results
            </h2>
            <p className="text-lg text-gray-600">See how our community is growing together</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* First Card - Staggered Up */}
            <Card className="bg-white card-hover border-0 shadow-lg staggered-up">
              <CardContent className="p-8">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                    alt="Successful female fitness creator" 
                    className="w-16 h-16 rounded-full object-cover border-2 border-mm-mint" 
                  />
                  <div>
                    <h4 className="font-semibold text-mm-neutral-800">@Lina_Fit</h4>
                    <p className="text-gray-600">Fitness • Instagram</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-6 text-lg leading-relaxed">
                  "gained <span className="font-semibold text-mm-mint text-xl">580 followers</span> in 2 weeks after her first MentionMates collab."
                </p>
                <div className="bg-mm-mint/10 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Growth Rate</span>
                    <span className="font-semibold text-mm-mint">+38%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Second Card - Staggered Down */}
            <Card className="bg-white card-hover border-0 shadow-lg staggered-down">
              <CardContent className="p-8">
                <div className="mb-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <img 
                      src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                      alt="Fashion blogger creator" 
                      className="w-16 h-16 rounded-full object-cover border-2 border-mm-primary" 
                    />
                    <div>
                      <h4 className="font-semibold text-mm-neutral-800">@JasminBlog</h4>
                      <p className="text-gray-600">Fashion • TikTok</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-mm-primary/10 to-mm-mint/10 rounded-xl p-6">
                    <svg viewBox="0 0 400 120" className="w-full h-20">
                      <polyline 
                        points="20,100 60,80 100,65 140,50 180,35 220,25 260,20 300,15 340,10 380,5" 
                        fill="none" 
                        stroke="#2563EB" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                      />
                      <circle cx="380" cy="5" r="6" fill="#2563EB"/>
                    </svg>
                  </div>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  "JasminBlog's reach increased by <span className="font-semibold text-mm-primary text-xl">98%</span> from her MentionMates collab."
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Additional Statistics */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-mm-primary mb-2">2.3K+</div>
                <p className="text-gray-600">Active Creators</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-mm-mint mb-2">45%</div>
                <p className="text-gray-600">Avg. Growth Rate</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="text-3xl font-bold text-mm-coral mb-2">1,200+</div>
                <p className="text-gray-600">Successful Collabs</p>
              </div>
            </div>
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
