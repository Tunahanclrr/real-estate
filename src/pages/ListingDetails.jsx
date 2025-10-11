import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, MapPin, Home, Maximize2, Bath, Bed, Mail, Phone, Heart, Share2, Calendar, User } from 'lucide-react';

export default function ListingDetails() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Supabase'den veri çekme
    // const fetchListing = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('listings')
    //       .select('*')
    //       .eq('id', id)
    //       .single();
    //     
    //     if (error) throw error;
    //     setListing(data);
    //   } catch (error) {
    //     console.error('Listing yükleme hatası:', error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    // fetchListing();

    // Test verileri
    setTimeout(() => {
      setListing({
        id: 1,
        title: 'Deniz Manzaralı Lüks Villa - Bodrum',
        price: '$2,500,000',
        location: 'Bodrum, Muğla',
        type: 'Villa',
        status: 'Satılık',
        views: 156,
        created_at: '2025-01-15',
        bedrooms: 4,
        bathrooms: 3,
        area: 350,
        yearBuilt: 2018,
        features: ['Havuz', 'Jakuzi', 'Bahçe', 'Güvenlik Sistemi', 'Asansör', 'Otopark', 'Merkezi Isıtma'],
        description: `Bu muhteşem deniz manzaralı villa, Bodrum'un en prestijli bölgesinde yer almaktadır. Modern mimarisi ve lüks tasarımıyla dikkat çeken bu mülk, geniş yaşam alanları ve en son teknoloji ile donatılmıştır.

Özel bahçesinde özel havuz ve jakuzi bulunmakta, deniz manzarası her odadan görülmektedir. Dört yatak odası, üç banyosu, geniş oturma alanları ve şef mutfağı ile ideal bir yaşam alanı sunmaktadır.

Güvenlikli kompleks içerisinde yer alan bu villa, 24/7 güvenlik hizmetine sahiptir. Bodrum'un tüm sosyal imkanlarına yakın konumda, denize sadece 500 metre uzaklıkta yer almaktadır.`,
        images: [
          'https://images.unsplash.com/photo-1570129477492-45c003666880?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1512917774080-9b274b5ce460?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80',
          'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80'
        ],
        agent: {
          name: 'Ahmet Yılmaz',
          email: 'ahmet@kristalmarin.com',
          phone: '+90 555 123 4567',
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80'
        }
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? listing.images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === listing.images.length - 1 ? 0 : prev + 1));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    // Supabase'ye mesaj kaydetme
    // const { error } = await supabase
    //   .from('inquiries')
    //   .insert([{
    //     listing_id: id,
    //     name: contactForm.name,
    //     email: contactForm.email,
    //     phone: contactForm.phone,
    //     message: contactForm.message,
    //     created_at: new Date()
    //   }]);

    setFormSubmitted(true);
    setContactForm({ name: '', email: '', phone: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white pt-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 text-lg">İlan bulunamadı</p>
          <Link to="/ilanlar" className="text-blue-600 hover:text-blue-700 font-semibold mt-4 inline-block">
            İlanlara Geri Dön
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-20 pb-12">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-700">Ana Sayfa</Link>
            <span className="text-gray-400">/</span>
            <Link to="/ilanlar" className="text-blue-600 hover:text-blue-700">İlanlar</Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{listing.title}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative bg-gray-900 rounded-2xl overflow-hidden aspect-video">
                <img
                  src={listing.images[currentImageIndex]}
                  alt={`${listing.title} - ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Image Counter */}
                <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm font-semibold">
                  {currentImageIndex + 1} / {listing.images.length}
                </div>

                {/* Navigation Buttons */}
                {listing.images.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-gray-900 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={handleNextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 hover:bg-white text-gray-900 rounded-full flex items-center justify-center transition-all duration-300"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                {/* Action Buttons */}
             
              </div>

              {/* Thumbnail Gallery */}
              {listing.images.length > 1 && (
                <div className="grid grid-cols-4 gap-3 mt-4">
                  {listing.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        currentImageIndex === idx ? 'border-blue-600' : 'border-transparent opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Property Info */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{listing.title}</h1>
              <div className="flex items-center gap-2 text-gray-600 mb-4">
                <MapPin size={20} className="text-blue-600" />
                <span className="text-lg">{listing.location}</span>
              </div>

              {/* Price */}
              <div className="py-4 border-y border-gray-200 mb-6">
                <p className="text-gray-600 text-sm mb-1">Fiyat</p>
                <p className="text-4xl font-bold text-blue-600">{listing.price}</p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <Bed className="mx-auto text-blue-600 mb-2" size={24} />
                  <p className="text-gray-600 text-sm mb-1">Yatak Odası</p>
                  <p className="text-2xl font-bold text-gray-900">{listing.bedrooms}</p>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <Bath className="mx-auto text-green-600 mb-2" size={24} />
                  <p className="text-gray-600 text-sm mb-1">Banyo</p>
                  <p className="text-2xl font-bold text-gray-900">{listing.bathrooms}</p>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <Maximize2 className="mx-auto text-purple-600 mb-2" size={24} />
                  <p className="text-gray-600 text-sm mb-1">Alan</p>
                  <p className="text-2xl font-bold text-gray-900">{listing.area}m²</p>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <Calendar className="mx-auto text-orange-600 mb-2" size={24} />
                  <p className="text-gray-600 text-sm mb-1">Yıl</p>
                  <p className="text-2xl font-bold text-gray-900">{listing.yearBuilt}</p>
                </div>
              </div>

              {/* Details Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pb-8 border-b border-gray-200">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Tür</p>
                  <p className="font-semibold text-gray-900">{listing.type}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Durum</p>
                  <p className="font-semibold text-gray-900">
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">{listing.status}</span>
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Görüntülenme</p>
                  <p className="font-semibold text-gray-900">{listing.views}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Açıklama</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">{listing.description}</p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Özellikler</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {listing.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-gray-900 font-medium">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Danışman</h3>
              <div className="text-center mb-6">
                <img
                  src={listing.agent.image}
                  alt={listing.agent.name}
                  className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-900">{listing.agent.name}</h4>
              </div>

              <div className="space-y-3 pb-6 border-b border-gray-200">
                <a
                  href={`tel:${listing.agent.phone}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Phone size={20} />
                  Ara
                </a>
                <a
                  href={`mailto:${listing.agent.email}`}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  <Mail size={20} />
                  Email Gönder
                </a>
              </div>

              <div className="text-sm text-gray-600 pt-4">
                <p className="mb-2">📞 {listing.agent.phone}</p>
                <p>✉️ {listing.agent.email}</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Bilgi İsteyin</h3>

              {formSubmitted && (
                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                  ✓ Mesajınız başarıyla gönderildi!
                </div>
              )}

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Adınız</label>
                  <input
                    type="text"
                    name="name"
                    value={contactForm.name}
                    onChange={handleContactChange}
                    placeholder="Adınız"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactForm.email}
                    onChange={handleContactChange}
                    placeholder="Email@example.com"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Telefon</label>
                  <input
                    type="tel"
                    name="phone"
                    value={contactForm.phone}
                    onChange={handleContactChange}
                    placeholder="+90 555 123 4567"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-1">Mesaj</label>
                  <textarea
                    name="message"
                    value={contactForm.message}
                    onChange={handleContactChange}
                    placeholder="Mesajınız..."
                    rows="4"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  ></textarea>
                </div>

                <button
                  onClick={handleContactSubmit}
                  className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Gönder
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}