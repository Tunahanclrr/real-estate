import { Link } from 'react-router-dom';
import { Plus, Edit, BarChart3, Users } from 'lucide-react'; // Users eklendi

export default function AdminPanel() {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-3">Admin Panel</h1>
          <p className="text-xl text-gray-600">Hoş geldiniz! Sistemi yönetmek için aşağıdaki seçenekleri kullanabilirsiniz.</p>
        </div>

        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Hızlı İşlemler</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Yeni İlan Ekle */}
            <Link
              to="/admin/add-listing"
              className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Plus size={32} />
                </div>
                <span className="text-4xl font-bold opacity-20">01</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Yeni İlan Ekle</h3>
              <p className="text-blue-100">Yeni bir gayrimenkul ilanı oluşturun ve sisteme ekleyin</p>
            </Link>

            {/* İlanları Yönet */}
            <Link
              to="/admin/manage-listings"
              className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Edit size={32} />
                </div>
                <span className="text-4xl font-bold opacity-20">02</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">İlanları Yönet</h3>
              <p className="text-emerald-100">Mevcut ilanları görüntüleyin, düzenleyin veya silin</p>
            </Link>

            {/* Danışanları Yönet - YENİ */}
            <Link
              to="/admin/consultants"
              className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={32} />
                </div>
                <span className="text-4xl font-bold opacity-20">03</span>
              </div>
              <h3 className="text-2xl font-bold mb-2">Danışanları Yönet</h3>
              <p className="text-purple-100">Gayrimenkul danışmanlarını ekleyin ve yönetin</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}