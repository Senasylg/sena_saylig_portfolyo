/**
 * Kişisel bilgiler — tek doğruluk kaynağı.
 *
 * Buradaki her şey CV'den ve Sena'nın doğrudan verdiği bilgilerden alınmıştır.
 * Uydurma bilgi eklenmemiştir; bilinmeyen alanlar boş bırakılır ve UI'da render edilmez.
 *
 * Dil notu: metinler bilinçli olarak sade tutuldu — "tutkulu", "uzman",
 * "mükemmel" gibi kendini öven sıfatlar yerine ne yapıldığı anlatılıyor.
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
        { no: '03', tr: 'Yapay Zekâ', en: 'Artificial Intelligence' },
        { no: '04', tr: 'Optimizasyon', en: 'Optimisation' },
    ],

    tagline: {
        tr: 'Süreçleri ölçüyor, modelliyor ve yazılımla otomatikleştiriyorum.',
        en: 'I measure processes, model them, and automate them with software.',
    },

    intro: {
        tr: 'Endüstri mühendisliği ile bilgisayar mühendisliğini birlikte okudum. Çalışmalarım genelde aynı hat üzerinde ilerliyor: bir süreci anlamak, veriye dökmek ve yazılımla işler hâle getirmek.',
        en: 'I studied industrial engineering and computer engineering together. My work tends to follow the same line: understand a process, turn it into data, and make it work through software.',
    },

    // "Ben kimim" bölümünün paragrafları.
    manifesto: {
        tr: [
            '2022’de Balıkesir Üniversitesi Endüstri Mühendisliği’nde başladım ve 2026’da 3,70 ortalamayla bölüm birincisi olarak mezun oldum. Bir yıl sonra kabul edildiğim Bilgisayar Mühendisliği Çift Anadal Programı’na devam ediyorum.',
            'İki bölümü birlikte okumak şunu gösterdi: bir süreci iyileştirmek için önce onu ölçmek, sonra modellemek, en sonunda otomatikleştirmek gerekiyor. Projelerimin çoğu bu üç adımın bir yerinde duruyor.',
            'Son stajlarımda ağırlık yapay zekâ tarafına kaydı. RAG mimarisiyle kurum içi verileri sorgulanabilir hâle getiren asistanlar, metin sınıflandırma servisleri ve dağıtım optimizasyonu panelleri geliştirdim. Veri bilimi, makine öğrenmesi ve büyük veri analitiği üzerine çalışmayı sürdürüyorum.',
        ],
        en: [
            'I started Industrial Engineering at Balıkesir University in 2022 and graduated in 2026 at the top of my department with a 3.70 GPA. A year later I was accepted into the Computer Engineering double major, which I am still completing.',
            'Studying both showed me one thing: to improve a process you first have to measure it, then model it, and only then automate it. Most of my projects sit somewhere along those three steps.',
            'My recent internships shifted the focus towards artificial intelligence. I built assistants that make internal data queryable through RAG, text classification services, and distribution optimisation dashboards. I continue to work on data science, machine learning and big data analytics.',
        ],
    },

    // Gerçek staj / eğitim geçmişi — en yeniden en eskiye sıralı.
    // `kind` alanı Hero'daki staj sayacının doğru saymasını sağlıyor.
    journey: [
        {
            id: 'ziraat-teknoloji',
            kind: 'internship',
            period: { tr: '17 Ağu — 11 Eyl 2026', en: '17 Aug — 11 Sep 2026' },
            org: 'Ziraat Teknoloji A.Ş.',
            location: {
                tr: 'İstanbul Finans Merkezi, Ataşehir',
                en: 'Istanbul Finance Centre, Ataşehir',
            },
            title: {
                tr: 'Yazılım Staj-II · Yapay Zekâ Uygulamaları',
                en: 'Software Internship II · Artificial Intelligence Applications',
            },
            body: {
                tr: 'Yapay Zekâ Uygulamaları departmanında iki servis geliştirdim: bankacılık ürün ve süreçlerine dair soruları kurum verisine dayanarak yanıtlayan RAG tabanlı bir asistan ve müşteri bildirimlerini kategori, aciliyet ve duygu bazında ayıran bir mesaj sınıflandırma portalı. İkisini de Gradio Blocks ve özel CSS ile arayüze bağlayarak toplu Excel yükleme, canlı metrik takibi ve otomatik CRM bilet oluşturma akışlarını otomatikleştirdim. Ayrıca Python, OpenAI API ve RAG mimarisiyle kurum içi veritabanlarını doğal dille sorgulanabilir kılan bir chatbot üzerinde çalıştım.',
                en: 'In the Artificial Intelligence Applications department I built two services: a RAG-based assistant that answers questions about banking products and processes from internal data, and a message classification portal that sorts customer reports by category, urgency and sentiment. I connected both to interfaces built with Gradio Blocks and custom CSS, automating bulk Excel upload, live metric tracking and automatic CRM ticket creation. I also worked on a chatbot that makes internal databases queryable in natural language using Python, the OpenAI API and a RAG architecture.',
            },
            tags: ['Python', 'RAG', 'OpenAI API', 'Gradio', 'NLP'],
        },
        {
            id: 'eker',
            kind: 'internship',
            period: { tr: '20 Tem — 14 Ağu 2026', en: '20 Jul — 14 Aug 2026' },
            org: 'Eker Süt Ürünleri Gıda San. ve Tic. A.Ş.',
            location: { tr: 'Bursa Genel Müdürlük', en: 'Bursa Head Office' },
            title: {
                tr: 'Yazılım Staj-I · Bilgi İşlem',
                en: 'Software Internship I · IT Department',
            },
            body: {
                tr: 'Bilgi İşlem departmanında üç proje geliştirdim. İlki, yetki kontrolü yapan bir Flask dahili API’si, Spring AI tabanlı karar destek servisi, Groq kota mimarisi, deterministik yedek mekanizma ve RAG entegrasyonundan oluşan bir talep yönetim otomasyonuydu. İkincisi, lojistik rotalarını iyileştirip maliyetleri düşürmeyi ve yöneticilere anlık analiz sunmayı hedefleyen bir dağıtım optimizasyonu panosuydu. Üçüncüsü ise kurumsal belgeleri dijitalleştirip OCR ve yapay zekâ desteğiyle aranabilir ve otomatik kategorize edilebilir hâle getiren bir dijital arşiv sistemiydi.',
                en: 'I delivered three projects in the IT department. The first was a demand management automation combining an internal Flask API that enforces authorisation, a Spring AI based decision support service, a Groq quota architecture, a deterministic fallback mechanism and RAG integration. The second was a distribution optimisation dashboard aimed at improving logistics routes, reducing costs and giving managers real-time analysis. The third was a digital archive system that digitises corporate documents and makes them searchable and automatically categorised through OCR and AI.',
            },
            tags: ['Flask', 'Spring AI', 'RAG', 'Groq', 'OCR'],
        },
        {
            id: 'coca-cola',
            kind: 'internship',
            period: { tr: '7 Tem — 5 Eyl 2025', en: '7 Jul — 5 Sep 2025' },
            org: 'Coca-Cola İçecek A.Ş.',
            location: { tr: 'Bursa Fabrika', en: 'Bursa Plant' },
            title: {
                tr: 'Stajyer Üretim Mühendisi',
                en: 'Production Engineering Intern',
            },
            body: {
                tr: 'İki ay boyunca “Su Geri Kazanım Sistemlerinin Dijitalleştirilmesi” projesinde çalıştım. Proje ekibiyle birlikte, manuel sayaç verilerinin AWS platformuna aktarılması ve Grafana panelleriyle izlenmesi için gereken süreç ön analizlerini yürüttüm. Endüstriyel dijitalleşme, sürdürülebilir üretim sistemleri ve veriye dayalı karar alma konularında saha deneyimi edindim.',
                en: 'For two months I worked on the “Digitalisation of Water Recovery Systems” project. Together with the project team I carried out the process pre-analysis needed to move manual meter data onto AWS and monitor it through Grafana dashboards. It gave me field experience in industrial digitalisation, sustainable production systems and data-driven decision making.',
            },
            tags: ['AWS', 'Grafana', 'Veri Analizi'],
        },
        {
            id: 'beycelik',
            kind: 'internship',
            period: { tr: '1 — 29 Tem 2024', en: '1 — 29 Jul 2024' },
            org: 'Beyçelik Gestamp Otomotiv',
            location: { tr: 'TEKNOSAB, Karacabey / Bursa', en: 'TEKNOSAB, Karacabey, Bursa' },
            title: {
                tr: 'Üretim Stajyeri · Pres Üretim',
                en: 'Production Intern · Press Production',
            },
            body: {
                tr: 'Pres Üretim departmanında Tedarik Zinciri ve Üretim Planlama biriminde çalıştım; üretim planlama, kalite, iş geliştirme, Ar-Ge ve lojistik birimlerinin operasyonlarını da yerinde inceledim. Üretim planlamada elle yürüyen işleri hızlandırmak için Excel VBA ile merdiven şeması hazırlama sürecini otomatikleştiren bir makro yazdım; veri hazırlama süresi kısaldı.',
                en: 'I worked with the Supply Chain and Production Planning unit in the Press Production department, and observed operations in production planning, quality, business development, R&D and logistics. To speed up manual work in production planning I wrote an Excel VBA macro that automates the preparation of ladder diagrams, shortening data preparation time.',
            },
            tags: ['Excel VBA', 'Üretim Planlama', 'Tedarik Zinciri'],
        },
        {
            id: 'education-ie',
            kind: 'education',
            period: { tr: '2022 — 2026', en: '2022 — 2026' },
            org: 'Balıkesir Üniversitesi',
            location: { tr: 'Balıkesir', en: 'Balıkesir, Türkiye' },
            title: {
                tr: 'Endüstri Mühendisliği — Bölüm Birincisi',
                en: 'Industrial Engineering — Top of the Department',
            },
            body: {
                tr: 'Lisans derecesi. 3,70 ortalamayla bölüm birincisi olarak mezun oldum.',
                en: 'Bachelor degree. Graduated top of the department with a 3.70 GPA.',
            },
            tags: [{ tr: 'Ortalama 3,70', en: 'GPA 3.70' }],
        },
        {
            id: 'education-ce',
            kind: 'education',
            period: { tr: '2023 — 2027', en: '2023 — 2027' },
            org: 'Balıkesir Üniversitesi',
            location: { tr: 'Balıkesir', en: 'Balıkesir, Türkiye' },
            title: {
                tr: 'Bilgisayar Mühendisliği (Çift Anadal) — devam ediyor',
                en: 'Computer Engineering (Double Major) — in progress',
            },
            body: {
                tr: 'Çift anadal lisans programı, hâlen devam ediyor.',
                en: 'Double major bachelor programme, currently in progress.',
            },
            tags: [],
        },
    ],

    // Çalışma alanları.
    focus: [
        {
            no: '01',
            title: { tr: 'Yapay Zekâ & Veri', en: 'AI & Data' },
            body: {
                tr: 'RAG mimarisiyle kurum verisine dayalı asistanlar, metin sınıflandırma ve duygu analizi servisleri, OCR destekli belge işleme.',
                en: 'RAG-based assistants grounded in internal data, text classification and sentiment analysis services, OCR-supported document processing.',
            },
            tools: ['Python', 'OpenAI API', 'RAG', 'NLP', 'Gradio'],
        },
        {
            no: '02',
            title: { tr: 'Yazılım Geliştirme', en: 'Software Development' },
            body: {
                tr: 'Masaüstü ve web uygulamaları: C# Windows Forms, PyQt5 arayüzleri, Flask servisleri ve React tabanlı arayüzler.',
                en: 'Desktop and web applications: C# Windows Forms, PyQt5 interfaces, Flask services and React front-ends.',
            },
            tools: ['C#', 'Python', 'Flask', 'React', 'PyQt5'],
        },
        {
            no: '03',
            title: { tr: 'Optimizasyon & Simülasyon', en: 'Optimisation & Simulation' },
            body: {
                tr: 'Araç rotalama ve dağıtım ağı optimizasyonu; Arena ile süreç simülasyonu ve senaryo karşılaştırmaları, Minitab ile istatistiksel doğrulama.',
                en: 'Vehicle routing and distribution network optimisation; process simulation and scenario comparison in Arena, statistical validation in Minitab.',
            },
            tools: ['Genetik Algoritma', 'Arena Rockwell', 'Minitab'],
        },
        {
            no: '04',
            title: { tr: 'Tasarım & CAD', en: 'Design & CAD' },
            body: {
                tr: 'SOLIDWORKS ve AutoCAD ile 3D parça, üretim hattı ve ekipman tasarımı; CATIA ile ergonomik analiz.',
                en: '3D part, production line and equipment design in SOLIDWORKS and AutoCAD; ergonomic analysis in CATIA.',
            },
            tools: ['SOLIDWORKS', 'AutoCAD', 'CATIA'],
        },
    ],

    // Kullanılan araçlar.
    stack: [
        {
            group: { tr: 'Yapay Zekâ & Veri', en: 'AI & Data' },
            items: ['Python', 'OpenAI API', 'RAG', 'Spring AI', 'Groq', 'Gradio', 'OCR'],
        },
        {
            group: { tr: 'Yazılım', en: 'Software' },
            items: ['C#', 'Flask', 'JavaScript', 'React', 'HTML & CSS', 'PyQt5', 'Qt Designer', 'Kuika'],
        },
        {
            group: { tr: 'Veri & Altyapı', en: 'Data & Infrastructure' },
            items: ['MS SQL Server', 'SQLite', 'AWS', 'Grafana', 'Excel', 'Excel VBA'],
        },
        {
            group: { tr: 'Mühendislik & Tasarım', en: 'Engineering & Design' },
            items: ['SOLIDWORKS', 'AutoCAD', 'CATIA', 'Arena Rockwell Simulation', 'Minitab', 'Figma'],
        },
    ],
}

export default profile
