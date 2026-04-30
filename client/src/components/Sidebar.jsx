import React from 'react';

const ICONS = {
    script: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v10a2 2 0 01-2 2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 2v6h6M16 13H8m8 4H8m2-8H8" />
        </svg>
    ),
    idea: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    hook: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
    ),
    caption: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
    ),
    carousel: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
    ),
    calendar: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
};

const Sidebar = ({ tools, currentTool, onSwitchTool, isOpen, onClose, onLogout }) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity"
                    onClick={onClose}
                />
            )}

            <aside
                className={`w-72 flex-shrink-0 border-r flex flex-col h-full z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative shadow-2xl lg:shadow-none`}
                style={{ backgroundColor: 'var(--bg-sidebar)', borderColor: 'var(--card-border)' }}
            >
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-between px-6 border-b" style={{ borderColor: 'var(--card-border)' }}>
                    <div className="flex items-center gap-3 w-full">
                        <div className="w-10 h-10 bg-orange-500/10 rounded-xl flex items-center justify-center border border-orange-500/20 overflow-hidden p-1.5 flex-shrink-0">
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-contain" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-lg font-bold tracking-tight flex items-center gap-1" style={{ color: 'var(--text-main)' }}>
                                Content<span className="text-brand-orange">Script</span>
                            </h1>
                            <p className="text-[10px] font-medium uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                                SesuaiFormat.id
                            </p>
                        </div>
                    </div>
                    <button onClick={onClose} className="lg:hidden p-2 text-slate-500 hover:text-brand-orange" aria-label="Close sidebar">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-6 custom-scrollbar">
                    <div>
                        <p className="px-4 text-[10px] font-bold uppercase tracking-wider mb-2" style={{ color: 'var(--text-muted)' }}>
                            Generators
                        </p>
                        <nav className="space-y-1">
                            {tools.map((tool) => (
                                <button
                                    key={tool.id}
                                    onClick={() => onSwitchTool(tool.id)}
                                    className={`sidebar-menu-item w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-left cursor-pointer ${currentTool === tool.id ? 'active' : ''}`}
                                    style={currentTool === tool.id ? {} : { color: 'var(--text-muted)' }}
                                >
                                    {ICONS[tool.id]}
                                    <span className="text-sm font-medium">{tool.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Sidebar Footer */}
                <div className="p-4 border-t space-y-3" style={{ borderColor: 'var(--card-border)' }}>
                    <button
                        onClick={onLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium transition-all hover:text-red-500 hover:border-red-500 cursor-pointer"
                        style={{ borderColor: 'var(--card-border)', color: 'var(--text-muted)' }}
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Keluar
                    </button>
                    <p className="text-[10px] text-center" style={{ color: 'var(--text-muted)' }}>
                        &copy; 2026 <span className="text-brand-orange font-bold">SesuaiFormat.id</span>
                    </p>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
