"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Clock,
  CheckCircle,
  FileText,
  Shield,
  MapPin,
  Mail,
  Menu,
  X,
  ChevronRight,
  MessageCircle,
} from "lucide-react";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: "", phone: "", comment: "" });
      setTimeout(() => {
        setSubmitSuccess(false);
        setIsModalOpen(false);
      }, 3000);
    }, 1000);
  };

  const services = [
    "Организация похорон под ключ",
    "Оформление документов",
    "Перевозка тела (город / межгород)",
    "Ритуальные принадлежности",
    "Подготовка тела",
    "Кремация",
    "Захоронение",
    "Поминальные обеды",
  ];

  const packages = [
    { 
      name: "Эконом", 
      features: ["Минимальный набор", "Оформление документов", "Перевозка"], 
      price: "от 45 000 ₽",
      description: "Базовый пакет для скромных похорон. Включает всё необходимое."
    },
    { 
      name: "Стандарт", 
      features: ["Всё из «Эконом»", "Гроб, венки", "Подготовка тела"], 
      price: "от 75 000 ₽",
      description: "Сбалансированный выбор для достойного прощания."
    },
    { 
      name: "Премиум", 
      features: ["Индивидуальный сценарий", "Полное сопровождение", "VIP-сервис"], 
      price: "по запросу",
      description: "Элитный сервис с персональным подходом и эксклюзивными опциями."
    },
  ];

  const processSteps = [
    { step: 1, title: "Звонок или заявка" },
    { step: 2, title: "Выезд агента" },
    { step: 3, title: "Подготовка и оформление" },
    { step: 4, title: "Проведение церемонии" },
  ];

  const trustReasons = [
    "Более 10 лет работы",
    "Официальные договоры",
    "Фиксированная цена",
    "Тактичные сотрудники",
    "Без давления и навязывания",
  ];

  const testimonials = [
    "/images/reviews/review1.jpg",
    "/images/reviews/review2.jpg",
    "/images/reviews/review3.jpg",
  ];

  return (
    <div className="min-h-screen bg-[#fefcfc] text-gray-800 font-light">
      {/* Top bar */}
      <div className="bg-[#4b6f91] text-white text-xs py-1.5 px-4 flex flex-wrap justify-center gap-4 md:gap-8 items-center">
        <span className="flex items-center gap-1.5">
          <Shield className="w-3.5 h-3.5" />
          Работаем с 2008 года
        </span>
        <span className="flex items-center gap-1.5">
          <Phone className="w-3.5 h-3.5" />
          <a href="tel:+71223434435" className="hover:underline">+7 (122) 343-44-35</a>
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5" />
          Круглосуточно
        </span>
      </div>

{/* Header */}
<header className="bg-white sticky top-0 z-50 border-b border-gray-200">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <a href="/" className="flex items-center gap-3 no-underline">
      <img 
        src="/logo.png" 
        alt="Прощание 24 — ритуальное агентство" 
        className="h-10 w-auto object-contain"
        onError={(e) => {
          (e.target as HTMLImageElement).src = "https://placehold.co/120x40?text=Логотип&font=roboto";
        }}
      />
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Прощание 24</h1>
        <p className="text-xs text-gray-500 uppercase tracking-wider">Официальный сайт</p>
      </div>
    </a>

    <nav className="hidden md:flex items-center space-x-6">
      {[
        { name: "Главная", id: "/" },
        { name: "Каталог", id: "/catalog" },
        { name: "Похороны", id: "#services" },
        { name: "О службе", id: "#about" },
        { name: "Цены", id: "#packages" },
        { name: "Контакты", id: "#footer" },
      ].map((item) => (
        <a
          key={item.id}
          href={item.id.startsWith("/") ? item.id : item.id}
          className="text-gray-700 hover:text-white hover:bg-[#2361D2] px-3 py-1 rounded transition-colors relative group"
        >
          {item.name}
        </a>
      ))}
    </nav>

    <button 
      onClick={() => setIsModalOpen(true)}
      className="hidden md:block px-5 py-2 bg-[#2361D2] text-white hover:bg-[#8B1E3F] transition-colors rounded-lg text-sm font-medium"
    >
      Вызвать агента
    </button>

    <button 
      className="md:hidden text-gray-700"
      onClick={() => setIsMenuOpen(true)}
    >
      <Menu className="w-6 h-6" />
    </button>
  </div>
</header>

{/* Mobile Menu */}
<AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm md:hidden"
      onClick={() => setIsMenuOpen(false)}
    >
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "tween", duration: 0.3 }}
        className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white border-l border-gray-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200">
          <span className="text-gray-700 font-medium">Меню</span>
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="text-gray-500 hover:text-gray-800"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <div className="p-5 pt-6 space-y-6">
          <div className="pt-1 pb-5 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-gray-600 mb-3">
              <Phone className="w-4 h-4" />
              <span>+7 (122) 343-44-35</span>
            </div>
            <button 
              onClick={() => {
                setIsModalOpen(true);
                setIsMenuOpen(false);
              }}
              className="w-full py-2.5 bg-[#2361D2] text-white hover:bg-[#8B1E3F] rounded-lg font-medium"
            >
              Вызвать агента
            </button>
          </div>
          
          <nav className="space-y-3">
            {[
              { name: "Главная", id: "/" },
              { name: "Каталог", id: "/catalog" },
              { name: "Похороны", id: "#services" },
              { name: "О службе", id: "#about" },
              { name: "Цены", id: "#packages" },
              { name: "Контакты", id: "#footer" },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.id.startsWith("/") ? item.id : item.id}
                className="block py-2 text-gray-700 hover:text-white font-medium rounded-lg px-2 hover:bg-[#2361D2]"
                whileHover={{ x: 4 }}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

{/* Hero */}
<section 
  className="relative py-16 md:py-24 bg-cover bg-center bg-no-repeat"
  style={{ backgroundImage: "url('/images/hero-bg.jpg')" }}
  aria-label="Главный баннер с услугами и контактами"
>
  <div className="absolute inset-0 bg-black/40"></div>
  <div className="container mx-auto px-4 max-w-7xl relative z-10">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
      
      {/* Левая колонка — текст и кнопка */}
      <div className="text-white space-y-5">
        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Ритуальные услуги в Москве и области
        </h1>
        <p className="text-xl">Похороны и кремация от 15 900 рублей</p>
        <ul className="space-y-2 text-gray-200">
          <li>• Организация похорон под ключ строго по договору</li>
          <li>• Помощь в получении льгот и компенсаций</li>
          <li>• Отправка груз 200</li>
          <li>• Многолетний опыт в ритуальных услугах</li>
          <li>• Выезд ритуального агента бесплатно 24/7 в течение 30 минут</li>
        </ul>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 px-8 py-4 bg-[#2361D2] text-white rounded-xl font-bold hover:bg-[#8B1E3F] transition-all duration-200 inline-flex items-center"
          aria-label="Вызвать ритуального агента"
        >
          Вызвать ритуального агента
        </button>
      </div>

      {/* Правая колонка — 6 кнопок + большая кнопка под ними */}
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          {[
            "Организация похорон",
            "Ритуальные товары",
            "Кремация",
            "Ритуальный транспорт",
            "Лицензии",
            "Организация поминок"
          ].map((item, i) => (
            <button
              key={i}
              className="px-3 py-2.5 bg-[#2361D2] text-white text-sm font-medium rounded-lg hover:bg-[#8B1E3F] transition-all duration-200"
              aria-label={`Перейти к разделу: ${item}`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Большая кнопка — СРАЗУ под 6 кнопками */}
        <button 
          onClick={() => document.querySelector('#steps')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-full px-6 py-4 bg-white text-[#2361D2] border-2 border-[#2361D2] rounded-xl font-bold text-lg hover:bg-[#8B1E3F] hover:text-white transition-all duration-200"
          aria-label="Что делать если умер близкий человек? Пошаговая инструкция"
        >
          Что делать если умер близкий человек?
          <br />
          <span className="text-sm font-normal">Пошаговый порядок действий в экстренных ситуациях</span>
        </button>
      </div>
    </div>
  </div>
</section>

      {/* Advantages */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              "Собственное\nпроизводство",
              "Работаем\nпо ГОСТ",
              "Беспроцентная\nрассрочка",
              "Большой\nавтопарк",
              "Скидка\nинвалидам",
              "Скидка\nпенсионерам"
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-4 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-[#4b6f91] font-bold whitespace-pre-line leading-tight">{item}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900">Ритуальное агентство "Мемориал Сити"</h2>
            <p className="mb-4 text-gray-700">
              Подготовка и проведение похорон требует не только знания всех этапов процесса, но и внимательного подхода ко всем деталям. Однако в сложные моменты утраты близких и родственников умершего зачастую тяжело сосредоточиться на каждой важной детали. В таких случаях разумно обратиться в специализированную организацию, где квалифицированные сотрудники окажут необходимую помощь. Городская ритуальная служба «Ритуальные услуги» в Москве и области помогут с организацией похорон, а также покупкой и доставкой ритуальных принадлежностей.
            </p>
            <p className="text-gray-700">
              Если вам нужна поддержка профессионалов для организации достойного прощания с близким человеком, ритуальная служба «Ритуальные услуги» возьмет на себя все организационные вопросы и урегулирует важные формальности. Оформление необходимых документов, покупка места на кладбище, выбор ритуальных принадлежностей, согласование панихиды или отпевания, транспортировка до места захоронения — опытные специалисты обеспечат полный цикл организации прощания.
            </p>
          </div>
        </div>
      </section>
      {/* Warning */}
      <section className="py-12 bg-[#f8f0f0] border-y border-[#e0cfcf]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-[#e0cfcf]">
            <h3 className="text-xl font-bold mb-4 text-[#a53a3a] flex items-center">
              <Shield className="w-5 h-5 mr-2" />
              Важно!
            </h3>
            <p className="text-gray-700">
              Никто не имеет права посещать ваш дом без вашего предварительного разрешения или приглашения. Если к вашей двери подошел незнакомый человек, особенно в случае недавней утраты, будьте бдительны — это может быть так называемый «черный» агент. Его действия незаконны, и он не имеет права проникать в вашу квартиру или дом. Не открывайте дверь, не вступайте в разговор и немедленно свяжитесь с сотрудниками городской службы, которые официально занимаются подобными случаями.
            </p>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-10 text-center text-gray-900">Что делать, если умер близкий человек – порядок действий:</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Позвоните в \"Ритуальные услуги\"",
                desc: "Запишите ФИО и номер удостоверения агента."
              },
              {
                title: "Подготовьте документы",
                desc: "Паспорт и полис покойного, паспорта всех присутствующих."
              },
              {
                title: "Встретьте сотрудника",
                desc: "Проверьте данные и вызовите полицию и скорую."
              }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-6 text-center"
              >
                <div className="w-12 h-12 rounded-full bg-[#4b6f91] text-white flex items-center justify-center mx-auto mb-4 font-bold text-lg">
                  {i + 1}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
<section 
  id="services" 
  className="py-20 bg-cover bg-center bg-no-repeat relative"
  style={{ backgroundImage: "url('/images/services-bg.jpg')" }}
>
  <div className="absolute inset-0 bg-black/50"></div>
  <div className="container mx-auto px-4 relative z-10">
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Наши услуги</h2>
      <p className="text-gray-200 max-w-2xl mx-auto text-lg">
        Комплексное решение всех вопросов, связанных с организацией похорон
      </p>
    </div>

    {/* Основной контент */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto mb-20">
      
      {/* Левая колонка */}
      <div className="text-white space-y-6">
        <h3 className="text-2xl font-bold">Организация похорон от 16 900 рублей</h3>
        <p className="text-lg">Поможем получить компенсацию расходов от государства 24 551,37 рублей</p>
        <p>
          Наши агенты возьмут на себя все заботы, связанные с организацией: от оформления документов до захоронения или кремации.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 bg-[#2361D2] text-white rounded-lg font-medium hover:bg-[#8B1E3F] transition-colors"
        >
          Вызвать ритуального агента
        </button>
        <p className="text-sm">
          Ритуальный агент приедет к вам в течение 30 минут в любую точку Москвы и Московской области.<br />
          Выезд ритуального агента осуществляется бесплатно 24/7.
        </p>
      </div>

      {/* Правая колонка — кнопки */}
      <div className="grid grid-cols-2 gap-4">
        {[
          "Ритуальные товары",
          "Организация поминок",
          "Ритуальный транспорт",
          "Все услуги"
        ].map((item, i) => (
          <button
            key={i}
            className="px-4 py-3 bg-white/90 backdrop-blur-sm text-gray-800 font-medium rounded-lg hover:bg-white transition-colors"
          >
            {item}
          </button>
        ))}
      </div>
    </div>

    {/* Описание этапов */}
    <div className="max-w-5xl mx-auto space-y-10">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
        <h3 className="text-xl font-bold text-white mb-3">Похороны в Москве и области</h3>
        <p className="text-gray-200">
          Смерть близкого человека — тяжелая утрата, сопровождающаяся сильным эмоциональным потрясением. В таком состоянии людям трудно заниматься организацией похорон, которая требует учета многих нюансов. Шок и горе мешают сосредоточиться на подготовке погребения. Заказать похороны вы можете в бюро города Москвы «Ритуал». Мы возьмем на себя решение всех вопросов.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Оформление документов",
            desc: "Медицинское свидетельство о смерти, протокол осмотра, полицейское заключение, гербовое свидетельство. Обеспечим правильное оформление и минимизируем вашу нагрузку."
          },
          {
            title: "Выбор способа захоронения",
            desc: "Традиционное захоронение, кремация, альтернативные варианты (экологические или водные захоронения)."
          },
          {
            title: "Организация прощальной церемонии",
            desc: "Формат церемонии, место проведения, услуги священника, программа поминовения."
          },
          {
            title: "Подготовка и оформление",
            desc: "Выбор гроба или урны, оформление места прощания (цветы, фотогалерея, свечи), организация транспортировки."
          },
          {
            title: "Проведение похоронной церемонии",
            desc: "Обеспечим все необходимые услуги и поддержку, чтобы сделать этот момент как можно более комфортным."
          },
          {
            title: "Организация поминок",
            desc: "Подбор ресторана, составление меню, декорирование зала, подготовленный персонал."
          }
        ].map((item, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-lg p-5 border border-white/20">
            <h4 className="font-bold text-white mb-2">{item.title}</h4>
            <p className="text-gray-200 text-sm">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Цены */}
    <div className="mt-20 max-w-6xl mx-auto">
      <h3 className="text-2xl font-bold text-center text-white mb-10">Цены на организацию</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            name: "Эконом",
            price: "от 16 900 руб.",
            desc: "Минимальный пакет товаров и услуг, необходимых для проведения похорон",
            details: [
              "Выезд агента",
              "Гроб, обитый тканью",
              "Постель в гроб",
              "Крест на гроб малый",
              "Похоронный комплект шелковый: тапочки ритуальные, покрывало",
              "Доставка принадлежностей в морг",
              "Заказ катафального транспорта",
              "Транспорт по маршруту морг — кладбище (2 посадочных места)"
            ]
          },
          {
            name: "Стандарт",
            price: "от 38 870 руб.",
            desc: "Расширенный пакет товаров и услуг, необходимых для проведения похорон",
            details: [
              "Выезд агента",
              "Гроб, обитый тканью",
              "Постель в гроб",
              "Крест на гроб малый",
              "Похоронный комплект шелковый: тапочки ритуальные, покрывало",
              "Венок искусственный 120 см",
              "Лента на венок стандарт",
              "Крест металл стандарт",
              "Доставка принадлежностей в морг",
              "Заказ катафального транспорта",
              "Транспорт по маршруту морг — кладбище (5 посадочных мест)"
            ]
          },
          {
            name: "Престиж",
            price: "от 82 370 руб.",
            desc: "Расширенный пакет товаров и услуг, необходимых для проведения похорон",
            details: [
              "Выезд агента",
              "Гроб деревянный лакированный",
              "Постель в гроб",
              "Крест сосновый лакированный",
              "Похоронный комплект атласный: тапочки ритуальные, покрывало, подушка",
              "Венок заказной 2 шт. 110 см",
              "Ленты заказные 2 шт.",
              "Оформления заказа",
              "Трафарет на крест 30*18 с фото",
              "Доставка принадлежностей в морг",
              "Заказ катафального транспорта",
              "Транспорт на 15 посадочных мест (Микроавтобус Mercedes)"
            ]
          }
        ].map((pkg, i) => (
          <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
            <div className="p-6">
              <h4 className="text-xl font-bold text-white mb-2">{pkg.name}</h4>
              <p className="text-gray-200 text-sm mb-4">{pkg.desc}</p>
              <div className="text-2xl font-bold text-white mb-4">{pkg.price}</div>
              
              <div className="space-y-3">
                <button className="w-full py-2 bg-[#2361D2] text-white rounded-lg hover:bg-[#8B1E3F] transition-colors">
                  Заказать
                </button>
                <a 
                  href="tel:+71223434435" 
                  className="block w-full py-2 border border-[#2361D2] text-white rounded-lg text-center hover:bg-[#2361D2] transition-colors"
                >
                  Позвонить
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>


      {/* Packages */}
      <section id="packages" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">Пакеты услуг</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Без скрытых платежей. Всё прописано заранее.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#f8f9fa] border border-gray-200 rounded-xl overflow-hidden"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-center text-gray-900">{pkg.name}</h3>
                  <ul className="space-y-2 mb-6 text-sm text-gray-700">
                    {pkg.features.map((f, j) => (
                      <li key={j} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-[#4b6f91] mr-2 mt-0.5 flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="text-center mb-4">
                    <div className="text-2xl font-bold text-[#4b6f91]">{pkg.price}</div>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="w-full py-2.5 bg-[#4b6f91] text-white rounded-lg font-medium hover:bg-[#5a7ca0] transition-colors"
                  >
                    Узнать подробнее
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" className="py-20 bg-[#f8f9fa]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">Как мы работаем</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Простой и понятный процесс, чтобы вы могли сосредоточиться на главном
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {processSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#4b6f91] text-white flex items-center justify-center mx-auto mb-5 font-bold text-lg">
                  {step.step}
                </div>
                <p className="text-gray-800">{step.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">Почему нам доверяют</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
            {trustReasons.map((reason, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-5 bg-[#f8f9fa] text-center text-sm rounded-xl"
              >
                {reason}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-[#fefcfc]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-gray-900">Отзывы</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Реальные отзывы с Яндекс.Карт
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex animate-scroll gap-8 px-4">
              {[...testimonials, ...testimonials].map((img, i) => (
                <div key={i} className="flex-shrink-0 w-64">
                  <div className="bg-gray-100 rounded-3xl p-4 border-8 border-black shadow-lg">
                    <img 
                      src={img} 
                      alt={`Отзыв клиента ${i + 1}`}
                      className="w-full h-auto rounded-xl object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/300x500?text=Скриншот+отзыва&font=roboto";
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#4b6f91] to-[#5a7ca0]">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-light mb-4 text-white">Мы рядом, когда это особенно важно</h2>
            <p className="text-blue-100">Оставьте заявку — и мы свяжемся с вами в течение 5 минут</p>
          </div>
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Имя"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b6f91] text-gray-900 placeholder:text-gray-500"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Телефон"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b6f91] text-gray-900 placeholder:text-gray-500"
              />
              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleInputChange}
                placeholder="Комментарий (опционально)"
                rows={3}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b6f91] text-gray-900 placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-[#4b6f91] text-white rounded-xl font-semibold hover:bg-[#5a7ca0] transition-colors disabled:opacity-70"
              >
                {isSubmitting ? "Отправка..." : "Получить помощь"}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="footer" className="bg-[#060606] border-t border-[#484c44] py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-light mb-4 text-white">Городская служба</h3>
              <p className="text-[#717171] text-sm mb-4">
                Ритуальные услуги с 2008 года. Официально, тактично, с уважением к памяти усопших.
              </p>
              <div className="flex items-center text-[#717171] text-sm">
                <MapPin className="w-4 h-4 mr-2" />
                г. Москва, ул. Примерная, д. 10
              </div>
            </div>
            <div>
              <h4 className="font-light mb-4 text-[#717171]">Навигация</h4>
              <div className="space-y-2 text-[#717171] text-sm">
                <a href="/" className="hover:text-white block">Главная</a>
                <a href="/catalog" className="hover:text-white block">Каталог</a>
                <a href="#services" className="hover:text-white block">Похороны</a>
                <a href="#about" className="hover:text-white block">О службе</a>
                <a href="#packages" className="hover:text-white block">Цены</a>
                <a href="#footer" className="hover:text-white block">Контакты</a>
              </div>
            </div>
            <div>
              <h4 className="font-light mb-4 text-[#717171]">Контакты</h4>
              <div className="space-y-2 text-[#717171] text-sm">
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2" /> +7 (122) 343-44-35
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2" /> info@memorialcity.ru
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" /> Круглосуточно
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-[#484c44] mt-10 pt-6 text-center text-[#717171] text-sm">
            <div className="mb-2">Ритуальные услуги • Официальный сайт</div>
            <div>© 2008–{new Date().getFullYear()} Ритуальные услуги. Официальный сайт</div>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl border border-gray-200 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-5">
                  <h3 className="text-lg font-semibold text-gray-900">Получить помощь</h3>
                  <button 
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-500 hover:text-gray-800"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {submitSuccess ? (
                  <div className="text-center py-6">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-green-700">Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Имя"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b6f91] text-gray-900 placeholder:text-gray-500"
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Телефон"
                      required
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b6f91] text-gray-900 placeholder:text-gray-500"
                    />
                    <textarea
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      placeholder="Комментарий (опционально)"
                      rows={2}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4b6f91] text-gray-900 placeholder:text-gray-500"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#4b6f91] text-white rounded-lg font-medium hover:bg-[#5a7ca0] transition-colors disabled:opacity-70"
                    >
                      {isSubmitting ? "Отправка..." : "Получить помощь"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Animation for testimonials */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 40s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
