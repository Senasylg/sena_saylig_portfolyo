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
            '2022’de Balıkesir Üniversitesi Endüstri Mühendisliği’nde başladım ve 2026’da 3,66 AGNO ile bölüm birincisi olarak mezun oldum. Bir yıl sonra kabul edildiğim Bilgisayar Mühendisliği Çift Anadal Programı’na ise devam ediyorum.',
            'İki bölümü birlikte okumak bana şunu öğretti: bir süreci iyileştirmek istiyorsan önce onu ölçmen, sonra modellemen, en sonunda da otomatikleştirmen gerekiyor. Projelerimin çoğu tam olarak bu üç adımın bir yerinde duruyor.',
            'Sırada veri bilimi, makine öğrenimi ve büyük veri var. Hedefim bu alanları üretim tarafındaki gerçek problemlere bağlamak — akademik bir merak olarak değil, işe yarayan çözümler olarak.',
        ],
        en: [
            'I started Industrial Engineering at Balıkesir University in 2022 and graduated in 2026 at the top of my department with a 3.66 GPA. A year later I was accepted into the Computer Engineering double major programme, which I am still completing.',
            'Studying both taught me one thing: if you want to improve a process, you first have to measure it, then model it, and only then automate it. Most of my projects sit somewhere along those three steps.',
            'Next up: data science, machine learning and big data. My goal is to connect these to real problems on the production side — not as an academic curiosity, but as solutions that actually work.',
        ],
    },

    // Gerçek staj / eğitim geçmişi — CV'den alındı, en yeniden en eskiye sıralı.
    // `kind` alanı Hero'daki staj sayacının doğru saymasını sağlıyor.
    journey: [
        {
            id: 'ziraat-teknoloji',
            kind: 'internship',
            period: { tr: 'Devam ediyor', en: 'Ongoing' },
            org: 'Ziraat Teknoloji A.Ş.',
            title: {
                tr: 'Yapay Zekâ Uygulamaları Stajyeri',
                en: 'Artificial Intelligence Applications Intern',
            },
            body: {
                tr: 'Yapay Zekâ Uygulamaları departmanında, bankacılık ürün ve süreçlerine dair soruları doğru verilerle yanıtlayan RAG tabanlı bir Bankacılık Asistanı ve müşteri bildirimlerini kategori, aciliyet ve duygu bazında analiz eden AI destekli bir Mesaj Sınıflandırma ve Yönlendirme Portalı geliştirdim. Çözümleri Gradio Blocks ve özel CSS ile interaktif portallara dönüştürerek toplu Excel yükleme, canlı metrik takibi ve otomatik CRM bilet oluşturma akışlarını otomatikleştirdim. Şu an Python, OpenAI API ve RAG mimarisiyle kurum içi veritabanlarını doğal dille sorgulanabilir kılan, doğrulanabilir bir DB Chatbot geliştiriyorum.',
                en: 'In the Artificial Intelligence Applications department I built a RAG-based Banking Assistant that answers questions about banking products and processes from verified data, and an AI-powered Message Classification and Routing Portal that analyses customer reports by category, urgency and sentiment. I turned both into interactive portals with Gradio Blocks and custom CSS, automating bulk Excel upload, live metric tracking and automatic CRM ticket creation. I am currently building a verifiable DB Chatbot with Python, the OpenAI API and a RAG architecture that makes internal databases queryable in natural language.',
            },
            tags: ['Python', 'RAG', 'OpenAI API', 'Gradio', 'NLP'],
        },
        {
            id: 'eker',
            kind: 'internship',
            period: { tr: 'Yazılım Stajı', en: 'Software Internship' },
            org: 'Eker Süt Ürünleri Gıda San. ve Tic. A.Ş.',
            title: {
                tr: 'Bilgi İşlem (IT) Stajyeri',
                en: 'Information Technology (IT) Intern',
            },
            body: {
                tr: 'Bilgi İşlem departmanındaki yazılım stajımda üç proje geliştirdim. Yetki güvenliği sağlayan Flask dahili API’si, Spring AI tabanlı karar destek servisi, Groq kota mimarisi, deterministik yedek mekanizma ve RAG entegrasyonuna sahip bir Talep Yönetim Otomasyonu kurdum. Lojistik rotalarını iyileştirmek, maliyetleri düşürmek ve yöneticilere anlık analiz sunmak amacıyla Dağıtım Optimizasyonu ve Karar Destek Dashboard’unu hayata geçirdim. Son olarak kurumsal belgeleri dijitalleştirip OCR ve yapay zekâ desteğiyle akıllı arama ve otomatik kategorizasyon sağlayan Yapay Zekâ Destekli Dijital Arşiv Sistemi’ni tamamladım.',
                en: 'During my software internship in the IT department I delivered three projects. I built a Demand Management Automation with an internal Flask API enforcing authorisation, a Spring AI based decision support service, a Groq quota architecture, a deterministic fallback mechanism and RAG integration. I shipped a Distribution Optimisation and Decision Support Dashboard to improve logistics routes, cut costs and give managers real-time analysis. Finally I completed an AI-Powered Digital Archive System that digitises corporate documents and provides smart search and automatic categorisation through OCR and AI.',
            },
            tags: ['Flask', 'Spring AI', 'RAG', 'Groq', 'OCR', 'Optimizasyon'],
        },
        {
            id: 'coca-cola',
            kind: 'internship',
            period: { tr: 'Tem 2025 — Eyl 2025', en: 'Jul 2025 — Sep 2025' },
            org: 'Coca-Cola İçecek A.Ş.',
            title: {
                tr: 'Stajyer Üretim Mühendisi',
                en: 'Production Engineering Intern',
            },
            body: {
                tr: 'İki ay boyunca Stajyer Üretim Mühendisi olarak “Su Geri Kazanım Sistemlerinin Dijitalleştirilmesi” projesinde çalıştım. Proje ekibiyle birlikte, manuel sayaç verilerinin AWS platformuna aktarılması ve Grafana panelleriyle takip edilmesi için gereken süreç ön analizlerini yürüttüm. Bu sayede endüstriyel dijitalleşme, sürdürülebilir üretim sistemleri ve veri temelli karar alma konularında deneyim kazandım.',
                en: 'For two months I worked as a production engineering intern on the “Digitalisation of Water Recovery Systems” project. Together with the project team I ran the process pre-analysis required to move manual meter data onto AWS and track it through Grafana dashboards. It gave me hands-on experience in industrial digitalisation, sustainable production systems and data-driven decision making.',
            },
            tags: ['AWS', 'Grafana', 'Veri Analizi', 'Dijitalleşme'],
        },
        {
            id: 'beycelik',
            kind: 'internship',
            period: { tr: 'Tem 2024 — Ağu 2024', en: 'Jul 2024 — Aug 2024' },
            org: 'Beyçelik Gestamp Otomotiv',
            title: {
                tr: 'Stajyer Üretim Mühendisi — Pres Üretim',
                en: 'Production Engineering Intern — Press Production',
            },
            body: {
                tr: 'Pres Üretim Departmanında tamamladığım stajda Tedarik Zinciri ve Üretim Planlama biriminde çalıştım; üretim planlama, kalite, iş geliştirme, Ar-Ge ve lojistik birimlerinin operasyonlarını da inceleme fırsatı buldum. Üretim planlamada manuel yürüyen işleri hızlandırmak için Excel VBA ile merdiven şeması hazırlama sürecini otomatikleştiren bir makro yazdım; veri hazırlama süresi kısalırken süreç verimliliği arttı.',
                en: 'During my internship in the Press Production department I worked with the Supply Chain and Production Planning unit, and also had the chance to observe operations in production planning, quality, business development, R&D and logistics. To speed up manual work in production planning I wrote an Excel VBA macro that automates the preparation of ladder diagrams, shortening data preparation time and improving process efficiency.',
            },
            tags: ['Excel VBA', 'Üretim Planlama', 'Tedarik Zinciri'],
        },
        {
            id: 'education-ie',
            kind: 'education',
            period: { tr: '2022 — 2026', en: '2022 — 2026' },
            org: 'Balıkesir Üniversitesi',
            title: {
                tr: 'Endüstri Mühendisliği — Bölüm Birincisi',
                en: 'Industrial Engineering — Top of the Department',
            },
            body: {
                tr: 'Lisans derecesi. 3,66 AGNO ile bölüm birincisi olarak mezun oldum.',
                en: 'Bachelor degree. Graduated top of the department with a 3.66 GPA.',
            },
            tags: ['AGNO 3,66'],
        },
        {
            id: 'education-ce',
            kind: 'education',
            period: { tr: '2023 — 2027', en: '2023 — 2027' },
            org: 'Balıkesir Üniversitesi',
            title: {
                tr: 'Bilgisayar Mühendisliği (Çift Anadal) — devam ediyor',
                en: 'Computer Engineering (Double Major) — in progress',
            },
            body: {
                tr: 'Çift anadal lisans programı, 3,34 AGNO ile devam ediyor.',
                en: 'Double major bachelor programme, in progress with a 3.34 GPA.',
            },
            tags: ['AGNO 3,34'],
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
