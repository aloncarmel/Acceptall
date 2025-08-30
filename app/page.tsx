'use client'

import { useState, useEffect } from 'react'
import { ChevronRight, Zap, Target, Users, Rocket, Heart, ArrowRight } from 'lucide-react'

export default function Home() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white ">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="text-black font-semibold text-lg">Acc⌘ptAll</span>
            </div>
            <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition-all duration-300 font-medium">
              Submit Your Startup
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="text-black">Micro-VC</span>
              <br />
              <span className="text-black">for Indie Entrepreneurs</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto mb-8 leading-relaxed">
              We back solo founders, vibe coders, and indie hackers using AI to ship products, SaaS, apps, and games.
              <br />
              <span className="text-black font-medium">$50k–$100k checks. No board seats. No drama.</span>
              <br />
              Just runway to melt GPUs and reach profitability.
            </p>
           
          </div>
        </div>
      </section>

      {/* About the Fund */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-200 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-black">
              About the Fund
            </h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Accept All is a founders' fund. We're two operators (Yosi T & Alon C) who understand the solo builder's grind. 
                  Traditional VCs want to grab as much equity as possible. <span className="text-black font-medium">We move different:</span>
                </p>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <Zap className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-700">We invest fast (decision in days).</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Target className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-700">We don't take board seats, control rights, or overcomplicated terms.</span>
                  </div>
                  <div className="flex items-start space-x-3">
                    <Heart className="w-6 h-6 text-black mt-1 flex-shrink-0" />
                    <span className="text-gray-700">We're pro-founder, aligned with your goal: revenue in year one.</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 rounded-2xl p-8 border border-gray-200">
                <h3 className="text-2xl font-bold text-black mb-6">Why Now?</h3>
                <div className="space-y-4 text-gray-700">
                  <p>• AI tooling lets one developer build what used to take a team.</p>
                  <p>• Indie hackers are exploding on Twitter, Discord, and meetups.</p>
                  <p>• There's a short window to grab low-hanging fruit — from AI-powered SaaS to indie games.</p>
                  <p>• Capital is scarce at the very earliest stage, but $50k–$100k is exactly the catalyst needed to bridge the "zero revenue gap."</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Investment Model */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-black">
            Investment Model
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold">💰</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Fund Size</h3>
              <p className="text-gray-700">$200k from partners</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold">📊</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Check Size</h3>
              <p className="text-gray-700">$25k–$50k per investment</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-6">
                <span className="text-white font-bold">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-black mb-4">Expectation</h3>
              <p className="text-gray-700">Working demo/POC, profitability within 12 months</p>
            </div>
          </div>
          <div className="mt-12 bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
                  <span className="text-green-600 mr-2">✓</span> We Do
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Simple SAFE (founder-friendly terms)</li>
                  <li>• Fast decisions and wire transfers</li>
                  <li>• Support your growth journey</li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-black mb-4 flex items-center">
                  <span className="text-red-600 mr-2">✗</span> We Don't Do
                </h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Boards, veto rights, or micromanagement</li>
                  <li>• Overcomplicated term sheets</li>
                  <li>• Long due diligence processes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Manifesto Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-black">
              The Accept All Manifesto
            </h2>
            <div className="w-24 h-1 bg-black mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none space-y-8">
            <div className="text-center">
              <p className="text-2xl md:text-3xl font-bold text-black mb-8">
                We believe in the solo founder.
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-12">
                In the builder who opens a blank repo at midnight and pushes something real before dawn.<br />
                In the maker who can turn an idea into a product in days, not months.<br />
                In the vibe coder who melts GPUs chasing a vision — and only later worries about optimization.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 md:p-12 border border-gray-200 shadow-lg">
              <h3 className="text-3xl font-bold text-black mb-6">Growth First, Questions Later</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Traditional venture capital waits, negotiates, optimizes for equity and control.<br />
                <span className="text-black font-semibold">We don't.</span><br />
                We back the momentum. The chaos. The sprint from zero to one.<br />
                Because in the age of AI, speed is everything.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-4">Why We Exist</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>To bridge the gap of zero revenue.</li>
                  <li>To cover the first GPU bill, the first ad spend, the first Stripe fee.</li>
                  <li>To give solo entrepreneurs the runway to turn sparks into fire.</li>
                  <li>To let founders focus on shipping, growing, and winning — not begging for permission.</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
                <h3 className="text-2xl font-bold text-black mb-4">Our Promise</h3>
                <ul className="space-y-3 text-gray-700">
                  <li>We invest fast, in plain language, with plain terms.</li>
                  <li>No boards. No politics. No "advisory meetings."</li>
                  <li>$50k–$100k checks, wired so you can breathe.</li>
                  <li>We bet on profitability within one year — not unicorn fantasies.</li>
                </ul>
              </div>
            </div>

            <div className="text-center bg-gray-100 rounded-2xl p-12 border border-gray-200">
              <h3 className="text-3xl font-bold text-black mb-6">A Short Window, A Big Wave</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                AI has made one-person companies possible at scale. SaaS, games, apps — built, marketed, and scaled by one human with the right tools.
              </p>
              <p className="text-xl text-black font-semibold">
                This moment won't last forever. But while it's here, the bold will build.
              </p>
            </div>

            <div className="text-center">
              <h3 className="text-3xl font-bold text-black mb-6">We Are Founders Too</h3>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                We know what it's like to launch with nothing but conviction.<br />
                We know the fear of zero MRR.<br />
                We know the joy of the first paying user.<br />
                That's why we started Accept All: to stand shoulder-to-shoulder with you, not across the table.
              </p>
              
              <div className="bg-white rounded-2xl p-8 border-2 border-black">
                <h3 className="text-4xl font-bold text-black mb-4">To the Builders</h3>
                <p className="text-xl text-black mb-6">
                  If you've got a working demo, if you've felt the rush of making something real, 
                  if you've dreamed of building a business on your own terms:
                </p>
                <p className="text-2xl font-bold text-black mb-6">This fund is for you.</p>
                <p className="text-lg text-gray-700 italic">Accept All. Fuel for the indie revolution.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Back & How We Help */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">Who We Back</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Users className="w-8 h-8 text-black mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Solo Entrepreneurs</h3>
                    <p className="text-gray-700">Coders, makers, dreamers.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Zap className="w-8 h-8 text-black mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Vibe Coders</h3>
                    <p className="text-gray-700">Founders who can ship fast and build in public.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Target className="w-8 h-8 text-black mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Indie Entrepreneurs</h3>
                    <p className="text-gray-700">People who would rather run a $5M profitable SaaS than chase unicorn status.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-4xl font-bold text-black mb-8">How We Help</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">💳</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Capital</h3>
                    <p className="text-gray-700">For marketing, ads, and GPU/AI costs.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">🤝</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Community</h3>
                    <p className="text-gray-700">A community of like-minded indie hackers.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">📢</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Distribution</h3>
                    <p className="text-gray-700">Support via Twitter and indie meetups.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center mt-1 flex-shrink-0">
                    <span className="text-white text-sm font-bold">🧠</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-black mb-2">Mindset</h3>
                    <p className="text-gray-700">Focused on growth first, optimization later.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Founders */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-12">Founders</h2>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                👤
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Yosi T.</h3>
              <p className="text-gray-700">Indie operator turned micro-investor</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-lg">
              <div className="w-20 h-20 bg-black rounded-full flex items-center justify-center text-3xl mb-6 mx-auto">
                👤
              </div>
              <h3 className="text-2xl font-bold text-black mb-2">Alon C.</h3>
              <p className="text-gray-700">Indie operator turned micro-investor</p>
            </div>
          </div>
          <p className="text-xl text-gray-700 leading-relaxed">
            Two indie operators turned micro-investors. We've lived the grind, 
            and we're betting on the next wave of solo-built companies.
          </p>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-white rounded-3xl p-12 border border-gray-200 shadow-lg">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-8">
              Ready to Build?
            </h2>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              Got a working demo? A prototype? A POC?<br />
              We want to hear from you.
            </p>
            <button className="bg-black text-white px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-800 transform hover:scale-105 transition-all duration-300 shadow-lg flex items-center mx-auto space-x-3">
              <span>👉 Submit Your Startup</span>
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <span className="text-black font-semibold text-lg">Acc⌘ptAll</span>
          </div>
          <p className="text-gray-600">
            © 2024 Accept All Fund. Fuel for the indie revolution.
          </p>
        </div>
      </footer>
    </main>
  )
}