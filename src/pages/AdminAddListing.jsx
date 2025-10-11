import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, AlertCircle, CheckCircle, User } from 'lucide-react';

export default function AdminAddListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  
  // Danışanlar listesi
  const consultants = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      title: 'Kıdemli Gayrimenkul Danışmanı',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100'
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      title: 'Gayrimenkul Uzmanı',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100'
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      title: 'Emlak Danışmanı',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    }
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    type: 'villa',
    bedrooms: '',
    bathrooms: '',
    area: '',
    features: '',
    images: [],
    status: 'aktif',
    consultantId: '' // Yeni alan
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...files]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validasyon
      if (!formData.title || !formData.price || !formData.location) {
        setError('Başlık, fiyat ve lokasyon gerekli');
        setLoading(false);
        return;
      }

      // Supabase'e veri gönderme (entegrasyon için hazır)
      // const { data, error: dbError } = await supabase
      //   .from('listings')
      //   .insert([{
      //     title: formData.title,
      //     description: formData.description,
      //     price: formData.price,
      //     location: formData.location,
      //     type: formData.type,
      //     bedrooms: parseInt(formData.bedrooms),
      //     bathrooms: parseInt(formData.bathrooms),
      //     area: parseInt(formData.area),
      //     features: formData.features,
      //     status: formData.status,
      //     consultant_id: formData.consultantId,
      //     created_at: new Date(),
      //   }]);

      // if (dbError) throw dbError;

      // Simüle edilmiş başarı
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          navigate('/admin/panel');
        }, 1500);
      }, 1000);
    } catch (err) {
      setError('İlan ekleme sırasında hata oluştu: ' + err.message);
      setLoading(false);
    }
  };

  // Seçili danışan bilgisi
  const selectedConsultant = consultants.find(c => c.id === parseInt(formData.consultantId));

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/admin/panel" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
            <ArrowLeft size={24} className="text-gray-600" />
          </Link>
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Yeni İlan Ekle</h1>
            <p className="text-gray-600 mt-1">Yeni bir gayrimenkul ilanı oluşturun</p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-green-700">İlan başarıyla eklendi! Yönlendiriliyorsunuz...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Form Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-8 space-y-8">
            {/* Temel Bilgiler */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Temel Bilgiler</h2>
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    İlan Başlığı *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Örn: Deniz Manzaralı Lüks Villa"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Fiyat *
                    </label>
                    <input
                      type="text"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="Örn: $2,500,000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Konum *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Örn: Bodrum, Muğla"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Tür
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  >
                    <option value="villa">Villa</option>
                    <option value="daire">Daire</option>
                    <option value="arsa">Arsa</option>
                    <option value="konut">Konut</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Açıklama
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="İlan hakkında detaylı bilgi yazın..."
                    rows="5"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Mülk Detayları */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Mülk Detayları</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Yatak Odası
                  </label>
                  <input
                    type="number"
                    name="bedrooms"
                    value={formData.bedrooms}
                    onChange={handleChange}
                    placeholder="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Banyo
                  </label>
                  <input
                    type="number"
                    name="bathrooms"
                    value={formData.bathrooms}
                    onChange={handleChange}
                    placeholder="2"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Alan (m²)
                  </label>
                  <input
                    type="number"
                    name="area"
                    value={formData.area}
                    onChange={handleChange}
                    placeholder="250"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Özellikler
                </label>
                <textarea
                  name="features"
                  value={formData.features}
                  onChange={handleChange}
                  placeholder="Havuz, Bahçe, Güvenlik Sistemi, Asansör vs."
                  rows="3"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Danışan Seçimi - YENİ BÖLÜM */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Danışan Bilgileri</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  İlan Danışanı Seçin
                </label>
                <select
                  name="consultantId"
                  value={formData.consultantId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={loading}
                >
                  <option value="">Danışan Seçiniz (Opsiyonel)</option>
                  {consultants.map((consultant) => (
                    <option key={consultant.id} value={consultant.id}>
                      {consultant.name} - {consultant.title}
                    </option>
                  ))}
                </select>
                <p className="text-sm text-gray-500 mt-2">
                  Bu ilanla ilgilenecek danışanı seçebilirsiniz
                </p>
              </div>

              {/* Seçili Danışan Önizleme */}
              {selectedConsultant && (
                <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={selectedConsultant.image}
                      alt={selectedConsultant.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <p className="font-bold text-gray-900">{selectedConsultant.name}</p>
                      <p className="text-sm text-blue-600">{selectedConsultant.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <User size={14} className="text-gray-500" />
                        <span className="text-xs text-gray-600">Seçili Danışan</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Görseller */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Görseller</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                <Upload className="mx-auto text-gray-400 mb-3" size={40} />
                <label className="cursor-pointer">
                  <span className="text-blue-600 font-semibold hover:text-blue-700">Görselleri yükleyin</span>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={loading}
                  />
                </label>
                <p className="text-gray-500 text-sm mt-2">veya sürükleyin ve bırakın</p>
              </div>

              {formData.images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-900 mb-3">
                    {formData.images.length} dosya seçildi
                  </p>
                  <div className="space-y-2">
                    {formData.images.map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-blue-50 p-3 rounded-lg">
                        <span className="text-sm text-gray-700">{file.name}</span>
                        <span className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Durum */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Yayın Ayarları</h2>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Durum
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  disabled={loading}
                >
                  <option value="aktif">Aktif (Yayında)</option>
                  <option value="pasif">Pasif (Taslak)</option>
                  <option value="satis-yapildi">Satış Yapıldı</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-gray-200 pt-8 flex gap-4">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Ekleniyor...' : 'İlanı Yayınla'}
              </button>
              <Link
                to="/admin/panel"
                className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-all text-center"
              >
                İptal
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}