import { Heart, Leaf, Award } from 'lucide-react'
import whyImage from '../assets/o3.jpg'

const WhySection = () => {
  return (
    <section id="why" className="why-section py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-[#dde2cc] text-[#556231] rounded-full mb-4">
            PERCHÉ
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#343c24] mb-6">
            Preserviamo la Tradizione Olivicola Sarda
          </h2>
          <p className="text-xl text-stone-600 leading-relaxed">
            NURA nasce dalla passione per la nostra terra e dalla volontà di condividere con il mondo l'eccellenza dell'olio d'oliva sardo, prodotto secondo metodi tradizionali tramandati da generazioni.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl">
            <img 
              src={whyImage} 
              alt="Oli NURA con vista sul mare sardo" 
              className="w-full h-auto"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
              <div className="p-8">
                <span className="text-white/90 text-sm">Oli NURA - Sardegna</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-8">
            <div className="flex items-start space-x-4">
              <div className="bg-[#eef0e5] p-3 rounded-full">
                <Heart className="h-6 w-6 text-[#6b7a3d]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#343c24] mb-2">Passione per la Tradizione</h3>
                <p className="text-stone-600">
                  Ogni bottiglia NURA racchiude secoli di tradizione olivicola sarda, preservando metodi di coltivazione e raccolta che rispettano i ritmi della natura.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#eef0e5] p-3 rounded-full">
                <Leaf className="h-6 w-6 text-[#6b7a3d]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#343c24] mb-2">Sostenibilità Ambientale</h3>
                <p className="text-stone-600">
                  Crediamo in un'agricoltura che rispetti l'ambiente. I nostri uliveti sono coltivati con metodi biologici che preservano la biodiversità e il territorio sardo.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="bg-[#eef0e5] p-3 rounded-full">
                <Award className="h-6 w-6 text-[#6b7a3d]" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#343c24] mb-2">Eccellenza Senza Compromessi</h3>
                <p className="text-stone-600">
                  Non ci accontentiamo del "buono", puntiamo all'eccellenza. Ogni bottiglia NURA è il risultato di una selezione rigorosa delle migliori olive sarde.
                </p>
              </div>
            </div>
            
            <div className="pt-4">
              <blockquote className="italic text-[#556231] border-l-4 border-[#8c9c5a] pl-4">
                "NURA non è solo un olio, è la nostra missione di portare l'autentico sapore della Sardegna nelle case di tutto il mondo."
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WhySection
