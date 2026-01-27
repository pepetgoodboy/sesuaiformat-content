import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Toast from '../components/Toast';
import ConfirmDialog from '../components/ConfirmDialog';

const GeneratorPage = () => {
    const navigate = useNavigate();
    const { signOut } = useAuth();

    // --- STATE ---
    const initialFormData = {
        // 1. Context & Platform
        tujuan_konten: '',
        custom_tujuan: '',
        platform: '',
        custom_platform: '',
        role: '',
        avatar: '',
        custom_avatar: '',

        // 2. Content Specs
        jenis_konten: '',
        custom_jenis: '',
        format_durasi: '',
        visual_style: '',
        custom_visual: '',

        // 3. Copywriting Strategy
        framework: '',
        custom_framework: '',
        hook_strategy: '',
        custom_hook: '',

        // 4. Target Audience
        level_awareness: '',
        psychographics: '',
        custom_psycho: '',
        target_audience: '',
        custom_target: '',
        compliance_niche: '',
        custom_compliance: '',

        // 5. Product Details
        nama_produk: '',
        jenis_produk: '',
        custom_jenis_produk: '',
        problem: '',
        solution: '',
        unique_value: '',
        tone: '',
        custom_tone: '',
        cta: '',
        custom_cta: '',

        // 6. Quantity
        jumlah_script: '1 Script'
    };

    const [formData, setFormData] = useState(initialFormData);
    const [generatedPrompt, setGeneratedPrompt] = useState('// Isi form di sebelah kiri untuk generate prompt...');
    const [isGenerating, setIsGenerating] = useState(false);
    const [toasts, setToasts] = useState([]);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    // Theme State
    const [isLightMode, setIsLightMode] = useState(false);

    // Refs
    const outputRef = useRef(null);
    const validationMsgRef = useRef(null);

    // --- UTILS ---
    const showToast = (message, type = 'default') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    // --- THEME LOGIC (MATCHING HTML EXACTLY) ---
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        // Check if light mode should be active
        if (savedTheme === "light") {
            document.body.classList.add("light-mode");
            setIsLightMode(true);
        } else {
            document.body.classList.remove("light-mode");
            setIsLightMode(false);
        }
    }, []);

    const toggleTheme = () => {
        const body = document.body;
        body.classList.toggle("light-mode");
        const isLight = body.classList.contains("light-mode");
        localStorage.setItem("theme", isLight ? "light" : "dark");
        setIsLightMode(isLight);
    };

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

    const handleReset = () => {
        setIsConfirmOpen(true);
    };

    const confirmReset = () => {
        setFormData(initialFormData);
        setGeneratedPrompt('// Isi form di sebelah kiri untuk generate prompt...');
        setIsConfirmOpen(false);
        showToast("Formulir berhasil direset", "success");
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // --- FORM HANDLING ---
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const isCustom = (fieldValue) => fieldValue === 'custom';

    const validateFields = () => {
        // "Required" logic mostly applies to the dropdowns
        const requiredFields = [
            'tujuan_konten', 'platform', 'role', 'avatar',
            'jenis_konten', 'format_durasi', 'visual_style',
            'framework', 'hook_strategy',
            'level_awareness', 'psychographics', 'target_audience', 'compliance_niche',
            'nama_produk', 'jenis_produk', 'problem', 'solution', 'unique_value', 'tone', 'cta'
        ];

        let isValid = true;

        requiredFields.forEach(field => {
            if (!formData[field]) {
                isValid = false;
            } else if (formData[field] === 'custom') {
                // Check custom sibling. Naming convention: custom_ + shorthand
                let customKey = '';
                if (field === 'tujuan_konten') customKey = 'custom_tujuan';
                else if (field === 'platform') customKey = 'custom_platform';
                else if (field === 'avatar') customKey = 'custom_avatar';
                else if (field === 'jenis_konten') customKey = 'custom_jenis';
                else if (field === 'visual_style') customKey = 'custom_visual';
                else if (field === 'framework') customKey = 'custom_framework';
                else if (field === 'hook_strategy') customKey = 'custom_hook';
                else if (field === 'psychographics') customKey = 'custom_psycho';
                else if (field === 'target_audience') customKey = 'custom_target';
                else if (field === 'compliance_niche') customKey = 'custom_compliance';
                else if (field === 'jenis_produk') customKey = 'custom_jenis_produk';
                else if (field === 'tone') customKey = 'custom_tone';
                else if (field === 'cta') customKey = 'custom_cta';

                if (customKey && (!formData[customKey] || !formData[customKey].trim())) {
                    isValid = false;
                }
            }
        });

        if (!isValid) {
            // Show validation msg
            if (validationMsgRef.current) {
                validationMsgRef.current.classList.remove('hidden');
                validationMsgRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            showToast("Mohon lengkapi semua kolom wajib (*)", "error");
        } else {
            if (validationMsgRef.current) validationMsgRef.current.classList.add('hidden');
        }

        return isValid;
    };

    // --- LOGIC ENGINE ---
    const generatePrompt = () => {
        if (!validateFields()) return;

        setIsGenerating(true);
        // Helper to get final value (dropdown or custom input)
        const getVal = (baseKey, customKey) => {
            return formData[baseKey] === 'custom' ? formData[customKey] : formData[baseKey];
        };

        const tujuan = getVal('tujuan_konten', 'custom_tujuan');
        const platform = getVal('platform', 'custom_platform');
        const role = formData.role; // Input text
        const avatar = getVal('avatar', 'custom_avatar');

        const jenis = getVal('jenis_konten', 'custom_jenis');
        const format = formData.format_durasi; // Select only
        const visualStyle = getVal('visual_style', 'custom_visual');

        const framework = getVal('framework', 'custom_framework');
        const hookStrategy = getVal('hook_strategy', 'custom_hook');

        const awareness = formData.level_awareness;
        const psychographics = getVal('psychographics', 'custom_psycho');
        const target = getVal('target_audience', 'custom_target');
        const compliance = getVal('compliance_niche', 'custom_compliance');

        const namaProd = formData.nama_produk;
        const jenisProd = getVal('jenis_produk', 'custom_jenis_produk');
        const problem = formData.problem;
        const solution = formData.solution;
        const uniqueVal = formData.unique_value;
        const tone = getVal('tone', 'custom_tone');
        const cta = getVal('cta', 'custom_cta');
        const jumlahScript = formData.jumlah_script;

        setTimeout(() => {
            // LOGIC ENGINE (Ported from HTML)
            let dynamicRules = [];
            let personaInstruction = "";
            let visualInstruction = "";
            let complianceInstruction = "";

            // Avatar Logic
            if (avatar.includes("UGC")) personaInstruction = "Buat script seolah-olah user jujur, bahasa santai, cerita pengalaman pribadi.";
            else if (avatar.includes("Founder")) personaInstruction = "Gunakan nada Visionary & Authoritative, bangun kredibilitas.";
            else if (avatar.includes("Expert")) personaInstruction = "Fokus Edukasi & Logika, hindari promosi berlebih.";
            else if (avatar.includes("Voice Over")) personaInstruction = "Script padat, visual-oriented, narator menjelaskan visual.";
            else if (avatar.includes("Influencer")) personaInstruction = "Gaya aspirational, fokus pada lifestyle dan status.";

            // Platform Logic
            if (platform.includes("TikTok")) dynamicRules.push("* Gaya Bahasa: Gen-Z/Jaksel jika relevan. Text Overlay di detik 0-3.");
            else if (platform.includes("LinkedIn")) dynamicRules.push("* Gaya Bahasa: Profesional, istilah industri, bangun Credibility dulu.");
            else if (platform.includes("Pinterest")) dynamicRules.push("* Fokus pada Keyword SEO & Visual aesthetics.");
            else if (platform.includes("Email")) dynamicRules.push("* Subject line harus Click-bait namun relevan. Keep it short.");

            // Trend Jacking
            if (jenis.includes("Trend Jacking")) dynamicRules.push("* KONTEN TREND: Pastikan hook sinkron dengan audio/suara viral yang sedang tren.");

            // Awareness Logic
            if (awareness === "Unaware") dynamicRules.push("* Jangan sebut Produk di Hook. Fokus pada Problem/Story.");
            else if (awareness === "Most Aware") dynamicRules.push("* Langsung offer value/urgency.");

            // Psychographics Logic
            if (psychographics.includes("Maximizer")) dynamicRules.push("* Fokus pada kualitas terbaik, fitur premium.");
            else if (psychographics.includes("Value Seeker")) dynamicRules.push("* Tekankan harga termurah, diskon.");
            else if (psychographics.includes("Simplifier")) dynamicRules.push("* Tekankan kemudahan dan kecepatan.");
            else if (psychographics.includes("Eco")) dynamicRules.push("* Gunakan istilah sustainability, eco-friendly.");

            // Visual Logic
            if (visualStyle.includes("POV")) visualInstruction = "Instruksikan visual: Kamera selfie view, tunjukkan penggunaan produk langsung.";
            else if (visualStyle.includes("Green Screen")) visualInstruction = "Instruksikan visual: Pembicara di depan background grafik data/foto produk.";
            else if (visualStyle.includes("B-Roll")) visualInstruction = "Instruksikan visual: Fokus tekstur/detail produk, tanpa wajah.";
            else if (visualStyle.includes("Cinematic")) visualInstruction = "Instruksikan visual: Slow motion, lighting estetik.";
            else if (visualStyle.includes("Split Screen")) visualInstruction = "Instruksikan visual: Layar terbagi dua (Before/After).";
            else if (visualStyle.includes("ASMR")) visualInstruction = "Instruksikan visual: Zoom in extreme, fokus suara (buka, tuang, gosok).";

            // Compliance Logic
            if (compliance.includes("Health")) complianceInstruction = "* Hindari kata 'Mengobati/Menyembuhkan'. Gunakan 'Membantu Meredakan'.";
            else if (compliance.includes("Financial")) complianceInstruction = "* Tambahkan disclaimer: 'Investasi berisiko'.";
            else if (compliance.includes("Beauty")) complianceInstruction = "* Gunakan Soft Claims. Hindari klaim instan.";
            else if (compliance.includes("Islamic")) complianceInstruction = "* Pastikan bahasa dan offering halal dan syar'i.";

            const finalRules = [personaInstruction, visualInstruction, complianceInstruction, ...dynamicRules].filter(Boolean).join("\n");

            const prompt = `### PROMPT SCRIPT KONTEN COMPREHENSIVE ###

**ANDA ADALAH:**
Senior Conversion Copywriter & Video Director. Ahli psikologi penjualan dan visual execution.

**TUGAS ANDA:**
Buat **SCRIPT KONTEN SIAP PAKAI** lengkap Catatan Visual.

**DETAIL KONTEKSTUAL:**
* Tujuan: ${tujuan}
* Platform: ${platform}
* Role: ${role}
* Avatar: ${avatar}

**SPECS KONTEN:**
* Jenis: ${jenis}
* Format: ${format}
* Visual Style: ${visualStyle}

**STRATEGI:**
* Framework: ${framework}
* Hook Strategy: ${hookStrategy}
* Tone: ${tone}

**AUDIENCE:**
* Awareness: ${awareness}
* Psychographics: ${psychographics}
* Target Market: ${target}
* Compliance: ${compliance}

**PRODUK:**
* Nama: ${namaProd} (${jenisProd})
* Problem: ${problem}
* Solution: ${solution}
* USP: ${uniqueVal}
* CTA: ${cta}

**ATURAN KHUSUS:**
* ${finalRules}
* **QUANTITY:** Buat ${jumlahScript} variasi script yang unik (berbeda angle atau hook).

**OUTPUT:**
Gunakan format berikut (Ulangi sesuai jumlah ${jumlahScript} jika lebih dari 1):

=== HOOK (${hookStrategy}) ===
...isi hook opening (Maks 3 detik)...

=== BODY (${framework}) ===
...isi script lengkap sesuai framework...

=== CTA ===
...kalimat penutup spesifik untuk ${cta}...

=== CATATAN EKSEKUSI VISUAL ===
...detail instruksi visual berdasarkan style ${visualStyle}...`;

            setGeneratedPrompt(prompt);
            setIsGenerating(false);

            if (window.innerWidth < 1024) {
                const terminalDisplay = document.getElementById("terminal-view-mob");
                if (terminalDisplay) terminalDisplay.scrollIntoView({ behavior: 'smooth' });
            }

        }, 1500);
    };

    const copyPrompt = () => {
        if (generatedPrompt.startsWith('//')) return;
        navigator.clipboard.writeText(generatedPrompt);
        showToast("Prompt Berhasil Disalin!", "success");
    };

    const goToGPT = () => {
        if (generatedPrompt.startsWith('//')) return;
        const encodedPrompt = encodeURIComponent(generatedPrompt);
        window.open(`https://chatgpt.com/g/g-Ji2QOyMml-copywriter-gpt-marketing-branding-ads?prompt=${encodedPrompt}`, "_blank");
        showToast("Membuka ChatGPT...", "success");
    };

    // --- RENDER ---
    return (
        <div className="min-h-screen">
            <Toast toasts={toasts} />
            <ConfirmDialog
                isOpen={isConfirmOpen}
                title="Reset Form?"
                message="Semua data yang Anda isi akan hilang."
                onConfirm={confirmReset}
                onCancel={() => setIsConfirmOpen(false)}
            />

            {/* Mobile Floating Logout Button */}
            <button
                onClick={handleLogout}
                className="sm:hidden fixed bottom-6 right-6 z-50 p-2 border-[1px] border-[#2a303e] rounded-lg cursor-pointer flex hover:text-red-500 hover:border-red-500"
                title="Keluar"
            >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            </button>

            {/* HEADER */}
            <header className="sticky top-0 z-50 backdrop-blur border-b transition-colors duration-300" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--border-color)' }}>
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10 shadow-lg backdrop-blur-sm overflow-hidden p-2 flex-shrink-0">
                            {/* SVG Logo Placeholder if png not available */}
                            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover" />
                            {/* <svg className="w-full h-full text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg> */}
                        </div>
                        <div className="flex flex-col items-start text-left">
                            <h1 className="text-lg sm:text-xl font-bold tracking-tight flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                                Content Script<span style={{ color: 'var(--brand-orange)' }}>Engine</span>
                            </h1>
                            <p className="text-[11px] font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
                                By SesuaiFormat.id
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle Dark Mode">
                            {isLightMode ? (
                                <svg id="icon-sun" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                            ) : (
                                <svg id="icon-moon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>
                            )}
                        </button>
                        <button onClick={handleLogout} className="hidden p-2 border-[1px] border-[#2a303e] rounded-lg cursor-pointer sm:flex hover:text-red-500 hover:border-red-500" title="Keluar">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        </button>
                    </div>
                </div>
            </header>

            <section className="pt-16 pb-12 px-4">
                <div className="max-w-4xl mx-auto space-y-12">
                    <div className="text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold tracking-wide uppercase transition-colors" style={{ backgroundColor: 'rgba(239, 126, 40, 0.1)', borderColor: 'rgba(239, 126, 40, 0.2)', color: '#ef7e28' }}>
                            <span className="w-1.5 h-1.5 rounded-full bg-[#ef7e28]"></span> New V5.0 Release
                        </div>
                        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.15] animate-slide-up transition-colors" style={{ animationDelay: '0.1s', color: 'var(--text-main)' }}>
                            Buat Script Konten cuman dalam<br className="hidden md:block" />
                            <span className="text-gradient"> Hitungan menit</span>
                            <span className="inline-block animate-float ml-2">⚡</span>
                        </h1>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                            Awareness level, visual direction, hook, hingga framework copywriting, <br />
                            semua dirangkai otomatis dalam satu prompt siap pakai.
                        </p>
                    </div>
                </div>
            </section>

            <main className="max-w-7xl mx-auto px-4 md:px-6 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* FORM SECTION */}
                <section className="lg:col-span-7 space-y-6">
                    {/* 01: Konteks & Platform */}
                    <div className="saas-card">
                        <div className="section-title">
                            <div className="step-number">01</div>
                            Konteks & Platform
                        </div>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Tujuan Utama</label>
                                <select id="tujuan_konten" value={formData.tujuan_konten} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Tujuan --</option>
                                    <option value="Awareness">Awareness (Biarkan mereka tahu ada)</option>
                                    <option value="Edukasi">Edukasi (Berikan value/informasi)</option>
                                    <option value="Engagement">Engagement (Like/Komen/Share)</option>
                                    <option value="Lead">Lead Gen (Kumpulin kontak/WA)</option>
                                    <option value="Sales / Closing">Sales / Closing (Langsung jual)</option>
                                    <option value="Retargeting">Retargeting (Ingatkan lagi)</option>
                                    <option value="Trust Building">Trust Building (Bangun kepercayaan)</option>
                                    <option value="Brand Recall">Brand Recall (Top of Mind)</option>
                                    <option value="App Install">App Install (Download Sekarang)</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.tujuan_konten) && <div className="show-field"><input type="text" id="custom_tujuan" value={formData.custom_tujuan} onChange={handleInputChange} placeholder="Tulis tujuan manual..." className="required-field-custom" /></div>}
                            </div>
                            <div className="input-group">
                                <label>Platform Target</label>
                                <select id="platform" value={formData.platform} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Platform --</option>
                                    <option value="TikTok / Reels (Short Form)">TikTok / Reels (Cepat, Visual)</option>
                                    <option value="YouTube (Long Form)">YouTube (Edukasi, Deep)</option>
                                    <option value="LinkedIn (Professional)">LinkedIn (Formal, Bisnis)</option>
                                    <option value="Instagram Feed (Static)">Instagram Feed (Estetika)</option>
                                    <option value="Facebook Video">Facebook (Emosional, Demografi tua)</option>
                                    <option value="Pinterest (Visual SEO)">Pinterest (Search, Visual Heavy)</option>
                                    <option value="Email Newsletter">Email (Subject Line, Preview)</option>
                                    <option value="Website Landing Page">Landing Page (Conversion Copy)</option>
                                    <option value="Twitter / X (Threads)">Twitter / X (Short Punchy Text)</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.platform) && <div className="show-field"><input type="text" id="custom_platform" value={formData.custom_platform} onChange={handleInputChange} placeholder="Tulis platform manual..." className="required-field-custom" /></div>}
                            </div>
                            <div className="input-group">
                                <label>Role Pengguna</label>
                                <select id="role" value={formData.role} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Role --</option>
                                    <option value="Advertiser / Seller">Advertiser / Seller (Pemilik)</option>
                                    <option value="Affiliate Marketer">Affiliate Marketer (Komisi)</option>
                                    <option value="Content Creator / Influencer">Content Creator / Influencer</option>
                                    <option value="Dropshipper / Reseller">Dropshipper / Reseller</option>
                                    <option value="Agency Account">Agency Account</option>
                                    <option value="Product Manager">Product Manager (Feature Launch)</option>
                                    <option value="Community Manager">Community Manager (Engagement)</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Avatar / Persona</label>
                                <select id="avatar" value={formData.avatar} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Avatar --</option>
                                    <option value="The Founder/Owner">The Founder/Owner (Visioner, Jujur)</option>
                                    <option value="UGC Creator (Relatable)">UGC Creator (Sok akrab, Temenan)</option>
                                    <option value="Expert/Mentor">Expert/Mentor (Berwibawa, Pintar)</option>
                                    <option value="Customer Testimonial">Customer Testimonial (Bukti Sosial)</option>
                                    <option value="Voice Over / Faceless">Voice Over / Faceless</option>
                                    <option value="Motion Graphic / Animation">Motion Graphic / Animation</option>
                                    <option value="Case Study Presenter">Case Study Presenter (Analisis)</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.avatar) && <div className="show-field"><input type="text" id="custom_avatar" value={formData.custom_avatar} onChange={handleInputChange} placeholder="Tulis avatar manual..." className="required-field-custom" /></div>}
                            </div>
                        </div>
                    </div>

                    {/* 02: Spesifikasi Konten */}
                    <div className="saas-card">
                        <div className="section-title">
                            <div className="step-number">02</div>
                            Spesifikasi Konten
                        </div>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Jenis Konten</label>
                                <select id="jenis_konten" value={formData.jenis_konten} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Jenis --</option>
                                    <option value="Konten Ads (Paid)">Konten Ads (Berbayar)</option>
                                    <option value="Konten Affiliate Review">Affiliate Review (Honest)</option>
                                    <option value="Konten Organik Harian">Organik Harian (Consistent)</option>
                                    <option value="Soft Selling">Soft Selling (Halus, Edukasi)</option>
                                    <option value="Hard Selling / Closing">Hard Selling / Closing (Tegas)</option>
                                    <option value="Edu-Content">Edu-Content (Pure Value)</option>
                                    <option value="Trend Jacking / Viral Sound">Trend Jacking / Viral Sound</option>
                                    <option value="Case Study / Success Story">Case Study (Masalah-Solusi)</option>
                                    <option value="Behind The Scenes (BTS)">Behind The Scenes (BTS)</option>
                                    <option value="Product Launch / Teaser">Product Launch / Teaser</option>
                                    <option value="Webinar / Live Stream Promo">Webinar / Live Event Promo</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.jenis_konten) && <div className="show-field"><input type="text" id="custom_jenis" value={formData.custom_jenis} onChange={handleInputChange} placeholder="Tulis jenis konten manual..." className="required-field-custom" /></div>}
                            </div>
                            <div className="input-group">
                                <label>Format & Durasi</label>
                                <select id="format_durasi" value={formData.format_durasi} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Format --</option>
                                    <option value="Video 15–30 detik">Video 15–30 detik (Super Short)</option>
                                    <option value="Video 30–60 detik">Video 30–60 detik (Standard)</option>
                                    <option value="Video 60–90 detik">Video 60–90 detik (Medium)</option>
                                    <option value="Carousel 5–10 slide">Carousel 5–10 slide</option>
                                    <option value="Carousel Swipeable">Carousel (Swipeable/Reveal)</option>
                                    <option value="Story 3–5 slide">Story 3–5 slide</option>
                                    <option value="Reels Faceless">Reels (Faceless/Stock)</option>
                                    <option value="YouTube Shorts">YouTube Shorts (Vertical)</option>
                                    <option value="Caption Only">Caption Only (Foto Statis)</option>
                                </select>
                            </div>
                            <div className="input-group form-grid full-width">
                                <label>Gaya Visual / Shooting</label>
                                <select id="visual_style" value={formData.visual_style} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Visual Style --</option>
                                    <option value="Talking Head">Talking Head (Wajah Full)</option>
                                    <option value="POV (Point of View)">POV (Tangan memegang kamera/produk)</option>
                                    <option value="Green Screen">Green Screen (Background Gambar/Info)</option>
                                    <option value="B-Roll / Product Focus">B-Roll / Product Focus (Fokus Objek)</option>
                                    <option value="Lifestyle / Day in Life">Lifestyle / Day in Life (Konteks Asli)</option>
                                    <option value="Cinematic / Aesthetic">Cinematic / Aesthetic (Slowmo, Artsy)</option>
                                    <option value="Split Screen">Split Screen (Before/After)</option>
                                    <option value="ASMR (Sound Focus)">ASMR (Focus Sound & Texture)</option>
                                    <option value="Stop Motion">Stop Motion (Frame-by-frame)</option>
                                    <option value="Animation (2D/3D)">Animation (2D/3D Motion)</option>
                                    <option value="Breaking News Style">Breaking News (Ticker/Green Screen)</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.visual_style) && <div className="show-field"><input type="text" id="custom_visual" value={formData.custom_visual} onChange={handleInputChange} placeholder="Tulis gaya visual manual..." className="required-field-custom" /></div>}
                            </div>
                        </div>
                    </div>

                    {/* 03: Strategi Copywriting */}
                    <div className="saas-card">
                        <div className="section-title">
                            <div className="step-number">03</div>
                            Strategi Copywriting
                        </div>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Framework Copy</label>
                                <select id="framework" value={formData.framework} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Framework --</option>
                                    <optgroup label="A. Conversion Focused">
                                        <option value="AIDCA (Attention–Interest–Desire–Conviction–Action)">AIDCA</option>
                                        <option value="PAS (Problem–Agitate–Solution)">PAS (Problem–Agitate–Solution)</option>
                                        <option value="BAB (Before–After–Bridge)">BAB (Before–After–Bridge)</option>
                                        <option value="4P (Promise–Picture–Proof–Push)">4P (Promise–Picture–Proof–Push)</option>
                                        <option value="SLAP (Stop–Look–Act–Purchase)">SLAP (Stop–Look–Act–Purchase)</option>
                                    </optgroup>
                                    <optgroup label="B. Storytelling & Brand">
                                        <option value="StoryBrand (Hero–Problem–Guide–Plan–Action–Success)">StoryBrand</option>
                                        <option value="ABT (And–But–Therefore)">ABT (And–But–Therefore)</option>
                                        <option value="Hero’s Journey (Problem–Struggle–Breakthrough–Change)">Hero’s Journey</option>
                                        <option value="Hook–Story–Offer (HSO)">Hook–Story–Offer (HSO)</option>
                                    </optgroup>
                                    <optgroup label="C. Diagnostic & Educational">
                                        <option value="QUEST (Qualify–Understand–Educate–Stimulate–Transition)">QUEST</option>
                                        <option value="JTBD (Situation–Motivation–Obstacle–Outcome)">JTBD (Jobs To Be Done)</option>
                                        <option value="Awareness Ladder (Unaware → Most Aware)">Awareness Ladder</option>
                                        <option value="FAB (Features–Advantages–Benefits)">FAB (Features–Advantages–Benefits)</option>
                                    </optgroup>
                                    <optgroup label="D. Advanced / Hybrid">
                                        <option value="PASTOR (Problem–Amplify–Story–Transformation–Offer–Response)">PASTOR</option>
                                        <option value="Problem–Promise–Proof">Problem–Promise–Proof</option>
                                        <option value="Useful–Urgent–Unique">Useful–Urgent–Unique</option>
                                        <option value="The 3 Reason Why">The 3 Reason Why</option>
                                        <option value="Feature–Solution–Solution">Feature–Solution–Solution</option>
                                        <option value="Solution–Impact–Problem">Solution–Impact–Problem</option>
                                        <option value="Failed–Growth–Success">Failed–Growth–Success</option>
                                        <option value="Stop–Fear–Listen">Stop–Fear–Listen</option>
                                    </optgroup>
                                </select>
                                {isCustom(formData.framework) && <div className="show-field"><input type="text" id="custom_framework" value={formData.custom_framework} onChange={handleInputChange} placeholder="Tulis framework manual..." className="required-field-custom" /></div>}
                            </div>
                            <div className="input-group">
                                <label>Hook Strategy (Pembuka)</label>
                                <select id="hook_strategy" value={formData.hook_strategy} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Hook --</option>
                                    <option value="Pattern Interrupt">Pattern Interrupt (Gerakan/Suara aneh)</option>
                                    <option value="Negative / Vulnerability">Negative Hook (Curhat masalah)</option>
                                    <option value="Specific Number">Specific Number (3 Alasan..., 7 Hari...)</option>
                                    <option value="Question Based">Question Based (Pertanyaan memancing)</option>
                                    <option value="Story Hook">Story Hook (Mulai cerita langsung)</option>
                                    <option value="Statistik / Data (Shock Value)">Statistik / Data (Fakta Mengejutkan)</option>
                                    <option value="Flashback / Nostalgia">Flashback / Nostalgia (Kenangan)</option>
                                    <option value="Direct Question (Yes/No)">Direct Question (Yes/No Response)</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.hook_strategy) && <div className="show-field"><input type="text" id="custom_hook" value={formData.custom_hook} onChange={handleInputChange} placeholder="Tulis hook strategy manual..." className="required-field-custom" /></div>}
                            </div>
                        </div>
                    </div>

                    {/* 04: Target Audience */}
                    <div className="saas-card">
                        <div className="section-title">
                            <div className="step-number">04</div>
                            Target Audience
                        </div>
                        <div className="form-grid">
                            <div className="input-group">
                                <label>Level Awareness</label>
                                <select id="level_awareness" value={formData.level_awareness} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Level --</option>
                                    <option value="Unaware">Unaware (Tidak tahu masalahnya)</option>
                                    <option value="Problem Aware">Problem Aware (Tau masalah, cari solusi)</option>
                                    <option value="Solution Aware">Solution Aware (Tau solusi, bandingin produk)</option>
                                    <option value="Most Aware">Most Aware (Siap beli, butuh dorongan)</option>
                                </select>
                            </div>
                            <div className="input-group">
                                <label>Psychographics (Psikologi)</label>
                                <select id="psychographics" value={formData.psychographics} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Psikologi --</option>
                                    <option value="Pain-Averse">Pain-Averse (Takut rugi/salah pilih)</option>
                                    <option value="Status Seeker">Status Seeker (Ingin terlihat kaya/pinter)</option>
                                    <option value="Skeptic">Skeptic (Butuh bukti/fakta logis)</option>
                                    <option value="Impulse Buyer">Impulse Buyer (Gampang tergoda FOMO)</option>
                                    <option value="Value Seeker">Value Seeker (Cari yang paling murah/hemat)</option>
                                    <option value="Eco-Conscious">Eco-Conscious (Peduli Lingkungan/Sustainable)</option>
                                    <option value="Tech Savvy">Tech Savvy (Early Adopter, Suka gadget)</option>
                                    <option value="Family Oriented">Family Oriented (Fokus Keluarga/Anak)</option>
                                    <option value="Luxury / High-End">Luxury / High-End (Exklusif, Mahal)</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.psychographics) && <div className="show-field"><input type="text" id="custom_psycho" value={formData.custom_psycho} onChange={handleInputChange} placeholder="Tulis psikologi manual..." className="required-field-custom" /></div>}
                            </div>
                            <div className="input-group">
                                <label>Target Market</label>
                                <select id="target_audience" value={formData.target_audience} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Target --</option>
                                    <optgroup label="A. Marketing & Ads">
                                        <option value="Advertiser (FB Ads / TikTok Ads User)">Advertiser (FB Ads / TikTok Ads User)</option>
                                        <option value="Performance Marketer (In-house / Agency)">Performance Marketer (In-house / Agency)</option>
                                        <option value="Digital Marketing Manager">Digital Marketing Manager</option>
                                        <option value="Content Strategist">Content Strategist</option>
                                        <option value="Media Buyer Agency">Media Buyer Agency</option>
                                    </optgroup>
                                    <optgroup label="B. Business">
                                        <option value="Business Owner (UMKM / Brand Owner)">Business Owner (UMKM / Brand Owner)</option>
                                        <option value="Founder Startup (Early Stage)">Founder Startup (Early Stage)</option>
                                        <option value="Owner Toko Offline">Owner Toko Offline</option>
                                        <option value="Sales Team / Sales Leader">Sales Team / Sales Leader</option>
                                        <option value="Franchise Owner">Franchise Owner</option>
                                    </optgroup>
                                    <optgroup label="C. Commerce">
                                        <option value="Seller Marketplace (Shopee / Tokopedia)">Seller Marketplace (Shopee / Tokopedia)</option>
                                        <option value="Reseller / Dropshipper">Reseller / Dropshipper</option>
                                        <option value="Distributor / Grosir">Distributor / Grosir</option>
                                        <option value="Brand Lokal / D2C Seller">Brand Lokal / D2C Seller</option>
                                    </optgroup>
                                    <optgroup label="D. Creator Economy">
                                        <option value="Content Creator / Affiliate">Content Creator / Affiliate</option>
                                        <option value="Influencer (Nano / Micro)">Influencer (Nano / Micro)</option>
                                        <option value="Coach / Mentor / Trainer">Coach / Mentor / Trainer</option>
                                        <option value="Educator / Course Creator">Educator / Course Creator</option>
                                    </optgroup>
                                    <optgroup label="E. B2B / Corporate">
                                        <option value="HR / People Ops">HR / People Ops</option>
                                        <option value="Ops / Finance / Admin">Ops / Finance / Admin</option>
                                        <option value="IT / Tech Team">IT / Tech Team</option>
                                        <option value="Procurement / Purchasing">Procurement / Purchasing</option>
                                    </optgroup>
                                    <optgroup label="F. Other">
                                        <option value="Non-Profit / Organization">Non-Profit / Organization</option>
                                        <option value="Mahasiswa / Fresh Graduate">Mahasiswa / Fresh Graduate</option>
                                        <option value="Umum (General Audience)">Umum (General Audience)</option>
                                        <option value="custom">Lainnya (Isi Manual)</option>
                                    </optgroup>
                                </select>
                                {isCustom(formData.target_audience) && <div className="show-field"><input type="text" id="custom_target" value={formData.custom_target} onChange={handleInputChange} placeholder="Tulis target market manual..." className="required-field-custom" /></div>}
                            </div>
                            <div className="input-group">
                                <label>Compliance / Niche</label>
                                <select id="compliance_niche" value={formData.compliance_niche} onChange={handleInputChange} className="required-field">
                                    <option value="">-- Pilih Niche --</option>
                                    <option value="General">General (Aman bebas)</option>
                                    <option value="Beauty / Skincare">Beauty / Skincare (Soft Claim)</option>
                                    <option value="Health / Medical">Health / Medical (Klaim Medis Dilarang)</option>
                                    <option value="Financial / Investment">Financial / Investment (Disclaimer Wajib)</option>
                                    <option value="Food & Beverage">Food & Beverage (Halal/Sehat)</option>
                                    <option value="custom">Lainnya (Isi Manual)</option>
                                </select>
                                {isCustom(formData.compliance_niche) && <div className="show-field"><input type="text" id="custom_compliance" value={formData.custom_compliance} onChange={handleInputChange} placeholder="Tulis compliance/niche manual..." className="required-field-custom" /></div>}
                            </div>
                        </div>
                    </div>

                    {/* 05: Detail Produk */}
                    <div className="saas-card">
                        <div className="section-title">
                            <div className="step-number">05</div>
                            Detail Produk
                        </div>
                        <div className="space-y-4">
                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Nama Produk *</label>
                                    <input type="text" id="nama_produk" value={formData.nama_produk} onChange={handleInputChange} placeholder="Nama brand/produk jelas" className="required-field" />
                                    <span className="helper-text text-xs pt-1">Contoh: Serum Glowing A, Kursus Copywriting.</span>
                                </div>
                                <div className="input-group">
                                    <label>Jenis Produk</label>
                                    <select id="jenis_produk" value={formData.jenis_produk} onChange={handleInputChange} className="required-field">
                                        <option value="">-- Pilih Jenis Produk --</option>
                                        <optgroup label="A. Digital Product">
                                            <option value="Digital (Ebook / Template)">Digital (Ebook / Template)</option>
                                            <option value="Digital (Mini Course / Video)">Digital (Mini Course / Video)</option>
                                            <option value="Digital (Toolkit / Resource Pack)">Digital (Toolkit / Resource Pack)</option>
                                            <option value="Digital (Membership / Komunitas)">Digital (Membership / Komunitas)</option>
                                            <option value="Digital (Bundle / Paket)">Digital (Bundle / Paket)</option>
                                        </optgroup>
                                        <optgroup label="B. Service / Jasa">
                                            <option value="Jasa (Agency / Freelance)">Jasa (Agency / Freelance)</option>
                                            <option value="Jasa (Konsultasi 1:1)">Jasa (Konsultasi 1:1)</option>
                                            <option value="Jasa (Done-For-You / Implementasi)">Jasa (Done-For-You / Implementasi)</option>
                                            <option value="Jasa (Audit / Review)">Jasa (Audit / Review)</option>
                                            <option value="Jasa (Maintenance / Retainer)">Jasa (Maintenance / Retainer)</option>
                                        </optgroup>
                                        <optgroup label="C. Physical / Commerce">
                                            <option value="Fisik (Skincare / Fashion)">Fisik (Skincare / Fashion)</option>
                                            <option value="Fisik (Food & Beverage)">Fisik (Food & Beverage)</option>
                                            <option value="Fisik (Kesehatan Umum / Wellness)">Fisik (Kesehatan Umum / Wellness)</option>
                                            <option value="Fisik (Home & Living)">Fisik (Home & Living)</option>
                                            <option value="Fisik (Gadget / Aksesoris)">Fisik (Gadget / Aksesoris)</option>
                                        </optgroup>
                                        <optgroup label="D. Software">
                                            <option value="SaaS / Software">SaaS / Software</option>
                                            <option value="App / Mobile">App / Mobile</option>
                                            <option value="Plugin / Add-on">Plugin / Add-on</option>
                                        </optgroup>
                                        <optgroup label="E. Education">
                                            <option value="Kursus / Coaching">Kursus / Coaching</option>
                                            <option value="Bootcamp / Program Intensif">Bootcamp / Program Intensif</option>
                                            <option value="Workshop">Workshop</option>
                                        </optgroup>
                                        <optgroup label="F. Event & Social">
                                            <option value="Event / Webinar">Event / Webinar</option>
                                            <option value="Event Offline">Event Offline</option>
                                            <option value="Fundraising / Donasi">Fundraising / Donasi</option>
                                        </optgroup>
                                        <option value="custom">Lainnya (Isi Manual)</option>
                                    </select>
                                    {isCustom(formData.jenis_produk) && <div className="show-field"><input type="text" id="custom_jenis_produk" value={formData.custom_jenis_produk} onChange={handleInputChange} placeholder="Tulis jenis produk manual..." className="required-field-custom" /></div>}
                                </div>
                            </div>

                            <div className="input-group">
                                <input type="text" id="problem" value={formData.problem} onChange={handleInputChange} placeholder="Masalah Utama (Pain Point) *" className="required-field" />
                                <span className="helper-text text-xs pt-1">Contoh: Wajah kusam, Bingung cara diet.</span>
                            </div>
                            <div className="input-group">
                                <input type="text" id="solution" value={formData.solution} onChange={handleInputChange} placeholder="Solusi Utama (Main Benefit) *" className="required-field" />
                                <span className="helper-text text-xs pt-1">Contoh: Glowing dalam 7 hari, Diet tanpa laper.</span>
                            </div>
                            <div className="input-group">
                                <input type="text" id="unique_value" value={formData.unique_value} onChange={handleInputChange} placeholder="Unique Value / Pembeda (USP) *" className="required-field" />
                                <span className="helper-text text-xs pt-1">Kenapa harus beli disini?</span>
                            </div>

                            <div className="form-grid">
                                <div className="input-group">
                                    <label>Gaya Bahasa (Tone)</label>
                                    <select id="tone" value={formData.tone} onChange={handleInputChange} className="required-field">
                                        <option value="">-- Pilih Tone --</option>
                                        <option value="Santai & Relatable">Santai & Relatable (Sok kenal)</option>
                                        <option value="Edukatif & Profesional">Edukatif & Profesional (Guru)</option>
                                        <option value="Urgent & Direct">Urgent & Direct (Penjual Agresif)</option>
                                        <option value="Gen-Z / Anak Jaksel">Gen-Z / Anak Jaksel (Gaul)</option>
                                        <option value="Witty & Humorous">Witty & Humorous (Lucu)</option>
                                        <option value="Empathetic">Empathetic (Empati, Mengerti)</option>
                                        <option value="Minimalist">Minimalist (Singkat, Padat)</option>
                                        <option value="custom">Lainnya (Isi Manual)</option>
                                    </select>
                                    {isCustom(formData.tone) && <div className="show-field"><input type="text" id="custom_tone" value={formData.custom_tone} onChange={handleInputChange} placeholder="Tulis tone manual..." className="required-field-custom" /></div>}
                                </div>
                                <div className="input-group">
                                    <label>Call to Action (CTA)</label>
                                    <select id="cta" value={formData.cta} onChange={handleInputChange} className="required-field">
                                        <option value="">-- Pilih CTA --</option>
                                        <option value="Klik Link di Bio">Klik Link di Bio</option>
                                        <option value="DM / Chat Sekarang">DM / Chat Sekarang</option>
                                        <option value='Comment "INFO"'>Comment "INFO"</option>
                                        <option value="Follow & Save">Follow & Save</option>
                                        <option value="Beli Sekarang">Beli Sekarang</option>
                                        <option value="Daftar Sekarang">Daftar Sekarang</option>
                                        <option value="Swipe Up">Swipe Up (Stories)</option>
                                        <option value="Start Free Trial">Start Free Trial</option>
                                        <option value="Download Asset / E-book">Download Asset / E-book</option>
                                        <option value="custom">Lainnya (Isi Manual)</option>
                                    </select>
                                    {isCustom(formData.cta) && <div className="show-field"><input type="text" id="custom_cta" value={formData.custom_cta} onChange={handleInputChange} placeholder="Tulis CTA manual..." className="required-field-custom" /></div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 06: Quantity Options */}
                    <div className="saas-card">
                        <div className="section-title">
                            <div className="step-number">06</div>
                            Quantity Options
                        </div>
                        <div className="input-group">
                            <label>Jumlah Variasi Script</label>
                            <select id="jumlah_script" value={formData.jumlah_script} onChange={handleInputChange} className="required-field">
                                <option value="1 Script">1 Script (Standard)</option>
                                <option value="2 Script">2 Script (Variasi A/B)</option>
                                <option value="3 Script">3 Script (Pilihan A/B/C)</option>
                                <option value="4 Script">4 Script (Opsi A/B/C/D)</option>
                                <option value="5 Script">5 Script (Opsi A/B/C/D/E)</option>
                            </select>
                            <span className="helper-text text-xs pt-1">Pilih berapa variasi script yang ingin di-generate AI.</span>
                        </div>
                    </div>

                    {/* Validation Msg */}
                    <div ref={validationMsgRef} id="validation-msg" className="hidden bg-red-900/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-lg text-sm flex items-center gap-2 mb-6 transition-colors" style={{ backgroundColor: 'rgba(239, 68, 68, 0.1)', borderColor: 'rgba(239, 68, 68, 0.3)', color: '#ef4444' }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        <span>Mohon lengkapi semua kolom wajib (*) sebelum generate.</span>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4">
                        <button onClick={generatePrompt} disabled={isGenerating} className="btn-primary">
                            {isGenerating ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    Racik Prompt...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M16 12C16 15.3137 13.3137 18 10 18C6.68629 18 4 15.3137 4 12C4 8.68629 6.68629 6 10 6C13.3137 6 16 8.68629 16 12Z" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><path d="M10 12C10 8.68629 7.31371 6 4 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" /><path d="M16 12C16 15.3137 18.6863 18 22 18" stroke="white" strokeWidth="2.5" strokeLinecap="round" /></svg>
                                    Generate Prompt
                                </>
                            )}
                        </button>
                        <button onClick={handleReset} className="btn-secondary">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            Reset Form
                        </button>
                    </div>

                </section>

                {/* ASIDE (Desktop) */}
                <aside className="lg:col-span-5 hidden lg:block sticky top-24 self-start">
                    <div className="terminal-window">
                        <div className="terminal-header">
                            <div className="flex items-center gap-4">
                                <div className="terminal-dots">
                                    <div className="dot red"></div>
                                    <div className="dot yellow"></div>
                                    <div className="dot green"></div>
                                </div>
                                <span className="text-xs text-slate-500 font-mono">AI Prompt Output</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={copyPrompt} className="text-xs text-[#ef7e28] font-mono font-bold hover:bg-[#ef7e28] hover:text-white transition-all flex items-center gap-1 border border-[#ef7e28] rounded px-2 py-0.5">
                                    COPY
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div className="terminal-body custom-scrollbar" id="output_display_desk">
                            {isGenerating ? (
                                <div className="flex items-center gap-2 text-orange-500 animate-pulse">
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Sedang meracik prompt...</span>
                                </div>
                            ) : (
                                <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
                            )}
                            <div ref={outputRef}></div>
                        </div>
                    </div>

                    <div className="mt-4">
                        <button onClick={goToGPT} className="w-full bg-[#ef7e28] hover:bg-[#d97706] text-white border border-transparent font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2 group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            Buat Content Script (Open ChatGPT)
                        </button>
                    </div>
                </aside>

                {/* MOBILE TERMINAL */}
                <div className="lg:hidden sticky top-4 z-40 mb-8" id="terminal-view-mob">
                    <div className="terminal-window" style={{ minHeight: '400px' }}>
                        <div className="terminal-header">
                            <div className="flex items-center gap-4">
                                <div className="terminal-dots">
                                    <div className="dot red"></div>
                                    <div className="dot yellow"></div>
                                    <div className="dot green"></div>
                                </div>
                                <span className="text-xs text-slate-500 font-mono">Result</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={copyPrompt} className="text-xs text-[#ef7e28] font-mono font-bold hover:text-white transition-all flex items-center gap-1 border border-[#ef7e28] rounded px-2 py-0.5">
                                    COPY <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
                                </button>
                            </div>
                        </div>
                        <div className="terminal-body custom-scrollbar">
                            {isGenerating ? (
                                <div className="flex items-center gap-2 text-orange-500 animate-pulse">
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    <span>Wait...</span>
                                </div>
                            ) : (
                                <pre className="whitespace-pre-wrap">{generatedPrompt}</pre>
                            )}
                        </div>
                        <div className="w-full p-4">
                            <button onClick={goToGPT} className="w-full bg-[#ef7e28] hover:bg-[#d97706] text-white border border-transparent text-xs px-5 py-2.5 rounded-2xl font-bold transition-all flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                Buat Content Script
                            </button>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    );
};

export default GeneratorPage;
