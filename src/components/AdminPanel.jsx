import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button.jsx'
import { Download, FileSpreadsheet, FileJson, BarChart3, Trash2, RefreshCw, Eye } from 'lucide-react'

const API_URL = 'http://localhost:5000/api';

const AdminPanel = () => {
  const [preorders, setPreorders] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPreorder, setSelectedPreorder] = useState(null);
  
  // Carica i preordini all'avvio
  useEffect(() => {
    fetchPreorders();
    fetchStats();
  }, []);
  
  // Funzione per caricare i preordini
  const fetchPreorders = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/preorders`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento dei preordini');
      }
      
      const data = await response.json();
      setPreorders(data);
      setError(null);
    } catch (err) {
      console.error('Errore:', err);
      setError('Impossibile caricare i preordini. Verifica che il server sia in esecuzione.');
    } finally {
      setLoading(false);
    }
  };
  
  // Funzione per caricare le statistiche
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_URL}/export/stats`);
      
      if (!response.ok) {
        throw new Error('Errore nel caricamento delle statistiche');
      }
      
      const data = await response.json();
      setStats(data);
    } catch (err) {
      console.error('Errore statistiche:', err);
      // Non impostiamo l'errore generale per non sovrascrivere eventuali errori dei preordini
    }
  };
  
  // Funzione per eliminare un preordine
  const deletePreorder = async (id) => {
    if (!confirm('Sei sicuro di voler eliminare questo preordine?')) {
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/preorders/${id}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) {
        throw new Error('Errore nell\'eliminazione del preordine');
      }
      
      // Aggiorna la lista dei preordini e le statistiche
      fetchPreorders();
      fetchStats();
    } catch (err) {
      console.error('Errore:', err);
      alert('Impossibile eliminare il preordine');
    }
  };
  
  // Funzione per esportare in CSV
  const exportCSV = () => {
    window.open(`${API_URL}/export/csv/download`, '_blank');
  };
  
  // Funzione per esportare in JSON
  const exportJSON = () => {
    window.open(`${API_URL}/export/json`, '_blank');
  };
  
  // Formatta la data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('it-IT');
  };
  
  // Calcola il totale di un preordine
  const calculateTotal = (products) => {
    const prices = {
      classic: 24.90,
      lentisco: 28.90,
      mirto: 28.90
    };
    
    return Object.keys(products).reduce((total, key) => {
      return total + (products[key] * prices[key]);
    }, 0).toFixed(2);
  };
  
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-[#343c24]">Pannello Amministratore</h2>
          <Button 
            onClick={() => {
              fetchPreorders();
              fetchStats();
            }}
            className="flex items-center space-x-2 bg-[#eef0e5] text-[#556231] hover:bg-[#dde2cc]"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Aggiorna</span>
          </Button>
        </div>
        
        {/* Statistiche */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-[#f8f9f3] p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-[#6b7a3d] mb-1">Totale Preordini</h3>
              <p className="text-2xl font-bold text-[#343c24]">{stats.totalPreorders}</p>
            </div>
            
            <div className="bg-[#f8f9f3] p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-[#6b7a3d] mb-1">Fatturato Totale</h3>
              <p className="text-2xl font-bold text-[#343c24]">€{stats.totalRevenue.toFixed(2)}</p>
            </div>
            
            <div className="bg-[#f8f9f3] p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-[#6b7a3d] mb-1">Prodotto Più Venduto</h3>
              <p className="text-2xl font-bold text-[#343c24]">
                {stats.productStats.classic.quantity >= stats.productStats.lentisco.quantity && 
                 stats.productStats.classic.quantity >= stats.productStats.mirto.quantity
                  ? 'Classico'
                  : stats.productStats.lentisco.quantity >= stats.productStats.mirto.quantity
                    ? 'Lentisco'
                    : 'Mirto'
                }
              </p>
            </div>
            
            <div className="bg-[#f8f9f3] p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-[#6b7a3d] mb-1">Bottiglie Vendute</h3>
              <p className="text-2xl font-bold text-[#343c24]">
                {stats.productStats.classic.quantity + 
                 stats.productStats.lentisco.quantity + 
                 stats.productStats.mirto.quantity}
              </p>
            </div>
          </div>
        )}
        
        {/* Pulsanti di esportazione */}
        <div className="flex flex-wrap gap-4 mb-8">
          <Button 
            onClick={exportCSV}
            className="flex items-center space-x-2 bg-[#6b7a3d] text-white hover:bg-[#556231]"
          >
            <FileSpreadsheet className="h-4 w-4" />
            <span>Esporta CSV</span>
          </Button>
          
          <Button 
            onClick={exportJSON}
            className="flex items-center space-x-2 bg-[#8c9c5a] text-white hover:bg-[#6b7a3d]"
          >
            <FileJson className="h-4 w-4" />
            <span>Esporta JSON</span>
          </Button>
          
          <a 
            href={`${API_URL}/export/stats`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-md bg-[#a7b47c] text-white hover:bg-[#8c9c5a]"
          >
            <BarChart3 className="h-4 w-4" />
            <span>API Statistiche</span>
          </a>
        </div>
        
        {/* Messaggio di errore */}
        {error && (
          <div className="bg-red-50 text-red-700 p-4 rounded-lg mb-8">
            {error}
          </div>
        )}
        
        {/* Tabella dei preordini */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#eef0e5]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#343c24] uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#343c24] uppercase tracking-wider">
                    Prodotti
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#343c24] uppercase tracking-wider">
                    Totale
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#343c24] uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#343c24] uppercase tracking-wider">
                    Azioni
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center">
                      <div className="flex justify-center items-center">
                        <div className="w-6 h-6 border-2 border-[#dde2cc] border-t-[#6b7a3d] rounded-full animate-spin"></div>
                        <span className="ml-2">Caricamento...</span>
                      </div>
                    </td>
                  </tr>
                ) : preorders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                      Nessun preordine trovato
                    </td>
                  </tr>
                ) : (
                  preorders.map((preorder) => (
                    <tr key={preorder.id} className="hover:bg-[#f8f9f3]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#343c24]">{preorder.name}</div>
                        <div className="text-sm text-gray-500">{preorder.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">
                          {preorder.products.classic > 0 && (
                            <div>Classico: {preorder.products.classic}</div>
                          )}
                          {preorder.products.lentisco > 0 && (
                            <div>Lentisco: {preorder.products.lentisco}</div>
                          )}
                          {preorder.products.mirto > 0 && (
                            <div>Mirto: {preorder.products.mirto}</div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-[#6b7a3d]">
                          €{preorder.total ? preorder.total.toFixed(2) : calculateTotal(preorder.products)}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(preorder.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setSelectedPreorder(preorder)}
                            className="text-[#6b7a3d] hover:text-[#556231]"
                          >
                            <Eye className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => deletePreorder(preorder.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Modal per visualizzare i dettagli del preordine */}
        {selectedPreorder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <h3 className="text-xl font-bold text-[#343c24] mb-4">Dettagli Preordine</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-[#6b7a3d] mb-1">Cliente</h4>
                  <p className="text-[#343c24] font-medium">{selectedPreorder.name}</p>
                  <p className="text-gray-600">{selectedPreorder.email}</p>
                  {selectedPreorder.phone && <p className="text-gray-600">{selectedPreorder.phone}</p>}
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#6b7a3d] mb-1">Data Preordine</h4>
                  <p className="text-[#343c24]">{formatDate(selectedPreorder.createdAt)}</p>
                </div>
              </div>
              
              {selectedPreorder.address && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#6b7a3d] mb-1">Indirizzo di Consegna</h4>
                  <p className="text-[#343c24]">{selectedPreorder.address}</p>
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-[#6b7a3d] mb-1">Prodotti</h4>
                <div className="bg-[#f8f9f3] rounded-lg p-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left text-[#343c24]">Prodotto</th>
                        <th className="text-center text-[#343c24]">Quantità</th>
                        <th className="text-right text-[#343c24]">Prezzo</th>
                        <th className="text-right text-[#343c24]">Totale</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedPreorder.products.classic > 0 && (
                        <tr>
                          <td className="py-2 text-[#343c24]">Olio Extra Vergine di Oliva</td>
                          <td className="py-2 text-center text-[#343c24]">{selectedPreorder.products.classic}</td>
                          <td className="py-2 text-right text-[#343c24]">€24,90</td>
                          <td className="py-2 text-right text-[#343c24]">
                            €{(selectedPreorder.products.classic * 24.90).toFixed(2)}
                          </td>
                        </tr>
                      )}
                      {selectedPreorder.products.lentisco > 0 && (
                        <tr>
                          <td className="py-2 text-[#343c24]">Olio Aromatizzato al Lentisco</td>
                          <td className="py-2 text-center text-[#343c24]">{selectedPreorder.products.lentisco}</td>
                          <td className="py-2 text-right text-[#343c24]">€28,90</td>
                          <td className="py-2 text-right text-[#343c24]">
                            €{(selectedPreorder.products.lentisco * 28.90).toFixed(2)}
                          </td>
                        </tr>
                      )}
                      {selectedPreorder.products.mirto > 0 && (
                        <tr>
                          <td className="py-2 text-[#343c24]">Olio Aromatizzato al Mirto</td>
                          <td className="py-2 text-center text-[#343c24]">{selectedPreorder.products.mirto}</td>
                          <td className="py-2 text-right text-[#343c24]">€28,90</td>
                          <td className="py-2 text-right text-[#343c24]">
                            €{(selectedPreorder.products.mirto * 28.90).toFixed(2)}
                          </td>
                        </tr>
                      )}
                      <tr className="border-t border-[#dde2cc]">
                        <td colSpan="3" className="py-2 text-right font-medium text-[#343c24]">Totale</td>
                        <td className="py-2 text-right font-bold text-[#6b7a3d]">
                          €{selectedPreorder.total ? selectedPreorder.total.toFixed(2) : calculateTotal(selectedPreorder.products)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {selectedPreorder.notes && (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-[#6b7a3d] mb-1">Note</h4>
                  <p className="text-[#343c24] bg-[#f8f9f3] p-3 rounded">{selectedPreorder.notes}</p>
                </div>
              )}
              
              <div className="flex justify-end">
                <Button 
                  onClick={() => setSelectedPreorder(null)}
                  className="bg-[#6b7a3d] text-white hover:bg-[#556231]"
                >
                  Chiudi
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default AdminPanel
