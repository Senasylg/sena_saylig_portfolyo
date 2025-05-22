import project1_img from '../assets/solidproje.png'
import project2_img from '../assets/websitetasarım.png'
import project3_img from '../assets/hattasarımısolid.png'
import project4_img from '../assets/simproje.png'
import project5_img from '../assets/stoktakipproje.png'
import project6_img from '../assets/ergonomiproje.jpg'

const projects_data = [
    {
        p_no: 1,
        p_name: "Legodan Kepçe Tasarımı",
        p_img: project1_img,
        description: "SolidWorks kullanarak Lego tarzında fonksiyonel bir kepçe tasarladım. Mekanik uyum ve estetik detaylara odaklanarak 3D modelleme ve montaj simülasyonları gerçekleştirdim.",
        tools: ["SOLIDWORKS"]
    },
    {
        p_no: 2,
        p_name: "Web Site Tasarımı",
        p_img: project2_img,
        description: "FİZİKADİYET Fizyoterapi ve Beslenme Danışmanlığı için modern, kullanıcı deneyimi odaklı kurumsal web sitesi geliştirdim. Performans ve SEO uyumuna öncelik verilerek hazırlanan bu tasarım, marka kimliğini dijital ortamda etkili şekilde yansıtmayı amaçlamaktadır.",
        tools: ["HTML", "CSS", "JavaScript", "React", "Figma"]
    },
    {
        p_no: 3,
        p_name: "Elma Ambalaj Hattı Tasarımı",
        p_img: project3_img,
        description: "SolidWorks ile tasarladığım elma ambalaj hattı, dizim, karton yerleştirme, kapak kapama ve etiketleme gibi temel işlemleri içeren verimli bir sistemdir. Amaç, süreci hızlandırarak iş gücü verimliliğini artırmaktır.",
        tools: ["SOLIDWORKS"]
    },
    {
        p_no: 4,
        p_name: "Kavşak Sinyalize Trafik Işığı Simülasyonu",
        p_img: project4_img,
        description: "Balıkesir Yeniçayırhisar kavşağı için çalıştığım projede, trafik akışını iyileştirmek amacıyla sinyalize trafik ışığı sistemi modellemesi ve simülasyonu yaptım. Gerçek verilerle araç yoğunluğunu ve bekleme sürelerini analiz ederek, farklı ışıklandırma senaryolarının etkilerini değerlendirdim.",
        tools: ["Arena Rockwell Simulation", "Minitab", "Excel"]
    },
    {
        p_no: 5,
        p_name: "Stok Takip Sistemi",
        p_img: project5_img,
        description: "TechDepot teknoloji mağazasının stok yönetimini optimize etmek için geliştirdiğim bu sistem, iki versiyon halinde uygulanmıştır. İlk versiyon C# Windows Forms ve MS SQL Server, ikinci versiyon ise PyQt5, Qt Designer ve SQLite kullanılarak geliştirilmiştir. Sistem; ürün yönetimi, stok takip, satış, müşteri ve personel yönetimi, raporlama ve analiz modüllerini içermektedir.",
        tools: ["C#", "MS SQL Server","Qt Designer","PyQt5","SQLite"]
    },
    {
        p_no: 6,
        p_name: "Ergonomik Risk Değerlendirme",
        p_img: project6_img,
        description: "Ergonomi dersi kapsamında, çelik fabrikasında ergonomik risk değerlendirmesi gerçekleştirdik. REBA metodunun uygulanması için CATIA’daki dijital insan modelleme aracıyla çalışma duruşları simüle edildi. Mevcut durum analiz edilerek, çalışan konforunu artırmak amacıyla yenilikçi paketleme makinesi tasarlandı.",
        tools: ["CATIA", "SOLIDWORKS"]
    },
]

export default projects_data;
