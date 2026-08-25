/**
 * Alınan dersler.
 *
 * Kaynak:
 *  - Endüstri Mühendisliği → YÖK transkript belgesi (25.08.2026)
 *  - Bilgisayar Mühendisliği (ÇAP) → müfredat / ders eşleştirme ekranları
 *
 * Uydurma ders eklenmemiştir. İki bölümde de okunan temel dersler (matematik,
 * fizik, istatistik vb.) tekrar etmemesi için "Temel Mühendislik" grubunda
 * TEK KEZ listelenir; bölüm grupları yalnızca o bölüme özgü dersleri içerir.
 *
 * Not: Atatürk İlkeleri, Türk Dili ve Yabancı Dil gibi YÖK ortak zorunlu
 * dersleri bilerek listelenmedi — portfolyoda bilgi değeri taşımıyorlar.
 */

export const courseGroups = [
    {
        id: 'core',
        label: { tr: 'Temel Mühendislik', en: 'Core Engineering' },
        note: {
            tr: 'Her iki bölümde de okunan matematik, fen ve temel mühendislik dersleri.',
            en: 'Mathematics, science and core engineering courses taken in both degrees.',
        },
        courses: [
            { tr: 'Matematik I', en: 'Mathematics I' },
            { tr: 'Matematik II', en: 'Mathematics II' },
            { tr: 'Matematik III', en: 'Calculus III' },
            { tr: 'Lineer Cebir', en: 'Linear Algebra' },
            { tr: 'Diferansiyel Denklemler', en: 'Differential Equations' },
            { tr: 'Ayrık Matematik', en: 'Discrete Mathematics' },
            { tr: 'Olasılık', en: 'Probability' },
            { tr: 'İstatistik', en: 'Statistics' },
            { tr: 'Uygulamalı İstatistik', en: 'Applied Statistics' },
            { tr: 'Nümerik Analiz', en: 'Numerical Analysis' },
            { tr: 'Fizik I', en: 'Physics I' },
            { tr: 'Fizik I Laboratuvar', en: 'Physics I Laboratory' },
            { tr: 'Fizik II', en: 'Physics II' },
            { tr: 'Fizik II Laboratuvar', en: 'Physics II Laboratory' },
            { tr: 'Genel Kimya', en: 'General Chemistry' },
            { tr: 'Mekanik', en: 'Mechanics' },
            { tr: 'Malzeme Bilgisi', en: 'Material Sciences' },
            { tr: 'Teknik Resim', en: 'Technical Drawing' },
            { tr: 'Bilgisayar Destekli Çizim (AutoCAD)', en: 'Computer Aided Drawing (AutoCAD)' },
            { tr: 'Bilgisayar Destekli Teknik Çizim', en: 'Computer Aided Technical Drawing' },
            { tr: 'Bilgisayar Destekli Tasarım', en: 'Computer Aided Design' },
            { tr: 'Mühendislik Ekonomisi', en: 'Engineering Economics' },
            { tr: 'İş Sağlığı ve Güvenliği I', en: 'Occupational Health and Safety I' },
            { tr: 'İş Sağlığı ve Güvenliği II', en: 'Occupational Health and Safety II' },
        ],
    },
    {
        id: 'computer',
        label: { tr: 'Bilgisayar Mühendisliği', en: 'Computer Engineering' },
        note: {
            tr: 'Bilgisayar Mühendisliği Çift Anadal Programı kapsamında alınan bölüm dersleri.',
            en: 'Department courses taken as part of the Computer Engineering double major.',
        },
        courses: [
            { tr: 'Bilgisayar Mühendisliğine Giriş', en: 'Introduction to Computer Engineering' },
            { tr: 'Algoritma ve Programlamaya Giriş', en: 'Introduction to Algorithms and Programming' },
            { tr: 'Programlama I', en: 'Programming I' },
            { tr: 'Programlama Lab I', en: 'Programming Lab I' },
            { tr: 'Programlama II', en: 'Programming II' },
            { tr: 'Programlama Lab II', en: 'Programming Lab II' },
            { tr: 'İleri Programlama', en: 'Advanced Programming' },
            { tr: 'Nesneye Yönelik Programlama', en: 'Object Oriented Programming' },
            { tr: 'Veri Yapıları ve Algoritmalar', en: 'Data Structures and Algorithms' },
            { tr: 'Algoritma Analizi', en: 'Algorithm Analysis' },
            { tr: 'Biçimsel Diller ve Otomatlar', en: 'Formal Languages and Automata' },
            { tr: 'Bilgisayar Organizasyonu', en: 'Computer Organisation' },
            { tr: 'Elektronik Devreler', en: 'Electronic Circuits' },
            { tr: 'Elektronik Devreler Lab.', en: 'Electronic Circuits Lab' },
            { tr: 'Sayısal Tasarım', en: 'Digital Design' },
            { tr: 'Sayısal Tasarım Lab.', en: 'Digital Design Lab' },
            { tr: 'Mikroişlemciler ve Denetleyiciler', en: 'Microprocessors and Controllers' },
            { tr: 'Mikroişlemciler ve Mikrodenetleyiciler Lab.', en: 'Microprocessors and Microcontrollers Lab' },
            { tr: 'İşletim Sistemleri', en: 'Operating Systems' },
            { tr: 'Bilgisayar Ağları', en: 'Computer Networks' },
            { tr: 'İleri Bilgisayar Ağları', en: 'Advanced Computer Networks' },
            { tr: 'Veritabanı Yönetim Sistemleri', en: 'Database Management Systems' },
            { tr: 'Görsel Programlama', en: 'Visual Programming' },
            { tr: 'İnternet Programlama', en: 'Internet Programming' },
            { tr: 'Python Programlama', en: 'Python Programming' },
            { tr: 'Makro Programlama', en: 'Macro Programming' },
            { tr: 'Paket Programlar', en: 'Software Packages' },
            { tr: 'Yapay Zeka Teknikleri', en: 'Artificial Intelligence Techniques' },
            { tr: 'Makine Öğrenmesi', en: 'Machine Learning' },
            { tr: 'BT Yönetişim Çerçeveleri ve Proje Yönetimi', en: 'IT Governance Frameworks and Project Management' },
            {
                tr: 'Yazılım Geliştirmede Yapay Zeka Destekli Yaklaşımlar (Az Kodlu Web ve Mobil Uygulama Geliştirme)',
                en: 'AI-Assisted Approaches in Software Development (Low-Code Web and Mobile App Development)',
            },
        ],
    },
    {
        id: 'industrial',
        label: { tr: 'Endüstri Mühendisliği', en: 'Industrial Engineering' },
        note: {
            tr: 'Endüstri Mühendisliği lisans programında alınan bölüm dersleri.',
            en: 'Department courses taken in the Industrial Engineering bachelor programme.',
        },
        courses: [
            { tr: 'Endüstri Mühendisliğine Giriş', en: 'Introduction to Industrial Engineering' },
            { tr: 'Yöneylem Araştırması I', en: 'Operations Research I' },
            { tr: 'Yöneylem Araştırması II', en: 'Operations Research II' },
            { tr: 'Yöneylem Araştırması III', en: 'Operations Research III' },
            { tr: 'Sistem Simülasyonu', en: 'System Simulation' },
            { tr: 'Sistem Analizi', en: 'System Analysis' },
            { tr: 'Üretim Planlama ve Kontrolü', en: 'Production Planning and Control' },
            { tr: 'Üretim Yönetimi', en: 'Production Management' },
            { tr: 'Tesis Planlama', en: 'Facility Layout' },
            { tr: 'İş Etüdü', en: 'Work Study' },
            { tr: 'Ergonomi', en: 'Ergonomics' },
            { tr: 'Verimlilik Analizi', en: 'Productivity Analysis' },
            { tr: 'Karar Verme', en: 'Decision Analysis' },
            { tr: 'Maliyet Analizi', en: 'Cost Analysis' },
            { tr: 'İmalat Yöntemleri', en: 'Methods of Manufacturing' },
            { tr: 'Toplam Kalite Yönetimi', en: 'Total Quality Management' },
            { tr: 'Kurumsal Kaynak Planlama', en: 'Enterprise Resource Planning' },
            { tr: 'Bilgisayar Destekli Mühendislik Uygulamaları', en: 'Computer Aided Engineering Applications' },
            { tr: 'Sürdürülebilir Temiz Üretim', en: 'Sustainable Clean Production' },
            { tr: 'Dijital Dönüşüm ve Sürdürülebilirlik', en: 'Digital Transformation and Sustainability' },
            { tr: 'Proje Yönetim Teknikleri', en: 'Project Management Techniques' },
            { tr: 'Endüstri Mühendisliği Tasarımı I', en: 'Industrial Engineering Design I' },
            { tr: 'Endüstri Mühendisliği Tasarımı II', en: 'Industrial Engineering Design II' },
            { tr: 'Genel Ekonomi', en: 'General Economics' },
            { tr: 'Uluslararası İktisat', en: 'International Economics' },
            { tr: 'Girişimcilik', en: 'Entrepreneurship' },
            { tr: 'Girişimcilik ve Patent Hakkı', en: 'Entrepreneurship and Patent Right' },
            { tr: 'Ofis Yazılımları', en: 'Office Software' },
        ],
    },
    {
        id: 'elective',
        label: { tr: 'Üniversite Seçmeli', en: 'University Electives' },
        note: {
            tr: 'Bölüm dışından alınan seçmeli dersler.',
            en: 'Elective courses taken outside the department.',
        },
        courses: [
            { tr: 'Çevresel Ekoloji', en: 'Environmental Ecology' },
            {
                tr: 'Gıda İşleme Endüstrisi Atıkları ve Bertaraf Yöntemleri',
                en: 'Food Processing Industry Wastes and Disposal Methods',
            },
            { tr: 'Dekoratif Yüzey Süsleme Teknikleri', en: 'Surface Decoration Techniques' },
            { tr: 'Tezhip', en: 'Ornamentation' },
        ],
    },
]

export default courseGroups
