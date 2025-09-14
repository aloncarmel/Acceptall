'use client'

import React, { useState } from 'react'
import { X, Loader2, Check } from 'lucide-react'
import { getSupabaseClient } from '@/lib/supabase'

interface InterestModalProps {
  isOpen: boolean
  onClose: () => void
}

interface FormData {
  email: string
  full_name: string
  project_url: string
}

interface FormErrors {
  email?: string
  full_name?: string
  project_url?: string
  general?: string
}

const InterestModal: React.FC<InterestModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    full_name: '',
    project_url: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Full name validation
    if (!formData.full_name.trim()) {
      newErrors.full_name = 'Full name is required'
    } else if (formData.full_name.trim().length < 2) {
      newErrors.full_name = 'Full name must be at least 2 characters'
    }

    // Project URL validation
    if (!formData.project_url.trim()) {
      newErrors.project_url = 'Project URL is required'
    } else {
      try {
        new URL(formData.project_url)
      } catch {
        newErrors.project_url = 'Please enter a valid URL (e.g., https://example.com)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsLoading(true)
    setErrors({})

    try {
      const supabase = getSupabaseClient()
      
      // Get current authenticated user
      const { data: { user }, error: userError } = await supabase.auth.getUser()
      
      if (userError || !user) {
        throw new Error('You must be authenticated to submit. Please refresh the page and try again.')
      }

      // Insert lead directly into Supabase
      const leadData = {
        email: formData.email.trim().toLowerCase(),
        full_name: formData.full_name.trim(),
        project_url: formData.project_url.trim(),
        user_id: user.id
      }

      const { data, error } = await supabase
        .from('leads')
        .insert(leadData)
        .select()

      if (error) {
        console.error('Supabase error:', error)
        throw new Error('Failed to save your information. Please try again.')
      }

      setIsSuccess(true)
      // Auto-close modal after 2 seconds
      setTimeout(() => {
        handleClose()
      }, 2000)

    } catch (error) {
      console.error('Submission error:', error)
      setErrors({
        general: error instanceof Error ? error.message : 'Failed to submit. Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleClose = () => {
    setFormData({ email: '', full_name: '', project_url: '' })
    setErrors({})
    setIsLoading(false)
    setIsSuccess(false)
    onClose()
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {isSuccess ? 'Thank You!' : 'Interested in hearing more?'}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
            disabled={isLoading}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isSuccess ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <p className="text-gray-600 mb-4">
                Thank you for your interest! We'll be in touch soon.
              </p>
              <p className="text-sm text-gray-500">
                This window will close automatically...
              </p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-6">
                Share your details and we'll reach out to discuss how Accept All Fund can help your project.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 ${
                      errors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="your@email.com"
                    disabled={isLoading}
                  />
                  {errors.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Full Name Field */}
                <div>
                  <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    value={formData.full_name}
                    onChange={(e) => handleInputChange('full_name', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 ${
                      errors.full_name ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="John Doe"
                    disabled={isLoading}
                  />
                  {errors.full_name && (
                    <p className="text-red-600 text-sm mt-1">{errors.full_name}</p>
                  )}
                </div>

                {/* Project URL Field */}
                <div>
                  <label htmlFor="project_url" className="block text-sm font-medium text-gray-700 mb-1">
                    Project URL *
                  </label>
                  <input
                    type="url"
                    id="project_url"
                    value={formData.project_url}
                    onChange={(e) => handleInputChange('project_url', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-zinc-900 ${
                      errors.project_url ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="https://yourproject.com"
                    disabled={isLoading}
                  />
                  {errors.project_url && (
                    <p className="text-red-600 text-sm mt-1">{errors.project_url}</p>
                  )}
                </div>

                {/* General Error */}
                {errors.general && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-700 text-sm">{errors.general}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-zinc-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin mr-2" />
                      Submitting...
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default InterestModal
