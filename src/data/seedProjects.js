/**
 * Proje verisi.
 *
 * Kaynak: Sena'nın CV'si ve doğrudan verdiği staj proje açıklamaları.
 * Metinler sade tutuldu — ne yapıldığı anlatılıyor, övgü sıfatı kullanılmıyor.
 *
 * `problem`, `solution`, `methodology`, `results`, `challenges`,
 * `futureImprovements` alanları BİLEREK boş: bu bilgiler elde yok, uydurulmadı.
 * Admin panelinden doldurulur; boş alanlar detay sayfasında hiç render edilmez.
 * `githubUrl` / `demoUrl` / `docsUrl` null: sahte link üretilmedi.
 *
 * Kapak görselleri public/ altında (bundle'a import edilmiyor) — böylece aynı
 * yollar Supabase'e de yazılabiliyor. Görseli olmayan projeler kartta ızgara
 * desenli bir yer tutucuyla görünür; admin panelinden kapak yüklenebilir.
 *
 * Supabase bağlı değilken `lib/projectsRepo.js` bu listeyi okur (salt okunur mod).
 */

const coverLego = '/projects/lego-excavator.png'
const coverWeb = '/projects/fizikadiyet-website.png'
const coverLine = '/projects/apple-packing-line.png'
const coverTraffic = '/projects/traffic-simulation.png'
const coverStock = '/projects/stock-tracking.png'
const coverErgo = '/projects/ergonomic-risk.jpg'

/** Kategori kimlikleri — etiketleri i18n sözlüklerinde. */
export const CATEGORIES = ['ai', 'software', 'optimization', 'simulation', 'design', 'web', 'research']

const emptyDetail = {
    problem: '',
    solution: '',
    methodology: '',
    results: '',
    challenges: '',
    futureImprovements: '',
}

/** Tekrarı azaltmak için: description ve overview aynı metni paylaşır. */
function locale(title, description) {
    return { title, description, overview: description, ...emptyDetail }
}

export const seedProjects = [
    // ---------------------------------------------------------------- 01
    {
        id: 'seed-stok-takip',
        slug: 'stok-takip-sistemi',
        category: 'software',
        coverImage: coverStock,
        gallery: [],
        technologies: ['C#', 'MS SQL Server', 'PyQt5', 'Qt Designer', 'SQLite'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: true,
        status: 'published',
        sortOrder: 1,
        projectDate: null,
        content: {
            tr: locale(
                'Stok Takip Sistemi',
                'TechDepot adlı teknoloji mağazasının stok yönetimi için geliştirdiğim sistem iki ayrı sürüm halinde uygulandı. İlk sürüm C# Windows Forms ve MS SQL Server, ikinci sürüm PyQt5, Qt Designer ve SQLite ile yazıldı. Sistem ürün yönetimi, stok takibi, satış, müşteri ve personel yönetimi ile raporlama modüllerini kapsıyor.',
            ),
            en: locale(
                'Inventory Tracking System',
                'Built for a technology store called TechDepot, this inventory management system was implemented in two separate versions. The first uses C# Windows Forms with MS SQL Server; the second was written with PyQt5, Qt Designer and SQLite. It covers product management, stock tracking, sales, customer and staff management, and reporting.',
            ),
        },
    },
    // ---------------------------------------------------------------- 02
    {
        id: 'seed-kavsak-simulasyonu',
        slug: 'kavsak-trafik-simulasyonu',
        category: 'simulation',
        coverImage: coverTraffic,
        gallery: [],
        technologies: ['Arena Rockwell Simulation', 'Minitab', 'Excel'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: true,
        status: 'published',
        sortOrder: 2,
        projectDate: null,
        content: {
            tr: locale(
                'Kavşak Sinyalize Trafik Işığı Simülasyonu',
                'Balıkesir Yeniçayır Hisar kavşağı için gerçek trafik verilerine dayanan bir sinyalizasyon simülasyonu kurdum. Araç yoğunluğunu ve bekleme sürelerini analiz edip farklı ışık senaryolarını karşılaştırarak sinyal sürelerini iyileştirdim.',
            ),
            en: locale(
                'Signalised Junction Traffic Simulation',
                'I built a signalisation simulation for the Yeniçayır Hisar junction in Balıkesir based on real traffic data. By analysing vehicle density and waiting times and comparing different signal scenarios, I improved the signal timings.',
            ),
        },
    },
    // ---------------------------------------------------------------- 03
    {
        id: 'seed-fizikadiyet',
        slug: 'fizikadiyet-web-sitesi',
        category: 'web',
        coverImage: coverWeb,
        gallery: [],
        technologies: ['React', 'JavaScript', 'HTML', 'CSS', 'Figma'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: true,
        status: 'published',
        sortOrder: 3,
        projectDate: null,
        content: {
            tr: locale(
                'FİZİKADİYET Kurumsal Web Sitesi',
                'FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için kurumsal bir web sitesi geliştirdim. Tasarımda kullanıcı deneyimi, sayfa performansı ve SEO uyumu önceliklendirildi.',
            ),
            en: locale(
                'FİZİKADİYET Corporate Website',
                'I developed a corporate website for FİZİKADİYET Physiotherapy and Nutrition Consultancy. The design prioritised user experience, page performance and SEO compatibility.',
            ),
        },
    },
    // ---------------------------------------------------------------- 04
    {
        id: 'seed-db-chatbot',
        slug: 'dogal-dil-veritabani-chatbot',
        category: 'ai',
        coverImage: null,
        gallery: [],
        technologies: ['Python', 'OpenAI API', 'RAG'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 4,
        projectDate: null,
        content: {
            tr: locale(
                'Doğal Dil ile Veritabanı Sorgulama (DB Chatbot)',
                'Ziraat Teknoloji stajım kapsamında, kurum içi veritabanlarının doğal dille sorgulanmasını sağlayan bir chatbot üzerinde çalıştım. Python, OpenAI API ve RAG mimarisiyle kurulan yapı, ürettiği yanıtı kaynak veriye bağlayarak doğrulanabilir kılıyor.',
            ),
            en: locale(
                'Natural Language Database Chatbot',
                'During my internship at Ziraat Teknoloji I worked on a chatbot that lets internal databases be queried in natural language. Built with Python, the OpenAI API and a RAG architecture, it ties each answer back to the source data so the result can be verified.',
            ),
        },
    },
    // ---------------------------------------------------------------- 05
    {
        id: 'seed-talep-yonetim',
        slug: 'talep-yonetim-otomasyonu',
        category: 'ai',
        coverImage: null,
        gallery: [],
        technologies: ['Flask', 'Spring AI', 'Groq', 'RAG', 'Python'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 5,
        projectDate: null,
        content: {
            tr: locale(
                'Talep Yönetim Otomasyonu',
                'Eker Süt Ürünleri Bilgi İşlem stajımda geliştirdiğim talep yönetim otomasyonu; yetki kontrolü yapan bir Flask dahili API’si, Spring AI tabanlı karar destek servisi, Groq kota mimarisi, servis kesintilerinde devreye giren deterministik bir yedek mekanizma ve RAG entegrasyonundan oluşuyor.',
            ),
            en: locale(
                'Demand Management Automation',
                'Built during my IT internship at Eker, this demand management automation combines an internal Flask API that enforces authorisation, a Spring AI based decision support service, a Groq quota architecture, a deterministic fallback that takes over during service interruptions, and RAG integration.',
            ),
        },
    },
    // ---------------------------------------------------------------- 06
    {
        id: 'seed-dagitim-dashboard',
        slug: 'dagitim-optimizasyonu-dashboard',
        category: 'optimization',
        coverImage: null,
        gallery: [],
        technologies: ['Python', 'Optimizasyon', 'Dashboard'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 6,
        projectDate: null,
        content: {
            tr: locale(
                'Dağıtım Optimizasyonu ve Karar Destek Panosu',
                'Eker Süt Ürünleri stajımda, lojistik rotalarını iyileştirmeyi ve dağıtım maliyetlerini düşürmeyi hedefleyen bir karar destek panosu geliştirdim. Pano yöneticilere dağıtım performansına dair anlık analiz sunuyor.',
            ),
            en: locale(
                'Distribution Optimisation and Decision Support Dashboard',
                'During my internship at Eker I built a decision support dashboard aimed at improving logistics routes and reducing distribution costs. It gives managers real-time analysis of distribution performance.',
            ),
        },
    },
    // ---------------------------------------------------------------- 07
    {
        id: 'seed-dijital-arsiv',
        slug: 'yapay-zeka-destekli-dijital-arsiv',
        category: 'ai',
        coverImage: null,
        gallery: [],
        technologies: ['OCR', 'Python', 'Doküman İşleme'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 7,
        projectDate: null,
        content: {
            tr: locale(
                'Yapay Zekâ Destekli Dijital Arşiv Sistemi',
                'Eker Süt Ürünleri stajımda tamamladığım sistem, kurumsal belgeleri dijitalleştirip OCR ile metne dönüştürüyor. Yapay zekâ desteğiyle belgeler içinde akıllı arama yapılabiliyor ve dosyalar otomatik olarak kategorilere ayrılıyor.',
            ),
            en: locale(
                'AI-Powered Digital Archive System',
                'Completed during my internship at Eker, this system digitises corporate documents and converts them to text with OCR. AI support enables smart search across the documents and files are categorised automatically.',
            ),
        },
    },
    // ---------------------------------------------------------------- 08
    {
        id: 'seed-bankacilik-asistani',
        slug: 'rag-bankacilik-asistani',
        category: 'ai',
        coverImage: null,
        gallery: [],
        technologies: ['Python', 'RAG', 'OpenAI API', 'Gradio'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 8,
        projectDate: null,
        content: {
            tr: locale(
                'RAG Tabanlı Bankacılık Asistanı',
                'Ziraat Teknoloji stajımda geliştirdiğim asistan, bankacılık ürün ve süreçlerine dair soruları kurum verisine dayanarak yanıtlıyor. RAG mimarisi sayesinde yanıtlar modelin tahminine değil, getirilen belgelere dayanıyor.',
            ),
            en: locale(
                'RAG-Based Banking Assistant',
                'Developed during my internship at Ziraat Teknoloji, this assistant answers questions about banking products and processes from internal data. Thanks to the RAG architecture, answers are grounded in retrieved documents rather than model guesswork.',
            ),
        },
    },
    // ---------------------------------------------------------------- 09
    {
        id: 'seed-mesaj-siniflandirma',
        slug: 'mesaj-siniflandirma-portali',
        category: 'ai',
        coverImage: null,
        gallery: [],
        technologies: ['Python', 'NLP', 'Gradio', 'Excel'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 9,
        projectDate: null,
        content: {
            tr: locale(
                'Mesaj Sınıflandırma ve Yönlendirme Portalı',
                'Ziraat Teknoloji stajımda geliştirdiğim portal, müşteri bildirimlerini kategori, aciliyet ve duygu bazında ayırıyor. Gradio Blocks ve özel CSS ile hazırlanan arayüz toplu Excel yükleme, canlı metrik takibi ve otomatik CRM bilet oluşturma akışlarını destekliyor.',
            ),
            en: locale(
                'Message Classification and Routing Portal',
                'Built during my internship at Ziraat Teknoloji, this portal sorts customer reports by category, urgency and sentiment. The interface, built with Gradio Blocks and custom CSS, supports bulk Excel upload, live metric tracking and automatic CRM ticket creation.',
            ),
        },
    },
    // ---------------------------------------------------------------- 10
    {
        id: 'seed-duygu-analizi',
        slug: 'turkce-duygu-analizi',
        category: 'ai',
        coverImage: null,
        gallery: [],
        technologies: ['Python', 'NLP', 'Makine Öğrenmesi'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 10,
        projectDate: null,
        content: {
            tr: locale(
                'Türkçe Duygu Analizi (YouTube Yorumları)',
                'YouTube yorumları üzerinden Türkçe metinlerde duygu analizi yapan bir doğal dil işleme projesi geliştirdim. Çalışma, Türkçenin ek yapısı ve günlük dil kullanımının metin sınıflandırmaya etkisi üzerine yoğunlaştı.',
            ),
            en: locale(
                'Turkish Sentiment Analysis (YouTube Comments)',
                'I built a natural language processing project that performs sentiment analysis on Turkish text using YouTube comments. The work focused on how Turkish morphology and everyday language use affect text classification.',
            ),
        },
    },
    // ---------------------------------------------------------------- 11
    {
        id: 'seed-ml-karsilastirma',
        slug: 'makine-ogrenmesi-algoritma-karsilastirmasi',
        category: 'ai',
        coverImage: null,
        gallery: [],
        technologies: ['Python', 'Makine Öğrenmesi'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 11,
        projectDate: null,
        content: {
            tr: locale(
                'Makine Öğrenmesi Algoritma Karşılaştırması',
                'Sınıflandırma, regresyon ve kümeleme problemlerinde farklı makine öğrenmesi algoritmalarını aynı veri kümeleri üzerinde karşılaştırmalı olarak analiz ettim. Amaç, problem tipine göre algoritma seçiminin sonuca etkisini görmekti.',
            ),
            en: locale(
                'Machine Learning Algorithm Comparison',
                'I ran a comparative analysis of different machine learning algorithms on classification, regression and clustering problems using the same datasets. The aim was to see how algorithm choice affects results depending on the problem type.',
            ),
        },
    },
    // ---------------------------------------------------------------- 12
    {
        id: 'seed-arac-rotalama',
        slug: 'genetik-algoritma-arac-rotalama',
        category: 'optimization',
        coverImage: null,
        gallery: [],
        technologies: ['Python', 'Genetik Algoritma'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 12,
        projectDate: null,
        content: {
            tr: locale(
                'Genetik Algoritma ile Araç Rotalama ve Kargo Dağıtım Optimizasyonu',
                'Python ve genetik algoritmalar kullanarak araç rotalama ve kargo dağıtım ağı optimizasyonu üzerine çalıştım. Çalışma, teslimat noktalarının rota maliyetini düşürecek şekilde sıralanması problemine odaklandı.',
            ),
            en: locale(
                'Vehicle Routing and Cargo Distribution Optimisation with Genetic Algorithms',
                'Using Python and genetic algorithms, I worked on vehicle routing and cargo distribution network optimisation. The study focused on ordering delivery points so as to reduce total route cost.',
            ),
        },
    },
    // ---------------------------------------------------------------- 13
    {
        id: 'seed-paw-care',
        slug: 'paw-care-mobil-uygulama',
        category: 'software',
        coverImage: null,
        gallery: [],
        technologies: ['Kuika', 'Low-code'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 13,
        projectDate: null,
        content: {
            tr: locale(
                'Paw Care Mobil Uygulaması',
                'Kuika low-code platformu üzerinde ekip olarak geliştirdiğimiz Paw Care mobil uygulaması, evcil hayvan bakım takibi üzerine kuruldu. Proje, low-code araçlarla hızlı prototipleme deneyimi kazandırdı.',
            ),
            en: locale(
                'Paw Care Mobile Application',
                'Paw Care is a mobile application we developed as a team on the Kuika low-code platform, built around pet care tracking. The project was an exercise in rapid prototyping with low-code tools.',
            ),
        },
    },
    // ---------------------------------------------------------------- 14
    {
        id: 'seed-satin-alma-db',
        slug: 'satin-alma-yonetimi-veritabani',
        category: 'software',
        coverImage: null,
        gallery: [],
        technologies: ['C#', 'MS SQL Server'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 14,
        projectDate: null,
        content: {
            tr: locale(
                'Satın Alma Yönetimi Veritabanı Mimarisi',
                'C# ve MS SQL Server kullanarak satın alma yönetimi için bir veritabanı mimarisi tasarladım. Çalışma tablo ilişkilerinin kurgulanması ve sorguların raporlama ihtiyacına göre yapılandırılması üzerineydi.',
            ),
            en: locale(
                'Purchasing Management Database Architecture',
                'I designed a database architecture for purchasing management using C# and MS SQL Server. The work covered modelling table relationships and structuring queries around reporting needs.',
            ),
        },
    },
    // ---------------------------------------------------------------- 15
    {
        id: 'seed-elma-hatti',
        slug: 'elma-ambalaj-hatti-tasarimi',
        category: 'design',
        coverImage: coverLine,
        gallery: [],
        technologies: ['SOLIDWORKS'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 15,
        projectDate: null,
        content: {
            tr: locale(
                'Elma Ambalaj Hattı Tasarımı',
                'SOLIDWORKS ile tasarladığım elma ambalaj hattı; dizim, karton yerleştirme, kapak kapama ve etiketleme işlemlerini kapsıyor. Tasarımın amacı süreci hızlandırarak iş gücü verimliliğini artırmaktı.',
            ),
            en: locale(
                'Apple Packing Line Design',
                'Designed in SOLIDWORKS, this apple packing line covers arranging, carton placement, lid closing and labelling. The aim of the design was to speed up the process and improve labour efficiency.',
            ),
        },
    },
    // ---------------------------------------------------------------- 16
    {
        id: 'seed-ergonomi',
        slug: 'ergonomik-risk-degerlendirme',
        category: 'research',
        coverImage: coverErgo,
        gallery: [],
        technologies: ['CATIA', 'SOLIDWORKS', 'REBA'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 16,
        projectDate: null,
        content: {
            tr: locale(
                'Ergonomik Risk Değerlendirme',
                'Ergonomi dersi kapsamında bir çelik üretim tesisinde ergonomik risk değerlendirmesi yaptık. REBA yöntemini uygulamak için çalışma duruşlarını CATIA’nın dijital insan modelleme aracıyla simüle ettik. Mevcut durumu analiz ederek çalışan konforunu artırmaya yönelik bir paketleme makinesi tasarladık.',
            ),
            en: locale(
                'Ergonomic Risk Assessment',
                'As part of an ergonomics course we carried out an ergonomic risk assessment at a steel production plant. To apply the REBA method we simulated working postures with CATIA’s digital human modelling tool. After analysing the current state we designed a packaging machine aimed at improving worker comfort.',
            ),
        },
    },
    // ---------------------------------------------------------------- 17
    {
        id: 'seed-ambalaj-arabasi',
        slug: 'ambalaj-tasima-arabasi-tasarimi',
        category: 'design',
        coverImage: null,
        gallery: [],
        technologies: ['SOLIDWORKS', 'CATIA'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 17,
        projectDate: null,
        content: {
            tr: locale(
                'Ambalaj Taşıma Arabası Tasarımı',
                'Ergonomi çalışmalarının bir parçası olarak, taşıma sırasında çalışanın duruşunu iyileştirmeyi hedefleyen bir ambalaj taşıma arabası tasarladık. Tasarım SOLIDWORKS ile modellendi.',
            ),
            en: locale(
                'Packaging Transport Trolley Design',
                'As part of the ergonomics work, we designed a packaging transport trolley aimed at improving the operator’s posture while moving material. The design was modelled in SOLIDWORKS.',
            ),
        },
    },
    // ---------------------------------------------------------------- 18
    {
        id: 'seed-lego-kepce',
        slug: 'lego-kepce-tasarimi',
        category: 'design',
        coverImage: coverLego,
        gallery: [],
        technologies: ['SOLIDWORKS'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 18,
        projectDate: null,
        content: {
            tr: locale(
                'Legodan Kepçe Tasarımı',
                'SOLIDWORKS kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Parçaların mekanik uyumuna odaklanarak 3D modelleme ve montaj simülasyonları yaptım.',
            ),
            en: locale(
                'Lego-Style Excavator Design',
                'I designed a functional Lego-style excavator in SOLIDWORKS. Focusing on the mechanical fit between parts, I carried out 3D modelling and assembly simulations.',
            ),
        },
    },
]

export default seedProjects
