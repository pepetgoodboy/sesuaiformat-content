import React, { useEffect, useRef, useState } from 'react';

const OutputTerminal = ({ variant = 'desktop', output, isGenerating, onCopy, onOpenGPT, copyState, placeholder }) => {
    const fallbackPlaceholder = variant === 'desktop'
        ? '// Isi form di sebelah kiri untuk generate prompt...'
        : '// Scroll ke bawah setelah generate untuk melihat hasil...';
    const placeholderText = placeholder || fallbackPlaceholder;
    const bodyRef = useRef(null);
    const [displayed, setDisplayed] = useState('');

    // Typing animation when output changes
    useEffect(() => {
        if (!output) {
            setDisplayed('');
            return;
        }

        setDisplayed('');
        let i = 0;
        const duration = 800;
        const steps = 40;
        const charsPerStep = Math.max(1, Math.ceil(output.length / steps));
        const intervalTime = duration / steps;

        const timer = setInterval(() => {
            i += charsPerStep;
            setDisplayed(output.substring(0, i));
            if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
            if (i >= output.length) {
                setDisplayed(output);
                clearInterval(timer);
            }
        }, intervalTime);

        return () => clearInterval(timer);
    }, [output]);

    const isPlaceholder = !output;
    const headerLabel = variant === 'desktop' ? 'AI Prompt Output' : 'Result';
    const wrapperClass = variant === 'desktop'
        ? 'h-full'
        : 'h-auto min-h-[400px]';

    return (
        <div className={`terminal-window ${wrapperClass}`}>
            <div className="terminal-header">
                <div className="flex items-center gap-4">
                    <div className="terminal-dots">
                        <div className="dot red"></div>
                        <div className="dot yellow"></div>
                        <div className="dot green"></div>
                    </div>
                    <span className="text-xs font-mono" style={{ color: 'var(--text-muted)' }}>{headerLabel}</span>
                </div>
                <button
                    onClick={onCopy}
                    disabled={isPlaceholder || isGenerating}
                    className={`text-xs font-mono font-bold transition-all flex items-center gap-1 border rounded px-2 py-0.5 cursor-pointer ${copyState ? 'text-green-500 border-green-500' : 'text-brand-orange border-brand-orange hover:opacity-80'} ${isPlaceholder || isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    {copyState ? 'COPIED!' : 'COPY'}
                </button>
            </div>
            <div ref={bodyRef} className="terminal-body custom-scrollbar">
                {isGenerating ? (
                    <div className="flex items-center gap-3 text-[#f97316] font-mono animate-pulse">
                        <svg className="w-5 h-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        <span className="text-sm">Sedang Membuat Prompt...</span>
                    </div>
                ) : isPlaceholder ? (
                    <span style={{ color: 'var(--text-muted)' }}>{placeholderText}</span>
                ) : (
                    displayed
                )}
            </div>
            <div className="p-4 border-t" style={{ borderColor: 'var(--card-border)', backgroundColor: 'var(--bg-terminal-header)' }}>
                <button
                    onClick={onOpenGPT}
                    disabled={isPlaceholder || isGenerating}
                    className={`btn-gradient w-full ${variant === 'desktop' ? 'h-[50px]' : 'h-[46px]'} rounded-xl font-bold flex items-center justify-center gap-2 ${variant === 'desktop' ? 'shadow-md' : 'text-sm'} group ${isPlaceholder || isGenerating ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className={`${variant === 'desktop' ? 'h-5 w-5' : 'h-4 w-4'} group-hover:scale-110 transition-transform`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Sekarang
                </button>
            </div>
        </div>
    );
};

export default OutputTerminal;
