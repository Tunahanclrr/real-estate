import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Bed, Bath, Maximize2, Heart, Search, Filter, ChevronDown } from 'lucide-react';

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 5000000]);
  const [favorites, setFavorites] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // Supabase'den verileri çekme
    // const fetchListings = async () => {
    //   try {
    //     const { data, error } = await supabase
    //       .from('listings')
    //       .select('*')
    //       .eq('status', 'aktif')
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
          title: 'Deniz Manzaralı Lüks Villa - Bodrum',
          price: '$2,500,000',
          priceNum: 2500000,
          location: 'Bodrum, Muğla',
          type: 'villa',
          bedrooms: 4,
          bathrooms: 3,
          area: 350,
          image: 'https://images.unsplash.com/photo-1570129477492-45c003666880?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          views: 156
        },
        {
          id: 2,
          title: 'Modern Denizkenarlı Daire',
          price: '$1,800,000',
          priceNum: 1800000,
          location: 'Bodrum, Muğla',
          type: 'daire',
          bedrooms: 3,
          bathrooms: 2,
          area: 200,
          image: 'https://images.unsplash.com/photo-1512917774080-9b274b5ce460?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          views: 89
        },
        {
          id: 3,
          title: 'Konforlu Aile Evi',
          price: '$950,000',
          priceNum: 950000,
          location: 'Bodrum, Muğla',
          type: 'konut',
          bedrooms: 2,
          bathrooms: 2,
          area: 120,
          image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          views: 45
        },
        {
          id: 4,
          title: 'Prestijli İnşaat Arsası',
          price: '$500,000',
          priceNum: 500000,
          location: 'Bodrum, Muğla',
          type: 'arsa',
          bedrooms: 0,
          bathrooms: 0,
          area: 800,
          image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          views: 67
        },
        {
          id: 5,
          title: 'Dış Mekan Havuzlu Villa',
          price: '$3,200,000',
          priceNum: 3200000,
          location: 'Bodrum, Muğla',
          type: 'villa',
          bedrooms: 5,
          bathrooms: 4,
          area: 450,
          image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          views: 234
        },
        {
          id: 6,
          title: 'Şehir Merkezinde Ticari Gayrimenkul',
          price: '$1,200,000',
          priceNum: 1200000,
          location: 'Bodrum, Muğla',
          type: 'daire',
          bedrooms: 3,
          bathrooms: 2,
          area: 180,
          image: 'https://images.unsplash.com/photo-1493857671505-72967e0e0760?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
          views: 112
        }
      ]);
      setLoading(false);
    }, 500);
  }, []);

  // Filtreleme
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
    if (selectedType !== 'all') {
      filtered = filtered.filter(listing => listing.type === selectedType);
    }

    // Fiyat filtrelemesi
    filtered = filtered.filter(listing =>
      listing.priceNum >= priceRange[0] && listing.priceNum <= priceRange[1]
    );

    setFilteredListings(filtered);
  }, [listings, searchTerm, selectedType, priceRange]);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Gayrimenkul İlanları</h1>
          <p className="text-gray-600">Bodrum ve çevresinde {listings.length} aktif ilan</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Filters */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4 lg:hidden">
                <h3 className="text-lg font-bold text-gray-900">Filtreler</h3>
                <button onClick={() => setShowFilters(!showFilters)} className="text-blue-600">
                  <ChevronDown className={`transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Arama</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="İlan ara..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Type Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Tür</label>
                  <div className="space-y-2">
                    {[
                      { value: 'all', label: 'Tüm Türler' },
                      { value: 'villa', label: 'Villa' },
                      { value: 'daire', label: 'Daire' },
                      { value: 'konut', label: 'Konut' },
                      { value: 'arsa', label: 'Arsa' }
                    ].map(type => (
                      <label key={type.value} className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="type"
                          value={type.value}
                          checked={selectedType === type.value}
                          onChange={(e) => setSelectedType(e.target.value)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500"
                        />
                        <span className="ml-3 text-gray-700">{type.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">Fiyat Aralığı</label>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Min: ${(priceRange[0] / 1000000).toFixed(1)}M</p>
                      <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="100000"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-600 mb-2">Max: ${(priceRange[1] / 1000000).toFixed(1)}M</p>
                      <input
                        type="range"
                        min="0"
                        max="5000000"
                        step="100000"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                      />
                    </div>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedType('all');
                    setPriceRange([0, 5000000]);
                  }}
                  className="w-full px-4 py-2 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Filtreleri Sıfırla
                </button>
              </div>
            </div>
          </div>

          {/* Listings */}
          <div className="lg:col-span-3">
            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
                <p className="text-gray-600">Yükleniyor...</p>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
                <Filter size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-600 text-lg">İlan bulunamadı</p>
                <p className="text-gray-500 text-sm mt-2">Filtreleri değiştirerek yeniden deneyin</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Results Count */}
                <div className="flex items-center justify-between mb-6">
                  <p className="text-gray-600 font-semibold">
                    {filteredListings.length} ilan bulundu
                  </p>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredListings.map((listing) => (
                    <Link
                      key={listing.id}
                      to={`/listing/${listing.id}`}
                      className="bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 group"
                    >
                      {/* Image Container */}
                      <div className="relative overflow-hidden bg-gray-100 aspect-video">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />

                        {/* Favorite Button */}
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            toggleFavorite(listing.id);
                          }}
                          className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-md ${
                            favorites.includes(listing.id)
                              ? 'bg-red-500/80 hover:bg-red-600 text-white'
                              : 'bg-white/80 hover:bg-white text-gray-900'
                          }`}
                        >
                          <Heart
                            size={20}
                            fill={favorites.includes(listing.id) ? 'currentColor' : 'none'}
                          />
                        </button>

                        {/* Type Badge */}
                        <div className="absolute top-3 left-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold capitalize">
                          {listing.type}
                        </div>

                        {/* Views Badge */}
                        <div className="absolute bottom-3 left-3 bg-black/50 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-semibold">
                          👁️ {listing.views}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {listing.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-2 text-gray-600 text-sm mb-4">
                          <MapPin size={16} className="text-blue-600 flex-shrink-0" />
                          <span>{listing.location}</span>
                        </div>

                        {/* Price */}
                        <div className="mb-4 pb-4 border-b border-gray-200">
                          <p className="text-2xl font-bold text-blue-600">{listing.price}</p>
                        </div>

                        {/* Features */}
                        <div className="grid grid-cols-3 gap-3">
                          {listing.type !== 'arsa' ? (
                            <>
                              <div className="text-center">
                                <div className="flex items-center justify-center w-8 h-8 bg-blue-50 rounded-lg mx-auto mb-1">
                                  <Bed size={16} className="text-blue-600" />
                                </div>
                                <p className="text-xs text-gray-600">{listing.bedrooms}</p>
                                <p className="text-xs font-semibold text-gray-900">Yatak</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center w-8 h-8 bg-green-50 rounded-lg mx-auto mb-1">
                                  <Bath size={16} className="text-green-600" />
                                </div>
                                <p className="text-xs text-gray-600">{listing.bathrooms}</p>
                                <p className="text-xs font-semibold text-gray-900">Banyo</p>
                              </div>
                              <div className="text-center">
                                <div className="flex items-center justify-center w-8 h-8 bg-purple-50 rounded-lg mx-auto mb-1">
                                  <Maximize2 size={16} className="text-purple-600" />
                                </div>
                                <p className="text-xs text-gray-600">{listing.area}m²</p>
                                <p className="text-xs font-semibold text-gray-900">Alan</p>
                              </div>
                            </>
                          ) : (
                            <div className="col-span-3 text-center">
                              <div className="flex items-center justify-center w-8 h-8 bg-orange-50 rounded-lg mx-auto mb-1">
                                <Maximize2 size={16} className="text-orange-600" />
                              </div>
                              <p className="text-xs text-gray-600">{listing.area}m²</p>
                              <p className="text-xs font-semibold text-gray-900">Alan</p>
                            </div>
                          )}
                        </div>

                        {/* View Details Button */}
                        <button className="w-full mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          Detayları Gör
                        </button>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}