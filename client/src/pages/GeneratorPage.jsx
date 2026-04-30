import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';
import Sidebar from '../components/Sidebar';
import OutputTerminal from '../components/OutputTerminal';
import ScriptTool from '../components/tools/ScriptTool';
import IdeaTool from '../components/tools/IdeaTool';
import HookTool from '../components/tools/HookTool';
import CaptionTool from '../components/tools/CaptionTool';
import CarouselTool from '../components/tools/CarouselTool';
import CalendarTool from '../components/tools/CalendarTool';
import { TOOLS, REQUIRED_FIELDS, CUSTOM_MAP, INITIAL_FORM_DATA } from '../lib/toolDefs';
import { GENERATORS } from '../lib/generators';

const TOOL_COMPONENTS = {
    script: ScriptTool,
    idea: IdeaTool,
    hook: HookTool,
    caption: CaptionTool,
    carousel: CarouselTool,
    calendar: CalendarTool,
};

const GeneratorPage = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    const [currentTool, setCurrentTool] = useState('script');
    const [formData, setFormData] = useState(INITIAL_FORM_DATA);
    const [errors, setErrors] = useState({});
    const [output, setOutput] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [copyState, setCopyState] = useState({ desktop: false, mobile: false });

    const validationMsgRef = useRef(null);
    const mobileTerminalRef = useRef(null);

    // --- THEME ---
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.documentElement.removeAttribute('data-theme');
            setIsDarkMode(false);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            setIsDarkMode(true);
        }
    }, []);

    const toggleTheme = () => {
        if (isDarkMode) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            setIsDarkMode(false);
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            setIsDarkMode(true);
        }
    };

    // --- TOAST ---
    const showToast = (message, type = 'default') => {
        const id = Date.now() + Math.random();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
    };

    // --- FORM ---
    const handleChange = useCallback((id, value) => {
        setFormData((prev) => ({ ...prev, [id]: value }));
        setErrors((prev) => {
            if (!prev[id]) return prev;
            const next = { ...prev };
            delete next[id];
            return next;
        });
    }, []);

    const handleSwitchTool = (toolId) => {
        setCurrentTool(toolId);
        setOutput('');
        setErrors({});
        setSidebarOpen(false);
    };

    // --- VALIDATION ---
    const validate = () => {
        const required = REQUIRED_FIELDS[currentTool] || [];
        const next = {};
        required.forEach((id) => {
            const v = formData[id];
            if (!v || (typeof v === 'string' && !v.trim())) {
                next[id] = true;
            } else if (v === 'custom') {
                const customId = CUSTOM_MAP[id];
                const customV = customId ? formData[customId] : '';
                if (!customV || !customV.trim()) {
                    next[customId] = true;
                }
            }
        });
        setErrors(next);
        return Object.keys(next).length === 0;
    };

    // --- GENERATE ---
    const handleGenerate = () => {
        if (!validate()) {
            if (validationMsgRef.current) {
                validationMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            showToast('Mohon lengkapi semua kolom wajib (*)', 'error');
            return;
        }

        setIsGenerating(true);
        setOutput('');

        setTimeout(() => {
            const generator = GENERATORS[currentTool];
            if (!generator) {
                setIsGenerating(false);
                return;
            }
            const prompt = generator(formData);
            setOutput(prompt);
            setIsGenerating(false);

            if (window.innerWidth < 1024 && mobileTerminalRef.current) {
                mobileTerminalRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 1500);
    };

    // --- RESET ---
    const handleReset = () => setIsConfirmOpen(true);
    const confirmReset = () => {
        setFormData(INITIAL_FORM_DATA);
        setOutput('');
        setErrors({});
        setIsConfirmOpen(false);
        showToast('Formulir berhasil direset', 'success');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- COPY & GPT ---
    const flashCopy = (variant) => {
        setCopyState((prev) => ({ ...prev, [variant]: true }));
        setTimeout(() => setCopyState((prev) => ({ ...prev, [variant]: false })), 2000);
    };

    const handleCopy = (variant) => {
        if (!output || isGenerating) return;
        navigator.clipboard.writeText(output).then(() => {
            flashCopy(variant);
            showToast('Prompt berhasil disalin!', 'success');
        }).catch(() => {
            const ta = document.createElement('textarea');
            ta.value = output;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            flashCopy(variant);
            showToast('Prompt berhasil disalin!', 'success');
        });
    };

    const handleOpenGPT = () => {
        if (!output || isGenerating) return;
        const encoded = encodeURIComponent(output);
        window.open(`https://chatgpt.com/g/g-Ji2QOyMml-copywriter-gpt-marketing-branding-ads?prompt=${encoded}`, '_blank');
        showToast('Membuka ChatGPT...', 'success');
    };

    // --- LOGOUT ---
    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (err) {
            console.error('Logout failed', err);
            showToast('Gagal logout', 'error');
        }
    };

    const ActiveToolComponent = TOOL_COMPONENTS[currentTool];
    const activeTool = TOOLS.find((t) => t.id === currentTool);

    return (
        <div className="h-screen w-full flex overflow-hidden selection:bg-orange-500 selection:text-white relative">
            <Toast toasts={toasts} />
            <ConfirmDialog
                isOpen={isConfirmOpen}
                title="Reset Form?"
                message="Semua data yang Anda isi akan hilang."
                onConfirm={confirmReset}
                onCancel={() => setIsConfirmOpen(false)}
            />

            <Sidebar
                tools={TOOLS}
                currentTool={currentTool}
                onSwitchTool={handleSwitchTool}
                isOpen={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onLogout={handleLogout}
            />

            <div className="flex-1 flex flex-col min-w-0 h-full relative">
                {/* Top Header */}
                <header
                    className="h-20 flex-shrink-0 flex items-center justify-between px-6 lg:px-8 border-b z-30 transition-colors duration-300"
                    style={{ backgroundColor: 'var(--header-bg)', backdropFilter: 'blur(12px)', borderColor: 'var(--card-border)' }}
                >
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 rounded-lg cursor-pointer"
                            style={{ color: 'var(--text-muted)', backgroundColor: 'var(--input-bg)' }}
                            aria-label="Open menu"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <h2
                            className="text-xl font-bold leading-tight mt-1"
                            style={{ color: 'var(--text-main)' }}
                            dangerouslySetInnerHTML={{ __html: activeTool?.titleHTML || '' }}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-xl border transition-all duration-300 hover:text-brand-orange hover:border-brand-orange cursor-pointer"
                            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
                            aria-label="Toggle theme"
                        >
                            {isDarkMode ? (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                            )}
                        </button>
                        <button
                            onClick={handleLogout}
                            className="hidden sm:flex p-2.5 rounded-xl border transition-all duration-300 hover:text-red-500 hover:border-red-500 cursor-pointer"
                            style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
                            aria-label="Logout"
                            title="Keluar"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </button>
                    </div>
                </header>

                {/* Scrollable Main Area */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 relative custom-scrollbar">
                    <div className="forms-grid-wrapper max-w-7xl mx-auto">

                        {/* FORMS COLUMN */}
                        <section className="space-y-6 min-w-0">
                            {ActiveToolComponent && (
                                <ActiveToolComponent formData={formData} onChange={handleChange} errors={errors} />
                            )}

                            {/* Validation Message */}
                            {Object.keys(errors).length > 0 && (
                                <div
                                    ref={validationMsgRef}
                                    className="px-4 py-3 rounded-lg text-sm flex items-center gap-2 mb-6 transition-colors"
                                    style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                                >
                                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span>Mohon lengkapi semua kolom wajib (*) sebelum generate.</span>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="pb-12 lg:pb-0">
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="btn-gradient w-full h-[54px] rounded-xl font-bold flex items-center justify-center gap-2 text-lg shadow-lg"
                                >
                                    {isGenerating ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Loading...
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M16 12C16 15.3137 13.3137 18 10 18C6.68629 18 4 15.3137 4 12C4 8.68629 6.68629 6 10 6C13.3137 6 16 8.68629 16 12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                                <path d="M10 12C10 8.68629 7.31371 6 4 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                                <path d="M16 12C16 15.3137 18.6863 18 22 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                            </svg>
                                            Generate Prompt
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={handleReset}
                                    className="btn-secondary w-full h-[54px] rounded-xl font-bold flex items-center justify-center gap-2 mt-4 shadow-sm"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Reset Form
                                </button>
                            </div>

                            {/* Mobile Output Terminal */}
                            <div ref={mobileTerminalRef} className="lg:hidden mt-8 mb-8">
                                <OutputTerminal
                                    variant="mobile"
                                    output={output}
                                    isGenerating={isGenerating}
                                    onCopy={() => handleCopy('mobile')}
                                    onOpenGPT={handleOpenGPT}
                                    copyState={copyState.mobile}
                                />
                            </div>
                        </section>

                        {/* DESKTOP OUTPUT TERMINAL */}
                        <aside className="hidden lg:block sticky top-6 self-start h-[calc(100vh-10rem)]">
                            <OutputTerminal
                                variant="desktop"
                                output={output}
                                isGenerating={isGenerating}
                                onCopy={() => handleCopy('desktop')}
                                onOpenGPT={handleOpenGPT}
                                copyState={copyState.desktop}
                            />
                        </aside>

                    </div>
                </main>
            </div>
        </div>
    );
};

export default GeneratorPage;
