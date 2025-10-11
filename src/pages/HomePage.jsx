import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, Key, Building2, BarChart3, MapPin, Phone, Mail, Star } from 'lucide-react';

export default function HomePage() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Danışanlar verisi
  const consultants = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      title: 'Kıdemli Gayrimenkul Danışmanı',
      phone: '+90 555 123 45 67',
      email: 'ahmet@kristalmarin.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      experience: '10 yıl',
      specialization: 'Lüks Villalar',
      rating: 5.0,
      sales: 150
    },
    {
      id: 2,
      name: 'Ayşe Demir',
      title: 'Gayrimenkul Uzmanı',
      phone: '+90 555 234 56 78',
      email: 'ayse@kristalmarin.com',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
      experience: '7 yıl',
      specialization: 'Satılık Daireler',
      rating: 4.9,
      sales: 120
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      title: 'Emlak Danışmanı',
      phone: '+90 555 345 67 89',
      email: 'mehmet@kristalmarin.com',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
      experience: '5 yıl',
      specialization: 'Arsalar & Yatırım',
      rating: 4.8,
      sales: 85
    }
  ];

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form gönderiliyor:', contactForm);
    setFormSubmitted(true);
    setContactForm({ name: '', email: '', message: '' });
    setTimeout(() => setFormSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-block">
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  ✨ Bodrum'un En İyi Gayrimenkul Danışmanı
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Hayalinizdeki <span className="text-blue-600">Evi Bulun</span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Bodrum ve çevresinde satılık, kiralık lüks konutlar, villalar ve arsalar. Profesyonel danışmanlık ile hayalınız gerçek olsun.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/ilanlar"
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  İlanları Keşfet
                  <ArrowRight size={20} />
                </Link>
                <a 
                  href="#consultants"
                  className="px-8 py-4 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all duration-300 font-semibold text-center"
                >
                  Danışanlarımız
                </a>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-gray-200">
                <div>
                  <p className="text-4xl font-bold text-blue-600">500+</p>
                  <p className="text-gray-600 text-sm mt-2">Mülk Portföyü</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-600">15+</p>
                  <p className="text-gray-600 text-sm mt-2">Yıl Deneyim</p>
                </div>
                <div>
                  <p className="text-4xl font-bold text-blue-600">1000+</p>
                  <p className="text-gray-600 text-sm mt-2">Mutlu Müşteri</p>
                </div>
              </div>
            </div>

            <div className="relative h-96 md:h-full min-h-96">
              <img 
                src="https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                alt="Lüks Ev"
                className="w-full h-full object-cover rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl max-w-xs hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Home className="text-blue-600" size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Profesyonel Hizmet</p>
                    <p className="text-gray-600 text-sm">24/7 Destek</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Hizmetlerimiz</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Gayrimenkul yolculuğunuzun her adımında yanınızdayız
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                icon: Home,
                title: "Satılık Gayrimenkuller",
                description: "Bodrum ve çevresinde satılık lüks konutlar, villalar, arsalar ve daha fazlası.",
                color: "blue"
              },
              {
                icon: Key,
                title: "Kiralık Gayrimenkuller",
                description: "Kısa ve uzun dönem kiralık konutlar, yazlık villalar ve modern daireler.",
                color: "emerald"
              },
              {
                icon: Building2,
                title: "Emlak Danışmanlığı",
                description: "Profesyonel danışmanlarımız ile gayrimenkul alım-satım süreçlerinizde yanınız.",
                color: "amber"
              },
              {
                icon: BarChart3,
                title: "Portföy Yönetimi",
                description: "Gayrimenkul yatırımlarınızı yönetin ve maksimum getiri elde edin.",
                color: "red"
              }
            ].map((service, idx) => {
              const IconComp = service.icon;
              const colorClass = {
                blue: "bg-blue-100 text-blue-600",
                emerald: "bg-emerald-100 text-emerald-600",
                amber: "bg-amber-100 text-amber-600",
                red: "bg-red-100 text-red-600"
              }[service.color];

              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`p-8 rounded-2xl border-2 border-gray-100 transition-all duration-300 ${
                    hoveredCard === idx ? 'shadow-xl border-blue-200 bg-blue-50' : 'hover:shadow-lg'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-xl flex items-center justify-center mb-6 ${colorClass}`}>
                    <IconComp size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Properties Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Öne Çıkan İlanlar</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Bodrum'un en güzel mülklerini keşfedin
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[1, 2, 3].map((item) => (
              <Link 
                key={item}
                to="/ilanlar"
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={`https://images.unsplash.com/photo-1570129477492-45c003666880?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60&seed=${item}`}
                    alt="Mülk"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                    Satılık
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Lüks Villa</h3>
                  <div className="flex items-center gap-2 text-gray-600 mb-4">
                    <MapPin size={18} />
                    <p>Bodrum, Muğla</p>
                  </div>
                  <p className="text-gray-600 text-sm mb-6">
                    Deniz manzaralı, 4 yatak odalı lüks villa. Modern tasarım ve yüksek kalite.
                  </p>
                  <div className="flex justify-between items-center">
                    <p className="text-3xl font-bold text-blue-600">$2.5M</p>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold text-sm">
                      Detay
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center">
            <Link 
              to="/ilanlar"
              className="inline-block px-8 py-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
            >
              Tüm İlanları Gör
            </Link>
          </div>
        </div>
      </section>

      {/* Consultants Section */}
      <section id="consultants" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Uzman Danışanlarımız</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Alanında uzman, deneyimli danışmanlarımız sizlere en iyi hizmeti sunmak için burada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {consultants.map((consultant) => (
              <div
                key={consultant.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
              >
                <div className="relative h-80 bg-gradient-to-br from-blue-500 to-blue-600 overflow-hidden">
                  <img
                    src={consultant.image}
                    alt={consultant.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full flex items-center gap-1">
                    <Star size={16} className="text-yellow-500 fill-yellow-500" />
                    <span className="font-bold text-gray-900">{consultant.rating}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-1">{consultant.name}</h3>
                  <p className="text-blue-600 font-semibold mb-4">{consultant.title}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Phone size={16} className="text-blue-600" />
                      </div>
                      <span className="text-sm">{consultant.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Mail size={16} className="text-blue-600" />
                      </div>
                      <span className="text-sm">{consultant.email}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Deneyim</p>
                      <p className="font-bold text-gray-900">{consultant.experience}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Satış</p>
                      <p className="font-bold text-gray-900">{consultant.sales}+</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold text-gray-900">Uzmanlık:</span> {consultant.specialization}
                    </p>
                  </div>

                  <a
                    href={`tel:${consultant.phone}`}
                    className="mt-6 w-full block text-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    İletişime Geç
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-5xl font-bold text-gray-900 mb-6">Biz Kimiz</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Kristal Marin Gayrimenkul, 15 yıldır Bodrum ve çevresinde gayrimenkul sektöründe hizmet vermektedir. 
                Müşteri memnuniyeti ve profesyonellik bizim temel ilkelerimizdir.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                500+ mülk portföyü ve 1000+ mutlu müşteri ile Bodrum'un en güvenilir emlak danışmanlık firmasıyız.
              </p>
              <button className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2">
                Daha Fazla Bilgi Al
                <ArrowRight size={20} />
              </button>
            </div>
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=60"
              alt="Hakkımızda"
              className="w-full h-96 object-cover rounded-2xl shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-4">Bize Ulaşın</h2>
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Hayalinizdeki evi bulalım. Bizimle iletişime geçin.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center text-white">
              <Phone size={40} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Telefon</h3>
              <p className="text-blue-100">+90 555 123 45 67</p>
              <p className="text-blue-100 text-sm">Pazartesi - Cuma: 09:00 - 18:00</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center text-white">
              <Mail size={40} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-blue-100">info@kristalmarin.com</p>
              <p className="text-blue-100 text-sm">24 Saat İçinde Cevap</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl text-center text-white">
              <MapPin size={40} className="mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Adres</h3>
              <p className="text-blue-100">Bodrum, Muğla</p>
              <p className="text-blue-100 text-sm">Türkiye</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-xl">
            {formSubmitted && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                ✓ Mesajınız başarıyla gönderildi!
              </div>
            )}

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input 
                  type="text" 
                  name="name"
                  value={contactForm.name}
                  onChange={handleFormChange}
                  placeholder="Adınız" 
                  className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <input 
                  type="email" 
                  name="email"
                  value={contactForm.email}
                  onChange={handleFormChange}
                  placeholder="Email Adresiniz" 
                  className="px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <textarea 
                name="message"
                value={contactForm.message}
                onChange={handleFormChange}
                placeholder="Mesajınız" 
                rows={5}
                className="w-full px-6 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              ></textarea>
              <button 
                onClick={handleFormSubmit}
                className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
              >
                Mesaj Gönder
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}