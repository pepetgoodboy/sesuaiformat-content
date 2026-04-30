import React from 'react';
import {
    Card, Select, TextField,
    PLATFORM_OPTIONS, TUJUAN_OPTIONS, COMPLIANCE_OPTIONS,
    FORMAT_DURASI_OPTIONS, TARGET_MARKET_OPTIONS,
} from './Field';

const CAL_DURASI_OPTIONS = [
    { value: '1 Minggu', label: '1 Minggu (7 Hari)' },
    { value: '2 Minggu', label: '2 Minggu (14 Hari)' },
    { value: '1 Bulan', label: '1 Bulan (30 Hari)' },
];

const CAL_FREKUENSI_OPTIONS = [
    { value: '3x Seminggu', label: '3x Seminggu' },
    { value: '5x Seminggu', label: '5x Seminggu' },
    { value: 'Tiap Hari (7x Seminggu)', label: 'Tiap Hari (7x Seminggu)' },
    { value: 'Sehari 2x', label: 'Sehari 2x' },
];

const CAL_INCLUDE_HOOK_OPTIONS = [
    { value: 'Ya, sertakan ide hook spesifik (kalimat pertama)', label: 'Ya, sertakan ide hook spesifik (kalimat pertama)' },
    { value: 'Tidak, hanya topik general saja', label: 'Tidak, hanya topik general saja' },
];

const CalendarTool = ({ formData, onChange, errors }) => {
    return (
        <>
            <Card step="01" title="Identitas Brand & Tujuan">
                <div className="form-grid">
                    <Select id="cal_niche" label="Compliance / Niche *" value={formData.cal_niche} onChange={onChange}
                        options={COMPLIANCE_OPTIONS} customId="custom_cal_niche" customValue={formData.custom_cal_niche}
                        customPlaceholder="Tulis niche manual..." errors={errors} />
                    <Select id="cal_audiens" label="Target Market *" value={formData.cal_audiens} onChange={onChange}
                        customId="custom_cal_audiens" customValue={formData.custom_cal_audiens}
                        customPlaceholder="Tulis audiens manual..." errors={errors}>
                        {TARGET_MARKET_OPTIONS}
                    </Select>
                    <Select id="cal_tujuan" label="Tujuan Campaign Bulan Ini" value={formData.cal_tujuan} onChange={onChange}
                        options={TUJUAN_OPTIONS} customId="custom_cal_tujuan" customValue={formData.custom_cal_tujuan}
                        customPlaceholder="Tulis tujuan manual..." errors={errors} fullWidth />
                </div>
            </Card>

            <Card step="02" title="Strategi Konten">
                <div className="form-grid">
                    <TextField id="cal_pilar" label="Content Pillars (Pilar Konten) *"
                        value={formData.cal_pilar} onChange={onChange}
                        placeholder="Contoh: Edukasi, Hiburan/Meme, Promo, Behind the Scene"
                        errors={errors} fullWidth
                        helper="Pisahkan dengan koma. (Minimal 3 pilar)." />
                    <Select id="cal_platform" label="Platform Utama Target" value={formData.cal_platform} onChange={onChange}
                        options={PLATFORM_OPTIONS} customId="custom_cal_platform" customValue={formData.custom_cal_platform}
                        customPlaceholder="Tulis platform manual..." errors={errors} />
                    <Select id="cal_format" label="Gaya Format & Durasi Dominan" value={formData.cal_format} onChange={onChange}
                        options={FORMAT_DURASI_OPTIONS} errors={errors} />
                </div>
            </Card>

            <Card step="03" title="Jadwal & Output">
                <div className="form-grid">
                    <Select id="cal_durasi" label="Durasi Kalender" value={formData.cal_durasi} onChange={onChange}
                        options={CAL_DURASI_OPTIONS} errors={errors} />
                    <Select id="cal_frekuensi" label="Frekuensi Posting" value={formData.cal_frekuensi} onChange={onChange}
                        options={CAL_FREKUENSI_OPTIONS} errors={errors} />
                    <Select id="cal_include_hook" label="Sertakan Ide Hook dalam Tabel?"
                        value={formData.cal_include_hook} onChange={onChange}
                        options={CAL_INCLUDE_HOOK_OPTIONS} errors={errors} fullWidth />
                </div>
            </Card>
        </>
    );
};

export default CalendarTool;
