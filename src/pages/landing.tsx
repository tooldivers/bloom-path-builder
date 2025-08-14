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
                Skip Expensive Ads — 
                <span className="text-mm-primary-dark">Grow Through Creator Collaborations</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Connect with like-minded creators in your niche. Cross-promote content. Build authentic audiences together. Get your first collaboration partner in under 24 hours.
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
              <p className="text-sm text-gray-500">✓ Free to join  ✓ Smart matching algorithm  ✓ First partner in 24 hours</p>
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
              From Setup to Success in 3 Steps
            </h2>
            <p className="text-lg text-gray-600">The fastest way to find your ideal collaboration partner</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-mm-primary/5 to-mm-primary/10 border-0 card-hover text-center relative overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-4 text-mm-primary/20 font-bold text-6xl">01</div>
                <div className="w-16 h-16 bg-gradient-to-br from-mm-primary to-mm-primary-dark rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <CheckCircle className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-mm-neutral-800 mb-4">Share Your Creator Profile</h3>
                <p className="text-gray-600">Tell us your niche, platform, audience size, and collaboration goals in under 2 minutes.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-mm-mint/5 to-mm-mint/10 border-0 card-hover text-center relative overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-4 text-mm-mint/20 font-bold text-6xl">02</div>
                <div className="w-16 h-16 bg-gradient-to-br from-mm-mint to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <Zap className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-mm-neutral-800 mb-4">Get Smart Matches</h3>
                <p className="text-gray-600">Our AI matches you with creators who have complementary audiences and shared collaboration interests.</p>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-mm-coral/5 to-mm-coral/10 border-0 card-hover text-center relative overflow-hidden">
              <CardContent className="p-8 relative">
                <div className="absolute top-4 right-4 text-mm-coral/20 font-bold text-6xl">03</div>
                <div className="w-16 h-16 bg-gradient-to-br from-mm-coral to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <MessageCircle className="text-white w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-mm-neutral-800 mb-4">Launch Your Partnership</h3>
                <p className="text-gray-600">Connect directly, plan content strategies, and watch both your audiences grow organically.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section id="success-stories" className="bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 py-24 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <div className="inline-flex items-center bg-mm-primary/10 text-mm-primary-dark px-4 py-2 rounded-full text-sm font-medium mb-4">
              ✨ Creator Success Stories
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-mm-neutral-800 mb-6">
              Real Creators, <span className="text-mm-primary-dark">Real Growth</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of creators who've accelerated their growth through strategic collaborations
            </p>
          </div>
          
          {/* Featured Success Stories */}
          <div className="grid lg:grid-cols-2 gap-12 mb-20">
            {/* Lina's Story - Video-style Card */}
            <div className="relative">
              <Card className="bg-white border-0 shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 staggered-up">
                <div className="absolute top-4 right-4 bg-mm-mint text-white px-3 py-1 rounded-full text-sm font-semibold">
                  +580 followers
                </div>
                <CardContent className="p-0">
                  <div className="relative bg-gradient-to-br from-emerald-400 to-cyan-500 p-8 text-white">
                    <div className="flex items-center space-x-4 mb-6">
                      <img 
                        src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                        alt="Lina Fit - Fitness Creator" 
                        className="w-20 h-20 rounded-2xl object-cover border-4 border-white/30" 
                      />
                      <div>
                        <h4 className="text-xl font-bold">@Lina_Fit</h4>
                        <p className="text-emerald-100">Fitness • 12.8K followers</p>
                      </div>
                    </div>
                    <div className="absolute top-4 left-4 w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <div className="w-6 h-6 bg-white rounded-full" />
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <blockquote className="text-lg text-gray-700 mb-6 italic">
                      "In just 2 weeks, I gained 580 new followers through my first collab. The quality of engagement was incredible - these weren't just numbers, they were genuinely interested in my content."
                    </blockquote>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-mm-mint/10 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-mm-mint">+38%</div>
                        <div className="text-sm text-gray-600">Growth Rate</div>
                      </div>
                      <div className="bg-blue-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-mm-primary">2 weeks</div>
                        <div className="text-sm text-gray-600">Time Frame</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Jasmin's Story - Dashboard-style Card */}
            <div className="relative">
              <Card className="bg-white border-0 shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-500 staggered-down">
                <div className="absolute top-4 right-4 bg-mm-primary text-white px-3 py-1 rounded-full text-sm font-semibold">
                  +98% reach
                </div>
                <CardContent className="p-8">
                  <div className="flex items-center space-x-4 mb-6">
                    <img 
                      src="https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100" 
                      alt="Jasmin Blog - Fashion Creator" 
                      className="w-20 h-20 rounded-2xl object-cover border-4 border-mm-primary/20" 
                    />
                    <div>
                      <h4 className="text-xl font-bold text-mm-neutral-800">@JasminBlog</h4>
                      <p className="text-gray-600">Fashion • 8.2K followers</p>
                    </div>
                  </div>
                  
                  <blockquote className="text-lg text-gray-700 mb-6 italic">
                    "The collaboration opened doors I never expected. My content reached audiences in completely new demographics, and my engagement rates doubled overnight."
                  </blockquote>
                  
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6">
                    <div className="text-sm text-gray-600 mb-2">Reach Growth Over Time</div>
                    <svg viewBox="0 0 400 120" className="w-full h-16">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#3B82F6" />
                          <stop offset="100%" stopColor="#8B5CF6" />
                        </linearGradient>
                      </defs>
                      <polyline 
                        points="20,100 60,80 100,65 140,50 180,35 220,25 260,20 300,15 340,10 380,5" 
                        fill="none" 
                        stroke="url(#gradient)" 
                        strokeWidth="4" 
                        strokeLinecap="round"
                      />
                      <circle cx="380" cy="5" r="6" fill="#8B5CF6"/>
                    </svg>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-mm-primary/10 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-mm-primary">98%</div>
                      <div className="text-sm text-gray-600">Reach Increase</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">2.1x</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Platform Statistics */}
          <div className="bg-white rounded-3xl shadow-2xl p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-mm-primary/20 to-transparent rounded-full -translate-y-32 translate-x-32" />
            
            <div className="text-center mb-12 relative">
              <h3 className="text-2xl font-bold text-mm-neutral-800 mb-4">
                Trusted by creators across all platforms
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                From micro-influencers to established creators, our community represents every niche and platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-mm-primary to-mm-primary-dark rounded-2xl p-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">3.2K+</div>
                  <p className="text-blue-100">Active Creators</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-mm-mint to-emerald-600 rounded-2xl p-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">47%</div>
                  <p className="text-emerald-100">Avg. Growth Rate</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-mm-coral to-red-500 rounded-2xl p-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">1,890+</div>
                  <p className="text-red-100">Successful Collabs</p>
                </div>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 shadow-lg transform group-hover:scale-110 transition-all duration-300">
                  <div className="text-4xl font-bold text-white mb-2">24hrs</div>
                  <p className="text-purple-100">Avg. Match Time</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early Adopters CTA - Green Footer matching uploaded design */}
      <section className="bg-mm-primary py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            We're Matching Our First 100 Creators — Don't Miss Out
          </h2>
          <div className="flex justify-center items-center space-x-8 mb-8 text-white">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Priority matching</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>Team collaboration</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5" />
              <span>VIP access to events</span>
            </div>
          </div>
          <div className="space-y-4 mb-8">
            <Button 
              size="lg"
              className="bg-white text-mm-primary hover:bg-gray-100 font-semibold px-8 py-4 text-lg rounded-xl"
              onClick={() => setLocation("/onboarding")}
            >
              Join now and
            </Button>
            <Button 
              size="lg"
              className="bg-mm-primary-dark text-white hover:bg-mm-primary font-semibold px-8 py-4 text-lg rounded-xl border-2 border-white/20"
              onClick={() => setLocation("/onboarding")}
            >
              Get free 1:1 onboarding
            </Button>
          </div>
          <p className="text-white/80 text-sm">No credit card required. Best collaboration in 24 hours.</p>
          <p className="text-white/60 text-xs mt-2">27 creator profiles live for 18 hours</p>
        </div>
      </section>

      {/* FAQ Section matching uploaded design */}
      <section className="bg-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-mm-neutral-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">Everything you need to know about growing with CollabMates</p>
          </div>
          
          <div className="space-y-4">
            {[
              {
                question: "How does the matching algorithm work?",
                answer: "Our AI analyzes your niche, audience demographics, engagement rates, and collaboration preferences to find creators with complementary audiences."
              },
              {
                question: "Is there a cost to join the platform?",
                answer: "Joining is completely free. We only charge a small fee when you successfully complete a collaboration through our platform."
              },
              {
                question: "How long does it take to find a collaboration partner?",
                answer: "Most creators find their first match within 24 hours. Our algorithm works 24/7 to find the best partnerships for sustainable growth."
              },
              {
                question: "What types of collaborations can I do?",
                answer: "Content swaps, joint livestreams, cross-promotion, product collaborations, and more. You define what type of partnership you're looking for."
              },
              {
                question: "Can I collaborate with creators outside my niche?",
                answer: "Absolutely! Some of the most successful collaborations happen between creators in complementary niches that share similar audience interests."
              },
              {
                question: "How do you ensure the quality of creators on the platform?",
                answer: "We verify all creator profiles and use engagement quality metrics, not just follower count, to ensure authentic partnerships."
              }
            ].map((faq, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                <h3 className="font-semibold text-mm-neutral-800 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Still have questions? We're here to help.</p>
            <Button 
              variant="outline" 
              className="border-mm-primary text-mm-primary hover:bg-mm-primary hover:text-white"
            >
              Contact our support team
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-mm-neutral-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-xl mb-4">CollabMates</h3>
              <p className="text-gray-400 mb-4">
                Connecting creators worldwide for authentic growth and meaningful collaborations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <div className="space-y-2 text-gray-400">
                <p>How it Works</p>
                <p>Pricing</p>
                <p>Success Stories</p>
                <p>API</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <div className="space-y-2 text-gray-400">
                <p>Creator Guide</p>
                <p>Community</p>
                <p>Support</p>
                <p>Help Center</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Stay Updated</h4>
              <p className="text-gray-400 mb-4">Get the latest news and updates about creator growth.</p>
              <Button 
                className="bg-mm-primary hover:bg-mm-primary-dark text-white"
                onClick={() => setLocation("/onboarding")}
              >
                Subscribe
              </Button>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 CollabMates. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
