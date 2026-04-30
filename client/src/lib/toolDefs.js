// Tool registry: title shown in top header + sidebar nav metadata
export const TOOLS = [
    { id: 'script', label: 'Content Script Engine', titleHTML: 'Content Script <span class="text-brand-orange">Engine</span>' },
    { id: 'idea', label: 'Content Idea Generator', titleHTML: 'Content Idea <span class="text-brand-orange">Generator</span>' },
    { id: 'hook', label: 'Hook Generator', titleHTML: 'Hook <span class="text-brand-orange">Generator</span>' },
    { id: 'caption', label: 'Caption Generator', titleHTML: 'Caption <span class="text-brand-orange">Generator</span>' },
    { id: 'carousel', label: 'Carousel', titleHTML: 'Carousel' },
    { id: 'calendar', label: 'Content Plan & Calendar', titleHTML: 'Content Plan & <span class="text-brand-orange">Calendar</span>' },
];

// Required fields per tool (the base select/input ids — custom inputs are validated via customMap)
export const REQUIRED_FIELDS = {
    script: [
        'tujuan_konten', 'platform', 'role', 'avatar',
        'jenis_konten', 'format_durasi', 'visual_style',
        'framework', 'hook_strategy',
        'level_awareness', 'psychographics', 'target_audience', 'compliance_niche',
        'nama_produk', 'jenis_produk', 'problem', 'solution', 'unique_value', 'tone', 'cta',
        'jumlah_script',
    ],
    idea: [
        'idea_tujuan', 'idea_platform', 'idea_role',
        'idea_audiens', 'idea_awareness', 'idea_niche',
        'idea_topik', 'idea_format', 'idea_jumlah',
    ],
    hook: [
        'hook_topik', 'hook_audiens', 'hook_awareness',
        'hook_psycho', 'hook_tone', 'hook_pain_point', 'hook_desire',
        'hook_strategy_h', 'hook_platform', 'hook_jumlah',
    ],
    caption: [
        'cap_platform', 'cap_tujuan',
        'cap_topik', 'cap_tone', 'cap_framework',
        'cap_panjang', 'cap_cta', 'cap_keyword', 'cap_emoji',
    ],
    carousel: [
        'car_topik', 'car_audiens', 'car_tujuan',
        'car_slides', 'car_tone', 'car_framework', 'car_avatar',
        'car_visual', 'car_cta',
    ],
    calendar: [
        'cal_niche', 'cal_audiens', 'cal_tujuan',
        'cal_pilar', 'cal_platform', 'cal_format',
        'cal_durasi', 'cal_frekuensi', 'cal_include_hook',
    ],
};

// Map base select id → its custom_* sibling id (when value === 'custom')
export const CUSTOM_MAP = {
    // script
    tujuan_konten: 'custom_tujuan',
    platform: 'custom_platform',
    avatar: 'custom_avatar',
    jenis_konten: 'custom_jenis',
    visual_style: 'custom_visual',
    framework: 'custom_framework',
    hook_strategy: 'custom_hook',
    psychographics: 'custom_psycho',
    target_audience: 'custom_target',
    compliance_niche: 'custom_compliance',
    jenis_produk: 'custom_jenis_produk',
    tone: 'custom_tone',
    cta: 'custom_cta',
    // idea
    idea_tujuan: 'custom_idea_tujuan',
    idea_platform: 'custom_idea_platform',
    idea_audiens: 'custom_idea_audiens',
    idea_niche: 'custom_idea_niche',
    // hook
    hook_audiens: 'custom_hook_audiens',
    hook_psycho: 'custom_hook_psycho',
    hook_tone: 'custom_hook_tone',
    hook_strategy_h: 'custom_hook_strategy',
    hook_platform: 'custom_hook_platform',
    // caption
    cap_platform: 'custom_cap_platform',
    cap_tujuan: 'custom_cap_tujuan',
    cap_tone: 'custom_cap_tone',
    cap_framework: 'custom_cap_framework',
    cap_cta: 'custom_cap_cta',
    // carousel
    car_audiens: 'custom_car_audiens',
    car_tujuan: 'custom_car_tujuan',
    car_tone: 'custom_car_tone',
    car_framework: 'custom_car_framework',
    car_avatar: 'custom_car_avatar',
    car_visual: 'custom_car_visual',
    car_cta: 'custom_car_cta',
    // calendar
    cal_niche: 'custom_cal_niche',
    cal_audiens: 'custom_cal_audiens',
    cal_tujuan: 'custom_cal_tujuan',
    cal_platform: 'custom_cal_platform',
};

export const INITIAL_FORM_DATA = {
    // ===== SCRIPT =====
    tujuan_konten: '', custom_tujuan: '',
    platform: '', custom_platform: '',
    role: '',
    avatar: '', custom_avatar: '',
    jenis_konten: '', custom_jenis: '',
    format_durasi: '',
    visual_style: '', custom_visual: '',
    framework: '', custom_framework: '',
    hook_strategy: '', custom_hook: '',
    level_awareness: '',
    psychographics: '', custom_psycho: '',
    target_audience: '', custom_target: '',
    compliance_niche: '', custom_compliance: '',
    nama_produk: '',
    jenis_produk: '', custom_jenis_produk: '',
    problem: '', solution: '', unique_value: '',
    tone: '', custom_tone: '',
    cta: '', custom_cta: '',
    jumlah_script: '1 Script',

    // ===== IDEA =====
    idea_tujuan: '', custom_idea_tujuan: '',
    idea_platform: '', custom_idea_platform: '',
    idea_role: '',
    idea_audiens: '', custom_idea_audiens: '',
    idea_awareness: '',
    idea_niche: '', custom_idea_niche: '',
    idea_topik: '',
    idea_format: '',
    idea_jumlah: '10',

    // ===== HOOK =====
    hook_topik: '',
    hook_audiens: '', custom_hook_audiens: '',
    hook_awareness: '',
    hook_psycho: '', custom_hook_psycho: '',
    hook_tone: '', custom_hook_tone: '',
    hook_pain_point: '',
    hook_desire: '',
    // NOTE: hook_strategy has its own custom field within Hook tool
    // (collides w/ Script's hook_strategy → kept separate via prefix `hook_strategy_h`)
    hook_strategy_h: '', custom_hook_strategy: '',
    hook_platform: '', custom_hook_platform: '',
    hook_jumlah: '5',

    // ===== CAPTION =====
    cap_platform: '', custom_cap_platform: '',
    cap_tujuan: '', custom_cap_tujuan: '',
    cap_topik: '',
    cap_tone: '', custom_cap_tone: '',
    cap_framework: '', custom_cap_framework: '',
    cap_panjang: 'Sedang (3-4 Paragraf)',
    cap_cta: '', custom_cap_cta: '',
    cap_keyword: '',
    cap_emoji: 'Gunakan emoji secukupnya agar tidak kaku',

    // ===== CAROUSEL =====
    car_topik: '',
    car_audiens: '', custom_car_audiens: '',
    car_tujuan: '', custom_car_tujuan: '',
    car_slides: '7',
    car_tone: '', custom_car_tone: '',
    car_framework: '', custom_car_framework: '',
    car_avatar: '', custom_car_avatar: '',
    car_visual: '', custom_car_visual: '',
    car_cta: '', custom_car_cta: '',

    // ===== CALENDAR =====
    cal_niche: '', custom_cal_niche: '',
    cal_audiens: '', custom_cal_audiens: '',
    cal_tujuan: '', custom_cal_tujuan: '',
    cal_pilar: '',
    cal_platform: '', custom_cal_platform: '',
    cal_format: '',
    cal_durasi: '1 Bulan',
    cal_frekuensi: 'Tiap Hari (7x Seminggu)',
    cal_include_hook: 'Ya, sertakan ide hook spesifik (kalimat pertama)',
};
