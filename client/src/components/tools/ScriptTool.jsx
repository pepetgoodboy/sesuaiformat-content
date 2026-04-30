import React from 'react';
import {
    Card, Select, TextField,
    PLATFORM_OPTIONS, TUJUAN_OPTIONS, ROLE_OPTIONS, AVATAR_OPTIONS,
    FORMAT_DURASI_OPTIONS, VISUAL_STYLE_OPTIONS,
    AWARENESS_OPTIONS, PSYCHO_OPTIONS, COMPLIANCE_OPTIONS,
    TONE_OPTIONS, CTA_OPTIONS, HOOK_STRATEGY_OPTIONS,
    FRAMEWORK_OPTIONS, TARGET_MARKET_OPTIONS,
} from './Field';

const JENIS_KONTEN_OPTIONS = [
    { value: '', label: '-- Pilih Jenis --' },
    { value: 'Konten Ads (Paid)', label: 'Konten Ads (Berbayar)' },
    { value: 'Konten Affiliate Review', label: 'Affiliate Review (Honest)' },
    { value: 'Konten Organik Harian', label: 'Organik Harian (Consistent)' },
    { value: 'Soft Selling', label: 'Soft Selling (Halus, Edukasi)' },
    { value: 'Hard Selling / Closing', label: 'Hard Selling / Closing (Tegas)' },
    { value: 'Edu-Content', label: 'Edu-Content (Pure Value)' },
    { value: 'Trend Jacking / Viral Sound', label: 'Trend Jacking / Viral Sound' },
    { value: 'Case Study / Success Story', label: 'Case Study (Masalah-Solusi)' },
    { value: 'Behind The Scenes (BTS)', label: 'Behind The Scenes (BTS)' },
    { value: 'Product Launch / Teaser', label: 'Product Launch / Teaser' },
    { value: 'Webinar / Live Stream Promo', label: 'Webinar / Live Event Promo' },
    { value: 'custom', label: 'Lainnya (Isi Manual)' },
];

const JENIS_PRODUK_OPTIONS = (
    <>
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
    </>
);

const JUMLAH_SCRIPT_OPTIONS = [
    { value: '1 Script', label: '1 Script (Standard)' },
    { value: '2 Script', label: '2 Script (Variasi A/B)' },
    { value: '3 Script', label: '3 Script (Pilihan A/B/C)' },
    { value: '4 Script', label: '4 Script (Opsi A/B/C/D)' },
    { value: '5 Script', label: '5 Script (Opsi A/B/C/D/E)' },
];

const ScriptTool = ({ formData, onChange, errors }) => {
    return (
        <>
            <Card step="01" title="Konteks & Platform">
                <div className="form-grid">
                    <Select id="tujuan_konten" label="Tujuan Utama" value={formData.tujuan_konten} onChange={onChange}
                        options={TUJUAN_OPTIONS} customId="custom_tujuan" customValue={formData.custom_tujuan}
                        customPlaceholder="Tulis tujuan manual..." errors={errors} />
                    <Select id="platform" label="Platform Target" value={formData.platform} onChange={onChange}
                        options={PLATFORM_OPTIONS} customId="custom_platform" customValue={formData.custom_platform}
                        customPlaceholder="Tulis platform manual..." errors={errors} />
                    <Select id="role" label="Role Pengguna" value={formData.role} onChange={onChange}
                        options={ROLE_OPTIONS} errors={errors} />
                    <Select id="avatar" label="Avatar / Persona" value={formData.avatar} onChange={onChange}
                        options={AVATAR_OPTIONS} customId="custom_avatar" customValue={formData.custom_avatar}
                        customPlaceholder="Tulis avatar manual..." errors={errors} />
                </div>
            </Card>

            <Card step="02" title="Spesifikasi Konten">
                <div className="form-grid">
                    <Select id="jenis_konten" label="Jenis Konten" value={formData.jenis_konten} onChange={onChange}
                        options={JENIS_KONTEN_OPTIONS} customId="custom_jenis" customValue={formData.custom_jenis}
                        customPlaceholder="Tulis jenis konten manual..." errors={errors} />
                    <Select id="format_durasi" label="Format & Durasi" value={formData.format_durasi} onChange={onChange}
                        options={FORMAT_DURASI_OPTIONS} errors={errors} />
                    <Select id="visual_style" label="Gaya Visual / Shooting" value={formData.visual_style} onChange={onChange}
                        options={VISUAL_STYLE_OPTIONS} customId="custom_visual" customValue={formData.custom_visual}
                        customPlaceholder="Tulis gaya visual manual..." errors={errors} fullWidth />
                </div>
            </Card>

            <Card step="03" title="Strategi Copywriting">
                <div className="form-grid">
                    <Select id="framework" label="Framework Copy" value={formData.framework} onChange={onChange}
                        customId="custom_framework" customValue={formData.custom_framework}
                        customPlaceholder="Tulis framework manual..." errors={errors}>
                        {FRAMEWORK_OPTIONS}
                    </Select>
                    <Select id="hook_strategy" label="Hook Strategy (Pembuka)" value={formData.hook_strategy} onChange={onChange}
                        options={HOOK_STRATEGY_OPTIONS} customId="custom_hook" customValue={formData.custom_hook}
                        customPlaceholder="Tulis hook strategy manual..." errors={errors} />
                </div>
            </Card>

            <Card step="04" title="Target Audience">
                <div className="form-grid">
                    <Select id="level_awareness" label="Level Awareness" value={formData.level_awareness} onChange={onChange}
                        options={AWARENESS_OPTIONS} errors={errors} />
                    <Select id="psychographics" label="Psychographics (Psikologi)" value={formData.psychographics} onChange={onChange}
                        options={PSYCHO_OPTIONS} customId="custom_psycho" customValue={formData.custom_psycho}
                        customPlaceholder="Tulis psikologi manual..." errors={errors} />
                    <Select id="target_audience" label="Target Market" value={formData.target_audience} onChange={onChange}
                        customId="custom_target" customValue={formData.custom_target}
                        customPlaceholder="Tulis target market manual..." errors={errors}>
                        {TARGET_MARKET_OPTIONS}
                    </Select>
                    <Select id="compliance_niche" label="Compliance / Niche" value={formData.compliance_niche} onChange={onChange}
                        options={COMPLIANCE_OPTIONS} customId="custom_compliance" customValue={formData.custom_compliance}
                        customPlaceholder="Tulis compliance/niche manual..." errors={errors} />
                </div>
            </Card>

            <Card step="05" title="Detail Produk">
                <div className="space-y-4">
                    <div className="form-grid">
                        <TextField id="nama_produk" label="Nama Produk *" value={formData.nama_produk} onChange={onChange}
                            placeholder="Nama brand/produk jelas" errors={errors}
                            helper="Contoh: Serum Glowing A, Kursus Copywriting." />
                        <Select id="jenis_produk" label="Jenis Produk" value={formData.jenis_produk} onChange={onChange}
                            customId="custom_jenis_produk" customValue={formData.custom_jenis_produk}
                            customPlaceholder="Tulis jenis produk manual..." errors={errors}>
                            {JENIS_PRODUK_OPTIONS}
                        </Select>
                    </div>
                    <TextField id="problem" value={formData.problem} onChange={onChange}
                        placeholder="Masalah Utama (Pain Point) *" errors={errors}
                        helper="Contoh: Wajah kusam, Bingung cara diet." />
                    <TextField id="solution" value={formData.solution} onChange={onChange}
                        placeholder="Solusi Utama (Main Benefit) *" errors={errors}
                        helper="Contoh: Glowing dalam 7 hari, Diet tanpa laper." />
                    <TextField id="unique_value" value={formData.unique_value} onChange={onChange}
                        placeholder="Unique Value / Pembeda (USP) *" errors={errors}
                        helper="Kenapa harus beli disini?" />
                    <div className="form-grid">
                        <Select id="tone" label="Gaya Bahasa (Tone)" value={formData.tone} onChange={onChange}
                            options={TONE_OPTIONS} customId="custom_tone" customValue={formData.custom_tone}
                            customPlaceholder="Tulis tone manual..." errors={errors} />
                        <Select id="cta" label="Call to Action (CTA)" value={formData.cta} onChange={onChange}
                            options={CTA_OPTIONS} customId="custom_cta" customValue={formData.custom_cta}
                            customPlaceholder="Tulis CTA manual..." errors={errors} />
                    </div>
                </div>
            </Card>

            <Card step="06" title="Quantity Options">
                <Select id="jumlah_script" label="Jumlah Variasi Script" value={formData.jumlah_script} onChange={onChange}
                    options={JUMLAH_SCRIPT_OPTIONS} errors={errors}
                    helper="Pilih berapa variasi script yang ingin di-generate AI." />
            </Card>
        </>
    );
};

export default ScriptTool;
