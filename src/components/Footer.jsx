import { Instagram, Facebook, Mail, Phone } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-[#343c24] text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrizione */}
          <div className="md:col-span-2">
            <h2 className="text-3xl font-bold mb-4">NURA</h2>
            <p className="text-white/80 mb-6 max-w-md">
              Tradizione olivicola sarda in bottiglie di design. 
              Oli d'oliva premium prodotti con metodi artigianali e sostenibili.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="mailto:info@nura-olio.it" className="text-white/80 hover:text-white transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#c5cda8]">Esplora</h3>
            <ul className="space-y-2">
              <li>
                <a href="#why" className="text-white/80 hover:text-white transition-colors">
                  La Nostra Storia
                </a>
              </li>
              <li>
                <a href="#how" className="text-white/80 hover:text-white transition-colors">
                  Processo Produttivo
                </a>
              </li>
              <li>
                <a href="#what" className="text-white/80 hover:text-white transition-colors">
                  I Nostri Prodotti
                </a>
              </li>
              <li>
                <a href="#preorder" className="text-white/80 hover:text-white transition-colors">
                  Preordina Ora
                </a>
              </li>
            </ul>
          </div>
          
          {/* Contatti */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#c5cda8]">Contatti</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-2 text-[#8c9c5a]" />
                <a href="mailto:info@nura-olio.it" className="text-white/80 hover:text-white transition-colors">
                  info@nura-olio.it
                </a>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-2 text-[#8c9c5a]" />
                <a href="tel:+390123456789" className="text-white/80 hover:text-white transition-colors">
                  +39 0123 456789
                </a>
              </li>
              <li className="text-white/80">
                Località Su Pranu<br />
                08100 Nuoro (NU)<br />
                Sardegna, Italia
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/60 text-sm mb-4 md:mb-0">
            &copy; {currentYear} NURA Olio d'Oliva. Tutti i diritti riservati.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Termini e Condizioni
            </a>
            <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
