# NBC News Portal

NBC News üslubunda hazırlanmış xəbər portalı. Ana səhifədə NewsAPI-dən gələn xəbərlər, kateqoriya tabları, şəhər axtarışı və Editor's Picks göstərilir. Hər xəbərin detay səhifəsi, əlaqəli xəbərləri və favoritləri var.

## Canlı demo

**Demo linki:** http://localhost:5173

> NewsAPI pulsuz planı yalnız localhost-da işləyir. Ona görə demo `npm run dev` işə düşəndə kompüterinizdə açılır.

## Ekran görüntüləri

Ana səhifə(public/screenshots/hero.png)
Detay səhifəsi(public/screenshots/desktop.png, desktop2.png, desktop3.png) 

## Texnologiyalar

- **React 18** və **Vite 5** – interfeys və development server
- **React Router 6** (`HashRouter`) – səhifələr (`/#/news/:id`)
- **Axios** – server ilə əlaqə
- **NewsAPI** – xəbər məlumatları
- **CSS** – responsive dizayn (kompüter, planşet, mobil)
- **localStorage** – favoritlər və baxılan xəbərlər

## Xüsusiyyətlər

- Baş xəbər (Hero) və Breaking News zolağı
- Latest Stories: **Latest Stories / Think / Health** tabları, grid və list görünüşü
- **VIEW MORE** düyməsi: hər kliklə 4 xəbər əlavə olunur, 12 xəbərdə düymə gizlənir
- Live bölməsi və **Location News** (şəhər axtarışı)
- Editor's Picks: kompüterdə 2, mobildə 1 kart, nöqtələrlə sürüşmə
- Xəbər detay səhifəsi: başlıq, mətn, sol panel, newsletter, etiketlər, müəllif kartı
- Sağ paneldə "Recommended for you" və "Based on Like", altda "Related Topics"
- Favoritlər: ana səhifə və detay səhifəsi arasında sinxron, səhifə yenilənəndə qalır
- Yüklənmə və xəta mesajları
- Responsive: kompüter (1000px+), planşet (800–999px), mobil (600–799px)


## Mühit dəyişənləri

| Dəyişən | Məcburi | Təsvir |
|---|---|---|
| `NEWS_API_KEY` | Bəli | NewsAPI açarı. Yalnız serverdə istifadə olunur, brauzerə çıxmır. |

## API məlumatı

- **Xidmət:** [NewsAPI.org](https://newsapi.org)
- **Endpointlər:** `top-headlines` (baş xəbərlər) və `everything` (axtarış)
- **Pulsuz plan:** gündə təxminən 100 sorğu, yalnız localhost. Limitlər dəyişə bilər.
- **Açar necə alınır:** [newsapi.org/register](https://newsapi.org/register)
- **Cache:** server eyni sorğunu 10 dəqiqə yadda saxlayır.

## Qovluq strukturu

```
software-village-news-portal/
├── public/                  → İkonlar, şəkillər, screenshots/
├── server/
│   └── newsApi.js           → NewsAPI sorğusu (açar yalnız burada)
├── src/
│   ├── api/client.js        → Axios client
│   ├── services/newsService.js → Xəbərlərin gətirilməsi
│   ├── hooks/
│   │   ├── useAsync.js      → Loading / error / data
│   │   ├── useNews.js       → Səhifə-səhifə yükləmə (VIEW MORE)
│   │   └── useBookmark.js   → Favoritlər
│   ├── lib/
│   │   ├── articles.js      → Xəbərin formatı və saxlanması
│   │   └── siteConfig.js    → Navbar və footer mətnləri
│   ├── components/          → Navbar, Hero, Breaking, Latest, Side, Picks, Footer ...
│   │   └── news/            → Detay səhifəsinin hissələri
│   ├── pages/               → HomePage, ArticlePage, NotFoundPage
│   ├── App.jsx, App.css, main.jsx
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Müəllif

- **Ad:** [Toğrul Hüseynli]
- **GitHub:** [https://github.com/togrulhuseynli05]
- **LinkedIn:** [https://linkedin.com/in/togrulhuseyn05]
