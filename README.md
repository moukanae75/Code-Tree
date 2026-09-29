# 🌳 CodeTree V2

<div dir="rtl">

**CodeTree V2** هو منصة تعليمية تفاعلية تعتمد على بنية الخدمات المصغرة (Microservices) لتوفير بيئة متكاملة لتعلم البرمجة، وتنفيذ الأكواد البرمجية (Moulinette)، وإدارة المحتوى، بالإضافة إلى نظام ألعاب (Gamification) لتحفيز المتعلمين. 

يعتمد المشروع على تقنيات متعددة (Polyglot) تشمل `Java (Spring Boot)`، `.NET (C#)`، `Python (FastAPI)`، و `React` للواجهة الأمامية.

---

## 🚀 الميزات الرئيسية

- **بنية الخدمات المصغرة (Microservices):** خدمات مستقلة لكل من الهوية (Identity)، المحتوى (Content)، نظام الألعاب (Gamification)، ومحرك الأكواد.
- **التوجيه والاكتشاف (Gateway & Discovery):** إدارة وتوجيه جميع الطلبات من خلال بوابة موحدة (API Gateway) باستخدام خادم (Eureka) لاكتشاف الخدمات آليًا.
- **تنفيذ الأكواد البرمجية الآمن (Code Engine):** بيئة مخصصة لتنفيذ وتقييم أكواد المستخدمين البرمجية مبنية باستخدام Python و FastAPI.
- **نظام تحفيزي (Gamification):** نظام إدارة النقاط والمكافآت لتشجيع المتعلمين.
- **واجهة مستخدم حديثة وسريعة:** مبنية باستخدام أحدث تقنيات React 19 و Vite و TailwindCSS 4.

---

## 🛠️ التقنيات المستخدمة (Tech Stack)

### 🎨 الواجهة الأمامية (Frontend)
- [React 19](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS 4](https://tailwindcss.com/)
- TypeScript

### ⚙️ الخدمات الخلفية (Backend Microservices)
- **API Gateway:** Java / Spring Cloud Gateway
- **Discovery Service:** Java / Spring Cloud Netflix Eureka
- **Gamification Service:** Java / Spring Boot
- **Identity Service:** C# / .NET 8 (Web API, JWT Authentication)
- **Content Service:** C# / .NET 8
- **Code Engine (Moulinette):** Python / FastAPI

### 🗄️ قواعد البيانات والبنية التحتية (Infrastructure)
- **قواعد البيانات:** PostgreSQL / MySQL (مقسمة لكل خدمة: `codetree_identity`, `codetree_content`, `codetree_gamification`)
- **الحاويات:** Docker & Docker Compose
- **أدوات التطوير:** Swagger / OpenAPI لتوثيق الواجهات البرمجية

---

## 📂 هيكل المشروع (Project Structure)

```text
Code-Tree/
├── discovery-service/      # خدمة اكتشاف الخدمات (Eureka Server)
├── gateway-service/        # البوابة الرئيسية للطلبات (API Gateway)
├── identity-service/       # إدارة المستخدمين والمصادقة (.NET)
├── content-service/        # إدارة محتوى المنصة والدروس (.NET)
├── gamification-service/   # نظام النقاط والمكافآت (Spring Boot)
├── code-engine/            # محرك ومقيم الأكواد البرمجية (Python)
├── frontend-app/           # تطبيق الواجهة الأمامية (React)
├── docker-compose.yml      # إعداد قواعد البيانات (PostgreSQL و pgAdmin)
├── init-dbs.sql            # سكربت تهيئة قواعد البيانات
├── insert_content.sql      # بيانات تجريبية للمحتوى (Seed Data)
└── start-all.bat           # سكربت لتشغيل جميع الخدمات دفعة واحدة
```

---

## ⚙️ متطلبات التشغيل (Prerequisites)

قبل البدء، تأكد من تثبيت الأدوات التالية على جهازك:
- [Docker & Docker Compose](https://www.docker.com/) (لتشغيل حاوية قواعد البيانات)
- [Java Development Kit (JDK 17+)](https://adoptium.net/) (لخدمات Spring Boot)
- [.NET 8 SDK](https://dotnet.microsoft.com/download) (لخدمات الهوية والمحتوى)
- [Python 3.10+](https://www.python.org/) (لمحرك الأكواد)
- [Node.js (v18+)](https://nodejs.org/) (للواجهة الأمامية)

---

## 🚀 كيفية التشغيل (Getting Started)

### 1️⃣ تشغيل قواعد البيانات (Database Setup)
قم بتشغيل حاويات قواعد البيانات (PostgreSQL و pgAdmin) باستخدام Docker من المجلد الرئيسي للمشروع:
```bash
docker-compose up -d
```
> **ملاحظة:** يتم إنشاء قواعد البيانات الأساسية تلقائيًا عند تشغيل الحاوية لأول مرة عبر ملف `init-dbs.sql`.

### 2️⃣ تشغيل الخدمات المصغرة (Running Microservices)
على أنظمة Windows، يمكنك تشغيل جميع الخدمات الخلفية دفعة واحدة باستخدام السكربت المرفق. اضغط مرتين على الملف أو قم بتشغيله من موجِّه الأوامر:
```bash
.\start-all.bat
```
السكربت سيقوم بفتح نوافذ طرفية متعددة وتشغيل الخدمات بالترتيب التالي لضمان التسجيل الصحيح:
1. Discovery Service (انتظار 15 ثانية للتسجيل)
2. API Gateway
3. Gamification Service
4. Identity Service
5. Content Service
6. Code Engine

*(ملاحظة: يمكنك أيضًا الدخول لمجلد كل خدمة وتشغيلها يدويًا بناءً على بيئتها).*

### 3️⃣ تشغيل الواجهة الأمامية (Running Frontend)
في نافذة طرفية (Terminal) جديدة، انتقل إلى مجلد الواجهة الأمامية، وقم بتثبيت الحزم ثم تشغيل التطبيق:
```bash
cd frontend-app
npm install
npm run dev
```

الآن أصبح بإمكانك تصفح التطبيق من خلال الرابط الذي سيظهر لك في الطرفية (غالبًا ما يكون `http://localhost:5173`)!

---

## 📖 توثيق الـ API (API Documentation)
بمجرد تشغيل الخدمات بشكل صحيح، يتم توليد توثيق Swagger تلقائيًا لبعض الخدمات. يمكنك الوصول إليه عادةً عبر الروابط التالية:
- **Identity Service:** `http://localhost:<PORT>/swagger`
- **Content Service:** `http://localhost:<PORT>/swagger`
- **Code Engine:** `http://localhost:<PORT>/docs`

*(تأكد من مراجعة البورت الخاص بكل خدمة من ملفات الإعدادات مثل `appsettings.json` لخدمات .NET أو ما يظهر في طرفية التشغيل)*

---

## 👨‍💻 المساهمة (Contributing)
للمساهمة في المشروع، يُرجى إنشاء فرع (Branch) جديد باسم الميزة (Feature) أو الإصلاح (Bugfix)، ومن ثم تقديم طلب دمج (Pull Request) ليتم مراجعته.

</div>
