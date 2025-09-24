import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import WhySection from './components/WhySection'
import HowSection from './components/HowSection'
import WhatSection from './components/WhatSection'
import PreorderForm from './components/PreorderForm'
import Footer from './components/Footer'
import Admin from './components/Admin'
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulazione del caricamento iniziale
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#f8f9f3]">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[#6b7a3d] mb-4">NURA</h1>
          <div className="w-16 h-16 border-4 border-[#dde2cc] border-t-[#6b7a3d] rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <div className="min-h-screen bg-white">
            <Header />
            
            <main>
              <Hero />
              <WhySection />
              <HowSection />
              <WhatSection />
              <PreorderForm />
            </main>
            
            <Footer />
          </div>
        } />
        
        <Route path="/admin" element={<Admin />} />
        
        {/* Redirect any other route to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App
