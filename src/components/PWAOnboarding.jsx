import React, { useState, useEffect, useContext } from 'react';
import './PWAOnboarding.css';
import { PwaContext } from '../App';

const PWAOnboarding = () => {
    const { deferredPrompt, isStandalone, triggerInstall } = useContext(PwaContext);
    const [isVisible, setIsVisible] = useState(false);
    const [os, setOs] = useState('other');
    const [showManualOnly, setShowManualOnly] = useState(false);

    useEffect(() => {
        // Detect OS
        const userAgent = window.navigator.userAgent.toLowerCase();
        const isIOS = /iphone|ipad|ipod/.test(userAgent);
        const isAndroid = /android/.test(userAgent);

        if (isIOS) setOs('ios');
        else if (isAndroid) setOs('android');

        // Check if already seen
        const hasSeen = localStorage.getItem('hasSeenPwaInstructions');
        
        if (!hasSeen && !isStandalone) {
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        }

        // Listen for manual trigger from banner
        const handleManualTrigger = () => {
            setShowManualOnly(true);
            setIsVisible(true);
            document.body.style.overflow = 'hidden';
        };

        window.addEventListener('showPwaManual', handleManualTrigger);
        return () => window.removeEventListener('showPwaManual', handleManualTrigger);
    }, [isStandalone]);

    const handleClose = () => {
        localStorage.setItem('hasSeenPwaInstructions', 'true');
        setIsVisible(false);
        setShowManualOnly(false);
        document.body.style.overflow = 'auto';
    };

    const handleNativeInstall = async () => {
        await triggerInstall();
        // The context will update isStandalone or clear deferredPrompt
        // We can close the modal after a successful prompt (or even if dismissed)
        handleClose();
    };

    if (!isVisible || isStandalone) return null;

    // Use native prompt if available and we are NOT forcing manual instructions
    const canShowNativePrompt = deferredPrompt && !showManualOnly;

    return (
        <div className="pwa-overlay">
            <div className={`pwa-modal animate-in slide-in-from-bottom duration-500 ${canShowNativePrompt ? 'pwa-native-mode' : ''}`}>
                <div className="pwa-header">
                    <div className="pwa-icon-container">
                        <svg className="pwa-main-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                    </div>
                    <h2 className="pwa-title">
                        {canShowNativePrompt 
                            ? "¡Instala la aplicación ahora!" 
                            : "¡Atención! No pierdas tu tratamiento."}
                    </h2>
                </div>

                <div className="pwa-body">
                    <p className="pwa-intro">
                        {canShowNativePrompt 
                            ? "Toca el botón de abajo para instalar la aplicación directamente en tu celular. Es más rápido y seguro."
                            : "Para asegurar que tu zumbido no regrese, necesitas escuchar tus audios todos los días."}
                    </p>
                    
                    {!canShowNativePrompt && (
                        <p className="pwa-description">
                            Para que no pierdas tu acceso y no tengas que buscar correos electrónicos, vamos a guardar esta plataforma directamente en la pantalla de tu celular, como si fuera una aplicación normal. Es muy fácil, solo sigue estos 2 pasos:
                        </p>
                    )}

                    {canShowNativePrompt ? (
                        <div className="pwa-native-action">
                            <button onClick={handleNativeInstall} className="pwa-install-now-button">
                                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                                INSTALAR APLICACIÓN
                            </button>
                        </div>
                    ) : (
                        <div className="pwa-steps">
                            {os === 'ios' ? (
                                <>
                                    <div className="pwa-step">
                                        <div className="pwa-step-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
                                                <polyline points="16 6 12 2 8 6"/>
                                                <line x1="12" y1="2" x2="12" y2="15"/>
                                            </svg>
                                        </div>
                                        <div className="pwa-step-text">
                                            <strong>Paso 1:</strong> Toca el ícono de <span>COMPARTIR</span> (el cuadradito con una flecha hacia arriba) que está en la parte de abajo de tu pantalla.
                                        </div>
                                    </div>
                                    <div className="pwa-step">
                                        <div className="pwa-step-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                                <line x1="12" y1="8" x2="12" y2="16"/>
                                                <line x1="8" y1="12" x2="16" y2="12"/>
                                            </svg>
                                        </div>
                                        <div className="pwa-step-text">
                                            <strong>Paso 2:</strong> Desliza el menú hacia arriba, busca la opción que dice <span>"Agregar a inicio"</span> (tiene un ícono con un signo de más +) y tócala. Luego toca <span>"Agregar"</span> en la esquina superior derecha.
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="pwa-step">
                                        <div className="pwa-step-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                                <circle cx="12" cy="12" r="1"/>
                                                <circle cx="12" cy="5" r="1"/>
                                                <circle cx="12" cy="19" r="1"/>
                                            </svg>
                                        </div>
                                        <div className="pwa-step-text">
                                            <strong>Paso 1:</strong> Toca los <span>TRES PUNTITOS</span> que están en la esquina superior derecha de tu pantalla.
                                        </div>
                                    </div>
                                    <div className="pwa-step">
                                        <div className="pwa-step-icon">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                                                <line x1="12" y1="18" x2="12" y2="18"/>
                                                <path d="M12 7l3 3-3 3M9 10h6" />
                                            </svg>
                                        </div>
                                        <div className="pwa-step-text">
                                            <strong>Paso 2:</strong> En el menú que se abre, busca y toca la opción que dice <span>"Agregar a la pantalla principal"</span> o <span>"Instalar aplicación"</span>, y luego confirma.
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>

                <div className="pwa-footer">
                    <button onClick={handleClose} className="pwa-button">
                        {canShowNativePrompt ? "Ahora no, después" : "Ya entendí, ir a mis audios"}
                    </button>
                    {!showManualOnly && <p className="pwa-footer-note">Este aviso no volverá a aparecer.</p>}
                </div>
            </div>
        </div>
    );
};

export default PWAOnboarding;
