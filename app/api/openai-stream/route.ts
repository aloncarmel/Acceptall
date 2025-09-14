import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'
import { readFileSync } from 'fs'
import { join } from 'path'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
})

// Read the system prompt from external file
function getSystemPrompt(): string {
  try {
    const promptPath = join(process.cwd(), 'prompt.md')
    return readFileSync(promptPath, 'utf-8')
  } catch (error) {
    console.error('Failed to read prompt.md:', error)
    return 'You are an AI assistant for Accept All Fund, a micro-VC fund that backs indie entrepreneurs.'
  }
}

// Read the guardrails prompt from external file
function getGuardrailsPrompt(): string {
  try {
    const guardrailsPath = join(process.cwd(), 'guardrails.md')
    return readFileSync(guardrailsPath, 'utf-8')
  } catch (error) {
    console.error('Failed to read guardrails.md:', error)
    return 'You are a content safety classifier. Respond with 1 for safe content, 0 for unsafe content.'
  }
}

// Check if the request is safe using guardrails
async function checkIsRequestSafe(messages: any[]): Promise<boolean> {
  try {
    // Use the nano model for fast, cheap guardrail checks
    const guardrailModel = process.env.OPENAI_MODEL_NANO || 'gpt-3.5-turbo'
    const guardrailsPrompt = getGuardrailsPrompt()
    
    // Format conversation history for guardrails analysis
    const conversationHistory = messages.map((msg: any) => {
      return `<${msg.role === 'user' ? 'User' : 'Assistant'}>${msg.content}</${msg.role === 'user' ? 'User' : 'Assistant'}>`
    }).join('\n')
    
    console.log('Guardrails model:', guardrailModel)
    console.log('Conversation history:', conversationHistory)
    
    const guardrailResponse = await openai.responses.create({
      model: guardrailModel,
      input: `${guardrailsPrompt}\n\n**Conversation History**:\n\n${conversationHistory}`,
      temperature: 0,
      max_output_tokens: 16,
    })

    console.log('Full guardrail response:', guardrailResponse)
    const result = guardrailResponse.output_text?.trim()
    console.log('Guardrails response:', result);
    // Return true if the response is exactly '1' (safe), false otherwise
    return result === '1'
  } catch (error) {
    console.error('Guardrails check failed:', error)
    // If guardrails check fails, err on the side of caution and block
    return false
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { messages, model = process.env.OPENAI_MODEL, max_tokens = 1000 } = body

    // Validate required fields
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: 'Messages array is required' },
        { status: 400 }
      )
    }

    // Validate OpenAI API key
    if (!process.env.OPENAI_KEY) {
      console.error('OPENAI_KEY environment variable is not set')
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      )
    }

    // 1. Check if the request is safe using guardrails
    const isSafe = await checkIsRequestSafe(messages)
    
    // 2. If the request is not safe, stream the blocked message
    if (!isSafe) {
      const encoder = new TextEncoder()
      const blockedMessage = 'I cannot assist with this request as it violates our safety guidelines. Please ask something else about Accept All Fund and our investment approach.'
      
      const blockedStream = new ReadableStream({
        start(controller) {
          // Stream the blocked message
          const sseData = `data: ${JSON.stringify({ 
            content: blockedMessage,
            done: false 
          })}\n\n`
          controller.enqueue(encoder.encode(sseData))
          
          // Send completion message
          const finalData = `data: ${JSON.stringify({ 
            content: '',
            done: true 
          })}\n\n`
          controller.enqueue(encoder.encode(finalData))
          controller.close()
        }
      })

      return new Response(blockedStream, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Transfer-Encoding': 'chunked',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      })
    }

    // 3. If the request is safe, continue with normal logic
    // Create streaming response using OpenAI's responses API
    const systemPrompt = getSystemPrompt()
    const conversationText = messages.map((msg: any) => `${msg.role}: ${msg.content}`).join('\n')
    const fullInput = `${systemPrompt}\n\nConversation:\n${conversationText}`
    
    const stream = await openai.responses.create({
      model,
      input: fullInput,
      max_output_tokens: max_tokens,
      stream: true,
    })

    // Create a readable stream for the client
    const encoder = new TextEncoder()
    const decoder = new TextDecoder()

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            // Debug: Log the chunk structure to understand the format
            //console.log('Streaming chunk:', chunk)
            
            // Handle responses API streaming format - try different possible properties
            const content = (chunk as any).output_text_delta || 
                           (chunk as any).output_delta || 
                           (chunk as any).delta || 
                           (chunk as any).text || 
                           ''
            
            if (content) {
              // Format as Server-Sent Events
              const sseData = `data: ${JSON.stringify({ 
                content,
                done: false 
              })}\n\n`
              
              controller.enqueue(encoder.encode(sseData))
            }
          }
          
          // Send completion message
          const finalData = `data: ${JSON.stringify({ 
            content: '',
            done: true 
          })}\n\n`
          controller.enqueue(encoder.encode(finalData))
          
          controller.close()
        } catch (error) {
          console.error('Streaming error:', error)
          controller.error(error)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    })

  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to process OpenAI request',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}

// Handle CORS preflight requests
export async function OPTIONS(request: NextRequest) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
