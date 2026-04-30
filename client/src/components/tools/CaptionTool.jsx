import React from 'react';
import {
    Card, Select, TextField, TextArea,
    PLATFORM_OPTIONS, TUJUAN_OPTIONS, TONE_OPTIONS, CTA_OPTIONS,
    FRAMEWORK_OPTIONS,
} from './Field';

const PANJANG_OPTIONS = [
    { value: 'Sangat Pendek (1-2 Paragraf)', label: 'Sangat Pendek (1-2 Paragraf)' },
    { value: 'Sedang (3-4 Paragraf)', label: 'Sedang (3-4 Paragraf)' },
    { value: 'Panjang / Microblogging', label: 'Panjang / Microblogging (Storytelling)' },
];

const EMOJI_OPTIONS = [
    { value: 'Gunakan emoji secukupnya agar tidak kaku', label: 'Gunakan emoji secukupnya agar tidak kaku' },
    { value: 'Gunakan banyak emoji yang relevan dan ekspresif', label: 'Gunakan banyak emoji yang relevan dan ekspresif' },
    { value: 'Tanpa emoji sama sekali (Sangat Formal)', label: 'Tanpa emoji sama sekali (Sangat Formal)' },
];

const CaptionTool = ({ formData, onChange, errors }) => {
    return (
        <>
            <Card step="01" title="Konteks & Platform">
                <div className="form-grid">
                    <Select id="cap_platform" label="Platform Target *" value={formData.cap_platform} onChange={onChange}
                        options={PLATFORM_OPTIONS} customId="custom_cap_platform" customValue={formData.custom_cap_platform}
                        customPlaceholder="Tulis platform manual..." errors={errors} />
                    <Select id="cap_tujuan" label="Tujuan Postingan" value={formData.cap_tujuan} onChange={onChange}
                        options={TUJUAN_OPTIONS} customId="custom_cap_tujuan" customValue={formData.custom_cap_tujuan}
                        customPlaceholder="Tulis tujuan manual..." errors={errors} />
                </div>
            </Card>

            <Card step="02" title="Detail Konten">
                <div className="form-grid">
                    <TextArea id="cap_topik" label="Topik / Isi Konten Utama *"
                        value={formData.cap_topik} onChange={onChange}
                        placeholder="Jelaskan apa yang dibahas dalam gambar/video kamu. Semakin detail semakin bagus hasil AI..."
                        errors={errors} fullWidth rows={3} />
                    <Select id="cap_tone" label="Gaya Bahasa (Tone)" value={formData.cap_tone} onChange={onChange}
                        options={TONE_OPTIONS} customId="custom_cap_tone" customValue={formData.custom_cap_tone}
                        customPlaceholder="Tulis tone manual..." errors={errors} />
                    <Select id="cap_framework" label="Framework Copywriting" value={formData.cap_framework} onChange={onChange}
                        customId="custom_cap_framework" customValue={formData.custom_cap_framework}
                        customPlaceholder="Tulis framework manual..." errors={errors}>
                        {FRAMEWORK_OPTIONS}
                    </Select>
                </div>
            </Card>

            <Card step="03" title="Format Ekstra & Konversi">
                <div className="form-grid">
                    <Select id="cap_panjang" label="Panjang Caption" value={formData.cap_panjang} onChange={onChange}
                        options={PANJANG_OPTIONS} errors={errors} />
                    <Select id="cap_cta" label="Call to Action (CTA) *" value={formData.cap_cta} onChange={onChange}
                        options={CTA_OPTIONS} customId="custom_cap_cta" customValue={formData.custom_cap_cta}
                        customPlaceholder="Tulis CTA manual..." errors={errors} />
                    <TextField id="cap_keyword" label="Fokus Keyword / Hashtag"
                        value={formData.cap_keyword} onChange={onChange}
                        placeholder="Contoh: Skincare lokal, Tips Diet..." errors={errors}
                        helper="Pisahkan dengan koma." />
                    <Select id="cap_emoji" label="Penggunaan Emoji" value={formData.cap_emoji} onChange={onChange}
                        options={EMOJI_OPTIONS} errors={errors} />
                </div>
            </Card>
        </>
    );
};

export default CaptionTool;
