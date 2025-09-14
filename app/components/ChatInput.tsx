'use client'

import { useState, useRef, forwardRef, useImperativeHandle } from 'react'
import { Send, Loader2 } from 'lucide-react'

interface ChatInputProps {
  onSubmit: (message: string) => void
  isLoading?: boolean
  placeholder?: string
  className?: string
}

export interface ChatInputRef {
  focus: () => void
  setValue: (value: string) => void
}

const ChatInput = forwardRef<ChatInputRef, ChatInputProps>(
  ({ onSubmit, isLoading = false, placeholder = "Ask me anything about Accept All Fund...", className = "" }, ref) => {
    const [inputValue, setInputValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus()
      },
      setValue: (value: string) => {
        setInputValue(value)
      }
    }))

    const handleSubmit = () => {
      if (!inputValue.trim() || isLoading) return
      
      onSubmit(inputValue.trim())
      setInputValue('')
    }

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault()
        handleSubmit()
      }
    }

    return (
      <div className={`relative ${className}`}>
        <div className="rainbow-glow rounded-full relative">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="w-full px-4 py-3 pr-12 rounded-full bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 relative z-10"
            disabled={isLoading}
          />
          <button
            onClick={handleSubmit}
            disabled={!inputValue.trim() || isLoading}
            className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full transition-colors z-20 ${
              inputValue.trim() && !isLoading
                ? 'bg-zinc-900 text-white hover:bg-gray-800'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>
    )
  }
)

ChatInput.displayName = 'ChatInput'

export default ChatInput
