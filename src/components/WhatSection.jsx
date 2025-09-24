import { Button } from '@/components/ui/button.jsx'
import { ArrowRight } from 'lucide-react'
import productImage1 from '../assets/o4.jpg'
import productImage2 from '../assets/o5.jpg'
import productImage3 from '../assets/o1.jpg'

const WhatSection = () => {
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="what" className="what-section py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-[#dde2cc] text-[#556231] rounded-full mb-4">
            COSA
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#343c24] mb-6">
            I Nostri Oli Premium
          </h2>
          <p className="text-xl text-stone-600 leading-relaxed">
            La nostra collezione di oli d'oliva sardi, dal classico extra vergine alle varianti aromatizzate con erbe locali, porta sulla tua tavola l'autentico sapore della Sardegna.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Prodotto 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-[1.02]">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={productImage1} 
                alt="NURA Olio Extra Vergine di Oliva" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm">
                  Classico
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#343c24] mb-2">
                Extra Vergine di Oliva
              </h3>
              <p className="text-stone-600 mb-4">
                Il nostro olio extra vergine di oliva classico, dal sapore intenso e fruttato con note di carciofo e mandorla.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#6b7a3d]">€24,90</span>
                <span className="text-sm text-stone-500">250ml</span>
              </div>
            </div>
          </div>
          
          {/* Prodotto 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-[1.02]">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={productImage2} 
                alt="NURA Olio Aromatizzato al Lentisco" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm">
                  Aromatizzato
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#343c24] mb-2">
                Aromatizzato al Lentisco
              </h3>
              <p className="text-stone-600 mb-4">
                Olio extra vergine arricchito con lentisco selvatico sardo, per un sapore balsamico e note di resina.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#6b7a3d]">€28,90</span>
                <span className="text-sm text-stone-500">250ml</span>
              </div>
            </div>
          </div>
          
          {/* Prodotto 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-transform hover:transform hover:scale-[1.02]">
            <div className="relative h-64 overflow-hidden">
              <img 
                src={productImage3} 
                alt="NURA Olio Aromatizzato al Mirto" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-4 left-4">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-white/20 text-white rounded-full backdrop-blur-sm">
                  Aromatizzato
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold text-[#343c24] mb-2">
                Aromatizzato al Mirto
              </h3>
              <p className="text-stone-600 mb-4">
                Olio extra vergine infuso con bacche di mirto sardo, per un sapore unico con note fruttate e speziate.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-[#6b7a3d]">€28,90</span>
                <span className="text-sm text-stone-500">250ml</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-lg text-stone-600 mb-6">
            Edizione limitata 2025 - Preordini aperti fino al 15 Ottobre
          </p>
          <Button 
            onClick={() => scrollToSection('preorder')}
            className="btn-primary text-lg px-8 py-6"
            size="lg"
          >
            Preordina Ora
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  )
}

export default WhatSection
