import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import AdminPanel from './AdminPanel'
import { Lock } from 'lucide-react'

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  
  const handleLogin = (e) => {
    e.preventDefault()
    
    // Password semplice per demo
    if (password === 'nura2025') {
      setIsAuthenticated(true)
      setError(null)
    } else {
      setError('Password non valida')
    }
  }
  
  if (!isAuthenticated) {
    return (
      <section className="bg-[#f8f9f3] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#eef0e5] rounded-full mb-4">
                <Lock className="h-8 w-8 text-[#6b7a3d]" />
              </div>
              <h2 className="text-2xl font-bold text-[#343c24]">Area Amministratore</h2>
              <p className="text-stone-600 mt-2">Inserisci la password per accedere</p>
            </div>
            
            <form onSubmit={handleLogin}>
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-medium text-stone-600 mb-1">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#dde2cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                  required
                />
              </div>
              
              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit"
                className="w-full bg-[#6b7a3d] hover:bg-[#556231] text-white"
              >
                Accedi
              </Button>
              
              <div className="mt-4 text-center text-xs text-stone-500">
                <p>Per la demo, usa la password: nura2025</p>
              </div>
            </form>
          </div>
        </div>
      </section>
    )
  }
  
  return <AdminPanel />
}

export default Admin
