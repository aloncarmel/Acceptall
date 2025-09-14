'use client'

import { useRef, useEffect } from 'react'
import { PREDEFINED_QUESTIONS } from './ChatInterface'
import ChatInput, { ChatInputRef } from './ChatInput'

interface WelcomeSectionProps {
  isVisible: boolean
  onQuestionClick: (question: string) => void
  onMessageSubmit: (message: string) => void
  isLoading?: boolean
}

export default function WelcomeSection({ isVisible, onQuestionClick, onMessageSubmit, isLoading = false }: WelcomeSectionProps) {
  const inputRef = useRef<ChatInputRef>(null)

  // Auto-focus the input when welcome section becomes visible
  useEffect(() => {
    if (isVisible && inputRef.current) {
      // Small delay to ensure component is fully mounted
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isVisible])

  if (!isVisible) return null

  const handleQuestionClick = (question: string) => {
    inputRef.current?.setValue(question)
    inputRef.current?.focus()
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-3xl mx-auto text-center">
        <div className="transition-all duration-1000 opacity-100 translate-y-0">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-zinc-900">Welcome to</span>
            <br />
            <span className="text-zinc-900">Accept All Fund</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
            We are a micro-VC fund for indie entrepreneurs.
            <br />
            <span className="text-zinc-900 font-medium">$50k–$100k checks. No board seats. No drama.</span>
          </p>

          {/* Chat Input */}
          <div className="max-w-2xl mx-auto mb-8">
            <ChatInput
              ref={inputRef}
              onSubmit={onMessageSubmit}
              isLoading={isLoading}
              placeholder="Ask me anything about Accept All Fund..."
            />
          </div>

          {/* Predefined Questions */}
          <div className="max-w-4xl mx-auto">
            <p className="text-sm text-gray-500 mb-4">Or try one of these:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {PREDEFINED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuestionClick(question)}
                  className="px-4 py-2 text-sm bg-white/40 text-gray-900 rounded-full hover:bg-white/60 hover:text-zinc-900 transition-all duration-200 border border-gray-200/50 hover:border-gray-300 backdrop-blur-md"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
