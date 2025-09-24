import { Check, Droplet, Sun, Thermometer } from 'lucide-react'
import howImage from '../assets/o2.jpg'

const HowSection = () => {
  return (
    <section id="how" className="how-section py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-[#dde2cc] text-[#556231] rounded-full mb-4">
            COME
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#343c24] mb-6">
            Artigianalità e Innovazione
          </h2>
          <p className="text-xl text-stone-600 leading-relaxed">
            Uniamo metodi tradizionali tramandati da generazioni con tecniche moderne per creare oli d'oliva che preservano tutto il sapore e le proprietà nutritive delle olive sarde.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 space-y-8">
            <div className="bg-[#f8f9f3] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#343c24] mb-4 flex items-center">
                <Droplet className="h-5 w-5 text-[#6b7a3d] mr-2" />
                Estrazione a Freddo
              </h3>
              <p className="text-stone-600 mb-4">
                Utilizziamo esclusivamente il metodo di estrazione a freddo per preservare tutte le proprietà organolettiche e i nutrienti delle olive.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-[#8c9c5a] mr-2" />
                  <span className="text-stone-600">Temperatura controllata sotto i 27°C</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-[#8c9c5a] mr-2" />
                  <span className="text-stone-600">Preservazione degli antiossidanti naturali</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#f8f9f3] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#343c24] mb-4 flex items-center">
                <Sun className="h-5 w-5 text-[#6b7a3d] mr-2" />
                Raccolta Selettiva
              </h3>
              <p className="text-stone-600 mb-4">
                Le olive vengono raccolte a mano nel momento ottimale di maturazione per garantire il perfetto equilibrio di sapore e proprietà nutritive.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-[#8c9c5a] mr-2" />
                  <span className="text-stone-600">Raccolta manuale per non danneggiare i frutti</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-[#8c9c5a] mr-2" />
                  <span className="text-stone-600">Lavorazione entro 24 ore dalla raccolta</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-[#f8f9f3] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-[#343c24] mb-4 flex items-center">
                <Thermometer className="h-5 w-5 text-[#6b7a3d] mr-2" />
                Aromatizzazione Naturale
              </h3>
              <p className="text-stone-600 mb-4">
                Per le nostre varietà aromatizzate, utilizziamo esclusivamente erbe e bacche sarde, infuse naturalmente nell'olio per creare sapori unici.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-[#8c9c5a] mr-2" />
                  <span className="text-stone-600">Lentisco e mirto selvatico della Sardegna</span>
                </li>
                <li className="flex items-center">
                  <Check className="h-4 w-4 text-[#8c9c5a] mr-2" />
                  <span className="text-stone-600">Nessun aroma artificiale o additivo</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="order-1 md:order-2 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img 
                src={howImage} 
                alt="Oli NURA artigianali" 
                className="w-full h-auto"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end">
                <div className="p-8">
                  <span className="text-white/90 text-sm">Processo artigianale NURA</span>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-[#dde2cc]">
              <div className="text-center">
                <div className="text-lg font-bold text-[#6b7a3d]">100%</div>
                <div className="text-sm text-stone-600">Artigianale</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HowSection
