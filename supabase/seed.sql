-- =====================================================================
--  Proje baslangic verisi  (OTOMATIK URETILDI - elle duzenleme)
--
--  Kaynak : src/data/seedProjects.js
--  Uretim : node supabase/generate-seed.mjs
--
--  Once supabase/schema.sql dosyasini calistir, sonra bunu.
--  Ayni slug varsa atlanir; mevcut projelerin uzerine yazmaz.
--
--  NOT: problem / solution / methodology / results / challenges /
--  future_improvements alanlari bilerek bos -- bu bilgiler elde yok,
--  uydurulmadi. Admin panelinden doldurulabilir.
-- =====================================================================

insert into public.projects
    (slug, category, cover_image, technologies, featured, status, sort_order, content)
values
(
    'stok-takip-sistemi', 'software', '/projects/stock-tracking.png',
    array['C#', 'MS SQL Server', 'PyQt5', 'Qt Designer', 'SQLite'],
    true, 'published', 1,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Stok Takip Sistemi',
            'description', 'TechDepot adlı teknoloji mağazasının stok yönetimi için geliştirdiğim sistem iki ayrı sürüm halinde uygulandı. İlk sürüm C# Windows Forms ve MS SQL Server, ikinci sürüm PyQt5, Qt Designer ve SQLite ile yazıldı. Sistem ürün yönetimi, stok takibi, satış, müşteri ve personel yönetimi ile raporlama modüllerini kapsıyor.',
            'overview', 'TechDepot adlı teknoloji mağazasının stok yönetimi için geliştirdiğim sistem iki ayrı sürüm halinde uygulandı. İlk sürüm C# Windows Forms ve MS SQL Server, ikinci sürüm PyQt5, Qt Designer ve SQLite ile yazıldı. Sistem ürün yönetimi, stok takibi, satış, müşteri ve personel yönetimi ile raporlama modüllerini kapsıyor.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Inventory Tracking System',
            'description', 'Built for a technology store called TechDepot, this inventory management system was implemented in two separate versions. The first uses C# Windows Forms with MS SQL Server; the second was written with PyQt5, Qt Designer and SQLite. It covers product management, stock tracking, sales, customer and staff management, and reporting.',
            'overview', 'Built for a technology store called TechDepot, this inventory management system was implemented in two separate versions. The first uses C# Windows Forms with MS SQL Server; the second was written with PyQt5, Qt Designer and SQLite. It covers product management, stock tracking, sales, customer and staff management, and reporting.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'kavsak-trafik-simulasyonu', 'simulation', '/projects/traffic-simulation.png',
    array['Arena Rockwell Simulation', 'Minitab', 'Excel'],
    true, 'published', 2,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Kavşak Sinyalize Trafik Işığı Simülasyonu',
            'description', 'Balıkesir Yeniçayır Hisar kavşağı için gerçek trafik verilerine dayanan bir sinyalizasyon simülasyonu kurdum. Araç yoğunluğunu ve bekleme sürelerini analiz edip farklı ışık senaryolarını karşılaştırarak sinyal sürelerini iyileştirdim.',
            'overview', 'Balıkesir Yeniçayır Hisar kavşağı için gerçek trafik verilerine dayanan bir sinyalizasyon simülasyonu kurdum. Araç yoğunluğunu ve bekleme sürelerini analiz edip farklı ışık senaryolarını karşılaştırarak sinyal sürelerini iyileştirdim.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Signalised Junction Traffic Simulation',
            'description', 'I built a signalisation simulation for the Yeniçayır Hisar junction in Balıkesir based on real traffic data. By analysing vehicle density and waiting times and comparing different signal scenarios, I improved the signal timings.',
            'overview', 'I built a signalisation simulation for the Yeniçayır Hisar junction in Balıkesir based on real traffic data. By analysing vehicle density and waiting times and comparing different signal scenarios, I improved the signal timings.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'fizikadiyet-web-sitesi', 'web', '/projects/fizikadiyet-website.png',
    array['React', 'JavaScript', 'HTML', 'CSS', 'Figma'],
    true, 'published', 3,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'FİZİKADİYET Kurumsal Web Sitesi',
            'description', 'FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için kurumsal bir web sitesi geliştirdim. Tasarımda kullanıcı deneyimi, sayfa performansı ve SEO uyumu önceliklendirildi.',
            'overview', 'FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için kurumsal bir web sitesi geliştirdim. Tasarımda kullanıcı deneyimi, sayfa performansı ve SEO uyumu önceliklendirildi.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'FİZİKADİYET Corporate Website',
            'description', 'I developed a corporate website for FİZİKADİYET Physiotherapy and Nutrition Consultancy. The design prioritised user experience, page performance and SEO compatibility.',
            'overview', 'I developed a corporate website for FİZİKADİYET Physiotherapy and Nutrition Consultancy. The design prioritised user experience, page performance and SEO compatibility.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'dogal-dil-veritabani-chatbot', 'ai', null,
    array['Python', 'OpenAI API', 'RAG'],
    false, 'published', 4,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Doğal Dil ile Veritabanı Sorgulama (DB Chatbot)',
            'description', 'Ziraat Teknoloji stajım kapsamında, kurum içi veritabanlarının doğal dille sorgulanmasını sağlayan bir chatbot üzerinde çalıştım. Python, OpenAI API ve RAG mimarisiyle kurulan yapı, ürettiği yanıtı kaynak veriye bağlayarak doğrulanabilir kılıyor.',
            'overview', 'Ziraat Teknoloji stajım kapsamında, kurum içi veritabanlarının doğal dille sorgulanmasını sağlayan bir chatbot üzerinde çalıştım. Python, OpenAI API ve RAG mimarisiyle kurulan yapı, ürettiği yanıtı kaynak veriye bağlayarak doğrulanabilir kılıyor.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Natural Language Database Chatbot',
            'description', 'During my internship at Ziraat Teknoloji I worked on a chatbot that lets internal databases be queried in natural language. Built with Python, the OpenAI API and a RAG architecture, it ties each answer back to the source data so the result can be verified.',
            'overview', 'During my internship at Ziraat Teknoloji I worked on a chatbot that lets internal databases be queried in natural language. Built with Python, the OpenAI API and a RAG architecture, it ties each answer back to the source data so the result can be verified.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'talep-yonetim-otomasyonu', 'ai', null,
    array['Flask', 'Spring AI', 'Groq', 'RAG', 'Python'],
    false, 'published', 5,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Talep Yönetim Otomasyonu',
            'description', 'Eker Süt Ürünleri Bilgi İşlem stajımda geliştirdiğim talep yönetim otomasyonu; yetki kontrolü yapan bir Flask dahili API’si, Spring AI tabanlı karar destek servisi, Groq kota mimarisi, servis kesintilerinde devreye giren deterministik bir yedek mekanizma ve RAG entegrasyonundan oluşuyor.',
            'overview', 'Eker Süt Ürünleri Bilgi İşlem stajımda geliştirdiğim talep yönetim otomasyonu; yetki kontrolü yapan bir Flask dahili API’si, Spring AI tabanlı karar destek servisi, Groq kota mimarisi, servis kesintilerinde devreye giren deterministik bir yedek mekanizma ve RAG entegrasyonundan oluşuyor.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Demand Management Automation',
            'description', 'Built during my IT internship at Eker, this demand management automation combines an internal Flask API that enforces authorisation, a Spring AI based decision support service, a Groq quota architecture, a deterministic fallback that takes over during service interruptions, and RAG integration.',
            'overview', 'Built during my IT internship at Eker, this demand management automation combines an internal Flask API that enforces authorisation, a Spring AI based decision support service, a Groq quota architecture, a deterministic fallback that takes over during service interruptions, and RAG integration.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'dagitim-optimizasyonu-dashboard', 'optimization', null,
    array['Python', 'Optimizasyon', 'Dashboard'],
    false, 'published', 6,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Dağıtım Optimizasyonu ve Karar Destek Panosu',
            'description', 'Eker Süt Ürünleri stajımda, lojistik rotalarını iyileştirmeyi ve dağıtım maliyetlerini düşürmeyi hedefleyen bir karar destek panosu geliştirdim. Pano yöneticilere dağıtım performansına dair anlık analiz sunuyor.',
            'overview', 'Eker Süt Ürünleri stajımda, lojistik rotalarını iyileştirmeyi ve dağıtım maliyetlerini düşürmeyi hedefleyen bir karar destek panosu geliştirdim. Pano yöneticilere dağıtım performansına dair anlık analiz sunuyor.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Distribution Optimisation and Decision Support Dashboard',
            'description', 'During my internship at Eker I built a decision support dashboard aimed at improving logistics routes and reducing distribution costs. It gives managers real-time analysis of distribution performance.',
            'overview', 'During my internship at Eker I built a decision support dashboard aimed at improving logistics routes and reducing distribution costs. It gives managers real-time analysis of distribution performance.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'yapay-zeka-destekli-dijital-arsiv', 'ai', null,
    array['OCR', 'Python', 'Doküman İşleme'],
    false, 'published', 7,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Yapay Zekâ Destekli Dijital Arşiv Sistemi',
            'description', 'Eker Süt Ürünleri stajımda tamamladığım sistem, kurumsal belgeleri dijitalleştirip OCR ile metne dönüştürüyor. Yapay zekâ desteğiyle belgeler içinde akıllı arama yapılabiliyor ve dosyalar otomatik olarak kategorilere ayrılıyor.',
            'overview', 'Eker Süt Ürünleri stajımda tamamladığım sistem, kurumsal belgeleri dijitalleştirip OCR ile metne dönüştürüyor. Yapay zekâ desteğiyle belgeler içinde akıllı arama yapılabiliyor ve dosyalar otomatik olarak kategorilere ayrılıyor.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'AI-Powered Digital Archive System',
            'description', 'Completed during my internship at Eker, this system digitises corporate documents and converts them to text with OCR. AI support enables smart search across the documents and files are categorised automatically.',
            'overview', 'Completed during my internship at Eker, this system digitises corporate documents and converts them to text with OCR. AI support enables smart search across the documents and files are categorised automatically.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'rag-bankacilik-asistani', 'ai', null,
    array['Python', 'RAG', 'OpenAI API', 'Gradio'],
    false, 'published', 8,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'RAG Tabanlı Bankacılık Asistanı',
            'description', 'Ziraat Teknoloji stajımda geliştirdiğim asistan, bankacılık ürün ve süreçlerine dair soruları kurum verisine dayanarak yanıtlıyor. RAG mimarisi sayesinde yanıtlar modelin tahminine değil, getirilen belgelere dayanıyor.',
            'overview', 'Ziraat Teknoloji stajımda geliştirdiğim asistan, bankacılık ürün ve süreçlerine dair soruları kurum verisine dayanarak yanıtlıyor. RAG mimarisi sayesinde yanıtlar modelin tahminine değil, getirilen belgelere dayanıyor.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'RAG-Based Banking Assistant',
            'description', 'Developed during my internship at Ziraat Teknoloji, this assistant answers questions about banking products and processes from internal data. Thanks to the RAG architecture, answers are grounded in retrieved documents rather than model guesswork.',
            'overview', 'Developed during my internship at Ziraat Teknoloji, this assistant answers questions about banking products and processes from internal data. Thanks to the RAG architecture, answers are grounded in retrieved documents rather than model guesswork.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'mesaj-siniflandirma-portali', 'ai', null,
    array['Python', 'NLP', 'Gradio', 'Excel'],
    false, 'published', 9,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Mesaj Sınıflandırma ve Yönlendirme Portalı',
            'description', 'Ziraat Teknoloji stajımda geliştirdiğim portal, müşteri bildirimlerini kategori, aciliyet ve duygu bazında ayırıyor. Gradio Blocks ve özel CSS ile hazırlanan arayüz toplu Excel yükleme, canlı metrik takibi ve otomatik CRM bilet oluşturma akışlarını destekliyor.',
            'overview', 'Ziraat Teknoloji stajımda geliştirdiğim portal, müşteri bildirimlerini kategori, aciliyet ve duygu bazında ayırıyor. Gradio Blocks ve özel CSS ile hazırlanan arayüz toplu Excel yükleme, canlı metrik takibi ve otomatik CRM bilet oluşturma akışlarını destekliyor.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Message Classification and Routing Portal',
            'description', 'Built during my internship at Ziraat Teknoloji, this portal sorts customer reports by category, urgency and sentiment. The interface, built with Gradio Blocks and custom CSS, supports bulk Excel upload, live metric tracking and automatic CRM ticket creation.',
            'overview', 'Built during my internship at Ziraat Teknoloji, this portal sorts customer reports by category, urgency and sentiment. The interface, built with Gradio Blocks and custom CSS, supports bulk Excel upload, live metric tracking and automatic CRM ticket creation.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'turkce-duygu-analizi', 'ai', null,
    array['Python', 'NLP', 'Makine Öğrenmesi'],
    false, 'published', 10,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Türkçe Duygu Analizi (YouTube Yorumları)',
            'description', 'YouTube yorumları üzerinden Türkçe metinlerde duygu analizi yapan bir doğal dil işleme projesi geliştirdim. Çalışma, Türkçenin ek yapısı ve günlük dil kullanımının metin sınıflandırmaya etkisi üzerine yoğunlaştı.',
            'overview', 'YouTube yorumları üzerinden Türkçe metinlerde duygu analizi yapan bir doğal dil işleme projesi geliştirdim. Çalışma, Türkçenin ek yapısı ve günlük dil kullanımının metin sınıflandırmaya etkisi üzerine yoğunlaştı.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Turkish Sentiment Analysis (YouTube Comments)',
            'description', 'I built a natural language processing project that performs sentiment analysis on Turkish text using YouTube comments. The work focused on how Turkish morphology and everyday language use affect text classification.',
            'overview', 'I built a natural language processing project that performs sentiment analysis on Turkish text using YouTube comments. The work focused on how Turkish morphology and everyday language use affect text classification.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'makine-ogrenmesi-algoritma-karsilastirmasi', 'ai', null,
    array['Python', 'Makine Öğrenmesi'],
    false, 'published', 11,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Makine Öğrenmesi Algoritma Karşılaştırması',
            'description', 'Sınıflandırma, regresyon ve kümeleme problemlerinde farklı makine öğrenmesi algoritmalarını aynı veri kümeleri üzerinde karşılaştırmalı olarak analiz ettim. Amaç, problem tipine göre algoritma seçiminin sonuca etkisini görmekti.',
            'overview', 'Sınıflandırma, regresyon ve kümeleme problemlerinde farklı makine öğrenmesi algoritmalarını aynı veri kümeleri üzerinde karşılaştırmalı olarak analiz ettim. Amaç, problem tipine göre algoritma seçiminin sonuca etkisini görmekti.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Machine Learning Algorithm Comparison',
            'description', 'I ran a comparative analysis of different machine learning algorithms on classification, regression and clustering problems using the same datasets. The aim was to see how algorithm choice affects results depending on the problem type.',
            'overview', 'I ran a comparative analysis of different machine learning algorithms on classification, regression and clustering problems using the same datasets. The aim was to see how algorithm choice affects results depending on the problem type.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'genetik-algoritma-arac-rotalama', 'optimization', null,
    array['Python', 'Genetik Algoritma'],
    false, 'published', 12,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Genetik Algoritma ile Araç Rotalama ve Kargo Dağıtım Optimizasyonu',
            'description', 'Python ve genetik algoritmalar kullanarak araç rotalama ve kargo dağıtım ağı optimizasyonu üzerine çalıştım. Çalışma, teslimat noktalarının rota maliyetini düşürecek şekilde sıralanması problemine odaklandı.',
            'overview', 'Python ve genetik algoritmalar kullanarak araç rotalama ve kargo dağıtım ağı optimizasyonu üzerine çalıştım. Çalışma, teslimat noktalarının rota maliyetini düşürecek şekilde sıralanması problemine odaklandı.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Vehicle Routing and Cargo Distribution Optimisation with Genetic Algorithms',
            'description', 'Using Python and genetic algorithms, I worked on vehicle routing and cargo distribution network optimisation. The study focused on ordering delivery points so as to reduce total route cost.',
            'overview', 'Using Python and genetic algorithms, I worked on vehicle routing and cargo distribution network optimisation. The study focused on ordering delivery points so as to reduce total route cost.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'paw-care-mobil-uygulama', 'software', null,
    array['Kuika', 'Low-code'],
    false, 'published', 13,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Paw Care Mobil Uygulaması',
            'description', 'Kuika low-code platformu üzerinde ekip olarak geliştirdiğimiz Paw Care mobil uygulaması, evcil hayvan bakım takibi üzerine kuruldu. Proje, low-code araçlarla hızlı prototipleme deneyimi kazandırdı.',
            'overview', 'Kuika low-code platformu üzerinde ekip olarak geliştirdiğimiz Paw Care mobil uygulaması, evcil hayvan bakım takibi üzerine kuruldu. Proje, low-code araçlarla hızlı prototipleme deneyimi kazandırdı.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Paw Care Mobile Application',
            'description', 'Paw Care is a mobile application we developed as a team on the Kuika low-code platform, built around pet care tracking. The project was an exercise in rapid prototyping with low-code tools.',
            'overview', 'Paw Care is a mobile application we developed as a team on the Kuika low-code platform, built around pet care tracking. The project was an exercise in rapid prototyping with low-code tools.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'satin-alma-yonetimi-veritabani', 'software', null,
    array['C#', 'MS SQL Server'],
    false, 'published', 14,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Satın Alma Yönetimi Veritabanı Mimarisi',
            'description', 'C# ve MS SQL Server kullanarak satın alma yönetimi için bir veritabanı mimarisi tasarladım. Çalışma tablo ilişkilerinin kurgulanması ve sorguların raporlama ihtiyacına göre yapılandırılması üzerineydi.',
            'overview', 'C# ve MS SQL Server kullanarak satın alma yönetimi için bir veritabanı mimarisi tasarladım. Çalışma tablo ilişkilerinin kurgulanması ve sorguların raporlama ihtiyacına göre yapılandırılması üzerineydi.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Purchasing Management Database Architecture',
            'description', 'I designed a database architecture for purchasing management using C# and MS SQL Server. The work covered modelling table relationships and structuring queries around reporting needs.',
            'overview', 'I designed a database architecture for purchasing management using C# and MS SQL Server. The work covered modelling table relationships and structuring queries around reporting needs.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'elma-ambalaj-hatti-tasarimi', 'design', '/projects/apple-packing-line.png',
    array['SOLIDWORKS'],
    false, 'published', 15,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Elma Ambalaj Hattı Tasarımı',
            'description', 'SOLIDWORKS ile tasarladığım elma ambalaj hattı; dizim, karton yerleştirme, kapak kapama ve etiketleme işlemlerini kapsıyor. Tasarımın amacı süreci hızlandırarak iş gücü verimliliğini artırmaktı.',
            'overview', 'SOLIDWORKS ile tasarladığım elma ambalaj hattı; dizim, karton yerleştirme, kapak kapama ve etiketleme işlemlerini kapsıyor. Tasarımın amacı süreci hızlandırarak iş gücü verimliliğini artırmaktı.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Apple Packing Line Design',
            'description', 'Designed in SOLIDWORKS, this apple packing line covers arranging, carton placement, lid closing and labelling. The aim of the design was to speed up the process and improve labour efficiency.',
            'overview', 'Designed in SOLIDWORKS, this apple packing line covers arranging, carton placement, lid closing and labelling. The aim of the design was to speed up the process and improve labour efficiency.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'ergonomik-risk-degerlendirme', 'research', '/projects/ergonomic-risk.jpg',
    array['CATIA', 'SOLIDWORKS', 'REBA'],
    false, 'published', 16,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Ergonomik Risk Değerlendirme',
            'description', 'Ergonomi dersi kapsamında bir çelik üretim tesisinde ergonomik risk değerlendirmesi yaptık. REBA yöntemini uygulamak için çalışma duruşlarını CATIA’nın dijital insan modelleme aracıyla simüle ettik. Mevcut durumu analiz ederek çalışan konforunu artırmaya yönelik bir paketleme makinesi tasarladık.',
            'overview', 'Ergonomi dersi kapsamında bir çelik üretim tesisinde ergonomik risk değerlendirmesi yaptık. REBA yöntemini uygulamak için çalışma duruşlarını CATIA’nın dijital insan modelleme aracıyla simüle ettik. Mevcut durumu analiz ederek çalışan konforunu artırmaya yönelik bir paketleme makinesi tasarladık.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Ergonomic Risk Assessment',
            'description', 'As part of an ergonomics course we carried out an ergonomic risk assessment at a steel production plant. To apply the REBA method we simulated working postures with CATIA’s digital human modelling tool. After analysing the current state we designed a packaging machine aimed at improving worker comfort.',
            'overview', 'As part of an ergonomics course we carried out an ergonomic risk assessment at a steel production plant. To apply the REBA method we simulated working postures with CATIA’s digital human modelling tool. After analysing the current state we designed a packaging machine aimed at improving worker comfort.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'ambalaj-tasima-arabasi-tasarimi', 'design', null,
    array['SOLIDWORKS', 'CATIA'],
    false, 'published', 17,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Ambalaj Taşıma Arabası Tasarımı',
            'description', 'Ergonomi çalışmalarının bir parçası olarak, taşıma sırasında çalışanın duruşunu iyileştirmeyi hedefleyen bir ambalaj taşıma arabası tasarladık. Tasarım SOLIDWORKS ile modellendi.',
            'overview', 'Ergonomi çalışmalarının bir parçası olarak, taşıma sırasında çalışanın duruşunu iyileştirmeyi hedefleyen bir ambalaj taşıma arabası tasarladık. Tasarım SOLIDWORKS ile modellendi.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Packaging Transport Trolley Design',
            'description', 'As part of the ergonomics work, we designed a packaging transport trolley aimed at improving the operator’s posture while moving material. The design was modelled in SOLIDWORKS.',
            'overview', 'As part of the ergonomics work, we designed a packaging transport trolley aimed at improving the operator’s posture while moving material. The design was modelled in SOLIDWORKS.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
),
(
    'lego-kepce-tasarimi', 'design', '/projects/lego-excavator.png',
    array['SOLIDWORKS'],
    false, 'published', 18,
    jsonb_build_object(
        'tr', jsonb_build_object(
            'title', 'Legodan Kepçe Tasarımı',
            'description', 'SOLIDWORKS kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Parçaların mekanik uyumuna odaklanarak 3D modelleme ve montaj simülasyonları yaptım.',
            'overview', 'SOLIDWORKS kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Parçaların mekanik uyumuna odaklanarak 3D modelleme ve montaj simülasyonları yaptım.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        ),
        'en', jsonb_build_object(
            'title', 'Lego-Style Excavator Design',
            'description', 'I designed a functional Lego-style excavator in SOLIDWORKS. Focusing on the mechanical fit between parts, I carried out 3D modelling and assembly simulations.',
            'overview', 'I designed a functional Lego-style excavator in SOLIDWORKS. Focusing on the mechanical fit between parts, I carried out 3D modelling and assembly simulations.',
            'problem', '',
            'solution', '',
            'methodology', '',
            'results', '',
            'challenges', '',
            'futureImprovements', ''
        )
    )
)
on conflict (slug) do nothing;
