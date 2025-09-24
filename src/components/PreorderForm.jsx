import { useState } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { API_BASE_URL } from '@/lib/utils.js'
import { Check, Loader2 } from 'lucide-react'

const API_URL = API_BASE_URL;

const PreorderForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    products: {
      classic: 0,
      lentisco: 0,
      mirto: 0
    },
    notes: ''
  })
  
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState(null)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    
    if (name.startsWith('products.')) {
      const productKey = name.split('.')[1]
      setFormData({
        ...formData,
        products: {
          ...formData.products,
          [productKey]: parseInt(value) || 0
        }
      })
    } else {
      setFormData({
        ...formData,
        [name]: value
      })
    }
  }
  
  const calculateTotal = () => {
    const prices = {
      classic: 24.90,
      lentisco: 28.90,
      mirto: 28.90
    }
    
    return Object.keys(formData.products).reduce((total, key) => {
      return total + (formData.products[key] * prices[key])
    }, 0).toFixed(2)
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name || !formData.email) {
      setError('Nome e email sono campi obbligatori')
      return
    }
    
    // Check if at least one product is selected
    const totalProducts = Object.values(formData.products).reduce((sum, qty) => sum + qty, 0)
    if (totalProducts === 0) {
      setError('Seleziona almeno un prodotto')
      return
    }
    
    setIsSubmitting(true)
    setError(null)
    
    try {
      const response = await fetch(`${API_URL}/preorders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Errore nella creazione del preordine');
      }
      
      setIsSubmitted(true)
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        products: {
          classic: 0,
          lentisco: 0,
          mirto: 0
        },
        notes: ''
      })
    } catch (err) {
      console.error('Errore:', err);
      setError('Si è verificato un errore. Verifica che il server sia in esecuzione.');
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <section id="preorder" className="bg-[#f8f9f3] py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-[#dde2cc] text-[#556231] rounded-full mb-4">
            PREORDINA ORA
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#343c24] mb-6">
            Assicurati la Tua Bottiglia
          </h2>
          <p className="text-xl text-stone-600 leading-relaxed">
            Preordina ora i nostri oli d'oliva premium. Produzione limitata, consegna prevista a Novembre 2025.
          </p>
        </div>
        
        {isSubmitted ? (
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#eef0e5] rounded-full mb-6">
              <Check className="h-8 w-8 text-[#6b7a3d]" />
            </div>
            <h3 className="text-2xl font-bold text-[#343c24] mb-4">Preordine Effettuato con Successo!</h3>
            <p className="text-stone-600 mb-6">
              Grazie per il tuo preordine. Abbiamo inviato una conferma via email con tutti i dettagli.
              Ti contatteremo quando i prodotti saranno pronti per la spedizione.
            </p>
            <Button 
              onClick={() => setIsSubmitted(false)}
              className="bg-[#6b7a3d] hover:bg-[#556231] text-white"
            >
              Effettua un Altro Preordine
            </Button>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-lg">
            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Colonna Sinistra - Dati Personali */}
                <div>
                  <h3 className="text-xl font-semibold text-[#343c24] mb-6">I Tuoi Dati</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-stone-600 mb-1">
                        Nome e Cognome *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[#dde2cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-stone-600 mb-1">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[#dde2cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                        required
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-stone-600 mb-1">
                        Telefono
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-[#dde2cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-stone-600 mb-1">
                        Indirizzo di Consegna
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-[#dde2cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label htmlFor="notes" className="block text-sm font-medium text-stone-600 mb-1">
                        Note Aggiuntive
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        rows="3"
                        className="w-full px-4 py-2 border border-[#dde2cc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                      ></textarea>
                    </div>
                  </div>
                </div>
                
                {/* Colonna Destra - Prodotti */}
                <div>
                  <h3 className="text-xl font-semibold text-[#343c24] mb-6">I Tuoi Prodotti</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 border border-[#dde2cc] rounded-lg">
                      <div>
                        <h4 className="font-medium text-[#343c24]">Extra Vergine di Oliva</h4>
                        <p className="text-sm text-stone-500">Classico - 250ml</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-[#6b7a3d]">€24,90</span>
                        <div className="w-20">
                          <input
                            type="number"
                            name="products.classic"
                            value={formData.products.classic}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-2 py-1 border border-[#dde2cc] rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-[#dde2cc] rounded-lg">
                      <div>
                        <h4 className="font-medium text-[#343c24]">Aromatizzato al Lentisco</h4>
                        <p className="text-sm text-stone-500">Speciale - 250ml</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-[#6b7a3d]">€28,90</span>
                        <div className="w-20">
                          <input
                            type="number"
                            name="products.lentisco"
                            value={formData.products.lentisco}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-2 py-1 border border-[#dde2cc] rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-[#dde2cc] rounded-lg">
                      <div>
                        <h4 className="font-medium text-[#343c24]">Aromatizzato al Mirto</h4>
                        <p className="text-sm text-stone-500">Speciale - 250ml</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span className="font-medium text-[#6b7a3d]">€28,90</span>
                        <div className="w-20">
                          <input
                            type="number"
                            name="products.mirto"
                            value={formData.products.mirto}
                            onChange={handleChange}
                            min="0"
                            className="w-full px-2 py-1 border border-[#dde2cc] rounded-lg text-center focus:outline-none focus:ring-2 focus:ring-[#8c9c5a]"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-8 p-4 bg-[#f8f9f3] rounded-lg">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-medium text-[#343c24]">Totale</span>
                        <span className="text-xl font-bold text-[#6b7a3d]">€{calculateTotal()}</span>
                      </div>
                      <p className="text-sm text-stone-500 mt-2">
                        * Pagamento alla consegna. Spedizione gratuita per ordini superiori a €50.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {error && (
                <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-lg">
                  {error}
                </div>
              )}
              
              <div className="mt-8 text-center">
                <Button 
                  type="submit"
                  className="bg-[#6b7a3d] hover:bg-[#556231] text-white text-lg px-8 py-6"
                  size="lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Elaborazione...
                    </>
                  ) : (
                    'Conferma Preordine'
                  )}
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  )
}

export default PreorderForm
