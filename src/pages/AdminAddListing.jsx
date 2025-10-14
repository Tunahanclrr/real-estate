import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, AlertCircle, CheckCircle, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminAddListing() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [consultants, setConsultants] = useState([]);
  const [uploadingImages, setUploadingImages] = useState(false);

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
    consultantId: ''
  });

  // Danışanları yükle
  useEffect(() => {
    loadConsultants();
  }, []);

  const loadConsultants = async () => {
    try {
      const { data, error } = await supabase
        .from('consultants')
        .select('id, name, title, image_url, status')
        .eq('status', 'aktif')
        .order('name');

      if (error) throw error;
      setConsultants(data || []);
    } catch (err) {
      console.error('Danışanlar yüklenemedi:', err);
    }
  };

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

  const uploadImages = async (listingId) => {
    if (formData.images.length === 0) return [];

    setUploadingImages(true);
    const uploadedUrls = [];

    try {
      for (let i = 0; i < formData.images.length; i++) {
        const file = formData.images[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${listingId}_${i}_${Date.now()}.${fileExt}`;
        const filePath = `listings/${fileName}`;

        // Supabase Storage'a yükle
        const { error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        // Public URL al
        const { data: urlData } = supabase.storage
          .from('listing-images')
          .getPublicUrl(filePath);

        uploadedUrls.push({
          url: urlData.publicUrl,
          order: i,
          is_primary: i === 0
        });
      }

      return uploadedUrls;
    } catch (err) {
      console.error('Görsel yükleme hatası:', err);
      throw new Error('Görseller yüklenemedi');
    } finally {
      setUploadingImages(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Validasyon
      if (!formData.title || !formData.price || !formData.location) {
        throw new Error('Başlık, fiyat ve lokasyon gerekli');
      }

      console.log('📝 İlan ekleniyor...');

      // 1. İlanı ekle
      const { data: listing, error: listingError } = await supabase
        .from('listings')
        .insert([{
          title: formData.title,
          description: formData.description || null,
          price: formData.price,
          location: formData.location,
          type: formData.type,
          bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
          bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
          area: formData.area ? parseInt(formData.area) : null,
          features: formData.features || null,
          status: formData.status,
          consultant_id: formData.consultantId || null,
        }])
        .select()
        .single();

      if (listingError) throw listingError;

      console.log('✅ İlan eklendi:', listing.id);

      // 2. Görselleri yükle
      if (formData.images.length > 0) {
        console.log('📷 Görseller yükleniyor...');
        const imageUrls = await uploadImages(listing.id);

        // 3. Görsel kayıtlarını ekle
        const imageRecords = imageUrls.map(img => ({
          listing_id: listing.id,
          image_url: img.url,
          display_order: img.order,
          is_primary: img.is_primary
        }));

        const { error: imageError } = await supabase
          .from('listing_images')
          .insert(imageRecords);

        if (imageError) {
          console.error('Görsel kayıtları eklenemedi:', imageError);
        } else {
          console.log('✅ Görseller eklendi');
        }
      }

      // Başarı mesajı
      setSuccess(true);
      setTimeout(() => {
        navigate('/admin/manage-listings');
      }, 1500);

    } catch (err) {
      console.error('❌ İlan ekleme hatası:', err);
      setError(err.message || 'İlan eklenirken bir hata oluştu');
      setLoading(false);
    }
  };

  // Seçili danışan bilgisi
  const selectedConsultant = consultants.find(c => c.id === formData.consultantId);

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
        <form onSubmit={handleSubmit}>
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
                      required
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
                        required
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
                        required
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
                    placeholder="Havuz, Bahçe, Güvenlik Sistemi, Asansör (virgülle ayırın)"
                    rows="3"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Danışan Seçimi */}
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
                        src={selectedConsultant.image_url}
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
                  type="submit"
                  disabled={loading || uploadingImages}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {uploadingImages ? 'Görseller Yükleniyor...' : loading ? 'Ekleniyor...' : 'İlanı Yayınla'}
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
        </form>
      </div>
    </div>
  );
}