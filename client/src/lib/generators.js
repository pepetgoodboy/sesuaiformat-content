import { CUSTOM_MAP } from './toolDefs';

// Resolve final value: if select === 'custom', read sibling custom_* input
const getVal = (formData, id) => {
    const v = formData[id];
    if (v === 'custom') {
        const customId = CUSTOM_MAP[id];
        return customId ? (formData[customId] || 'Custom Input') : 'Custom Input';
    }
    return v ?? '';
};

const generateScript = (formData) => {
    const tujuan = getVal(formData, 'tujuan_konten');
    const platform = getVal(formData, 'platform');
    const role = getVal(formData, 'role');
    const avatar = getVal(formData, 'avatar');
    const jenis = getVal(formData, 'jenis_konten');
    const format = getVal(formData, 'format_durasi');
    const visualStyle = getVal(formData, 'visual_style');
    const framework = getVal(formData, 'framework');
    const hookStrategy = getVal(formData, 'hook_strategy');
    const awareness = getVal(formData, 'level_awareness');
    const psychographics = getVal(formData, 'psychographics');
    const compliance = getVal(formData, 'compliance_niche');
    const tone = getVal(formData, 'tone');
    const namaProd = getVal(formData, 'nama_produk');
    const jenisProd = getVal(formData, 'jenis_produk');
    const problem = getVal(formData, 'problem');
    const solution = getVal(formData, 'solution');
    const uniqueVal = getVal(formData, 'unique_value');
    const cta = getVal(formData, 'cta');
    const target = getVal(formData, 'target_audience');
    const jumlahScript = getVal(formData, 'jumlah_script');

    let dynamicRules = [];
    let personaInstruction = '';
    let visualInstruction = '';
    let complianceInstruction = '';

    if (avatar.includes('UGC')) personaInstruction = 'Buat script seolah-olah user jujur, bahasa santai, cerita pengalaman pribadi.';
    else if (avatar.includes('Founder')) personaInstruction = 'Gunakan nada Visionary & Authoritative, bangun kredibilitas.';
    else if (avatar.includes('Expert')) personaInstruction = 'Fokus Edukasi & Logika, hindari promosi berlebih.';
    else if (avatar.includes('Voice Over')) personaInstruction = 'Script padat, visual-oriented, narator menjelaskan visual.';
    else if (avatar.includes('Influencer')) personaInstruction = 'Gaya aspirational, fokus pada lifestyle dan status.';

    if (platform.includes('TikTok')) dynamicRules.push('* Gaya Bahasa: Gen-Z/Jaksel jika relevan. Text Overlay di detik 0-3.');
    else if (platform.includes('LinkedIn')) dynamicRules.push('* Gaya Bahasa: Profesional, istilah industri, bangun Credibility dulu.');
    else if (platform.includes('Pinterest')) dynamicRules.push('* Fokus pada Keyword SEO & Visual aesthetics.');
    else if (platform.includes('Email')) dynamicRules.push('* Subject line harus Click-bait namun relevan. Keep it short.');

    if (jenis.includes('Trend Jacking')) dynamicRules.push('* KONTEN TREND: Pastikan hook sinkron dengan audio/suara viral yang sedang tren.');

    if (awareness === 'Unaware') dynamicRules.push('* Jangan sebut Produk di Hook. Fokus pada Problem/Story.');
    else if (awareness === 'Most Aware') dynamicRules.push('* Langsung offer value/urgency.');

    if (psychographics.includes('Maximizer')) dynamicRules.push('* Fokus pada kualitas terbaik, fitur premium.');
    else if (psychographics.includes('Value Seeker')) dynamicRules.push('* Tekankan harga termurah, diskon.');
    else if (psychographics.includes('Simplifier')) dynamicRules.push('* Tekankan kemudahan dan kecepatan.');
    else if (psychographics.includes('Eco')) dynamicRules.push('* Gunakan istilah sustainability, eco-friendly.');

    if (visualStyle.includes('POV')) visualInstruction = 'Instruksikan visual: Kamera selfie view, tunjukkan penggunaan produk langsung.';
    else if (visualStyle.includes('Green Screen')) visualInstruction = 'Instruksikan visual: Pembicara di depan background grafik data/foto produk.';
    else if (visualStyle.includes('B-Roll')) visualInstruction = 'Instruksikan visual: Fokus tekstur/detail produk, tanpa wajah.';
    else if (visualStyle.includes('Cinematic')) visualInstruction = 'Instruksikan visual: Slow motion, lighting estetik.';
    else if (visualStyle.includes('Split Screen')) visualInstruction = 'Instruksikan visual: Layar terbagi dua (Before/After).';
    else if (visualStyle.includes('ASMR')) visualInstruction = 'Instruksikan visual: Zoom in extreme, fokus suara (buka, tuang, gosok).';

    if (compliance.includes('Health')) complianceInstruction = "* Hindari kata 'Mengobati/Menyembuhkan'. Gunakan 'Membantu Meredakan'.";
    else if (compliance.includes('Financial')) complianceInstruction = "* Tambahkan disclaimer: 'Investasi berisiko'.";
    else if (compliance.includes('Beauty')) complianceInstruction = '* Gunakan Soft Claims. Hindari klaim instan.';
    else if (compliance.includes('Islamic')) complianceInstruction = "* Pastikan bahasa dan offering halal dan syar'i.";

    const finalRules = [personaInstruction, visualInstruction, complianceInstruction, ...dynamicRules].filter(Boolean).join('\n');

    return `### PROMPT SCRIPT KONTEN COMPREHENSIVE ###

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
...detail instruksi visual berdasarkan style ${visualStyle}...

**RULE MUTLAK:** JANGAN berikan basa-basi, salam, kata pengantar (seperti "Tentu, berikut adalah..."), atau penjelasan apapun. LANGSUNG berikan hasil scriptnya saja agar siap di-copy-paste!`;
};

const generateHook = (formData) => {
    const topik = getVal(formData, 'hook_topik');
    const audiens = getVal(formData, 'hook_audiens');
    const awareness = getVal(formData, 'hook_awareness');
    const psycho = getVal(formData, 'hook_psycho');
    const painPoint = getVal(formData, 'hook_pain_point');
    const desire = getVal(formData, 'hook_desire');
    const tone = getVal(formData, 'hook_tone');
    const tipeHook = getVal(formData, 'hook_strategy_h');
    const platform = getVal(formData, 'hook_platform');
    const jumlah = getVal(formData, 'hook_jumlah');

    return `### HOOK GENERATOR PROMPT (ADVANCED) ###

Anda adalah pakar Copywriting & Hook Strategy tingkat atas. Tugas Anda adalah membuat ${jumlah} variasi Hook untuk konten yang akan tayang di ${platform}.

**KONTEKS & AUDIENS:**
* Topik Konten: "${topik}"
* Target Market: ${audiens}
* Level Awareness: ${awareness}

**PSIKOLOGI AUDIENS:**
* Karakteristik Psikologi: ${psycho}
* Pain Point Utama (Masalah dihindari): ${painPoint}
* Desire Utama (Impian dicari): ${desire}

**STRATEGI PENULISAN:**
* Tone/Gaya Bahasa: ${tone}
* Strategi Hook Spesifik: ${tipeHook}

**ATURAN MAIN EKSEKUSI:**
1. Jika platformnya berfokus pada Video, hook harus diucapkan dalam maksimal 3-5 detik awal (sangat ringkas dan menampar).
2. Jika platformnya berfokus pada Teks/Visual, hook harus menjadi headline/paragraf pertama yang scroll-stopping.
3. Sesuaikan diksi secara ketat dengan Target Market dan Gaya Bahasa (${tone}). Jangan kaku jika audiensnya kasual.
4. Terapkan strategi "${tipeHook}" dan serang langsung ke arah "Pain Point" atau "Desire" audiens di detik/kalimat pertama.

Berikan ${jumlah} opsi hook yang berbeda-beda kreativitasnya, format sebagai list poin-poin yang jelas!

**RULE MUTLAK:** JANGAN berikan basa-basi, salam, kata pengantar, atau penjelasan apapun. LANGSUNG berikan hasil daftar hook-nya saja agar siap di-copy-paste!`;
};

const generateCaption = (formData) => {
    const platform = getVal(formData, 'cap_platform');
    const tujuan = getVal(formData, 'cap_tujuan');
    const topik = getVal(formData, 'cap_topik');
    const tone = getVal(formData, 'cap_tone');
    const framework = getVal(formData, 'cap_framework');
    const panjang = getVal(formData, 'cap_panjang');
    const cta = getVal(formData, 'cap_cta');
    const keyword = getVal(formData, 'cap_keyword');
    const emoji = getVal(formData, 'cap_emoji');

    return `### CAPTION GENERATOR PROMPT (ADVANCED) ###

Anda adalah Social Media Copywriter profesional. Buatkan sebuah caption yang sangat engaging untuk diposting di platform ${platform}.

**DETAIL KONTEN:**
* Tujuan Utama Postingan: ${tujuan}
* Topik/Isi Utama: "${topik}"

**STRATEGI PENULISAN:**
* Gaya Bahasa (Tone): ${tone}
* Framework Copywriting: ${framework}
* Panjang Caption: ${panjang}
* Instruksi Emoji: ${emoji}

**KOMPONEN WAJIB (SESUAI FRAMEWORK ${framework}):**
1. **Headline/Hook:** Kalimat pertama yang sangat "Scroll-Stopping".
2. **Body:** Deskripsi yang mengalir, rapi, dan mudah dibaca (gunakan spasi/enter antar paragraf) dengan mengikuti struktur framework ${framework}.
3. **Call to Action (CTA):** Akhiri caption dengan ajakan spesifik: "${cta}".
4. **SEO/Hashtags:** Gunakan dan integrasikan fokus keyword berikut ke dalam kalimat jika memungkinkan: ${keyword} (Tambahkan juga hashtag relevan yang memiliki search volume tinggi di ${platform} pada akhir caption).

Buatkan caption yang natural, membangkitkan emosi/ketertarikan, dan memancing konversi!

**RULE MUTLAK:** JANGAN berikan basa-basi, salam, kata pengantar, atau penjelasan apapun. LANGSUNG berikan hasil caption beserta hashtag-nya agar siap di-copy-paste!`;
};

const generateCarousel = (formData) => {
    const topik = getVal(formData, 'car_topik');
    const audiens = getVal(formData, 'car_audiens');
    const tujuan = getVal(formData, 'car_tujuan');
    const slides = getVal(formData, 'car_slides');
    const tone = getVal(formData, 'car_tone');
    const framework = getVal(formData, 'car_framework');
    const avatar = getVal(formData, 'car_avatar');
    const visual = getVal(formData, 'car_visual');
    const cta = getVal(formData, 'car_cta');

    return `### CAROUSEL GENERATOR PROMPT (ADVANCED) ###

Anda adalah Content Strategist & Copywriter Carousel. Buatkan outline lengkap untuk Carousel Post sebanyak persis ${slides} slide.

**KONTEKS KONTEN:**
* Topik/Judul Utama: "${topik}"
* Target Market: ${audiens}
* Tujuan Utama Carousel: ${tujuan}

**STRATEGI PENYAMPAIAN:**
* Avatar / Persona Bercerita: ${avatar} (Sampaikan pesan seolah-olah Anda adalah persona ini)
* Gaya Bahasa (Tone): ${tone}
* Framework Copywriting: ${framework}
* Arahan Panduan Visual/Desain: ${visual}

**INSTRUKSI STRUKTUR (WAJIB DIIKUTI UNTUK ${slides} SLIDE):**
Jabarkan detail isi untuk setiap slide (Mulai dari Slide 1 hingga Slide ${slides}). Setiap breakdown slide wajib memuat 3 elemen ini:

- **[Nomor Slide]**
  - **Headline/Teks Utama:** (Sangat ringkas, mudah dicerna audiens mobile, dan memicu rasa ingin swipe ke slide berikutnya)
  - **Sub-Teks/Penjelasan:** (Teks pelengkap berukuran lebih kecil, jika dibutuhkan untuk elaborasi data/fakta)
  - **Visual Idea:** (Instruksi spesifik untuk desainer grafis berdasarkan arahan visual: ${visual})

**ATURAN PER SLIDE:**
* Slide 1: Berfungsi murni sebagai Judul & Hook Ekstrim.
* Slide Tengah: Sampaikan materi/edukasi sesuai framework ${framework}. Pertahankan satu ide per slide agar tidak menumpuk text-heavy.
* Slide Terakhir (Slide ${slides}): Murni didedikasikan untuk Call to Action (CTA) dengan arahan: "${cta}".

**RULE MUTLAK:** JANGAN berikan basa-basi, salam, kata pengantar, atau penjelasan apapun. LANGSUNG berikan outline to the point dari Slide 1 sampai akhir beserta teks kontennya agar siap di-copy-paste!`;
};

const generateCalendar = (formData) => {
    const niche = getVal(formData, 'cal_niche');
    const audiens = getVal(formData, 'cal_audiens');
    const tujuan = getVal(formData, 'cal_tujuan');
    const pilar = getVal(formData, 'cal_pilar');
    const platform = getVal(formData, 'cal_platform');
    const format = getVal(formData, 'cal_format');
    const durasi = getVal(formData, 'cal_durasi');
    const frekuensi = getVal(formData, 'cal_frekuensi');
    const includeHook = getVal(formData, 'cal_include_hook');

    return `### CONTENT CALENDAR ENGINE PROMPT (ADVANCED) ###

Anda adalah Head of Social Media Strategist. Rancanglah Content Calendar tingkat mahir untuk periode ${durasi} dengan frekuensi tayang ${frekuensi}.

**IDENTITAS BRAND & TUJUAN:**
* Niche / Compliance Industri: ${niche}
* Target Market Spesifik: ${audiens}
* Tujuan Utama Campaign Ini: ${tujuan}

**STRATEGI DISTRIBUSI KONTEN:**
* Platform Utama Target: ${platform}
* Content Pillars (Pilar Konten Utama): ${pilar}
* Gaya Format & Durasi Dominan: ${format}

**TUGAS ANDA:**
Buat jadwal konten lengkap yang di-generate dalam format **TABEL MARKDOWN** yang rapi, terstruktur, dan logis. Tabel harus terdiri dari kolom-kolom berikut:
1. **Hari & Tanggal** (Contoh: Hari 1, Hari 2, dst)
2. **Pilar Konten** (Lakukan rotasi yang rapi, proporsional, dan strategis dari pilar yang disebutkan di atas)
3. **Topik / Judul Spesifik** (Harus langsung relevan dengan niche ${niche})
4. **Format Spesifik Postingan** (Utamakan format dominan: ${format})
${includeHook.includes('Ya') ? '5. **Ide Hook Spesifik (Satu kalimat mematikan untuk opening/kalimat pertama)**' : ''}

**ATURAN TAMBAHAN:**
Pastikan perputaran pilar konten masuk akal, tidak membosankan (jangan hardsell terus-menerus), dan sangat selaras dengan target penyelesaian objektif: ${tujuan}. Berikan strategi yang benar-benar bisa dieksekusi (actionable) untuk konten kreator.

**RULE MUTLAK:** JANGAN berikan basa-basi, salam, kata pengantar, atau penjelasan apapun. LANGSUNG hasilkan tabel markdown-nya saja agar siap di-copy-paste!`;
};

const generateIdea = (formData) => {
    const tujuan = getVal(formData, 'idea_tujuan');
    const platform = getVal(formData, 'idea_platform');
    const role = getVal(formData, 'idea_role');
    const audiens = getVal(formData, 'idea_audiens');
    const awareness = getVal(formData, 'idea_awareness');
    const niche = getVal(formData, 'idea_niche');
    const topik = getVal(formData, 'idea_topik');
    const format = getVal(formData, 'idea_format');
    const jumlah = getVal(formData, 'idea_jumlah');

    return `### CONTENT IDEA GENERATOR PROMPT ###

Anda adalah Content Strategist & Creative Director tingkat atas. Tugas Anda adalah mem-brainstorming ${jumlah} Ide Konten yang sangat engaging, viral-worthy, dan berpotensi konversi tinggi.

**IDENTITAS & TUJUAN:**
* Niche / Industri: ${niche}
* Role Kreator: ${role}
* Tujuan Konten: ${tujuan}

**TARGET AUDIENS:**
* Target Market: ${audiens}
* Level Awareness: ${awareness}

**ARAHAN KONTEN:**
* Topik / Tema Besar: "${topik}"
* Platform Target: ${platform}
* Format Konten: ${format}

**TUGAS ANDA:**
Berikan ${jumlah} ide konten spesifik berdasarkan parameter di atas. Buat dalam format tabel dengan kolom:
1. **Judul / Angle Unik** (Buat se-clickbait tapi relevan mungkin)
2. **Format Eksekusi**
3. **Core Message / Inti Pesan** (Satu kalimat apa yang ingin disampaikan)
4. **Potensi Emosi** (Misal: FOMO, Marah, Relatable, Terinspirasi)

Pastikan idenya out-of-the-box, tidak klise, dan disesuaikan tepat dengan psikologi audiens di atas.

**RULE MUTLAK:** JANGAN berikan basa-basi, salam, kata pengantar, atau penjelasan apapun. LANGSUNG berikan hasil tabel idenya saja agar siap di-copy-paste!`;
};

export const GENERATORS = {
    script: generateScript,
    idea: generateIdea,
    hook: generateHook,
    caption: generateCaption,
    carousel: generateCarousel,
    calendar: generateCalendar,
};
