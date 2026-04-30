import React from 'react';
import {
    Card, Select, TextField,
    PLATFORM_OPTIONS, TUJUAN_OPTIONS, ROLE_OPTIONS,
    AWARENESS_OPTIONS, COMPLIANCE_OPTIONS, TARGET_MARKET_OPTIONS,
} from './Field';

const IDEA_FORMAT_OPTIONS = [
    { value: '', label: '-- Pilih Format --' },
    { value: 'Campuran (Biarkan AI Memilih Terbaik)', label: 'Campuran (Biarkan AI Memilih Terbaik)' },
    { value: 'Video Pendek (Reels/TikTok)', label: 'Video Pendek (Reels/TikTok)' },
    { value: 'Video Panjang (YouTube)', label: 'Video Panjang (YouTube)' },
    { value: 'Carousel / Image Slide', label: 'Carousel / Image Slide' },
    { value: 'Teks (Twitter/LinkedIn/Threads)', label: 'Teks (Twitter/LinkedIn/Threads)' },
    { value: 'Postingan Blog / Artikel', label: 'Postingan Blog / Artikel' },
];

const IDEA_JUMLAH_OPTIONS = [
    { value: '5', label: '5 Ide Konten' },
    { value: '10', label: '10 Ide Konten' },
    { value: '20', label: '20 Ide Konten' },
    { value: '30', label: '30 Ide Konten (Satu Bulan)' },
];

const IdeaTool = ({ formData, onChange, errors }) => {
    return (
        <>
            <Card step="01" title="Identitas & Tujuan">
                <div className="form-grid">
                    <Select id="idea_tujuan" label="Tujuan Utama Ide" value={formData.idea_tujuan} onChange={onChange}
                        options={TUJUAN_OPTIONS} customId="custom_idea_tujuan" customValue={formData.custom_idea_tujuan}
                        customPlaceholder="Tulis tujuan manual..." errors={errors} />
                    <Select id="idea_platform" label="Platform Utama" value={formData.idea_platform} onChange={onChange}
                        options={PLATFORM_OPTIONS} customId="custom_idea_platform" customValue={formData.custom_idea_platform}
                        customPlaceholder="Tulis platform manual..." errors={errors} />
                    <Select id="idea_role" label="Role Pengguna / Kreator" value={formData.idea_role} onChange={onChange}
                        options={ROLE_OPTIONS} errors={errors} fullWidth />
                </div>
            </Card>

            <Card step="02" title="Target & Niche">
                <div className="form-grid">
                    <Select id="idea_audiens" label="Target Market *" value={formData.idea_audiens} onChange={onChange}
                        customId="custom_idea_audiens" customValue={formData.custom_idea_audiens}
                        customPlaceholder="Tulis target audiens manual..." errors={errors} fullWidth>
                        {TARGET_MARKET_OPTIONS}
                    </Select>
                    <Select id="idea_awareness" label="Level Awareness" value={formData.idea_awareness} onChange={onChange}
                        options={AWARENESS_OPTIONS} errors={errors} />
                    <Select id="idea_niche" label="Compliance / Niche *" value={formData.idea_niche} onChange={onChange}
                        options={COMPLIANCE_OPTIONS} customId="custom_idea_niche" customValue={formData.custom_idea_niche}
                        customPlaceholder="Tulis niche manual..." errors={errors} />
                </div>
            </Card>

            <Card step="03" title="Topik & Output Ide">
                <div className="form-grid">
                    <TextField id="idea_topik" label="Topik / Tema Besar yang ingin dibahas *"
                        value={formData.idea_topik} onChange={onChange}
                        placeholder="Contoh: Manfaat Skincare Rutin, Kesalahan Finansial Umur 20an..."
                        errors={errors} fullWidth />
                    <Select id="idea_format" label="Format Konten yang Diinginkan" value={formData.idea_format} onChange={onChange}
                        options={IDEA_FORMAT_OPTIONS} errors={errors} />
                    <Select id="idea_jumlah" label="Jumlah Ide" value={formData.idea_jumlah} onChange={onChange}
                        options={IDEA_JUMLAH_OPTIONS} errors={errors} />
                </div>
            </Card>
        </>
    );
};

export default IdeaTool;
