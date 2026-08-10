/**
 * Mevcut 6 projenin başlangıç verisi.
 *
 * - Türkçe metinler eski `src/assets/projects_data.js`ten BİREBİR taşındı.
 * - İngilizceleri bu metinlerin çevirisidir.
 * - `problem`, `solution`, `methodology`, `results`, `challenges`, `futureImprovements`
 *   alanları BİLEREK boştur: bu bilgiler elimizde yok, uydurulmadı.
 *   Admin panelinden doldurulur; boş alanlar detay sayfasında hiç render edilmez.
 * - `githubUrl` / `demoUrl` / `docsUrl` null: sahte link üretilmedi.
 *
 * Supabase bağlı değilken `lib/projectsRepo.js` bu listeyi okur (salt okunur mod).
 * Supabase bağlandığında aynı veri `supabase/schema.sql` içindeki seed ile eklenir.
 */

import coverLego from '../assets/projects/lego-excavator.png'
import coverWeb from '../assets/projects/fizikadiyet-website.png'
import coverLine from '../assets/projects/apple-packing-line.png'
import coverTraffic from '../assets/projects/traffic-simulation.png'
import coverStock from '../assets/projects/stock-tracking.png'
import coverErgo from '../assets/projects/ergonomic-risk.jpg'

/** Kategori kimlikleri — etiketleri i18n sözlüklerinde. */
export const CATEGORIES = ['design', 'simulation', 'software', 'web', 'research']

const emptyDetail = {
    problem: '',
    solution: '',
    methodology: '',
    results: '',
    challenges: '',
    futureImprovements: '',
}

export const seedProjects = [
    {
        id: 'seed-stok-takip',
        slug: 'stok-takip-sistemi',
        category: 'software',
        coverImage: coverStock,
        gallery: [],
        technologies: ['C#', 'MS SQL Server', 'Qt Designer', 'PyQt5', 'SQLite'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: true,
        status: 'published',
        sortOrder: 1,
        projectDate: null,
        content: {
            tr: {
                title: 'Stok Takip Sistemi',
                description:
                    'TechDepot teknoloji mağazasının stok yönetimini optimize etmek için geliştirdiğim bu sistem, iki versiyon halinde uygulanmıştır. İlk versiyon C# Windows Forms ve MS SQL Server, ikinci versiyon ise PyQt5, Qt Designer ve SQLite kullanılarak geliştirilmiştir. Sistem; ürün yönetimi, stok takip, satış, müşteri ve personel yönetimi, raporlama ve analiz modüllerini içermektedir.',
                overview:
                    'TechDepot teknoloji mağazasının stok yönetimini optimize etmek için geliştirdiğim bu sistem, iki versiyon halinde uygulanmıştır. İlk versiyon C# Windows Forms ve MS SQL Server, ikinci versiyon ise PyQt5, Qt Designer ve SQLite kullanılarak geliştirilmiştir. Sistem; ürün yönetimi, stok takip, satış, müşteri ve personel yönetimi, raporlama ve analiz modüllerini içermektedir.',
                ...emptyDetail,
            },
            en: {
                title: 'Inventory Tracking System',
                description:
                    'Built to optimise inventory management for the TechDepot technology store, this system was implemented in two versions. The first uses C# Windows Forms with MS SQL Server; the second was developed with PyQt5, Qt Designer and SQLite. It covers product management, stock tracking, sales, customer and staff management, plus reporting and analytics modules.',
                overview:
                    'Built to optimise inventory management for the TechDepot technology store, this system was implemented in two versions. The first uses C# Windows Forms with MS SQL Server; the second was developed with PyQt5, Qt Designer and SQLite. It covers product management, stock tracking, sales, customer and staff management, plus reporting and analytics modules.',
                ...emptyDetail,
            },
        },
    },
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
            tr: {
                title: 'Kavşak Sinyalize Trafik Işığı Simülasyonu',
                description:
                    'Balıkesir Yeniçayırhisar kavşağı için çalıştığım projede, trafik akışını iyileştirmek amacıyla sinyalize trafik ışığı sistemi modellemesi ve simülasyonu yaptım. Gerçek verilerle araç yoğunluğunu ve bekleme sürelerini analiz ederek, farklı ışıklandırma senaryolarının etkilerini değerlendirdim.',
                overview:
                    'Balıkesir Yeniçayırhisar kavşağı için çalıştığım projede, trafik akışını iyileştirmek amacıyla sinyalize trafik ışığı sistemi modellemesi ve simülasyonu yaptım. Gerçek verilerle araç yoğunluğunu ve bekleme sürelerini analiz ederek, farklı ışıklandırma senaryolarının etkilerini değerlendirdim.',
                ...emptyDetail,
            },
            en: {
                title: 'Signalised Junction Traffic Simulation',
                description:
                    'For the Balıkesir Yeniçayırhisar junction, I modelled and simulated a signalised traffic light system to improve traffic flow. Using real data, I analysed vehicle density and waiting times, and evaluated the impact of different signal timing scenarios.',
                overview:
                    'For the Balıkesir Yeniçayırhisar junction, I modelled and simulated a signalised traffic light system to improve traffic flow. Using real data, I analysed vehicle density and waiting times, and evaluated the impact of different signal timing scenarios.',
                ...emptyDetail,
            },
        },
    },
    {
        id: 'seed-fizikadiyet',
        slug: 'fizikadiyet-web-sitesi',
        category: 'web',
        coverImage: coverWeb,
        gallery: [],
        technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Figma'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: true,
        status: 'published',
        sortOrder: 3,
        projectDate: null,
        content: {
            tr: {
                title: 'Web Site Tasarımı',
                description:
                    'FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için modern, kullanıcı deneyimi odaklı kurumsal web sitesi geliştirdim. Performans ve SEO uyumuna öncelik verilerek hazırlanan bu tasarım, marka kimliğini dijital ortamda etkili şekilde yansıtmayı amaçlamaktadır.',
                overview:
                    'FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için modern, kullanıcı deneyimi odaklı kurumsal web sitesi geliştirdim. Performans ve SEO uyumuna öncelik verilerek hazırlanan bu tasarım, marka kimliğini dijital ortamda etkili şekilde yansıtmayı amaçlamaktadır.',
                ...emptyDetail,
            },
            en: {
                title: 'Corporate Website Design',
                description:
                    'I developed a modern, experience-focused corporate website for FİZİKADİYET Physiotherapy and Nutrition Consultancy. Built with performance and SEO in mind, the design aims to carry the brand identity effectively into the digital space.',
                overview:
                    'I developed a modern, experience-focused corporate website for FİZİKADİYET Physiotherapy and Nutrition Consultancy. Built with performance and SEO in mind, the design aims to carry the brand identity effectively into the digital space.',
                ...emptyDetail,
            },
        },
    },
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
        sortOrder: 4,
        projectDate: null,
        content: {
            tr: {
                title: 'Elma Ambalaj Hattı Tasarımı',
                description:
                    'SolidWorks ile tasarladığım elma ambalaj hattı, dizim, karton yerleştirme, kapak kapama ve etiketleme gibi temel işlemleri içeren verimli bir sistemdir. Amaç, süreci hızlandırarak iş gücü verimliliğini artırmaktır.',
                overview:
                    'SolidWorks ile tasarladığım elma ambalaj hattı, dizim, karton yerleştirme, kapak kapama ve etiketleme gibi temel işlemleri içeren verimli bir sistemdir. Amaç, süreci hızlandırarak iş gücü verimliliğini artırmaktır.',
                ...emptyDetail,
            },
            en: {
                title: 'Apple Packing Line Design',
                description:
                    'The apple packing line I designed in SolidWorks is an efficient system covering the core operations of arranging, carton placement, lid closing and labelling. The goal is to speed up the process and increase labour efficiency.',
                overview:
                    'The apple packing line I designed in SolidWorks is an efficient system covering the core operations of arranging, carton placement, lid closing and labelling. The goal is to speed up the process and increase labour efficiency.',
                ...emptyDetail,
            },
        },
    },
    {
        id: 'seed-ergonomi',
        slug: 'ergonomik-risk-degerlendirme',
        category: 'research',
        coverImage: coverErgo,
        gallery: [],
        technologies: ['CATIA', 'SOLIDWORKS'],
        githubUrl: null,
        demoUrl: null,
        docsUrl: null,
        featured: false,
        status: 'published',
        sortOrder: 5,
        projectDate: null,
        content: {
            tr: {
                title: 'Ergonomik Risk Değerlendirme',
                description:
                    'Ergonomi dersi kapsamında, çelik fabrikasında ergonomik risk değerlendirmesi gerçekleştirdik. REBA metodunun uygulanması için CATIA’daki dijital insan modelleme aracıyla çalışma duruşları simüle edildi. Mevcut durum analiz edilerek, çalışan konforunu artırmak amacıyla yenilikçi paketleme makinesi tasarlandı.',
                overview:
                    'Ergonomi dersi kapsamında, çelik fabrikasında ergonomik risk değerlendirmesi gerçekleştirdik. REBA metodunun uygulanması için CATIA’daki dijital insan modelleme aracıyla çalışma duruşları simüle edildi. Mevcut durum analiz edilerek, çalışan konforunu artırmak amacıyla yenilikçi paketleme makinesi tasarlandı.',
                ...emptyDetail,
            },
            en: {
                title: 'Ergonomic Risk Assessment',
                description:
                    'As part of an ergonomics course, we carried out an ergonomic risk assessment at a steel plant. Working postures were simulated with CATIA’s digital human modelling tool in order to apply the REBA method. After analysing the current state, an innovative packaging machine was designed to improve worker comfort.',
                overview:
                    'As part of an ergonomics course, we carried out an ergonomic risk assessment at a steel plant. Working postures were simulated with CATIA’s digital human modelling tool in order to apply the REBA method. After analysing the current state, an innovative packaging machine was designed to improve worker comfort.',
                ...emptyDetail,
            },
        },
    },
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
        sortOrder: 6,
        projectDate: null,
        content: {
            tr: {
                title: 'Legodan Kepçe Tasarımı',
                description:
                    'SolidWorks kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Mekanik uyum ve estetik detaylara odaklanarak 3D modelleme ve montaj simülasyonları gerçekleştirdim.',
                overview:
                    'SolidWorks kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Mekanik uyum ve estetik detaylara odaklanarak 3D modelleme ve montaj simülasyonları gerçekleştirdim.',
                ...emptyDetail,
            },
            en: {
                title: 'Lego-Style Excavator Design',
                description:
                    'I designed a functional Lego-style excavator using SolidWorks. Focusing on mechanical fit and aesthetic detail, I carried out 3D modelling and assembly simulations.',
                overview:
                    'I designed a functional Lego-style excavator using SolidWorks. Focusing on mechanical fit and aesthetic detail, I carried out 3D modelling and assembly simulations.',
                ...emptyDetail,
            },
        },
    },
]

export default seedProjects
