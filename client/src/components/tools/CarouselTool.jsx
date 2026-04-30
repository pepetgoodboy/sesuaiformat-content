import React from 'react';
import {
    Card, Select, TextField,
    TUJUAN_OPTIONS, AVATAR_OPTIONS, TONE_OPTIONS, CTA_OPTIONS,
    VISUAL_STYLE_OPTIONS, FRAMEWORK_OPTIONS, TARGET_MARKET_OPTIONS,
} from './Field';

const CAR_SLIDES_OPTIONS = [
    { value: '5', label: '5 Slide (Singkat & Cepat)' },
    { value: '7', label: '7 Slide (Standar Ideal)' },
    { value: '10', label: '10 Slide (Mendalam / In-depth)' },
];

const CarouselTool = ({ formData, onChange, errors }) => {
    return (
        <>
            <Card step="01" title="Konteks Carousel">
                <div className="form-grid">
                    <TextField id="car_topik" label="Topik / Judul Utama *" value={formData.car_topik} onChange={onChange}
                        placeholder="Contoh: 5 Rahasia Copywriting yang Bikin Konversi Naik" errors={errors} fullWidth />
                    <Select id="car_audiens" label="Target Market *" value={formData.car_audiens} onChange={onChange}
                        customId="custom_car_audiens" customValue={formData.custom_car_audiens}
                        customPlaceholder="Tulis audiens manual..." errors={errors}>
                        {TARGET_MARKET_OPTIONS}
                    </Select>
                    <Select id="car_tujuan" label="Tujuan Carousel" value={formData.car_tujuan} onChange={onChange}
                        options={TUJUAN_OPTIONS} customId="custom_car_tujuan" customValue={formData.custom_car_tujuan}
                        customPlaceholder="Tulis tujuan manual..." errors={errors} />
                </div>
            </Card>

            <Card step="02" title="Struktur & Framework">
                <div className="form-grid">
                    <Select id="car_slides" label="Jumlah Slide" value={formData.car_slides} onChange={onChange}
                        options={CAR_SLIDES_OPTIONS} errors={errors} />
                    <Select id="car_tone" label="Gaya Bahasa (Tone)" value={formData.car_tone} onChange={onChange}
                        options={TONE_OPTIONS} customId="custom_car_tone" customValue={formData.custom_car_tone}
                        customPlaceholder="Tulis tone manual..." errors={errors} />
                    <Select id="car_framework" label="Framework Copywriting" value={formData.car_framework} onChange={onChange}
                        customId="custom_car_framework" customValue={formData.custom_car_framework}
                        customPlaceholder="Tulis framework manual..." errors={errors}>
                        {FRAMEWORK_OPTIONS}
                    </Select>
                    <Select id="car_avatar" label="Avatar / Persona Bercerita" value={formData.car_avatar} onChange={onChange}
                        options={AVATAR_OPTIONS} customId="custom_car_avatar" customValue={formData.custom_car_avatar}
                        customPlaceholder="Tulis avatar manual..." errors={errors} />
                </div>
            </Card>

            <Card step="03" title="Visual & Konversi">
                <div className="form-grid">
                    <Select id="car_visual" label="Panduan Visual (Desain Carousel)" value={formData.car_visual} onChange={onChange}
                        options={VISUAL_STYLE_OPTIONS} customId="custom_car_visual" customValue={formData.custom_car_visual}
                        customPlaceholder="Tulis visual manual..." errors={errors} />
                    <Select id="car_cta" label="Call to Action (CTA) *" value={formData.car_cta} onChange={onChange}
                        options={CTA_OPTIONS} customId="custom_car_cta" customValue={formData.custom_car_cta}
                        customPlaceholder="Tulis CTA manual..." errors={errors} />
                </div>
            </Card>
        </>
    );
};

export default CarouselTool;
