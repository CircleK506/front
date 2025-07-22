import React from 'react'
import { createRoot } from 'react-dom/client'
import Dashboard from './production-crm-dashboard'
import './styles/globals.css'

// Environment configuration setup for browser
const setupEnvironment = () => {
  // Create a global env object for environment variables
  window.env = {
    NEXT_PUBLIC_SUPABASE_URL: process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.REACT_APP_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WORDPRESS_URL: process.env.REACT_APP_WORDPRESS_URL || process.env.NEXT_PUBLIC_WORDPRESS_URL,
    NEXT_PUBLIC_WORDPRESS_API_KEY: process.env.REACT_APP_WORDPRESS_API_KEY || process.env.NEXT_PUBLIC_WORDPRESS_API_KEY
  }
}

// Error boundary for the entire application
class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null, errorInfo: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    })
    
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Application Error:', error, errorInfo)
    }
  }

  handleReload = () => {
    window.location.reload()
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          padding: '2rem',
          textAlign: 'center',
          backgroundColor: '#f8fafc',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
        }}>
          <div style={{
            maxWidth: '500px',
            padding: '2rem',
            backgroundColor: 'white',
            borderRadius: '0.5rem',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h1 style={{ color: '#dc2626', marginBottom: '1rem' }}>
              Application Error
            </h1>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Something went wrong while loading the CRM dashboard.
            </p>
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details style={{ 
                marginBottom: '1.5rem', 
                textAlign: 'left',
                backgroundColor: '#f1f5f9',
                padding: '1rem',
                borderRadius: '0.25rem',
                fontSize: '0.875rem'
              }}>
                <summary style={{ cursor: 'pointer', marginBottom: '0.5rem', fontWeight: '600' }}>
                  Error Details
                </summary>
                <pre style={{ 
                  whiteSpace: 'pre-wrap', 
                  color: '#dc2626',
                  fontSize: '0.75rem'
                }}>
                  {this.state.error.toString()}
                  {this.state.errorInfo.componentStack}
                </pre>
              </details>
            )}
            <button
              onClick={this.handleReload}
              style={{
                backgroundColor: '#3b82f6',
                color: 'white',
                border: 'none',
                padding: '0.75rem 1.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '0.875rem'
              }}
            >
              Reload Application
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Main App component
const App = () => {
  return (
    <AppErrorBoundary>
      <Dashboard />
    </AppErrorBoundary>
  )
}

// Application initialization
const initializeApp = () => {
  try {
    // Setup environment variables
    setupEnvironment()
    
    // Get the root element
    const container = document.getElementById('root')
    
    if (!container) {
      throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.')
    }
    
    // Create React root and render the application
    const root = createRoot(container)
    
    // Add loading indicator while React initializes
    container.innerHTML = `
      <div style="
        display: flex; 
        align-items: center; 
        justify-content: center; 
        min-height: 100vh; 
        background-color: #f8fafc;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      ">
        <div style="text-align: center;">
          <div style="
            width: 40px; 
            height: 40px; 
            border: 3px solid #e2e8f0; 
            border-top: 3px solid #3b82f6; 
            border-radius: 50%; 
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem auto;
          "></div>
          <p style="color: #64748b; margin: 0;">Loading Enterprise CRM Dashboard...</p>
        </div>
        <style>
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
      </div>
    `
    
    // Render the app
    root.render(<App />)
    
    // Log successful initialization in development
    if (process.env.NODE_ENV === 'development') {
      console.log('🚀 Enterprise CRM Dashboard initialized successfully')
      console.log('Environment configuration:', {
        supabaseConfigured: !!(window.env.NEXT_PUBLIC_SUPABASE_URL && window.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
        wordpressConfigured: !!(window.env.NEXT_PUBLIC_WORDPRESS_URL && window.env.NEXT_PUBLIC_WORDPRESS_API_KEY)
      })
    }
    
  } catch (error) {
    console.error('Failed to initialize application:', error)
    
    // Fallback error display
    const container = document.getElementById('root')
    if (container) {
      container.innerHTML = `
        <div style="
          display: flex; 
          align-items: center; 
          justify-content: center; 
          min-height: 100vh; 
          padding: 2rem;
          background-color: #f8fafc;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        ">
          <div style="
            max-width: 400px;
            text-align: center;
            padding: 2rem;
            background-color: white;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          ">
            <h1 style="color: #dc2626; margin-bottom: 1rem;">Initialization Error</h1>
            <p style="color: #64748b; margin-bottom: 1.5rem;">
              Failed to start the CRM dashboard. Please check the console for more details.
            </p>
            <button 
              onclick="window.location.reload()" 
              style="
                background-color: #3b82f6;
                color: white;
                border: none;
                padding: 0.75rem 1.5rem;
                border-radius: 0.375rem;
                cursor: pointer;
                font-weight: 500;
              "
            >
              Reload Page
            </button>
          </div>
        </div>
      `
    }
  }
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp)
} else {
  initializeApp()
}

// Hot module replacement support for development
if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./production-crm-dashboard', () => {
    console.log('🔄 Hot reloading dashboard component...')
    initializeApp()
  })
}

// Export for testing purposes
export default App
