import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Eye, Search, Filter, AlertCircle, CheckCircle } from 'lucide-react';

export default function AdminManageListings() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedListing, setSelectedListing] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    // Supabase'den verileri çekme
    // const fetchListings = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('listings')
    //       .select('*')
    //       .order('created_at', { ascending: false });
    //     
    //     if (error) throw error;
    //     setListings(data || []);
    //   } catch (error) {
    //     console.error('Listing yükleme hatası:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchListings();

    // Test verileri
    setTimeout(() => {
      setListings([
        {
          id: 1,
          title: 'Lüks Villa - Bodrum',
          price: '$2,500,000',
          location: 'Bodrum, Muğla',
          type: 'villa',
          status: 'aktif',
          views: 156,
          created_at: '2025-01-15',
          bedrooms: 4,
          bathrooms: 3,
          area: 350
        },
        {
          id: 2,
          title: 'Deniz Manzaralı Daire',
          price: '$1,800,000',
          location: 'Bodrum, Muğla',
          type: 'daire',
          status: 'aktif',
          views: 89,
          created_at: '2025-01-10',
          bedrooms: 3,
          bathrooms: 2,
          area: 200
        },
        {
          id: 3,
          title: 'Modern Konut',
          price: '$950,000',
          location: 'Bodrum, Muğla',
          type: 'konut',
          status: 'pasif',
          views: 45,
          created_at: '2025-01-05',
          bedrooms: 2,
          bathrooms: 2,
          area: 120
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Filtreleme mantığı
  useEffect(() => {
    let filtered = listings;

    // Arama filtrelemesi
    if (searchTerm) {
      filtered = filtered.filter(listing =>
        listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        listing.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Tür filtrelemesi
    if (filterType !== 'all') {
      filtered = filtered.filter(listing => listing.type === filterType);
    }

    // Durum filtrelemesi
    if (filterStatus !== 'all') {
      filtered = filtered.filter(listing => listing.status === filterStatus);
    }

    setFilteredListings(filtered);
  }, [listings, searchTerm, filterType, filterStatus]);

  const handleDelete = (listingId) => {
    setSelectedListing(listingId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      // Supabase silme işlemi
      // const { error } = await supabase
      //   .from('listings')
      //   .delete()
      //   .eq('id', selectedListing);
      //
      // if (error) throw error;

      setListings(listings.filter(l => l.id !== selectedListing));
      setShowDeleteModal(false);
      setSelectedListing(null);
      setSuccessMessage('İlan başarıyla silindi');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Silme hatası:', error);
    }
  };

  const toggleStatus = async (listingId) => {
    try {
      const listing = listings.find(l => l.id === listingId);
      const newStatus = listing.status === 'aktif' ? 'pasif' : 'aktif';

      // Supabase güncelleme
      // const { error } = await supabase
      //   .from('listings')
      //   .update({ status: newStatus })
      //   .eq('id', listingId);
      //
      // if (error) throw error;

      setListings(listings.map(l =>
        l.id === listingId ? { ...l, status: newStatus } : l
      ));
      setSuccessMessage(`İlan durumu güncellendi: ${newStatus}`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error('Güncelleme hatası:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/admin/panel" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">İlanları Yönet</h1>
            <p className="text-gray-600 mt-1">Mevcut ilanlarınızı düzenleyin veya silin</p>
          </div>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-green-700">{successMessage}</p>
          </div>
        )}

        {/* Filter Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="İlan ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Type Filter */}
            <div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Tüm Türler</option>
                <option value="villa">Villa</option>
                <option value="daire">Daire</option>
                <option value="arsa">Arsa</option>
                <option value="konut">Konut</option>
              </select>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="aktif">Aktif</option>
                <option value="pasif">Pasif</option>
                <option value="satis-yapildi">Satış Yapıldı</option>
              </select>
            </div>

            {/* Results Count */}
            <div className="flex items-center justify-center bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-900">
                {filteredListings.length} İlan Bulundu
              </p>
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="text-gray-600 mt-4">Yükleniyor...</p>
            </div>
          ) : filteredListings.length === 0 ? (
            <div className="p-8 text-center">
              <Filter size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-600 text-lg">İlan bulunamadı</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">İlan</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tür</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Fiyat</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Durum</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">Görüntüleme</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold text-gray-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredListings.map((listing) => (
                    <tr key={listing.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-gray-900">{listing.title}</p>
                          <p className="text-sm text-gray-600">{listing.location}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded-full">
                          {listing.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">{listing.price}</td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleStatus(listing.id)}
                          className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                            listing.status === 'aktif'
                              ? 'bg-green-100 text-green-700 hover:bg-green-200'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {listing.status === 'aktif' ? '✓ Aktif' : 'Pasif'}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-center">
                        <div className="flex items-center justify-center gap-2 text-blue-600">
                          <Eye size={16} />
                          <span className="font-semibold">{listing.views}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-2">
                          <Link
                            to={`/admin/edit-listing/${listing.id}`}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Düzenle"
                          >
                            <Edit2 size={18} />
                          </Link>
                          <button
                            onClick={() => handleDelete(listing.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Sil"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <AlertCircle className="text-red-600" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">İlanı Sil</h3>
                <p className="text-gray-600 text-sm mt-1">Bu işlem geri alınamaz</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
              >
                İptal
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 px-4 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}