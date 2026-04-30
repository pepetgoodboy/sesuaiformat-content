import React from 'react';
import {
    Card, Select, TextField,
    PLATFORM_OPTIONS, AWARENESS_OPTIONS, PSYCHO_OPTIONS,
    TONE_OPTIONS, HOOK_STRATEGY_OPTIONS, TARGET_MARKET_OPTIONS,
} from './Field';

const HOOK_JUMLAH_OPTIONS = [
    { value: '3', label: '3 Variasi Hook' },
    { value: '5', label: '5 Variasi Hook' },
    { value: '10', label: '10 Variasi Hook' },
];

const HookTool = ({ formData, onChange, errors }) => {
    return (
        <>
            <Card step="01" title="Konteks & Audiens">
                <div className="form-grid">
                    <TextField id="hook_topik" label="Topik Utama Konten *" value={formData.hook_topik} onChange={onChange}
                        placeholder="Contoh: Kesalahan pemula saat mulai diet" errors={errors} fullWidth />
                    <Select id="hook_audiens" label="Target Audiens" value={formData.hook_audiens} onChange={onChange}
                        customId="custom_hook_audiens" customValue={formData.custom_hook_audiens}
                        customPlaceholder="Tulis audiens manual..." errors={errors}>
                        {TARGET_MARKET_OPTIONS}
                    </Select>
                    <Select id="hook_awareness" label="Level Awareness" value={formData.hook_awareness} onChange={onChange}
                        options={AWARENESS_OPTIONS} errors={errors} />
                </div>
            </Card>

            <Card step="02" title="Masalah & Sudut Pandang">
                <div className="form-grid">
                    <Select id="hook_psycho" label="Psychographics (Psikologi)" value={formData.hook_psycho} onChange={onChange}
                        options={PSYCHO_OPTIONS} customId="custom_hook_psycho" customValue={formData.custom_hook_psycho}
                        customPlaceholder="Tulis psikologi manual..." errors={errors} />
                    <Select id="hook_tone" label="Tone (Gaya Bahasa)" value={formData.hook_tone} onChange={onChange}
                        options={TONE_OPTIONS} customId="custom_hook_tone" customValue={formData.custom_hook_tone}
                        customPlaceholder="Tulis tone manual..." errors={errors} />
                    <TextField id="hook_pain_point" label="Pain Point Utama (Masalah) *"
                        value={formData.hook_pain_point} onChange={onChange}
                        placeholder="Contoh: Susah konsisten olahraga" errors={errors} />
                    <TextField id="hook_desire" label="Desire Utama (Impian) *"
                        value={formData.hook_desire} onChange={onChange}
                        placeholder="Contoh: Perut rata tanpa gym" errors={errors} />
                </div>
            </Card>

            <Card step="03" title="Strategi Hook & Output">
                <div className="form-grid">
                    <Select id="hook_strategy_h" label="Strategi Hook Spesifik" value={formData.hook_strategy_h} onChange={onChange}
                        options={HOOK_STRATEGY_OPTIONS} customId="custom_hook_strategy" customValue={formData.custom_hook_strategy}
                        customPlaceholder="Tulis tipe hook spesifik manual..." errors={errors} fullWidth />
                    <Select id="hook_platform" label="Format Platform Target" value={formData.hook_platform} onChange={onChange}
                        options={PLATFORM_OPTIONS} customId="custom_hook_platform" customValue={formData.custom_hook_platform}
                        customPlaceholder="Tulis platform manual..." errors={errors} />
                    <Select id="hook_jumlah" label="Jumlah Variasi Hook" value={formData.hook_jumlah} onChange={onChange}
                        options={HOOK_JUMLAH_OPTIONS} errors={errors} />
                </div>
            </Card>
        </>
    );
};

export default HookTool;
