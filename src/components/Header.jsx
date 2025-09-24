import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Menu, X } from 'lucide-react'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <h1 className={`text-2xl font-bold ${isScrolled ? 'text-[#343c24]' : 'text-white'}`}>
            NURA
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button 
            onClick={() => scrollToSection('why')} 
            className={`font-medium hover:text-[#8c9c5a] transition-colors ${
              isScrolled ? 'text-[#343c24]' : 'text-white'
            }`}
          >
            Perché
          </button>
          <button 
            onClick={() => scrollToSection('how')} 
            className={`font-medium hover:text-[#8c9c5a] transition-colors ${
              isScrolled ? 'text-[#343c24]' : 'text-white'
            }`}
          >
            Come
          </button>
          <button 
            onClick={() => scrollToSection('what')} 
            className={`font-medium hover:text-[#8c9c5a] transition-colors ${
              isScrolled ? 'text-[#343c24]' : 'text-white'
            }`}
          >
            Cosa
          </button>
          <Button 
            onClick={() => scrollToSection('preorder')}
            className="btn-primary"
          >
            Preordina Ora
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className={`h-6 w-6 ${isScrolled ? 'text-[#343c24]' : 'text-white'}`} />
          ) : (
            <Menu className={`h-6 w-6 ${isScrolled ? 'text-[#343c24]' : 'text-white'}`} />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <button 
              onClick={() => scrollToSection('why')} 
              className="font-medium text-[#343c24] hover:text-[#8c9c5a] transition-colors py-2"
            >
              Perché
            </button>
            <button 
              onClick={() => scrollToSection('how')} 
              className="font-medium text-[#343c24] hover:text-[#8c9c5a] transition-colors py-2"
            >
              Come
            </button>
            <button 
              onClick={() => scrollToSection('what')} 
              className="font-medium text-[#343c24] hover:text-[#8c9c5a] transition-colors py-2"
            >
              Cosa
            </button>
            <Button 
              onClick={() => scrollToSection('preorder')}
              className="btn-primary w-full"
            >
              Preordina Ora
            </Button>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
