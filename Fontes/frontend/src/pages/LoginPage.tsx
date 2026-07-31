import React, { useState } from 'react';
import { User, Building2, LogIn, Eye, EyeOff } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'patient' | 'institution'>('patient');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex bg-white font-sans">
      {/* Lado Esquerdo - Branding */}
      <div className="hidden lg:flex w-1/2 bg-primary/10 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           {/* Placeholder para a imagem de fundo médica */}
           <img src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80" className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-md text-left">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white shadow-lg shadow-primary/30">
              <LogIn size={28} />
            </div>
            <span className="text-3xl font-bold text-gray-900 tracking-tight">MedicApp</span>
          </div>
          <h1 className="text-5xl font-extrabold text-gray-900 leading-tight mb-6">
            Cuide da sua saúde com clareza e precisão.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Sua plataforma integrada para gestão de saúde, facilitando a conexão entre pacientes e especialistas com segurança e inovação.
          </p>
        </div>
      </div>

      {/* Lado Direito - Formulário */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo</h2>
          <p className="text-gray-500 mb-8">Acesse sua conta para continuar.</p>

          {/* Abas */}
          <div className="flex border-b border-gray-100 mb-8">
            <button 
              onClick={() => setActiveTab('patient')}
              className={`flex-1 pb-4 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'patient' ? "border-primary text-primary" : "border-transparent text-gray-400"
              }`}
            >
              PACIENTE
            </button>
            <button 
              onClick={() => setActiveTab('institution')}
              className={`flex-1 pb-4 text-sm font-bold transition-all border-b-2 ${
                activeTab === 'institution' ? "border-primary text-primary" : "border-transparent text-gray-400"
              }`}
            >
              INSTITUIÇÃO
            </button>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">
                {activeTab === 'patient' ? 'CPF OU E-MAIL' : 'CNPJ OU E-MAIL'}
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder={activeTab === 'patient' ? "000.000.000-00" : "00.000.000/0001-00"}
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest">SENHA</label>
                <button type="button" className="text-xs font-bold text-primary hover:underline">Esqueci minha senha</button>
              </div>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••"
                  className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 pl-10 pr-12 outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                />
                <LogIn className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button className="w-full bg-primary text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Entrar <LogIn size={18} />
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="relative flex items-center justify-center mb-6">
              <div className="w-full border-t border-gray-100"></div>
              <span className="absolute bg-white px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Novo por aqui?</span>
            </div>
            <button className="w-full border-2 border-primary/20 text-primary py-3 rounded-xl font-bold hover:bg-primary/5 transition-all">
              Criar conta
            </button>
          </div>

          <footer className="mt-12 text-center">
            <p className="text-xs text-gray-400 mb-2">© 2024 MedicApp. Todos os direitos reservados.</p>
            <div className="flex justify-center gap-4 text-xs font-bold text-gray-500">
              <a href="#" className="hover:text-primary">Termos de Uso</a>
              <a href="#" className="hover:text-primary">Privacidade</a>
              <a href="#" className="hover:text-primary">Suporte</a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};