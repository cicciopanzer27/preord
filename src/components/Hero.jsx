import { Button } from '@/components/ui/button.jsx'
import { ArrowDown } from 'lucide-react'
import heroImage from '../assets/o6.jpg'

const Hero = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative h-screen flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="NURA Olio d'Oliva" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full mb-6 backdrop-blur-sm">
            Preordini aperti fino al 15 Ottobre
          </span>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Tradizione Olivicola Sarda in Bottiglie di Design
          </h1>
          
          <p className="text-xl text-white/90 mb-8 leading-relaxed">
            NURA porta sulla tua tavola l'essenza della Sardegna attraverso oli d'oliva premium prodotti con metodi tradizionali e sostenibili.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              onClick={() => scrollToSection('preorder')}
              className="btn-primary text-lg px-8 py-6"
              size="lg"
            >
              Preordina Ora
            </Button>
            
            <Button 
              onClick={() => scrollToSection('why')}
              variant="outline" 
              className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
              size="lg"
            >
              Scopri di Più
            </Button>
          </div>
        </div>
      </div>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white text-center">
        <button 
          onClick={() => scrollToSection('why')}
          className="flex flex-col items-center animate-bounce"
        >
          <span className="text-sm mb-2">Scopri</span>
          <ArrowDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  )
}

export default Hero
