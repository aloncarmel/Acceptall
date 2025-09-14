'use client'

import { useState, useRef } from 'react'
import ChatInterface from './components/ChatInterface'
import WelcomeSection from './components/WelcomeSection'

export default function Home() {
  const [showWelcome, setShowWelcome] = useState(true)
  const chatRef = useRef<{ handleSubmit: (message: string) => void }>(null)

  const handleFirstMessage = () => {
    setShowWelcome(false)
  }

  const handleQuestionClick = (question: string) => {
    setShowWelcome(false)
    // Small delay to ensure chat interface is mounted
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.handleSubmit(question)
      }
    }, 100)
  }

  const handleWelcomeSubmit = (message: string) => {
    setShowWelcome(false)
    // Small delay to ensure chat interface is mounted
    setTimeout(() => {
      if (chatRef.current) {
        chatRef.current.handleSubmit(message)
      }
    }, 100)
  }

  return (
    <main className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 w-full z-50 bg-white">
        <div className="max-w-3xl mx-auto px-3 sm:px-3 lg:px-3">
          <div className="flex justify-between items-center py-4">
            <a href="/" className="flex items-center space-x-2">
                          <div className="w-8 h-8 rainbow-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">⌘</span>
              </div>
              <span className="text-zinc-900 font-semibold text-lg">AcceptAll Fund</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="h-screen flex flex-col">
                    {/* Welcome Section */}
                    <WelcomeSection
                      isVisible={showWelcome}
                      onQuestionClick={handleQuestionClick}
                      onMessageSubmit={handleWelcomeSubmit}
                    />
        
        {/* Chat Interface */}
        {!showWelcome && (
          <ChatInterface 
            ref={chatRef}
            onFirstMessage={handleFirstMessage}
          />
        )}
      </div>
    </main>
  )
}