import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, AlertCircle, Loader } from 'lucide-react';

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      // Supabase Auth ile giriş (örnek implementasyon)
      // const { data, error: authError } = await supabase.auth.signInWithPassword({
      //   email: email,
      //   password: password,
      // });

      // if (authError) {
      //   setError(authError.message);
      //   setLoading(false);
      //   return;
      // }

      // Geçici test giriş (Supabase entegre olunca kaldırılacak)
      if (!email || !password) {
        setError('Email ve şifre gerekli');
        setLoading(false);
        return;
      }

      if (email.includes('@') && password.length >= 6) {
        // Simüle edilmiş başarılı giriş
        const token = 'temp_token_' + Date.now();
        onLogin(email, token);
        setTimeout(() => {
          navigate('/admin/panel');
        }, 500);
      } else {
        setError('Geçerli email ve şifre girin');
        setLoading(false);
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen tekrar deneyin.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-black text-2xl">K</span>
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Girişi</h1>
            <p className="text-gray-600 text-sm mt-2">Kristal Marin Gayrimenkul Panel</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="text-red-600 flex-shrink-0 mt-0.5" size={20} />
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-900 mb-2">
                Email Adresiniz
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@kristalmarin.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-900 mb-2">
                Şifre
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-8 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader size={20} className="animate-spin" />
                  <span>Giriş yapılıyor...</span>
                </>
              ) : (
                <span>Giriş Yap</span>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">ya da</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Test Hesabı:</span><br />
              Email: admin@test.com<br />
              Şifre: test123456
            </p>
          </div>

          {/* Back Link */}
          <div className="text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>

        {/* Footer Info */}
        <p className="text-center text-gray-600 text-xs mt-6">
          Henüz hesabınız yok mu? <span className="text-gray-700 font-semibold">Yöneticiye başvurun</span>
        </p>
      </div>
    </div>
  );
}