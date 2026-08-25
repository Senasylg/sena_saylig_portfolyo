/**
 * Kişisel bilgiler — tek doğruluk kaynağı.
 *
 * Buradaki her şey eski sitedeki gerçek verilerden alınmıştır.
 * Uydurma bilgi eklenmemiştir; bilinmeyen alanlar boş bırakılır ve UI'da render edilmez.
 */

import portrait from '../assets/brand/portrait.jpg'

export const profile = {
    name: 'Sena Şaylıg',
    initials: 'SŞ',
    portrait,
    email: 'senasaylig@gmail.com',
    location: { tr: 'Nilüfer / Bursa', en: 'Nilüfer, Bursa · Türkiye' },
    mapsUrl: 'https://www.google.com/maps/place/Nilüfer,+Bursa',

    // Telefon herkese açık sitede gösterilmiyor (spam / scraping riski).
    // Göstermek istersen showPhone'u true yap.
    phone: '+90 531 087 13 99',
    showPhone: false,

    github: 'https://github.com/Senasylg',
    linkedin: 'https://www.linkedin.com/in/sena-şaylığ-349459316',

    role: {
        tr: 'Endüstri Mühendisi · Bilgisayar Mühendisliği ÇAP',
        en: 'Industrial Engineer · Computer Engineering Double Major',
    },

    // Hero'daki numaralı disiplin şeridi.
    disciplines: [
        { no: '01', tr: 'Endüstri', en: 'Industrial' },
        { no: '02', tr: 'Yazılım', en: 'Software' },
        { no: '03', tr: 'Simülasyon', en: 'Simulation' },
        { no: '04', tr: 'Veri', en: 'Data' },
    ],

    tagline: {
        tr: 'Sistemleri anlıyor, modelliyor ve çalışır hale getiriyorum.',
        en: 'I understand systems, model them, and make them work.',
    },

    intro: {
        tr: 'Endüstri mühendisliğinin sistem odaklı bakışıyla bilgisayar mühendisliğinin kod ve analiz tarafını aynı masada birleştiriyorum. Bir problemi hem geniş açıdan görüp hem de teknik detayına inip çözebilmek, bu ikilinin bana verdiği şey.',
        en: 'I bring the systems thinking of industrial engineering together with the code and analysis side of computer engineering. Seeing a problem from a wide angle and still being able to dig into its technical detail is what this pairing gives me.',
    },

    // "Ben kimim" bölümünün paragrafları — eski About metninin bilgileri korunarak,
    // CV dilinden anlatı diline taşınmış hali.
    manifesto: {
        tr: [
            '2022’de Balıkesir Üniversitesi Endüstri Mühendisliği’nde başladım ve bu bölümden mezun oldum. Bir yıl sonra kabul edildiğim Bilgisayar Mühendisliği Çift Anadal Programı’na ise devam ediyorum.',
            'İki bölümü birlikte okumak bana şunu öğretti: bir süreci iyileştirmek istiyorsan önce onu ölçmen, sonra modellemen, en sonunda da otomatikleştirmen gerekiyor. Projelerimin çoğu tam olarak bu üç adımın bir yerinde duruyor.',
            'Sırada veri bilimi, makine öğrenimi ve büyük veri var. Hedefim bu alanları üretim tarafındaki gerçek problemlere bağlamak — akademik bir merak olarak değil, işe yarayan çözümler olarak.',
        ],
        en: [
            'I started Industrial Engineering at Balıkesir University in 2022 and have since graduated from it. A year later I was accepted into the Computer Engineering double major programme, which I am still completing.',
            'Studying both taught me one thing: if you want to improve a process, you first have to measure it, then model it, and only then automate it. Most of my projects sit somewhere along those three steps.',
            'Next up: data science, machine learning and big data. My goal is to connect these to real problems on the production side — not as an academic curiosity, but as solutions that actually work.',
        ],
    },

    // Gerçek staj / eğitim geçmişi.
    //
    // NOT: Ziraat Teknoloji ve Eker stajlarının tarihleri ile içerik açıklamaları
    // henüz elimizde yok; `body` bilerek boş bırakıldı ve boş açıklamalar arayüzde
    // hiç render edilmiyor. Bilgi geldiğinde doldurulacak.
    journey: [
        {
            id: 'ziraat-teknoloji',
            period: { tr: 'Staj', en: 'Internship' },
            org: 'Ziraat Teknoloji A.Ş.',
            title: {
                tr: 'Yapay Zeka Uygulamaları Stajyeri',
                en: 'Artificial Intelligence Applications Intern',
            },
            body: { tr: '', en: '' },
            tags: [],
        },
        {
            id: 'eker',
            period: { tr: 'Staj', en: 'Internship' },
            org: 'Eker Süt Ürünleri Gıda San. ve Tic. A.Ş.',
            title: {
                tr: 'Bilgi İşlem (IT) Stajyeri',
                en: 'Information Technology (IT) Intern',
            },
            body: { tr: '', en: '' },
            tags: [],
        },
        {
            id: 'coca-cola',
            period: { tr: 'İşletme Stajı', en: 'Business Internship' },
            org: 'Coca-Cola İçecek A.Ş.',
            title: {
                tr: 'Su Geri Kazanım Sistemlerinin Dijitalleştirilmesi',
                en: 'Digitalisation of Water Recovery Systems',
            },
            body: {
                tr: 'Sistem verilerini izlemek ve analiz etmek için Dijital İkiz (Digital Twin) yaklaşımını uyguladık; görselleştirmeleri Grafana arayüzü üzerinden kurduk. Üretimde sürdürülebilirlik ve enerji verimliliği tarafında dijital dönüşüm deneyimi kazandım.',
                en: 'We applied a Digital Twin approach to monitor and analyse system data, and built the visualisation layer on Grafana. It gave me hands-on experience with digital transformation around sustainability and energy efficiency in production.',
            },
            tags: ['Digital Twin', 'Grafana', 'Veri Analizi'],
        },
        {
            id: 'beycelik',
            period: { tr: 'Atölye Stajı', en: 'Workshop Internship' },
            org: 'Beyçelik Gestamp Otomotiv',
            title: {
                tr: 'Üretim Planlama için Excel VBA Otomasyonu',
                en: 'Excel VBA Automation for Production Planning',
            },
            body: {
                tr: 'Üretim süreçlerini sahada gözlemledim; üretim planlama, kalite ve Ar-Ge birimleriyle çalışma fırsatı buldum. Üretim planlamaya yönelik bir Excel VBA makrosu geliştirerek planlama sürecini kolaylaştırdım.',
                en: 'I observed production processes on the shop floor and worked alongside the production planning, quality and R&D teams. I built an Excel VBA macro for production planning that streamlined the planning workflow.',
            },
            tags: ['Excel VBA', 'Üretim Planlama'],
        },
        {
            id: 'education',
            period: { tr: 'Eğitim', en: 'Education' },
            org: 'Balıkesir Üniversitesi',
            title: {
                tr: 'Endüstri Mühendisliği (mezun) · Bilgisayar Mühendisliği ÇAP (devam ediyor)',
                en: 'Industrial Engineering (graduated) · Computer Engineering double major (in progress)',
            },
            body: {
                tr: '2022’de Endüstri Mühendisliği’ne başladım ve bu bölümden mezun oldum. 2023’te kabul edildiğim Bilgisayar Mühendisliği Çift Anadal Programı’na devam ediyorum.',
                en: 'Started Industrial Engineering in 2022 and graduated from it. Accepted into the Computer Engineering double major in 2023, which is still in progress.',
            },
            tags: [],
        },
    ],

    // Çalışma alanları — eski services_data.js'in "hizmet satışı" dilinden arındırılmış hali.
    focus: [
        {
            no: '01',
            title: { tr: 'Tasarım & CAD', en: 'Design & CAD' },
            body: {
                tr: 'SOLIDWORKS ve AutoCAD ile 3D parça, hat ve makine tasarımı; üretim ve tesis planlama için yerleşim planları.',
                en: '3D part, line and machine design with SOLIDWORKS and AutoCAD; layout plans for production and facility planning.',
            },
            tools: ['SOLIDWORKS', 'AutoCAD', 'CATIA'],
        },
        {
            no: '02',
            title: { tr: 'Simülasyon & Analiz', en: 'Simulation & Analysis' },
            body: {
                tr: 'Gerçek süreçleri Arena ile modelleyip senaryo karşılaştırmaları yapıyorum; sonuçları istatistiksel olarak Minitab ile doğruluyorum.',
                en: 'I model real processes in Arena and compare scenarios, then validate the results statistically in Minitab.',
            },
            tools: ['Arena Rockwell', 'Minitab'],
        },
        {
            no: '03',
            title: { tr: 'Yazılım Geliştirme', en: 'Software Development' },
            body: {
                tr: 'Masaüstü ve web uygulamaları: C# Windows Forms, PyQt5 arayüzleri ve React tabanlı arayüzler.',
                en: 'Desktop and web applications: C# Windows Forms, PyQt5 interfaces and React-based front-ends.',
            },
            tools: ['C#', 'Python', 'React', 'JavaScript'],
        },
        {
            no: '04',
            title: { tr: 'Veri & Otomasyon', en: 'Data & Automation' },
            body: {
                tr: 'Veri tabanı tasarımı ve sorgulama; Excel VBA makrolarıyla raporlama ve tekrar eden işlerin otomasyonu.',
                en: 'Database design and querying; reporting and automation of repetitive work through Excel VBA macros.',
            },
            tools: ['MS SQL Server', 'SQLite', 'Excel VBA'],
        },
    ],

    // Kullandığı araçlar — yüzde barları kaldırıldı (CV hissi veriyordu), kategorilere ayrıldı.
    stack: [
        {
            group: { tr: 'Tasarım', en: 'Design' },
            items: ['SOLIDWORKS', 'AutoCAD', 'CATIA', 'Figma'],
        },
        {
            group: { tr: 'Simülasyon', en: 'Simulation' },
            items: ['Arena Rockwell Simulation', 'Minitab'],
        },
        {
            group: { tr: 'Yazılım', en: 'Software' },
            items: ['Python', 'C#', 'JavaScript', 'React', 'HTML & CSS', 'PyQt5', 'Qt Designer'],
        },
        {
            group: { tr: 'Veri', en: 'Data' },
            items: ['MS SQL Server', 'SQLite', 'Excel', 'Excel VBA', 'Grafana'],
        },
    ],
}

export default profile
