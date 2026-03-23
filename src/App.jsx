import React, { useState, useEffect, useRef, useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    AudioLines,
    Music,
    Brain,
    Salad,
    LifeBuoy,
    User,
    LogOut,
    Menu,
    X,
    Lock,
    Download,
    AlertCircle,
    ThumbsUp,
    ThumbsDown,
    CheckCircle2,
    Maximize,
    Minimize,
    ExternalLink,
    Play,
    Pause,
    VolumeX,
    Gift,
    ArrowLeft,
    Lightbulb,
    Home,
    Search,
    Compass,
    Settings,
    Clock,
    Flame,
    Copy,
    Share2,
    LayoutDashboard
} from 'lucide-react';
import PWAOnboarding from './components/PWAOnboarding';

// Support Email
const SUPPORT_EMAIL = "soporte@frecuenciadavinci.com";

// Helper for progress tracking
const markAsComplete = (id) => {
    const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
    if (!completed.includes(id)) {
        const updated = [...completed, id];
        localStorage.setItem('completed_modules', JSON.stringify(updated));
        // Dispatch event for other components to update
        window.dispatchEvent(new Event('storage'));
    }
};

// --- HELPERS ---
const Separator = () => (
    <div className="flex items-center justify-center py-10 opacity-30">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></div>
        <div className="mx-4 text-[#C9A84C] text-lg select-none">✦</div>
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"></div>
    </div>
);

const SplashScreen = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(onComplete, 3000);
        return () => clearTimeout(timer);
    }, [onComplete]);

    return (
        <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-[#0A0E1A] flex flex-col items-center justify-center p-6"
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="relative"
            >
                <div className="absolute inset-0 bg-[#C9A84C] blur-[60px] opacity-20 rounded-full animate-pulse"></div>
                <AudioLines className="w-24 h-24 text-[#C9A84C] relative z-10" />
            </motion.div>
            
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="mt-8 text-center"
            >
                <h1 className="text-3xl font-serif tracking-widest text-[#C9A84C] uppercase mb-2">
                    Frecuencia <span className="font-bold">Da Vinci</span>
                </h1>
                <p className="text-zinc-500 font-light tracking-[0.3em] uppercase text-xs">Protocolo Sonoro Premium</p>
            </motion.div>
        </motion.div>
    );
};

// --- AUTH CONTEXT & PROVIDER ---
export const AuthContext = React.createContext();

function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedEmail = localStorage.getItem('user_email');
        return savedEmail ? { email: savedEmail } : null;
    });

    const login = (email) => {
        setUser({ email });
        localStorage.setItem('user_email', email);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user_email');
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// --- SCREENS --- //

function LoginScreen() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [isWebView, setIsWebView] = useState(false);
    const [showCopySuccess, setShowCopySuccess] = useState(false);
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const isWv = /Instagram|FBAN|FBAV/i.test(navigator.userAgent);
        setIsWebView(isWv);
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        setError('');

        // FAKE LOGIN LOGIC (Placebo)
        setTimeout(() => {
            setLoading(false);
            if (email.includes('@')) {
                login(email.trim().toLowerCase());
                navigate('/');
            } else {
                setError(`Tu acceso no fue encontrado o está inactivo. Si ya compraste, escríbenos a ${SUPPORT_EMAIL}`);
            }
        }, 1500);
    };

    const copyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        setShowCopySuccess(true);
        setTimeout(() => setShowCopySuccess(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#0A0E1A] flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Ambient background glows */}
            <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#C9A84C]/[0.05] blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#C9A84C]/[0.03] blur-[100px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md relative z-10"
            >
                {/* Logo Header */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-[#C9A84C] blur-2xl opacity-20 rounded-full animate-pulse"></div>
                        <AudioLines className="w-16 h-16 text-[#C9A84C] relative z-10 drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]" />
                    </div>
                    <h1 className="text-4xl font-serif font-light tracking-wide text-zinc-100 uppercase">
                        Frecuencia <span className="text-[#C9A84C] font-semibold">Da Vinci</span>
                    </h1>
                </div>

                {isWebView && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mb-8 bg-black/40 backdrop-blur-xl border border-[#C9A84C]/30 p-4 rounded-2xl"
                    >
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-[#C9A84C] flex-shrink-0 mt-0.5" />
                            <div>
                                <h3 className="text-[#C9A84C] font-semibold text-sm mb-1 uppercase tracking-wider">Abre en el navegador</h3>
                                <p className="text-zinc-400 text-xs leading-relaxed mb-3">
                                    Para instalar la aplicación y escuchar los audios sin interrupciones, por favor abre este enlace en Safari o Chrome.
                                </p>
                                <button 
                                    onClick={copyLink}
                                    className="flex items-center gap-2 bg-[#C9A84C]/10 hover:bg-[#C9A84C]/20 text-[#C9A84C] px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
                                >
                                    {showCopySuccess ? (
                                        <><CheckCircle2 className="w-3.5 h-3.5" /> Link copiado</>
                                    ) : (
                                        <><Copy className="w-3.5 h-3.5" /> Copiar link</>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Login Box */}
                <div className="bg-[#121214]/60 backdrop-blur-2xl p-8 rounded-3xl border border-white/5 shadow-[0_25px_50px_rgba(0,0,0,0.5)]">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-serif text-white mb-2">Accede a tu protocolo</h2>
                        <p className="text-zinc-500 text-sm">
                            Ingresa el correo con el que realizaste tu compra
                        </p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@correo.com"
                                required
                                className="w-full bg-[#0A0E1A] text-white border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/10 border border-red-900/20 text-red-400 p-3 rounded-xl text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A84C] hover:bg-[#b49339] text-black font-bold py-3.5 px-4 rounded-xl transition-all flex items-center justify-center disabled:opacity-50"
                        >
                            {loading ? (
                                <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'INGRESAR'
                            )}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

const BottomNav = ({ onMenuClick }) => {
    const location = useLocation();
    
    const navItems = [
        { path: '/', icon: Home, label: 'Inicio' },
        { path: '/protocolo-principal', icon: Music, label: 'Protocolo' },
        { path: '/botin-digital', icon: Gift, label: 'Bonos' },
        { path: '/cuenta', icon: User, label: 'Perfil' },
    ];

    return (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-[#0A0E1A]/80 backdrop-blur-2xl border-t border-white/5 px-6 pb-2 z-50 flex items-center justify-between">
            {navItems.map((item) => {
                const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/dashboard');
                return (
                    <Link
                        key={item.path}
                        to={item.path === '/' ? '/dashboard' : item.path}
                        className="relative flex flex-col items-center justify-center gap-1.5"
                    >
                        <div className={`transition-all duration-300 ${isActive ? 'text-[#C9A84C] -translate-y-1' : 'text-zinc-500'}`}>
                            <item.icon className="w-6 h-6" />
                        </div>
                        <span className={`text-[10px] font-medium tracking-wider uppercase transition-all duration-300 ${isActive ? 'text-[#C9A84C] opacity-100' : 'text-zinc-500 opacity-70'}`}>
                            {item.label}
                        </span>
                        {isActive && (
                            <motion.div 
                                layoutId="bottomNavDot"
                                className="absolute -bottom-1 w-1 h-1 bg-[#C9A84C] rounded-full shadow-[0_0_8px_#C9A84C]"
                            />
                        )}
                    </Link>
                );
            })}
            
            <button
                onClick={onMenuClick}
                className="relative flex flex-col items-center justify-center gap-1.5 text-zinc-500 hover:text-white transition-all"
            >
                <Menu className="w-6 h-6" />
                <span className="text-[10px] font-medium tracking-wider uppercase opacity-70">Menu</span>
            </button>
        </nav>
    );
};

const ModuleCard = ({ to, icon: Icon, title, desc, highlight = false }) => (
    <Link 
        to={to} 
        className={`${highlight ? 'bg-[#121214]/80 border-[#C9A84C]/30' : 'bg-[#121214]/40 border-white/5'} border p-6 rounded-3xl hover:border-[#C9A84C]/50 transition-all group relative overflow-hidden flex flex-col gap-4`}
    >
        {highlight && (
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C9A84C]/5 blur-2xl rounded-full -mr-12 -mt-12 group-hover:bg-[#C9A84C]/10 transition-all"></div>
        )}
        <div className={`w-10 h-10 rounded-2xl ${highlight ? 'bg-[#C9A84C]/20 text-[#C9A84C]' : 'bg-white/5 text-zinc-400 group-hover:text-[#C9A84C]'} flex items-center justify-center transition-colors`}>
            <Icon className="w-5 h-5" />
        </div>
        <div>
            <h4 className="text-lg font-bold text-white mb-1">{title}</h4>
            <p className="text-zinc-500 text-xs leading-relaxed">{desc}</p>
        </div>
        <div className={`flex items-center gap-2 ${highlight ? 'text-[#C9A84C]' : 'text-zinc-600 group-hover:text-[#C9A84C]'} text-[10px] font-bold uppercase tracking-widest mt-auto transition-colors`}>
            Acceder <ArrowLeft className="w-3 h-3 rotate-180" />
        </div>
    </Link>
);

function HomeScreen() {
    const { user } = React.useContext(AuthContext);
    const [isStandalone, setIsStandalone] = useState(false);
    const [progress, setProgress] = useState(0);
    const [greeting, setGreeting] = useState('');
    const [dailyQuote, setDailyQuote] = useState('');
    const [dayCount, setDayCount] = useState(0);

    const quotes = [
        "El silencio no es ausencia de sonido, es presencia de paz interior.",
        "Tu cerebro se regenera cada noche. Dale las ferramentas correctas.",
        "La neuroplasticidad es tu superpoder: tu cerebro puede cambiar a cualquier edad.",
        "Cada frecuencia es un paso hacia tu recuperación total.",
        "La calma mental comienza con el cuidado de tu sistema nervioso.",
        "Hoy es un gran día para silenciar el ruido y escuchar tu paz.",
        "Tu compromiso diario es la clave de tu transformación."
    ];

    useEffect(() => {
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Buenos días');
        else if (hour < 18) setGreeting('Buenas tardes');
        else setGreeting('Buenas noches');

        const dayOfWeek = new Date().getDay();
        setDailyQuote(quotes[dayOfWeek]);

        // Journey counter
        const startDate = localStorage.getItem('journey_start');
        if (!startDate) {
            const now = new Date().toISOString();
            localStorage.setItem('journey_start', now);
            setDayCount(1);
        } else {
            const start = new Date(startDate);
            const today = new Date();
            const diffTime = Math.abs(today - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            setDayCount(diffDays || 1);
        }

        // PWA check
        const isApp = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone;
        setIsStandalone(isApp);

        // Progress check
        const updateProgress = () => {
            const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
            const totalModules = 12; 
            setProgress(Math.min(100, Math.round((completed.length / totalModules) * 100)));
        };

        updateProgress();
        window.addEventListener('storage', updateProgress);
        return () => window.removeEventListener('storage', updateProgress);
    }, []);

    const name = user?.email.split('@')[0];

    const stats = [
        { label: 'Día de Jornada', value: dayCount, icon: Flame, color: 'text-orange-400' },
        { label: 'Protocolos Activos', value: '12', icon: Activity, color: 'text-[#C9A84C]' },
        { label: 'Progresso Total', value: `${progress}%`, icon: CheckCircle2, color: 'text-green-400' },
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10 pb-20"
        >
            {/* Completion Banner */}
            {progress === 100 && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-green-500/20 to-transparent border border-green-500/30 p-8 rounded-[2rem] relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Gift className="w-20 h-20 text-green-400" />
                    </div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-serif text-white mb-2">¡Felicidades, {name}! 🏆</h3>
                        <p className="text-zinc-400 max-w-md">Has completado el Protocolo Da Vinci al 100%. Tu sistema auditivo está ahora en su nivel máximo de regeneración.</p>
                    </div>
                </motion.div>
            )}

            {/* PWA Install Banner */}
            {!isStandalone && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-[#C9A84C]/20 to-transparent border border-[#C9A84C]/20 p-4 rounded-2xl flex items-center justify-between gap-4"
                >
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#C9A84C] flex items-center justify-center text-black">
                            <Download className="w-5 h-5" />
                        </div>
                        <div>
                            <h4 className="text-white text-sm font-bold uppercase tracking-wider">Instala la aplicación</h4>
                            <p className="text-zinc-400 text-xs">Acceso rápido y mejor calidad de audio.</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => window.location.reload()}
                        className="bg-[#C9A84C] text-black text-[10px] font-bold px-4 py-2 rounded-lg uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        Instalar
                    </button>
                </motion.div>
            )}

            {/* Header Greeting */}
            <header className="space-y-2">
                <div className="flex items-center gap-2 text-[#C9A84C] text-[10px] font-bold uppercase tracking-[0.2em]">
                    <span className="w-8 h-[1px] bg-[#C9A84C]"></span>
                    Bienvenido a tu Espacio
                </div>
                <h1 className="text-4xl md:text-5xl font-serif text-white py-1">
                    {greeting}, <span className="text-[#C9A84C] italic">{name}</span> ✦
                </h1>
                <p className="text-zinc-400 text-lg font-light">Tu jornada hacia el silencio continúá.</p>
            </header>

            {/* Daily Quote Card */}
            <div className="bg-gradient-to-br from-[#121214] to-[#0A0E1A] border border-white/5 rounded-3xl p-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Lightbulb className="w-24 h-24 text-[#C9A84C]" />
                </div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-zinc-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                        <Clock className="w-3 h-3" /> Dato del Día
                    </div>
                    <p className="text-xl md:text-2xl font-serif text-zinc-200 leading-relaxed max-w-2xl">
                        "{dailyQuote}"
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                    <div key={i} className="bg-[#121214]/40 border border-white/5 p-6 rounded-2xl flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-white/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">{stat.label}</p>
                            <p className="text-2xl font-serif text-white">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Separator />

            {/* Quick Actions / Featured */}
            <section className="space-y-6">
                <div className="flex items-center justify-between">
                    <h3 className="text-2xl font-serif text-white">Todos los Módulos</h3>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <ModuleCard 
                        to="/protocolo-principal" 
                        icon={Music} 
                        title="Sesión Principal" 
                        desc="Frecuencia Da Vinci (7 min)" 
                        highlight 
                    />
                    <ModuleCard 
                        to="/reset-nervio" 
                        icon={Activity} 
                        title="Reset Nervio" 
                        desc="Calibración auditiva básica" 
                    />
                    <ModuleCard 
                        to="/reconstruccion-cognitiva" 
                        icon={Lightbulb} 
                        title="Reconstrucción" 
                        desc="Protocolo neuro-regenerativo" 
                    />
                    <ModuleCard 
                        to="/bonus-1" 
                        icon={Brain} 
                        title="Niebla Mental" 
                        desc="Claridad inmediata" 
                    />
                    <ModuleCard 
                        to="/bonus-2" 
                        icon={Salad} 
                        title="Guía Alimentos" 
                        desc="Nutrición auditiva" 
                    />
                    <ModuleCard 
                        to="/bonus-3" 
                        icon={LifeBuoy} 
                        title="Emergencia" 
                        desc="Protocolo de alivio rápido" 
                    />
                    <ModuleCard 
                        to="/bonus-4" 
                        icon={Gift} 
                        title="Bonus Premium" 
                        desc="Material exclusivo adicional" 
                    />
                </div>
            </section>
        </motion.div>
    );
}

// --- LAYOUT --- //

function DashboardLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/dashboard', icon: LayoutDashboard, label: 'Inicio' },
        { path: '/protocolo-principal', icon: Music, label: 'Protocolo Principal' },
        { path: '/reset-nervio', icon: Activity, label: 'Reset del Nervio Auditivo' },
        { path: '/reconstruccion-cognitiva', icon: Lightbulb, label: 'Reconstrucción Cognitiva' },
        { path: '/bonus-1', icon: Brain, label: 'Eliminador de Niebla Mental' },
        { path: '/bonus-2', icon: Salad, label: 'Guía de Alimentos' },
        { path: '/bonus-3', icon: LifeBuoy, label: 'Protocolo de Emergencia' },
        { path: '/bonus-4', icon: Gift, label: 'Bonus Extras' },
        { path: '/cuenta', icon: User, label: 'Mi Cuenta' },
    ];

    // Close mobile menu on navigate
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    return (
        <div className="flex min-h-screen bg-[#0A0E1A] text-zinc-300 relative overflow-hidden">
            
            {/* Desktop Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-72 bg-[#121214]/80 backdrop-blur-2xl border-r border-white/5 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transform transition-transform duration-400 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col">

                    {/* Sidebar Logo */}
                    <div className="flex items-center justify-center py-10 border-b border-white/5">
                        <AudioLines className="w-8 h-8 text-[#C9A84C] mr-3" />
                        <span className="font-serif tracking-widest text-white uppercase text-sm">
                            Frecuencia <span className="font-bold text-[#C9A84C]">Da Vinci</span>
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 py-10 px-6 space-y-2 overflow-y-auto custom-scrollbar">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path || (item.path === '/dashboard' && location.pathname === '/');
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative flex items-center px-5 py-4 text-sm font-medium rounded-2xl transition-all duration-300 group ${isActive
                                        ? 'text-[#C9A84C] bg-[#C9A84C]/10 shadow-[inset_1px_0_0_0_#C9A84C]'
                                        : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <item.icon className={`w-5 h-5 mr-4 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 text-[#C9A84C]' : 'group-hover:scale-110 text-zinc-600'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col relative z-10 lg:h-screen lg:overflow-y-auto">
                <div className="flex-1 p-6 sm:p-10 md:p-16 max-w-5xl mx-auto w-full pb-32 lg:pb-16">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={location.pathname}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>

            {/* Bottom Navigation for Mobile */}
            <BottomNav onMenuClick={() => setMobileMenuOpen(true)} />

            {/* Mobile Menu Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-30 backdrop-blur-sm"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}

// --- DASHBOARD PAGES --- //

function CustomAudioPlayer({ src, title, customDuration }) {
    const audioRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTime, setCurrentTime] = useState('0:00');
    const [duration, setDuration] = useState('0:00');

    const formatTime = (timeInSeconds) => {
        if (isNaN(timeInSeconds)) return '0:00';
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const togglePlay = () => {
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    setIsPlaying(true);
                }).catch(error => {
                    console.error("Playback failed (possibly blocked):", error);
                    setIsPlaying(false);
                });
            } else {
                setIsPlaying(true);
            }
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const current = audioRef.current.currentTime;
            const total = audioRef.current.duration;
            setProgress((current / total) * 100 || 0);
            setCurrentTime(formatTime(current));
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(customDuration || formatTime(audioRef.current.duration));
        }
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(e.target.value);
    };

    const markAsComplete = (id) => {
        const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
        if (!completed.includes(id)) {
            completed.push(id);
            localStorage.setItem('completed_modules', JSON.stringify(completed));
            // Trigger storage event for HomeScreen to update
            window.dispatchEvent(new Event('storage'));
        }
    };

    return (
        <div className="bg-[#121214]/60 backdrop-blur-2xl border border-white/5 rounded-[2rem] p-8 sm:p-12 mb-12 text-center shadow-[0_25px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-500 hover:border-[#C9A84C]/30">
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-80"></div>

            {/* Ambient background glow when playing */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#C9A84C]/5 rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="relative z-10 flex flex-col items-center">

                {/* Visualizer Icon / Title */}
                <div className="mb-10 relative">
                    <div className={`absolute inset-0 bg-[#C9A84C] blur-[50px] rounded-full transition-opacity duration-1000 ${isPlaying ? 'opacity-40' : 'opacity-0'}`}></div>
                    <AudioLines className={`w-16 h-16 mx-auto mb-6 relative z-10 transition-all duration-700 ${isPlaying ? 'text-[#C9A84C] scale-110 animate-pulse drop-shadow-[0_0_20px_rgba(201,168,76,0.6)]' : 'text-zinc-700'}`} />
                    <h3 className="text-2xl font-serif font-medium tracking-wide bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent relative z-10">{title}</h3>
                </div>

                {/* Progress Bar Area */}
                <div className="w-full max-w-md mx-auto mb-10">
                    <div className="flex justify-between text-[10px] font-bold tracking-widest text-zinc-500 mb-3 px-1 uppercase">
                        <span>{currentTime}</span>
                        <span>{duration}</span>
                    </div>

                    <div className="relative h-2 w-full bg-[#0A0E1A] rounded-full overflow-hidden cursor-pointer group/slider">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#C9A84C] to-[#b49339] rounded-full"
                            style={{ width: `${progress}%` }}
                        ></div>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={progress}
                            onChange={handleProgressChange}
                            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Big Play Button */}
                <button
                    onClick={togglePlay}
                    className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-b from-[#C9A84C] to-[#b49339] text-black shadow-[0_10px_30px_rgba(201,168,76,0.3)] hover:shadow-[0_15px_40px_rgba(201,168,76,0.5)] hover:scale-105 transition-all duration-300 active:scale-95"
                >
                    {isPlaying ? (
                        <Pause className="w-8 h-8 fill-black" />
                    ) : (
                        <Play className="w-8 h-8 fill-black ml-1" />
                    )}
                </button>
                <div className="mt-6 text-[10px] tracking-[0.3em] text-[#C9A84C]/60 uppercase font-black">
                    {isPlaying ? 'Reproduciendo Protocolo' : 'Pulsa para iniciar sesión'}
                </div>

            </div>

            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => { 
                    setIsPlaying(false); 
                    setProgress(0); 
                    setCurrentTime('0:00'); 
                    markAsComplete(title.toLowerCase().replace(/\s+/g, '-'));
                }}
            />
        </div>
    );
}

function ProtocoloPrincipal() {
    return (
        <div className="animate-in fade-in duration-500">
            <div className="flex items-center mb-2">
                <Lock className="w-4 h-4 text-[#C9A84C] mr-2" />
                <span className="text-xs uppercase tracking-widest font-semibold text-[#C9A84C]">
                    Acceso exclusivo — No compartir
                </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4 tracking-tight py-1">
                La Frecuencia Da Vinci
                <span className="block text-2xl font-light text-[#C9A84C] mt-2 italic">— Protocolo Completo ✦</span>
            </h1>

            <p className="text-lg text-zinc-300 mb-10 max-w-2xl leading-relaxed">
                Este es tu protocolo de audio. Úsalo una vez al día, preferiblemente antes de dormir. Solo necesitas audífonos y un lugar tranquilo.
            </p>

            {/* Audio Player Container */}
            <CustomAudioPlayer
                src="/protocolo.mp3"
                title="Frecuencia Da Vinci"
                customDuration="7:00"
            />

            {/* Instructions */}
            <div className="bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all duration-500">
                <h3 className="text-xl font-medium tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-400 mb-8 border-b border-white/10 pb-4">
                    Instrucciones de Uso
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start">
                        <div className="bg-[#C9A84C]/10 text-[#C9A84C] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1 border border-[#C9A84C]/30">
                            1
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-1">Ponte tus audífonos</h4>
                            <p className="text-sm text-zinc-400">El audio debe ser escuchado en estéreo para generar el estímulo correcto.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-[#C9A84C]/10 text-[#C9A84C] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1 border border-[#C9A84C]/30">
                            2
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-1">Cierra los ojos</h4>
                            <p className="text-sm text-zinc-400">Elimina las distracciones visuales para enfocar tu corteza auditiva.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-[#C9A84C]/10 text-[#C9A84C] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1 border border-[#C9A84C]/30">
                            3
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-1">Presiona play y quédate quieto</h4>
                            <p className="text-sm text-zinc-400">Escucha el audio completo y deja que la frecuencia actúe en tu cerebro.</p>
                        </div>
                    </div>

                    <div className="flex items-start">
                        <div className="bg-[#C9A84C]/10 text-[#C9A84C] font-bold w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mr-4 mt-1 border border-[#C9A84C]/30">
                            4
                        </div>
                        <div>
                            <h4 className="font-medium text-white mb-1">Repite cada noche</h4>
                            <p className="text-sm text-zinc-400">La consistencia es clave. Repite este protocolo todos los días antes de dormir.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Bonus1Screen() {
    return (
        <div className="animate-in fade-in duration-500">
            <h1 className="text-3xl font-bold text-white mb-2">Eliminador de Niebla Mental</h1>
            <p className="text-xl text-[#C9A84C] mb-8 font-light">Protocolo de mañana — 3 minutos</p>

            <CustomAudioPlayer
                src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
                title="Eliminador de Niebla Mental (Audio)"
            />

            <div className="bg-[#121214]/80 backdrop-blur-xl border border-white/10 shadow-2xl rounded-3xl p-6 sm:p-10 hover:border-white/20 transition-all duration-500">
                <h3 className="font-medium text-white mb-6 text-lg">Secuencia de activación matutina:</h3>
                <ul className="space-y-4">
                    <li className="flex items-center text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-[#C9A84C] mr-3 flex-shrink-0" />
                        Al despertar, siéntate al borde del lado de tu cama.
                    </li>
                    <li className="flex items-center text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-[#C9A84C] mr-3 flex-shrink-0" />
                        Colócate los audífonos (auriculares) y ajusta un volumen medio.
                    </li>
                    <li className="flex items-center text-zinc-300">
                        <CheckCircle2 className="w-5 h-5 text-[#C9A84C] mr-3 flex-shrink-0" />
                        Escucha los 3 minutos manteniendo una respiración tranquila y profunda.
                    </li>
                </ul>
            </div>
        </div>
    );
}

// --- REUSABLE GAMMA EMBED VIEWER ---
function GammaViewer({ src, title }) {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [showControls, setShowControls] = useState(true);
    const containerRef = useRef(null);
    const timeoutRef = useRef(null);

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen?.();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen?.();
            setIsFullscreen(false);
        }
    };

    useEffect(() => {
        const handler = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };
        document.addEventListener('fullscreenchange', handler);
        return () => document.removeEventListener('fullscreenchange', handler);
    }, []);

    // Esconder controles después de inactividad, ideal para móvil y presentación
    useEffect(() => {
        const resetTimer = () => {
            setShowControls(true);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => setShowControls(false), 3000);
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener('mousemove', resetTimer);
            container.addEventListener('touchstart', resetTimer, { passive: true });
            container.addEventListener('mouseleave', () => setShowControls(false));
        }

        resetTimer();

        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            if (container) {
                container.removeEventListener('mousemove', resetTimer);
                container.removeEventListener('touchstart', resetTimer);
                container.removeEventListener('mouseleave', () => setShowControls(false));
            }
        };
    }, []);

    const isCompleted = JSON.parse(localStorage.getItem('completed_modules') || '[]').includes(title.toLowerCase().replace(/\s+/g, '-'));

    const markAsFinished = () => {
        const id = title.toLowerCase().replace(/\s+/g, '-');
        const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
        if (!completed.includes(id)) {
            localStorage.setItem('completed_modules', JSON.stringify([...completed, id]));
            window.dispatchEvent(new Event('storage'));
            window.location.reload(); // Simple way to refresh local state in this component
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div
                ref={containerRef}
                className="relative w-full rounded-[2rem] overflow-hidden border border-white/5 bg-[#0A0E1A] shadow-2xl group transition-all duration-300"
                style={{
                    height: isFullscreen ? '100vh' : 'calc(100vh - 250px)',
                    minHeight: isFullscreen ? '100vh' : '500px',
                    maxHeight: isFullscreen ? '100vh' : '850px'
                }}
            >
                {/* Loading Skeleton/Spinner */}
                {isLoading && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0E1A] z-10 font-inter">
                        <div className="w-10 h-10 border-2 border-[#C9A84C]/20 border-t-[#C9A84C] rounded-full animate-spin mb-4"></div>
                        <p className="text-zinc-500 text-xs animate-pulse tracking-[0.2em] uppercase font-bold">Iniciando Experiencia...</p>
                    </div>
                )}

                {/* Top bar with controls */}
                <div className={`absolute top-0 inset-x-0 z-20 flex items-center justify-between px-4 md:px-6 py-4 bg-gradient-to-b from-black/80 to-transparent transition-opacity duration-500 pointer-events-none ${showControls || !isFullscreen ? 'opacity-100' : 'opacity-0'}`}>
                    <span className="text-xs md:text-sm text-zinc-300 font-serif italic truncate max-w-[45%] md:max-w-[70%]">
                        {title}
                    </span>
                    <div className="flex items-center gap-3 pointer-events-auto">
                        <button
                            onClick={toggleFullscreen}
                            className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2.5 rounded-xl transition-all border border-white/10 backdrop-blur-md active:scale-95"
                        >
                            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                            <span className="hidden sm:inline">{isFullscreen ? 'Cerrar' : 'Ampliar'}</span>
                        </button>
                    </div>
                </div>

                {/* The gamma iframe */}
                <iframe
                    src={src}
                    title={title}
                    allow="fullscreen"
                    onLoad={() => setIsLoading(false)}
                    className={`w-full h-full border-0 transition-opacity duration-700 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    style={{ display: 'block' }}
                />

                {/* Gold accent top line */}
                <div className={`absolute top-0 inset-x-0 h-[1px] bg-[#C9A84C]/50 z-30 transition-opacity duration-500 ${showControls || !isFullscreen ? 'opacity-100' : 'opacity-0'}`} />
            </div>

            {!isCompleted && (
                <button 
                    onClick={markAsFinished}
                    className="w-full py-4 bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/20 rounded-2xl font-bold text-sm tracking-widest uppercase transition-all active:scale-95 flex items-center justify-center gap-2"
                >
                    <CheckCircle2 className="w-5 h-5" /> Marcar como Finalizado
                </button>
            )}
        </div>
    );
}

function Bonus2Screen() {
    return (
        <div className="animate-in fade-in duration-500 flex flex-col h-full">
            <div className="mb-5 flex-shrink-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Guía de Alimentos que Disparan el Tinnitus</h1>
                <p className="text-[#C9A84C] font-light">Los 3 superalimentos que debes eliminar hoy</p>
            </div>

            <GammaViewer
                src="https://gamma.app/embed/7r9kke7mzos1dgz"
                title="Guía de Salud: Tinnitus, Alimentación y Ondas Gamma"
            />
        </div>
    );
}

function Bonus3Screen() {
    return (
        <div className="animate-in fade-in duration-500 flex flex-col h-full">
            <div className="mb-5 flex-shrink-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">Interruptor de Silencio — 60 Segundos</h1>
                <p className="text-[#C9A84C] font-light">Úsalo cuando el estrés dispara el zumbido</p>
            </div>

            <GammaViewer
                src="https://gamma.app/embed/i9vqg0uuwas3rmv"
                title="Guía de Acupresión de Emergencia para Alivio Inmediato del Tinnitus"
            />
        </div>
    );
}

function Bonus4Screen() {
    const [selectedMaterial, setSelectedMaterial] = useState(null);

    const materials = [
        {
            id: 'nocturno',
            title: 'Protocolo Nocturno Da Vinci',
            subtitle: 'Recupera tus Noches, Recupera tu Paz',
            src: 'https://gamma.app/embed/mavpu152zuts30r'
        },
        {
            id: 'plasticidad',
            title: 'Acelerador de Plasticidad Gamma',
            subtitle: 'Expande tu mente',
            src: 'https://gamma.app/embed/47p2vhs3ih4i09p'
        }
    ];

    if (selectedMaterial) {
        return (
            <div className="animate-in fade-in duration-500 flex flex-col h-full space-y-6 pb-10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">{selectedMaterial.title}</h1>
                        <p className="text-[#C9A84C] font-light">{selectedMaterial.subtitle}</p>
                    </div>
                    <button 
                        onClick={() => setSelectedMaterial(null)}
                        className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-4 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Volver
                    </button>
                </div>
                <GammaViewer
                    src={selectedMaterial.src}
                    title={selectedMaterial.title}
                />
            </div>
        );
    }

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-8 border-b border-white/10 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Bonus Extras</h1>
                <p className="text-xl text-[#C9A84C] font-light">Material exclusivo para potenciar tus resultados</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {materials.map((material) => (
                    <div key={material.id} className="bg-[#121214]/80 backdrop-blur-xl border border-white/10 hover:border-[#C9A84C]/50 rounded-3xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.3)] transition-all duration-300 group flex flex-col h-full hover:-translate-y-1">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#C9A84C]/20 to-transparent rounded-2xl flex items-center justify-center mb-6 border border-[#C9A84C]/20 text-[#C9A84C] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(201,168,76,0.1)]">
                            <Gift className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 tracking-wide">{material.title}</h3>
                        <p className="text-zinc-400 text-base mb-8 flex-grow leading-relaxed">{material.subtitle}</p>
                        
                        <button 
                            onClick={() => setSelectedMaterial(material)}
                            className="w-full bg-gradient-to-r from-[#C9A84C] to-[#b49339] hover:from-[#e5ca76] hover:to-[#C9A84C] text-black font-semibold py-3.5 px-4 rounded-xl transition-all duration-300 flex items-center justify-center shadow-[0_0_15px_rgba(201,168,76,0.3)] hover:shadow-[0_0_20px_rgba(201,168,76,0.5)] group-hover:bg-[#e5ca76]"
                        >
                            <ExternalLink className="w-5 h-5 mr-2" />
                            Visualizar Material
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

function ResetNervioScreen() {
    const [expandedItem, setExpandedItem] = useState(null);

    const toggleItem = (id) => {
        if (expandedItem === id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(id);
        }
    };

    const protocoloItems = [
        {
            id: 'shot',
            title: 'Shot Matinal del Nervio',
            subtitle: 'Preparación de 30 segundos · reduce inflamación antes de cada sesión',
            src: 'https://gamma.app/embed/s6isa9j6yns3a63'
        },
        {
            id: 'drenaje',
            title: 'Protocolo de Drenaje Nocturno',
            subtitle: 'Rutina de 3 minutos · potencia el drenaje linfático cerebral durante el sueño',
            src: 'https://gamma.app/embed/06bojv8l68i0376'
        },
        {
            id: 'amplificadores',
            title: 'Guía de Amplificadores Naturales',
            subtitle: '5 alimentos que amplifican la señal gamma · 5 que la bloquean sin que lo sepas',
            src: 'https://gamma.app/embed/xsp8q32io5ipmtf'
        }
    ];

    const bonosItems = [
        {
            id: 'durmiente',
            tag: 'Bono 1',
            title: 'El Durmiente Profundo',
            subtitle: 'Audio de 8 minutos · lleva tu sistema nervioso del alerta del tinnitus al sueño delta profundo',
            src: 'https://gamma.app/embed/xtryl475on64b0s'
        },
        {
            id: 'reconectados',
            tag: 'Bono 2',
            title: 'Reconectados',
            subtitle: 'Guía de 4 semanas · reconstruye la comunicación y la intimidad que el zumbido fue erosionando',
            src: 'https://gamma.app/embed/863iofapbcvm88p'
        }
    ];

    const [completedItems, setCompletedItems] = useState([]);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
        setCompletedItems(completed);
    }, []);

    const markAsComplete = (id) => {
        const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
        if (!completed.includes(id)) {
            const updated = [...completed, id];
            localStorage.setItem('completed_modules', JSON.stringify(updated));
            setCompletedItems(updated);
            window.dispatchEvent(new Event('storage'));
        }
    };

    const renderCard = (item, isBono) => {
        const isExpanded = expandedItem === item.id;
        const isCompleted = completedItems.includes(item.id);
        
        return (
            <div key={item.id} className={`bg-[#121214]/60 backdrop-blur-2xl border border-white/5 ${isExpanded ? 'border-[#C9A84C]/50 shadow-[0_20px_40px_rgba(201,168,76,0.1)]' : 'hover:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)]'} rounded-[2rem] p-6 sm:p-8 transition-all duration-300 group flex flex-col h-full overflow-hidden relative`}>
                
                {isCompleted && (
                    <div className="absolute top-6 right-6 text-green-500 animate-in zoom-in duration-500">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                )}

                {isBono && (
                    <div className="bg-[#C9A84C]/10 text-[#C9A84C] text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 inline-block w-max border border-[#C9A84C]/20">
                        {item.tag}
                    </div>
                )}
                
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 tracking-wide">{item.title}</h3>
                <p className="text-zinc-500 text-base mb-8 flex-grow leading-relaxed font-light">{item.subtitle}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={() => toggleItem(item.id)}
                        className={`flex-1 ${isExpanded ? 'bg-white/10 text-white' : 'bg-gradient-to-r from-[#C9A84C] to-[#b49339] text-black'} font-bold py-4 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95`}
                    >
                        {isExpanded ? (
                            <><Minimize className="w-5 h-5 mr-2" /> Ocultar</>
                        ) : (
                            <><Maximize className="w-5 h-5 mr-2" /> Ver Contenido</>
                        )}
                    </button>
                    
                    {!isCompleted && isExpanded && (
                        <button 
                            onClick={() => markAsComplete(item.id)}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 font-bold py-4 px-6 rounded-2xl transition-all border border-green-500/20 active:scale-95"
                        >
                            Finalizado
                        </button>
                    )}
                </div>

                {isExpanded && (
                    <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                        <GammaViewer src={item.src} title={item.title} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-10 border-b border-white/10 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Reset del Nervio Auditivo</h1>
                <p className="text-xl text-[#C9A84C] font-light">Tu protocolo completo de desinflamación auditiva</p>
            </div>

            <div className="mb-12">
                <div className="flex items-center mb-6">
                    <Activity className="w-6 h-6 text-[#C9A84C] mr-3" />
                    <h2 className="text-2xl font-semibold text-white">Protocolo</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {protocoloItems.map(item => renderCard(item, false))}
                </div>
            </div>

            <div>
                <div className="flex items-center mb-6">
                    <Gift className="w-6 h-6 text-zinc-400 mr-3" />
                    <h2 className="text-2xl font-semibold text-white">Bonos</h2>
                </div>
                <div className="grid grid-cols-1 gap-6">
                    {bonosItems.map(item => renderCard(item, true))}
                </div>
            </div>
        </div>
    );
}

function ReconstruccionCognitivaScreen() {
    const [expandedItem, setExpandedItem] = useState(null);
    const [completedItems, setCompletedItems] = useState([]);

    useEffect(() => {
        const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
        setCompletedItems(completed);
    }, []);

    const markAsComplete = (id) => {
        const completed = JSON.parse(localStorage.getItem('completed_modules') || '[]');
        if (!completed.includes(id)) {
            const updated = [...completed, id];
            localStorage.setItem('completed_modules', JSON.stringify(updated));
            setCompletedItems(updated);
            window.dispatchEvent(new Event('storage'));
        }
    };

    const toggleItem = (id) => {
        if (expandedItem === id) {
            setExpandedItem(null);
        } else {
            setExpandedItem(id);
        }
    };

    const items = [
        {
            id: 'item1',
            title: 'Reconstrucción Cognitiva',
            subtitle: 'Material interactivo sobre Reconstrucción Cognitiva y salud',
            src: 'https://gamma.app/embed/igcrhz2zyxr65ni'
        },
        {
            id: 'item2',
            title: 'Batido de Reinicio Neuronal: ¡Despierta tu Cerebro!',
            subtitle: 'Receta paso a paso para nutrir tu sistema nervioso y potenciar la claridad mental',
            src: 'https://gamma.app/embed/8jmvi6u0pw4chxa'
        },
        {
            id: 'item3',
            title: 'Recuperación del Nervio Vago: Una Guía para Reducir el Tinnitus y el Malestar',
            subtitle: 'Ejercicios y técnicas para estimular el nervio vago y promover la relajación profunda',
            src: 'https://gamma.app/embed/splmjux6a4vyblp'
        },
        {
            id: 'item4',
            title: 'El Secreto de la Salud Intestinal y la Claridad Mental',
            subtitle: 'Descubre la conexión entre tu intestino y tu cerebro, y cómo optimizarla',
            src: 'https://gamma.app/embed/0yyesbuhkqs2ewf'
        }
    ];

    const renderCard = (item) => {
        const isExpanded = expandedItem === item.id;
        const isCompleted = completedItems.includes(item.id);
        
        return (
            <div key={item.id} className={`bg-[#121214]/60 backdrop-blur-2xl border border-white/5 ${isExpanded ? 'border-[#C9A84C]/50 shadow-[0_20px_40px_rgba(201,168,76,0.1)]' : 'hover:border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)]'} rounded-[2rem] p-6 sm:p-8 transition-all duration-300 group flex flex-col h-full overflow-hidden relative`}>
                
                {isCompleted && (
                    <div className="absolute top-6 right-6 text-green-500 animate-in zoom-in duration-500">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                )}
                
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-3 tracking-wide">{item.title}</h3>
                <p className="text-zinc-500 text-base mb-8 flex-grow leading-relaxed font-light">{item.subtitle}</p>
                
                <div className="flex flex-col sm:flex-row gap-3">
                    <button 
                        onClick={() => toggleItem(item.id)}
                        className={`flex-1 ${isExpanded ? 'bg-white/10 text-white' : 'bg-gradient-to-r from-[#C9A84C] to-[#b49339] text-black'} font-bold py-4 px-4 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg active:scale-95`}
                    >
                        {isExpanded ? (
                            <><Minimize className="w-5 h-5 mr-2" /> Ocultar</>
                        ) : (
                            <><Maximize className="w-5 h-5 mr-2" /> Ver Contenido</>
                        )}
                    </button>
                    
                    {!isCompleted && isExpanded && (
                        <button 
                            onClick={() => markAsComplete(item.id)}
                            className="bg-green-500/10 hover:bg-green-500/20 text-green-400 font-bold py-4 px-6 rounded-2xl transition-all border border-green-500/20 active:scale-95"
                        >
                            Finalizado
                        </button>
                    )}
                </div>

                {isExpanded && (
                    <div className="mt-8 pt-8 border-t border-white/5 animate-in fade-in slide-in-from-top-4 duration-500">
                        <GammaViewer src={item.src} title={item.title} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="animate-in fade-in duration-500">
            <div className="mb-10 border-b border-white/10 pb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">Reconstrucción Cognitiva</h1>
                <p className="text-xl text-[#C9A84C] font-light">Material integral para potenciar tu salud mental y física</p>
            </div>

            <div className="mb-12">
                <div className="grid grid-cols-1 gap-6">
                    {items.map(item => renderCard(item))}
                </div>
            </div>
        </div>
    );
}

function ProfileScreen() {
    const { user, logout } = React.useContext(AuthContext);

    return (
        <div className="animate-in fade-in duration-700 max-w-lg mx-auto mt-10">
            <div className="bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-8 sm:p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.4)] relative overflow-hidden">
                {/* Decorative glow */}
                <div className="absolute top-[-20%] right-[-20%] w-[50%] h-[50%] bg-[#C9A84C] opacity-[0.05] rounded-full blur-3xl pointer-events-none"></div>

                <div className="w-24 h-24 bg-gradient-to-br from-[#27272a] to-[#121214] rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 shadow-[0_0_20px_rgba(201,168,76,0.15)] relative z-10">
                    <User className="w-10 h-10 text-[#C9A84C]" />
                </div>

                <h2 className="text-2xl font-semibold text-white mb-1">Tu Perfil</h2>
                <p className="text-zinc-400 mb-8 pb-8 border-b border-zinc-800">
                    Identificado como: <span className="text-white font-medium ml-1">{user?.email}</span>
                </p>

                <button
                    onClick={logout}
                    className="w-full flex items-center justify-center py-3 px-4 border border-zinc-700 hover:border-zinc-500 text-white rounded-lg transition-colors mb-6"
                >
                    <LogOut className="w-5 h-5 mr-3" />
                    Cerrar sesión
                </button>

                <div className="text-sm text-zinc-500 bg-[#0A0E1A] p-4 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 mr-3 text-zinc-600 flex-shrink-0" />
                    <p className="text-left font-inter">
                        ¿Tienes alguna pregunta o necesitas asistencia táctica? Escríbenos a{' '}
                        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-[#C9A84C] hover:underline">
                            {SUPPORT_EMAIL}
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}


// --- ROUTES & WRAPPERS --- //

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
    const { user } = React.useContext(AuthContext);
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return (
        <>
            <PWAOnboarding />
            <DashboardLayout>{children}</DashboardLayout>
        </>
    );
};

function App() {
    const [showSplash, setShowSplash] = useState(() => {
        // Check if session already active to avoid splash on every refresh in same session
        return !sessionStorage.getItem('splash_shown');
    });

    const handleSplashComplete = () => {
        setShowSplash(false);
        sessionStorage.setItem('splash_shown', 'true');
    };

    return (
        <AuthProvider>
            <AnimatePresence>
                {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
            </AnimatePresence>
            
            <BrowserRouter>
                <Routes>
                    {/* Public Login Route */}
                    <Route
                        path="/login"
                        element={
                            <AuthContext.Consumer>
                                {({ user }) => (user ? <Navigate to="/dashboard" replace /> : <LoginScreen />)}
                            </AuthContext.Consumer>
                        }
                    />

                    {/* Protected Routes inside Dashboard */}
                    <Route path="/" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
                    <Route path="/dashboard" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
                    <Route path="/protocolo-principal" element={<ProtectedRoute><ProtocoloPrincipal /></ProtectedRoute>} />
                    <Route path="/botin-digital" element={<ProtectedRoute><Bonus4Screen /></ProtectedRoute>} />
                    <Route path="/reconstruccion-cognitiva" element={<ProtectedRoute><ReconstruccionCognitivaScreen /></ProtectedRoute>} />
                    <Route path="/reset-nervio" element={<ProtectedRoute><ResetNervioScreen /></ProtectedRoute>} />
                    <Route path="/bonus-1" element={<ProtectedRoute><Bonus1Screen /></ProtectedRoute>} />
                    <Route path="/bonus-2" element={<ProtectedRoute><Bonus2Screen /></ProtectedRoute>} />
                    <Route path="/bonus-3" element={<ProtectedRoute><Bonus3Screen /></ProtectedRoute>} />
                    <Route path="/bonus-4" element={<ProtectedRoute><Bonus4Screen /></ProtectedRoute>} />
                    <Route path="/cuenta" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
