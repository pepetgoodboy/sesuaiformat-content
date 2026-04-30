import React from 'react';

// Generic field block: label + select/input + optional custom_* sibling input when value === 'custom'
export const Select = ({ id, label, value, onChange, options, customId, customValue, customPlaceholder, errors, fullWidth, helper, children }) => {
    const isCustom = value === 'custom';
    const hasError = errors?.[id];
    const hasCustomError = customId && errors?.[customId];

    return (
        <div className={`input-group ${fullWidth ? 'lg:col-span-2' : ''}`} style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
            {label && <label>{label}</label>}
            <select
                id={id}
                value={value || ''}
                onChange={(e) => onChange(id, e.target.value)}
                className={hasError ? 'input-error' : ''}
            >
                {children || options?.map((opt) =>
                    opt.group ? (
                        <optgroup key={opt.group} label={opt.group}>
                            {opt.items.map((item) => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </optgroup>
                    ) : (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                    )
                )}
            </select>
            {isCustom && customId && (
                <div className="show-field">
                    <input
                        type="text"
                        id={customId}
                        value={customValue || ''}
                        onChange={(e) => onChange(customId, e.target.value)}
                        placeholder={customPlaceholder}
                        className={hasCustomError ? 'input-error' : ''}
                    />
                </div>
            )}
            {helper && <span className="helper-text pt-1">{helper}</span>}
        </div>
    );
};

export const TextField = ({ id, label, value, onChange, placeholder, errors, fullWidth, helper, type = 'text' }) => {
    const hasError = errors?.[id];
    return (
        <div className={`input-group ${fullWidth ? 'lg:col-span-2' : ''}`} style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
            {label && <label>{label}</label>}
            <input
                type={type}
                id={id}
                value={value || ''}
                onChange={(e) => onChange(id, e.target.value)}
                placeholder={placeholder}
                className={hasError ? 'input-error' : ''}
            />
            {helper && <span className="helper-text pt-1">{helper}</span>}
        </div>
    );
};

export const TextArea = ({ id, label, value, onChange, placeholder, errors, fullWidth, rows = 3 }) => {
    const hasError = errors?.[id];
    return (
        <div className={`input-group ${fullWidth ? 'lg:col-span-2' : ''}`} style={fullWidth ? { gridColumn: '1 / -1' } : {}}>
            {label && <label>{label}</label>}
            <textarea
                id={id}
                value={value || ''}
                onChange={(e) => onChange(id, e.target.value)}
                placeholder={placeholder}
                rows={rows}
                className={hasError ? 'input-error' : ''}
            />
        </div>
    );
};

// Common option dataset reused across tools
export const PLATFORM_OPTIONS = [
    { value: '', label: '-- Pilih Platform --' },
    { value: 'TikTok / Reels (Short Form)', label: 'TikTok / Reels (Cepat, Visual)' },
    { value: 'YouTube (Long Form)', label: 'YouTube (Edukasi, Deep)' },
    { value: 'LinkedIn (Professional)', label: 'LinkedIn (Formal, Bisnis)' },
    { value: 'Instagram Feed (Static)', label: 'Instagram Feed (Estetika)' },
    { value: 'Facebook Video', label: 'Facebook (Emosional, Demografi tua)' },
    { value: 'Pinterest (Visual SEO)', label: 'Pinterest (Search, Visual Heavy)' },
    { value: 'Email Newsletter', label: 'Email (Subject Line, Preview)' },
    { value: 'Website Landing Page', label: 'Landing Page (Conversion Copy)' },
    { value: 'Twitter / X (Threads)', label: 'Twitter / X (Short Punchy Text)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const TUJUAN_OPTIONS = [
    { value: '', label: '-- Pilih Tujuan --' },
    { value: 'Awareness', label: 'Awareness (Biarkan mereka tahu ada)' },
    { value: 'Edukasi', label: 'Edukasi (Berikan value/informasi)' },
    { value: 'Engagement', label: 'Engagement (Like/Komen/Share)' },
    { value: 'Lead', label: 'Lead Gen (Kumpulin kontak/WA)' },
    { value: 'Sales / Closing', label: 'Sales / Closing (Langsung jual)' },
    { value: 'Retargeting', label: 'Retargeting (Ingatkan lagi)' },
    { value: 'Trust Building', label: 'Trust Building (Bangun kepercayaan)' },
    { value: 'Brand Recall', label: 'Brand Recall (Top of Mind)' },
    { value: 'App Install', label: 'App Install (Download Sekarang)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const ROLE_OPTIONS = [
    { value: '', label: '-- Pilih Role --' },
    { value: 'Advertiser / Seller', label: 'Advertiser / Seller (Pemilik)' },
    { value: 'Affiliate Marketer', label: 'Affiliate Marketer (Komisi)' },
    { value: 'Content Creator / Influencer', label: 'Content Creator / Influencer' },
    { value: 'Dropshipper / Reseller', label: 'Dropshipper / Reseller' },
    { value: 'Agency Account', label: 'Agency Account' },
    { value: 'Product Manager', label: 'Product Manager (Feature Launch)' },
    { value: 'Community Manager', label: 'Community Manager (Engagement)' },
];

export const AVATAR_OPTIONS = [
    { value: '', label: '-- Pilih Avatar --' },
    { value: 'The Founder/Owner', label: 'The Founder/Owner (Visioner, Jujur)' },
    { value: 'UGC Creator (Relatable)', label: 'UGC Creator (Sok akrab, Temenan)' },
    { value: 'Expert/Mentor', label: 'Expert/Mentor (Berwibawa, Pintar)' },
    { value: 'Customer Testimonial', label: 'Customer Testimonial (Bukti Sosial)' },
    { value: 'Voice Over / Faceless', label: 'Voice Over / Faceless' },
    { value: 'Motion Graphic / Animation', label: 'Motion Graphic / Animation' },
    { value: 'Case Study Presenter', label: 'Case Study Presenter (Analisis)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const FORMAT_DURASI_OPTIONS = [
    { value: '', label: '-- Pilih Format --' },
    { value: 'Video 15–30 detik', label: 'Video 15–30 detik (Super Short)' },
    { value: 'Video 30–60 detik', label: 'Video 30–60 detik (Standard)' },
    { value: 'Video 60–90 detik', label: 'Video 60–90 detik (Medium)' },
    { value: 'Carousel 5–10 slide', label: 'Carousel 5–10 slide' },
    { value: 'Carousel Swipeable', label: 'Carousel (Swipeable/Reveal)' },
    { value: 'Story 3–5 slide', label: 'Story 3–5 slide' },
    { value: 'Reels Faceless', label: 'Reels (Faceless/Stock)' },
    { value: 'YouTube Shorts', label: 'YouTube Shorts (Vertical)' },
    { value: 'Caption Only', label: 'Caption Only (Foto Statis)' },
];

export const VISUAL_STYLE_OPTIONS = [
    { value: '', label: '-- Pilih Visual Style --' },
    { value: 'Talking Head', label: 'Talking Head (Wajah Full)' },
    { value: 'POV (Point of View)', label: 'POV (Tangan memegang kamera/produk)' },
    { value: 'Green Screen', label: 'Green Screen (Background Gambar/Info)' },
    { value: 'B-Roll / Product Focus', label: 'B-Roll / Product Focus (Fokus Objek)' },
    { value: 'Lifestyle / Day in Life', label: 'Lifestyle / Day in Life (Konteks Asli)' },
    { value: 'Cinematic / Aesthetic', label: 'Cinematic / Aesthetic (Slowmo, Artsy)' },
    { value: 'Split Screen', label: 'Split Screen (Before/After)' },
    { value: 'ASMR (Sound Focus)', label: 'ASMR (Focus Sound & Texture)' },
    { value: 'Stop Motion', label: 'Stop Motion (Frame-by-frame)' },
    { value: 'Animation (2D/3D)', label: 'Animation (2D/3D Motion)' },
    { value: 'Breaking News Style', label: 'Breaking News (Ticker/Green Screen)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const AWARENESS_OPTIONS = [
    { value: '', label: '-- Pilih Level --' },
    { value: 'Unaware', label: 'Unaware (Tidak tahu masalahnya)' },
    { value: 'Problem Aware', label: 'Problem Aware (Tau masalah, cari solusi)' },
    { value: 'Solution Aware', label: 'Solution Aware (Tau solusi, bandingin produk)' },
    { value: 'Most Aware', label: 'Most Aware (Siap beli, butuh dorongan)' },
];

export const PSYCHO_OPTIONS = [
    { value: '', label: '-- Pilih Psikologi --' },
    { value: 'Pain-Averse', label: 'Pain-Averse (Takut rugi/salah pilih)' },
    { value: 'Status Seeker', label: 'Status Seeker (Ingin terlihat kaya/pinter)' },
    { value: 'Skeptic', label: 'Skeptic (Butuh bukti/fakta logis)' },
    { value: 'Impulse Buyer', label: 'Impulse Buyer (Gampang tergoda FOMO)' },
    { value: 'Value Seeker', label: 'Value Seeker (Cari yang paling murah/hemat)' },
    { value: 'Eco-Conscious', label: 'Eco-Conscious (Peduli Lingkungan/Sustainable)' },
    { value: 'Tech Savvy', label: 'Tech Savvy (Early Adopter, Suka gadget)' },
    { value: 'Family Oriented', label: 'Family Oriented (Fokus Keluarga/Anak)' },
    { value: 'Luxury / High-End', label: 'Luxury / High-End (Exklusif, Mahal)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const TARGET_MARKET_OPTIONS = (
    <>
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
    </>
);

export const COMPLIANCE_OPTIONS = [
    { value: '', label: '-- Pilih Niche --' },
    { value: 'General', label: 'General (Aman bebas)' },
    { value: 'Beauty / Skincare', label: 'Beauty / Skincare (Soft Claim)' },
    { value: 'Health / Medical', label: 'Health / Medical (Klaim Medis Dilarang)' },
    { value: 'Financial / Investment', label: 'Financial / Investment (Disclaimer Wajib)' },
    { value: 'Food & Beverage', label: 'Food & Beverage (Halal/Sehat)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const TONE_OPTIONS = [
    { value: '', label: '-- Pilih Tone --' },
    { value: 'Santai & Relatable', label: 'Santai & Relatable (Sok kenal)' },
    { value: 'Edukatif & Profesional', label: 'Edukatif & Profesional (Guru)' },
    { value: 'Urgent & Direct', label: 'Urgent & Direct (Penjual Agresif)' },
    { value: 'Gen-Z / Anak Jaksel', label: 'Gen-Z / Anak Jaksel (Gaul)' },
    { value: 'Witty & Humorous', label: 'Witty & Humorous (Lucu)' },
    { value: 'Empathetic', label: 'Empathetic (Empati, Mengerti)' },
    { value: 'Minimalist', label: 'Minimalist (Singkat, Padat)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const CTA_OPTIONS = [
    { value: '', label: '-- Pilih CTA --' },
    { value: 'Klik Link di Bio', label: 'Klik Link di Bio' },
    { value: 'DM / Chat Sekarang', label: 'DM / Chat Sekarang' },
    { value: 'Comment "INFO"', label: 'Comment "INFO"' },
    { value: 'Follow & Save', label: 'Follow & Save' },
    { value: 'Beli Sekarang', label: 'Beli Sekarang' },
    { value: 'Daftar Sekarang', label: 'Daftar Sekarang' },
    { value: 'Swipe Up', label: 'Swipe Up (Stories)' },
    { value: 'Start Free Trial', label: 'Start Free Trial' },
    { value: 'Download Asset / E-book', label: 'Download Asset / E-book' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const HOOK_STRATEGY_OPTIONS = [
    { value: '', label: '-- Pilih Hook --' },
    { value: 'Pattern Interrupt', label: 'Pattern Interrupt (Gerakan/Suara aneh)' },
    { value: 'Negative / Vulnerability', label: 'Negative Hook (Curhat masalah)' },
    { value: 'Specific Number', label: 'Specific Number (3 Alasan..., 7 Hari...)' },
    { value: 'Question Based', label: 'Question Based (Pertanyaan memancing)' },
    { value: 'Story Hook', label: 'Story Hook (Mulai cerita langsung)' },
    { value: 'Statistik / Data (Shock Value)', label: 'Statistik / Data (Fakta Mengejutkan)' },
    { value: 'Flashback / Nostalgia', label: 'Flashback / Nostalgia (Kenangan)' },
    { value: 'Direct Question (Yes/No)', label: 'Direct Question (Yes/No Response)' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

export const FRAMEWORK_OPTIONS = (
    <>
        <option value="">-- Pilih Framework --</option>
        <optgroup label="A. Conversion Focused">
            <option value="AIDCA">AIDCA (Attention–Interest–Desire–Conviction–Action)</option>
            <option value="PAS">PAS (Problem–Agitate–Solution)</option>
            <option value="BAB">BAB (Before–After–Bridge)</option>
            <option value="4P">4P (Promise–Picture–Proof–Push)</option>
            <option value="SLAP">SLAP (Stop–Look–Act–Purchase)</option>
        </optgroup>
        <optgroup label="B. Storytelling & Brand">
            <option value="StoryBrand">StoryBrand (Hero–Problem–Guide–Plan–Action–Success)</option>
            <option value="ABT">ABT (And–But–Therefore)</option>
            <option value="Hero’s Journey">Hero’s Journey (Problem–Struggle–Breakthrough–Change)</option>
            <option value="Hook–Story–Offer (HSO)">Hook–Story–Offer (HSO)</option>
        </optgroup>
        <optgroup label="C. Diagnostic & Educational">
            <option value="QUEST">QUEST (Qualify–Understand–Educate–Stimulate–Transition)</option>
            <option value="JTBD">JTBD (Jobs To Be Done)</option>
            <option value="Awareness Ladder">Awareness Ladder (Unaware → Most Aware)</option>
            <option value="FAB">FAB (Features–Advantages–Benefits)</option>
        </optgroup>
        <optgroup label="D. Advanced / Hybrid">
            <option value="PASTOR">PASTOR</option>
            <option value="Problem–Promise–Proof">Problem–Promise–Proof</option>
            <option value="Useful–Urgent–Unique">Useful–Urgent–Unique</option>
            <option value="The 3 Reason Why">The 3 Reason Why</option>
            <option value="Feature–Solution–Solution">Feature–Solution–Solution</option>
            <option value="Solution–Impact–Problem">Solution–Impact–Problem</option>
            <option value="Failed–Growth–Success">Failed–Growth–Success</option>
            <option value="Stop–Fear–Listen">Stop–Fear–Listen</option>
        </optgroup>
    </>
);

export const Card = ({ step, title, children }) => (
    <div className="glass-card">
        <div className="section-title">
            <div className="step-number">{step}</div>
            {title}
        </div>
        {children}
    </div>
);
