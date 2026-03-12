import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation, Link } from 'react-router-dom';
import {
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
    ArrowLeft
} from 'lucide-react';

// Support Email
const SUPPORT_EMAIL = "soporte@frecuenciadavinci.com";

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
    const { login } = React.useContext(AuthContext);
    const navigate = useNavigate();

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

    return (
        <div className="min-h-screen bg-[#0D0D0D] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md">

                {/* Logo Header */}
                <div className="flex flex-col items-center justify-center mb-10">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 bg-[#C9A84C] blur-2xl opacity-20 rounded-full animate-pulse"></div>
                        <AudioLines className="w-14 h-14 text-[#C9A84C] relative z-10 drop-shadow-[0_0_15px_rgba(201,168,76,0.3)]" />
                    </div>
                    <h1 className="text-3xl font-light tracking-wide text-zinc-100 uppercase">
                        Frecuencia <span className="text-[#C9A84C] font-semibold">Da Vinci</span>
                    </h1>
                </div>

                {/* Login Box */}
                <div className="bg-[#121214]/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all duration-500">
                    <div className="text-center mb-8">
                        <h2 className="text-xl font-medium text-white mb-2">Accede a tu protocolo</h2>
                        <p className="text-zinc-400 text-sm">
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
                                className="w-full bg-[#27272a] text-white border border-zinc-700 rounded-lg px-4 py-3 focus:outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-colors"
                                disabled={loading}
                            />
                        </div>

                        {error && (
                            <div className="bg-red-900/20 border border-red-900/50 text-red-400 p-3 rounded-lg text-sm text-center">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A84C] hover:bg-[#b49339] text-black font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <span className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Verificando...
                                </span>
                            ) : (
                                'Acceder'
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-zinc-800 pt-6">
                        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-zinc-500 hover:text-zinc-300 text-sm transition-colors">
                            ¿Problemas para acceder? Contáctanos
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

// --- LAYOUT --- //

function DashboardLayout({ children }) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const location = useLocation();

    const navItems = [
        { path: '/', icon: Music, label: 'Protocolo Principal' },
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
        <div className="flex min-h-screen bg-[#0D0D0D] text-zinc-300 relative overflow-hidden">

            {/* Ambient Background Efect */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#C9A84C]/[0.03] blur-[120px]"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[#C9A84C]/[0.02] blur-[100px]"></div>
            </div>

            {/* Mobile Top Header */}
            <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-[#121214]/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-4 z-50 shadow-md">
                <div className="flex items-center text-white">
                    <AudioLines className="w-6 h-6 text-[#C9A84C] mr-2" />
                    <span className="font-semibold tracking-wide">Da Vinci</span>
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-zinc-400 hover:text-white p-2">
                    {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>

            {/* Sidebar Navigation */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#121214]/90 backdrop-blur-2xl border-r border-white/5 shadow-[5px_0_30px_rgba(0,0,0,0.5)] transform transition-transform duration-400 ease-in-out lg:translate-x-0 lg:static lg:flex-shrink-0 ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="h-full flex flex-col pt-16 lg:pt-0">

                    {/* Sidebar Logo (Desktop Only) */}
                    <div className="hidden lg:flex items-center justify-center py-8 border-b border-zinc-800">
                        <AudioLines className="w-8 h-8 text-[#C9A84C] mr-3" />
                        <span className="font-light tracking-widest text-white uppercase text-sm">
                            Frecuencia <span className="font-bold text-[#C9A84C]">Da Vinci</span>
                        </span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
                        {navItems.map((item) => {
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`relative flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-300 group overflow-hidden ${isActive
                                        ? 'text-[#C9A84C] bg-gradient-to-r from-[#C9A84C]/10 to-transparent shadow-[inset_1px_0_0_0_#C9A84C]'
                                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {isActive && <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#C9A84C] rounded-r-full shadow-[0_0_10px_#C9A84C]"></div>}
                                    <item.icon className={`w-5 h-5 mr-3 flex-shrink-0 transition-transform duration-300 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_rgba(201,168,76,0.5)]' : 'group-hover:scale-110'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 min-w-0 flex flex-col relative pt-16 lg:pt-0 z-10">
                <div className="flex-1 p-6 sm:p-10 max-w-4xl mx-auto w-full">
                    {children}
                </div>
            </main>

            {/* Mobile Menu Backdrop */}
            {mobileMenuOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/60 z-30"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}
        </div>
    );
}

// --- DASHBOARD PAGES --- //

function CustomAudioPlayer({ src, title }) {
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
            setDuration(formatTime(audioRef.current.duration));
        }
    };

    const handleProgressChange = (e) => {
        const newTime = (e.target.value / 100) * audioRef.current.duration;
        audioRef.current.currentTime = newTime;
        setProgress(e.target.value);
    };

    return (
        <div className="bg-[#121214]/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 mb-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group transition-all duration-500 hover:border-[#C9A84C]/30">
            {/* Top gold accent line */}
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent opacity-80"></div>

            {/* Ambient background glow when playing */}
            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-[#C9A84C]/5 rounded-full blur-3xl transition-opacity duration-1000 pointer-events-none ${isPlaying ? 'opacity-100' : 'opacity-0'}`}></div>

            <div className="relative z-10 flex flex-col items-center">

                {/* Visualizer Icon / Title */}
                <div className="mb-10 relative">
                    <div className={`absolute inset-0 bg-[#C9A84C] blur-[40px] rounded-full transition-opacity duration-1000 ${isPlaying ? 'opacity-40' : 'opacity-0'}`}></div>
                    <AudioLines className={`w-14 h-14 mx-auto mb-4 relative z-10 transition-all duration-700 ${isPlaying ? 'text-[#C9A84C] scale-110 animate-pulse drop-shadow-[0_0_15px_rgba(201,168,76,0.6)]' : 'text-zinc-600'}`} />
                    <h3 className="text-xl font-medium tracking-wide bg-gradient-to-br from-zinc-100 to-zinc-400 bg-clip-text text-transparent relative z-10">{title}</h3>
                </div>

                {/* Progress Bar Area */}
                <div className="w-full max-w-md mx-auto mb-8">
                    <div className="flex justify-between text-xs font-mono text-zinc-500 mb-2 px-1">
                        <span>{currentTime}</span>
                        <span>{duration}</span>
                    </div>

                    <div className="relative h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden cursor-pointer group/slider">
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
                    className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-b from-[#C9A84C] to-[#b49339] text-black shadow-[0_0_20px_rgba(201,168,76,0.2)] hover:shadow-[0_0_25px_rgba(201,168,76,0.4)] hover:scale-105 transition-all duration-300"
                >
                    {isPlaying ? (
                        <Pause className="w-6 h-6 fill-black" />
                    ) : (
                        <Play className="w-6 h-6 fill-black ml-1" />
                    )}
                </button>
                <div className="mt-4 text-xs tracking-widest text-[#C9A84C]/50 uppercase font-semibold">
                    {isPlaying ? 'Reproduciendo' : 'Pulsa para iniciar'}
                </div>

            </div>

            <audio
                ref={audioRef}
                src={src}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => { setIsPlaying(false); setProgress(0); setCurrentTime('0:00'); }}
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

            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">
                La Frecuencia Da Vinci
                <span className="block text-2xl font-light text-zinc-400 mt-1">— Protocolo Completo</span>
            </h1>

            <p className="text-lg text-zinc-300 mb-10 max-w-2xl leading-relaxed">
                Este es tu protocolo de audio. Úsalo una vez al día, preferiblemente antes de dormir. Solo necesitas audífonos y un lugar tranquilo.
            </p>

            {/* Audio Player Container */}
            <CustomAudioPlayer
                src="/protocolo.mp3"
                title="Frecuencia Da Vinci"
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

    return (
        <div
            ref={containerRef}
            className="relative w-full rounded-xl overflow-hidden border border-zinc-800 bg-[#18181b] shadow-2xl group transition-all duration-300"
            style={{
                height: isFullscreen ? '100vh' : 'calc(100vh - 200px)',
                minHeight: isFullscreen ? '100vh' : '450px',
                maxHeight: isFullscreen ? '100vh' : '850px'
            }}
        >
            {/* Loading Skeleton/Spinner */}
            {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#18181b] z-10">
                    <div className="w-10 h-10 border-4 border-zinc-800 border-t-[#C9A84C] rounded-full animate-spin mb-4"></div>
                    <p className="text-zinc-500 text-sm animate-pulse tracking-wide">Cargando documento...</p>
                </div>
            )}

            {/* Top bar with controls */}
            <div className={`absolute top-0 inset-x-0 z-20 flex items-center justify-between px-3 md:px-4 py-3 bg-gradient-to-b from-black/90 via-black/50 to-transparent transition-opacity duration-500 pointer-events-none ${showControls || !isFullscreen ? 'opacity-100' : 'opacity-0'}`}>
                <span className="text-xs md:text-sm text-zinc-300 font-medium truncate max-w-[45%] md:max-w-[70%] drop-shadow-md">
                    {title}
                </span>
                <div className="flex items-center gap-2 pointer-events-auto">
                    <a
                        href={src.replace('/embed/', '/').split('?')[0]}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 bg-black/60 hover:bg-black text-zinc-200 hover:text-white text-xs px-3 py-2 rounded-lg transition-all border border-white/10 backdrop-blur-md active:scale-95"
                        title="Abrir en nueva pestaña"
                    >
                        <ExternalLink className="w-4 h-4" />
                        <span className="hidden sm:inline font-medium">Abrir</span>
                    </a>
                    <button
                        onClick={toggleFullscreen}
                        className="flex items-center justify-center gap-1.5 bg-[#C9A84C]/20 hover:bg-[#C9A84C]/30 text-[#C9A84C] hover:text-[#e5ca76] text-xs px-3 py-2 rounded-lg transition-all border border-[#C9A84C]/30 backdrop-blur-md active:scale-95 shadow-[0_0_10px_rgba(201,168,76,0.1)]"
                        title={isFullscreen ? 'Salir de pantalla completa' : 'Pantalla completa'}
                    >
                        {isFullscreen
                            ? <Minimize className="w-4 h-4" />
                            : <Maximize className="w-4 h-4" />}
                        <span className="hidden sm:inline font-medium">{isFullscreen ? 'Salir' : 'Ampliar'}</span>
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
            <div className={`absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent z-30 transition-opacity duration-500 ${showControls || !isFullscreen ? 'opacity-80' : 'opacity-0'}`} />
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

                <div className="text-sm text-zinc-500 bg-[#0D0D0D] p-4 rounded-lg flex items-start">
                    <AlertCircle className="w-5 h-5 mr-3 text-zinc-600 flex-shrink-0" />
                    <p className="text-left">
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
    return <DashboardLayout>{children}</DashboardLayout>;
};

function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* Public Login Route */}
                    <Route
                        path="/login"
                        element={
                            <AuthContext.Consumer>
                                {({ user }) => (user ? <Navigate to="/" replace /> : <LoginScreen />)}
                            </AuthContext.Consumer>
                        }
                    />

                    {/* Protected Routes inside Dashboard */}
                    <Route path="/" element={<ProtectedRoute><ProtocoloPrincipal /></ProtectedRoute>} />
                    <Route path="/bonus-1" element={<ProtectedRoute><Bonus1Screen /></ProtectedRoute>} />
                    <Route path="/bonus-2" element={<ProtectedRoute><Bonus2Screen /></ProtectedRoute>} />
                    <Route path="/bonus-3" element={<ProtectedRoute><Bonus3Screen /></ProtectedRoute>} />
                    <Route path="/bonus-4" element={<ProtectedRoute><Bonus4Screen /></ProtectedRoute>} />
                    <Route path="/cuenta" element={<ProtectedRoute><ProfileScreen /></ProtectedRoute>} />

                    {/* Fallback */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}

export default App;
