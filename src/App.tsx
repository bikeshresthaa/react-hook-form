import './App.css'
import { RouterProvider } from '@tanstack/react-router'
import AuthProvider from './auth/AuthContext'
import { router } from './router'
import { useAuth } from './auth/UseAuth'


function InnerApp() {
  const auth = useAuth();
  return <RouterProvider router={router} context={{ auth }} />
}

function App() {

  return (
    <div className='max-h-full flex flex-col justify-center items-center'>

      <AuthProvider>
        <InnerApp />
      </AuthProvider>
    </div>
  )
}

export default App
