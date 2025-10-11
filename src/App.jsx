// App.js - Danışan rotası eklenmiş hali
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Menu, X, LogOut } from 'lucide-react';
import HomePage from './pages/HomePage';
import ListingsPage from './pages/ListingsPage';
import ListingDetails from './pages/ListingDetails';
import AdminLogin from './pages/AdminLogin';
import AdminPanel from './pages/AdminPanel';
import AdminAddListing from './pages/AdminAddListing';
import AdminManageListings from './pages/AdminManageListings';
import AdminConsultants from './pages/AdminConsultants'; // YENİ

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(!!window.adminToken);
  const [adminEmail, setAdminEmail] = useState(window.adminEmail || '');

  useEffect(() => {
    if (window.adminToken && window.adminEmail) {
      setIsAdmin(true);
      setAdminEmail(window.adminEmail);
    }
  }, []);

  const handleLogout = () => {
    delete window.adminToken;
    delete window.adminEmail;
    setIsAdmin(false);
    setAdminEmail('');
    setIsMenuOpen(false);
  };

  const handleAdminLogin = (email, token) => {
    window.adminEmail = email;
    window.adminToken = token;
    setIsAdmin(true);
    setAdminEmail(email);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white">
        {/* Navigation */}
        <nav className="fixed w-full top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-black">K</span>
                </div>
                <div className="hidden sm:block">
                  <p className="text-gray-900 font-bold text-sm">KRISTAL</p>
                  <p className="text-blue-600 font-semibold text-xs">Marin Gayrimenkul</p>
                </div>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Ana Sayfa
                </Link>
                <Link to="/ilanlar" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  İlanlar
                </Link>
                {isAdmin ? (
                  <>
                    <Link to="/admin/panel" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                      Admin Panel
                    </Link>
                    <div className="flex items-center gap-3 pl-8 border-l border-gray-200">
                      <span className="text-sm text-gray-600">{adminEmail}</span>
                      <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-semibold flex items-center gap-2"
                      >
                        <LogOut size={18} />
                        Çıkış
                      </button>
                    </div>
                  </>
                ) : (
                  <Link to="/admin" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Admin Girişi
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-gray-700 p-2">
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden pb-4 border-t border-gray-200">
                <Link to="/" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  Ana Sayfa
                </Link>
                <Link to="/ilanlar" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                  İlanlar
                </Link>
                {isAdmin ? (
                  <>
                    <Link to="/admin/panel" className="block py-2 text-gray-700 hover:text-blue-600" onClick={() => setIsMenuOpen(false)}>
                      Admin Panel
                    </Link>
                    <div className="py-2 border-t border-gray-200 mt-2">
                      <p className="text-sm text-gray-600 mb-2">{adminEmail}</p>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold flex items-center justify-center gap-2"
                      >
                        <LogOut size={18} />
                        Çıkış Yap
                      </button>
                    </div>
                  </>
                ) : (
                  <Link to="/admin" className="block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-center" onClick={() => setIsMenuOpen(false)}>
                    Admin Girişi
                  </Link>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-grow pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/ilanlar" element={<ListingsPage />} />
            <Route path="/listing/:id" element={<ListingDetails />} />
            <Route path="/admin" element={<AdminLogin onLogin={handleAdminLogin} />} />
            <Route path="/admin/panel" element={isAdmin ? <AdminPanel /> : <Navigate to="/admin" />} />
            <Route path="/admin/add-listing" element={isAdmin ? <AdminAddListing /> : <Navigate to="/admin" />} />
            <Route path="/admin/manage-listings" element={isAdmin ? <AdminManageListings /> : <Navigate to="/admin" />} />
            <Route path="/admin/consultants" element={isAdmin ? <AdminConsultants /> : <Navigate to="/admin" />} /> {/* YENİ ROTA */}
          </Routes>
        </main>

        {/* Footer */}
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-black">K</span>
                  </div>
                  <p className="font-bold text-white">KRISTAL Marin</p>
                </div>
                <p className="text-sm">Bodrum'un en güvenilir gayrimenkul danışmanı</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Hızlı Linkler</h4>
                <ul className="space-y-2 text-sm">
                  <li><Link to="/" className="hover:text-blue-400 transition-colors">Anasayfa</Link></li>
                  <li><Link to="/ilanlar" className="hover:text-blue-400 transition-colors">İlanlar</Link></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">İletişim</h4>
                <p className="text-sm mb-2">+90 555 123 45 67</p>
                <p className="text-sm">info@kristalmarin.com</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Takip Edin</h4>
                <div className="flex gap-4">
                  <a href="#" className="hover:text-blue-400 transition-colors">Facebook</a>
                  <a href="#" className="hover:text-blue-400 transition-colors">Instagram</a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-sm">
              © 2025 Kristal Marin Gayrimenkul. Tüm hakları saklıdır.
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;