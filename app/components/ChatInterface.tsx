'use client'

import React, { useState, useRef, useEffect, forwardRef } from 'react'
import { Loader2 } from 'lucide-react'
import ChatInput, { ChatInputRef } from './ChatInput'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

interface ChatInterfaceProps {
  onFirstMessage: () => void
}

const ChatInterface = ({ onFirstMessage }: ChatInterfaceProps, ref: any) => {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<ChatInputRef>(null)

  // Expose handleSubmit to parent via ref
  React.useImperativeHandle(ref, () => ({
    handleSubmit: (message: string) => handleSubmit(message)
  }))

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (messageText: string) => {
    if (!messageText || isLoading) return

    // Hide welcome message on first interaction
    if (messages.length === 0) {
      onFirstMessage()
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setIsLoading(true)

    // Add assistant message placeholder
    const assistantMessageId = (Date.now() + 1).toString()
    const assistantMessage: Message = {
      id: assistantMessageId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    }
    setMessages(prev => [...prev, assistantMessage])

    try {
      const response = await fetch('/api/openai-stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.concat([userMessage]).map(msg => ({
            role: msg.role,
            content: msg.content
          })),
          model: 'gpt-3.5-turbo',
          max_tokens: 1000
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) {
        throw new Error('No response body')
      }

      let done = false
      while (!done) {
        const { value, done: readerDone } = await reader.read()
        done = readerDone

        if (value) {
          const chunk = decoder.decode(value, { stream: true })
          const lines = chunk.split('\n')

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6))
                if (data.content) {
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === assistantMessageId 
                        ? { ...msg, content: msg.content + data.content }
                        : msg
                    )
                  )
                }
                if (data.done) {
                  done = true
                  // Auto-focus input after bot response is complete
                  setTimeout(() => {
                    inputRef.current?.focus()
                  }, 100)
                }
              } catch (e) {
                console.error('Failed to parse chunk:', e)
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantMessageId 
            ? { ...msg, content: 'Sorry, I encountered an error. Please try again.' }
            : msg
        )
      )
    } finally {
      setIsLoading(false)
    }
  }



  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 pb-32">
        <div className="max-w-3xl mx-auto px-0 sm:px-0 lg:px-3 pt-20">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-6 flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl backdrop-blur-md ${
                  message.role === 'user'
                    ? 'bg-zinc-900/80 text-white border border-white/10'
                    : 'bg-white/40 text-gray-900 border border-gray-200/50'
                }`}
              >
                <div className="whitespace-pre-wrap break-words">
                  {message.content}
                  {message.role === 'assistant' && isLoading && message.content === '' && (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-sm text-gray-500">Thinking...</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Chat Input - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-4">
        <div className="max-w-3xl mx-auto">
          <ChatInput
            ref={inputRef}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  )
}

export default forwardRef(ChatInterface)

// Predefined questions that users can click
export const PREDEFINED_QUESTIONS = [
  "What kind of founders or startups do you usually back?",
  "How big are the checks you write, and what do you expect in return?",
  "Do you take board seats or want control over the company?",
  "Can you explain your manifesto in plain English — what makes Accept All different from a normal VC?",
  "Why is now the right time to raise money from a fund like yours?"
]
