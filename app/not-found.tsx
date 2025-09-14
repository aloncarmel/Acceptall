import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rainbow-bg rounded-lg flex items-center justify-center mx-auto mb-4">
            <span className="text-white font-bold text-xl">⌘</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Looks like this page doesn't exist. But don't worry, we're still here to back indie entrepreneurs!
          </p>
        </div>
        <Link 
          href="/"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
