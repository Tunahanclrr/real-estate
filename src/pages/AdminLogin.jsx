import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Lock, AlertCircle, Loader } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function AdminLogin({ onLogin }) {
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      console.log('🔐 Supabase Auth ile giriş denemesi:', fullName);

      let email = fullName;
      
      if (!email.includes('@')) {
        const adminMap = {
          'marin emlak': 'marin@kristalmarin.com',
          'marin': 'marin@kristalmarin.com',
          'admin': 'admin@kristalmarin.com'
        };
        
        email = adminMap[fullName.toLowerCase().trim()] || `${fullName.toLowerCase().replace(/\s+/g, '')}@kristalmarin.com`;
      }

      console.log('📧 Email:', email);

      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (authError) {
        console.error('❌ Auth hatası:', authError);
        
        if (authError.message.includes('Invalid login credentials')) {
          throw new Error('Email veya şifre hatalı');
        } else if (authError.message.includes('Email not confirmed')) {
          throw new Error('Email adresi onaylanmamış. Dashboard\'dan onaylayın.');
        } else {
          throw new Error(authError.message);
        }
      }

      if (!authData.user || !authData.session) {
        throw new Error('Giriş başarısız oldu');
      }

      console.log('✅ Supabase Auth başarılı!');

      const { data: adminUser } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', authData.user.email)
        .eq('is_active', true)
        .single();

      const fullNameToUse = adminUser?.full_name || 
                           authData.user.user_metadata?.full_name || 
                           authData.user.email.split('@')[0];

      console.log('✅ Giriş başarılı:', fullNameToUse);

      onLogin(fullNameToUse, authData.session.access_token, authData.user.email);
      navigate('/admin/panel');

    } catch (err) {
      console.error('❌ Login error:', err);
      
      let errorMessage = 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.';
      
      if (err.message.includes('Email veya şifre hatalı')) {
        errorMessage = 'Email veya şifre hatalı. Lütfen tekrar deneyin.';
      } else if (err.message.includes('Email not confirmed')) {
        errorMessage = 'Email adresi onaylanmamış. Supabase Dashboard\'dan onaylayın.';
      } else if (err.message.includes('too many requests')) {
        errorMessage = 'Çok fazla deneme yaptınız. Lütfen birkaç dakika sonra tekrar deneyin.';
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 px-4 py-12">
      <div className="w-full max-w-md">
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
            <div>
              <label htmlFor="fullName" className="block text-sm font-semibold text-gray-900 mb-2">
                Kullanıcı Adı veya Email
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Marin Emlak veya marin@kristalmarin.com"
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  required
                  disabled={loading}
                  autoComplete="username"
                />
              </div>
            </div>

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
                  autoComplete="current-password"
                  minLength={6}
                />
              </div>
            </div>

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

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">Bilgi</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <span className="font-semibold">Test Hesabı:</span><br />
              Email: <span className="font-mono">marin@kristalmarin.com</span><br />
              Şifre: <span className="font-mono">marin123456</span>
            </p>
          </div>

          <div className="text-center">
            <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors">
              ← Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}