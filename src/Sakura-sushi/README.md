# Sakura Sushi — Premium Sushi Store

موقع متجر سوشي احترافي مبني بـ React + Vite + Tailwind CSS.
يعمل بالكامل بدون backend — مناسب لـ GitHub Pages.

## كيفية التشغيل

```bash
npm install
npm run dev
```

## البناء للإنتاج

```bash
npm run build
```

الملفات ستكون في مجلد `dist/` جاهزة للرفع على GitHub Pages.

## الرفع على GitHub Pages

1. ابني المشروع: `npm run build`
2. ارفع مجلد `dist/` على فرع `gh-pages`
3. أو استخدم [Vite GitHub Pages plugin](https://github.com/siph/vite-plugin-gh-pages)

## الصفحات

- `/` — الصفحة الرئيسية مع Hero والمنتجات المميزة
- `/menu` — قائمة كاملة مع فلتر وترتيب
- `/product/:id` — صفحة تفاصيل المنتج
- `/cart` — سلة التسوق الذكية
- `/order-success` — تأكيد الطلب

## التقنيات

- React 18
- Vite
- Tailwind CSS
- Framer Motion
- Wouter (routing)
- LocalStorage للسلة
