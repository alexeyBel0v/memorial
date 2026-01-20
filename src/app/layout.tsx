import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Память — Похоронное агентство Москвы",
  description: "Организация похорон под ключ. Официально. Тактично. Без навязывания услуг. Более 10 лет работы.",
  keywords: "похороны, ритуальные услуги, организация похорон, кремация, захоронение, Москва",
  authors: [{ name: "Память" }],
  openGraph: {
    title: "Память — Похоронное агентство",
    description: "Достойные похороны без стресса. Круглосуточная помощь.",
    url: "https://pamyat.ru",
    siteName: "Память",
    locale: "ru_RU",
    type: "website",
  },
  alternates: {
    canonical: "https://pamyat.ru",
  },
};

// Schema.org для FuneralService
const schema = {
  "@context": "https://schema.org",
  "@type": "FuneralService",
  "name": "Память",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Памяти, д. 15",
    "addressLocality": "Москва",
    "postalCode": "123456",
    "addressCountry": "RU"
  },
  "telephone": "+74951234567",
  "openingHours": "24/7",
  "priceRange": "от 45000 ₽",
  "url": "https://pamyat.ru"
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body className={manrope.className}>
        {children}
        
        {/* Schema.org */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-XXXXXXXXXX');
            `,
          }}
        />
        
        {/* Яндекс.Метрика */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
              (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");
              
              ym(XXXXXXXX, "init", {
                clickmap:true,
                trackLinks:true,
                accurateTrackBounce:true,
                webvisor:true
              });
            `,
          }}
        />
        <noscript>
          <div>
            <img src="https://mc.yandex.ru/watch/XXXXXXXX" style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
      </body>
    </html>
  );
}
