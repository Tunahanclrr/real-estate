import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Plus, Edit2, Trash2, Upload, Phone, Mail, CheckCircle, AlertCircle } from 'lucide-react';

export default function AdminConsultants() {
  const [consultants, setConsultants] = useState([
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      title: 'Kıdemli Gayrimenkul Danışmanı',
      phone: '+90 555 123 45 67',
      email: 'ahmet@kristalmarin.com',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
      experience: '10 yıl',
      specialization: 'Lüks Villalar',
      status: 'aktif'
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
      status: 'aktif'
    }
  ]);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingConsultant, setEditingConsultant] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    phone: '',
    email: '',
    experience: '',
    specialization: '',
    image: null,
    status: 'aktif'
  });
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.phone || !formData.email) {
      setError('Ad, telefon ve email gerekli');
      return;
    }

    if (editingConsultant) {
      setConsultants(prev => prev.map(c => 
        c.id === editingConsultant.id 
          ? { ...c, ...formData, image: formData.image ? URL.createObjectURL(formData.image) : c.image }
          : c
      ));
    } else {
      const newConsultant = {
        id: Date.now(),
        ...formData,
        image: formData.image ? URL.createObjectURL(formData.image) : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400'
      };
      setConsultants(prev => [...prev, newConsultant]);
    }

    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setShowAddModal(false);
      setEditingConsultant(null);
      setFormData({
        name: '',
        title: '',
        phone: '',
        email: '',
        experience: '',
        specialization: '',
        image: null,
        status: 'aktif'
      });
    }, 1500);
  };

  const handleEdit = (consultant) => {
    setEditingConsultant(consultant);
    setFormData({
      name: consultant.name,
      title: consultant.title,
      phone: consultant.phone,
      email: consultant.email,
      experience: consultant.experience,
      specialization: consultant.specialization,
      image: null,
      status: consultant.status
    });
    setShowAddModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Bu danışanı silmek istediğinize emin misiniz?')) {
      setConsultants(prev => prev.filter(c => c.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/admin/panel" className="p-2 hover:bg-gray-200 rounded-lg transition-colors">
              <ArrowLeft size={24} className="text-gray-600" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Danışan Yönetimi</h1>
              <p className="text-gray-600 mt-1">Gayrimenkul danışmanlarınızı yönetin</p>
            </div>
          </div>
          <button
            onClick={() => {
              setEditingConsultant(null);
              setFormData({
                name: '',
                title: '',
                phone: '',
                email: '',
                experience: '',
                specialization: '',
                image: null,
                status: 'aktif'
              });
              setShowAddModal(true);
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center gap-2"
          >
            <Plus size={20} />
            Yeni Danışan Ekle
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Toplam Danışan</p>
            <p className="text-3xl font-bold text-gray-900">{consultants.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Aktif Danışan</p>
            <p className="text-3xl font-bold text-green-600">
              {consultants.filter(c => c.status === 'aktif').length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-2">Pasif Danışan</p>
            <p className="text-3xl font-bold text-gray-400">
              {consultants.filter(c => c.status === 'pasif').length}
            </p>
          </div>
        </div>

        {/* Consultants Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {consultants.map((consultant) => (
            <div key={consultant.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48 bg-gradient-to-br from-blue-500 to-blue-600">
                <img
                  src={consultant.image}
                  alt={consultant.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    consultant.status === 'aktif' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-gray-100 text-gray-700'
                  }`}>
                    {consultant.status === 'aktif' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{consultant.name}</h3>
                <p className="text-blue-600 font-medium text-sm mb-4">{consultant.title}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone size={16} />
                    <span>{consultant.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail size={16} />
                    <span>{consultant.email}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Deneyim</p>
                    <p className="font-semibold text-gray-900">{consultant.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Uzmanlık</p>
                    <p className="font-semibold text-gray-900 text-sm">{consultant.specialization}</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(consultant)}
                    className="flex-1 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Edit2 size={16} />
                    Düzenle
                  </button>
                  <button
                    onClick={() => handleDelete(consultant.id)}
                    className="flex-1 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-semibold flex items-center justify-center gap-2"
                  >
                    <Trash2 size={16} />
                    Sil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add/Edit Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingConsultant ? 'Danışan Düzenle' : 'Yeni Danışan Ekle'}
                </h2>
              </div>

              <div className="p-6 space-y-6">
                {success && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                    <CheckCircle className="text-green-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-green-700">İşlem başarıyla tamamlandı!</p>
                  </div>
                )}

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                    <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
                    <p className="text-red-700">{error}</p>
                  </div>
                )}

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Profil Fotoğrafı
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <Upload className="mx-auto text-gray-400 mb-2" size={32} />
                    <label className="cursor-pointer">
                      <span className="text-blue-600 font-semibold hover:text-blue-700">Fotoğraf Yükle</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    {formData.image && (
                      <p className="text-sm text-gray-600 mt-2">{formData.image.name}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Örn: Ahmet Yılmaz"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Ünvan
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Örn: Kıdemli Gayrimenkul Danışmanı"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+90 555 123 45 67"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="ornek@kristalmarin.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Deneyim
                    </label>
                    <input
                      type="text"
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      placeholder="Örn: 10 yıl"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Uzmanlık Alanı
                    </label>
                    <input
                      type="text"
                      name="specialization"
                      value={formData.specialization}
                      onChange={handleChange}
                      placeholder="Örn: Lüks Villalar"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Durum
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="aktif">Aktif</option>
                      <option value="pasif">Pasif</option>
                    </select>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingConsultant ? 'Güncelle' : 'Ekle'}
                  </button>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingConsultant(null);
                      setError(null);
                    }}
                    className="flex-1 px-6 py-3 bg-gray-100 text-gray-900 font-semibold rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    İptal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}