"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Search,
  Menu,
  Phone,
  MapPin,
  Mail,
  Clock,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from "lucide-react";

// Типы
interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: string;
  image: string;
  gallery?: string[];
  description: string;
  dimensions: string;
}

// Данные — 6 примеров товаров
const mockProducts: Product[] = [
  {
    id: "1",
    name: "Гроб VIP-класса из дуба",
    category: "Гробы",
    subcategory: "Вип гробы",
    price: "от 120 000 ₽",
    image: "/images/products/coffins/vip-dub.jpg",
    gallery: [
      "/images/products/coffins/vip-dub.jpg",
      "/images/products/coffins/vip-dub-2.jpg",
      "/images/products/coffins/vip-dub-3.jpg"
    ],
    description: "Элитный гроб ручной работы из натурального дуба с внутренней отделкой шёлком и бархатом. Подходит для официальных церемоний.",
    dimensions: "205×65×45 см"
  },
  {
    id: "2",
    name: "Деревянный полированный гроб",
    category: "Гробы",
    subcategory: "Полированные гробы",
    price: "от 75 000 ₽",
    image: "/images/products/coffins/polished-pine.jpg",
    gallery: ["/images/products/coffins/polished-pine.jpg"],
    description: "Классический гроб из сосны с высококачественной полировкой. Надёжный и достойный выбор.",
    dimensions: "200×60×40 см"
  },
  {
    id: "3",
    name: "Траурный венок 'Вечная память'",
    category: "Ритуальные венки",
    price: "от 3 500 ₽",
    image: "/images/products/wreaths/eternal-memory.jpg",
    gallery: ["/images/products/wreaths/eternal-memory.jpg"],
    description: "Венок из искусственных белых хризантем и зелени с чёрной лентой. Диаметр 60 см.",
    dimensions: "Диаметр 60 см"
  },
  {
    id: "4",
    name: "Деревянная урна с резьбой",
    category: "Урна для погребения",
    price: "от 8 000 ₽",
    image: "/images/products/urns/wood-carved.jpg",
    gallery: ["/images/products/urns/wood-carved.jpg"],
    description: "Урна из массива бука с ручной резьбой. Внутренний контейнер герметичен.",
    dimensions: "25×25×30 см"
  },
  {
    id: "5",
    name: "Биоразлагаемая урна 'Лотос'",
    category: "Биоурна для праха",
    price: "от 5 000 ₽",
    image: "/images/products/urns/bio-lotus.jpg",
    gallery: ["/images/products/urns/bio-lotus.jpg"],
    description: "Экологичная урна из композитного материала на основе растительных волокон. Разлагается за 2–3 года.",
    dimensions: "20×20×25 см"
  },
  {
    id: "6",
    name: "Крест на могилу из мрамора",
    category: "Кресты на могилу",
    price: "от 12 000 ₽",
    image: "/images/products/crosses/marble-cross.jpg",
    gallery: ["/images/products/crosses/marble-cross.jpg"],
    description: "Надгробный крест из натурального мрамора с гравировкой. Устойчив к погодным условиям.",
    dimensions: "90×45 см"
  }
];

// Категории
const mainCategories = [
  "Гробы",
  "Ритуальные венки",
  "Корзина на похороны",
  "Урна для погребения",
  "Биоурна для праха",
  "Постели в гроб",
  "Покрывала в гроб",
  "Подушки в гроб",
  "Ритуальная одежда",
  "Кресты на могилу",
  "Кресты на крышку гроба",
  "Таблички",
  "Ритуальные принадлежности"
];

export default function CatalogPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [products] = useState<Product[]>(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"low" | "high" | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Фильтрация и сортировка
  useEffect(() => {
    let result = products;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        item =>
          item.name.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query)
      );
    }

    if (selectedCategory) {
      result = result.filter(item => item.category === selectedCategory);
    }

    if (sortOrder) {
      result.sort((a, b) => {
        const priceA = extractPrice(a.price);
        const priceB = extractPrice(b.price);
        if (sortOrder === "low") return priceA - priceB;
        return priceB - priceA;
      });
    }

    setFilteredProducts(result);
  }, [searchQuery, selectedCategory, sortOrder, products]);

  const extractPrice = (priceStr: string): number => {
    if (priceStr.includes("по запросу")) return 999999;
    const match = priceStr.match(/\d+/g);
    return match ? parseInt(match.join(""), 10) : 0;
  };

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeProduct = () => {
    setSelectedProduct(null);
  };

  const nextImage = () => {
    if (!selectedProduct?.gallery) return;
    setCurrentImageIndex((prev) => (prev + 1) % selectedProduct.gallery!.length);
  };

  const prevImage = () => {
    if (!selectedProduct?.gallery) return;
    setCurrentImageIndex((prev) => (prev - 1 + (selectedProduct.gallery?.length || 1)) % (selectedProduct.gallery?.length || 1));
  };

  return (
    <div className="min-h-screen bg-[#060606] text-white font-light">
      {/* Top bar */}
      <div className="bg-[#484c44] text-white text-sm py-1 px-4 flex justify-between items-center">
        <span>РИТУАЛЬНЫЕ УСЛУГИ • Работаем с 2008 года</span>
        <a href="tel:+71223434435" className="hover:underline flex items-center gap-1">
          <Phone className="w-4 h-4" />
          +7 (122) 343-44-35
        </a>
        <span>Круглосуточная справочная</span>
      </div>

      {/* Header */}
      <header className="bg-[#060606] border-b border-[#484c44] sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="container mx-auto px-4 py-5 flex justify-between items-center">
          <a href="/" className="no-underline">
            <div>
              <h1 className="text-xl tracking-wide">Мемориал Сити</h1>
              <p className="text-xs text-[#868583] uppercase tracking-wider">Официальный сайт</p>
            </div>
          </a>

          <nav className="hidden md:flex items-center space-x-6">
            {[
              { name: "Главная", id: "/" },
              { name: "Каталог", id: "/catalog" },
              { name: "Похороны", id: "/#services" },
              { name: "О службе", id: "/#about" },
              { name: "Цены", id: "/#packages" },
              { name: "Контакты", id: "/#footer" },
            ].map((item) => (
              <a
                key={item.id}
                href={item.id.startsWith("/") ? item.id : item.id}
                className="text-[#868583] hover:text-white transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#4b6f91] group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-[#868583]">
              <Phone className="w-4 h-4" />
              <span>+7 (122) 343-44-35</span>
            </div>
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="px-5 py-2.5 border border-[#4b6f91] text-[#4b6f91] hover:bg-[#4b6f91] hover:text-[#060606] transition-all duration-300 rounded-lg text-sm tracking-wide"
            >
              Вызвать агента
            </button>
          </div>

          <button 
            className="md:hidden text-[#868583]"
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
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg md:hidden"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4, ease: "easeInOut" }}
              className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-[#060606] border-l border-[#484c44]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-6 border-b border-[#484c44]">
                <span className="text-[#868583] text-sm uppercase tracking-wider">Меню</span>
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[#868583] hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <div className="p-6 pt-8 space-y-8">
                <div className="pt-2 pb-6 border-b border-[#484c44]">
                  <div className="flex items-center space-x-2 text-[#868583] mb-4">
                    <Phone className="w-4 h-4" />
                    <span>+7 (122) 343-44-35</span>
                  </div>
                  <button 
                    onClick={() => setIsMenuOpen(false)}
                    className="w-full py-3 border border-[#4b6f91] text-[#4b6f91] hover:bg-[#4b6f91] hover:text-[#060606] transition-colors rounded-lg"
                  >
                    Вызвать агента
                  </button>
                </div>
                
                <nav className="space-y-4">
                  {[
                    { name: "Главная", id: "/" },
                    { name: "Каталог", id: "/catalog" },
                    { name: "Похороны", id: "/#services" },
                    { name: "О службе", id: "/#about" },
                    { name: "Цены", id: "/#packages" },
                    { name: "Контакты", id: "/#footer" },
                  ].map((item, i) => (
                    <motion.a
                      key={i}
                      href={item.id.startsWith("/") ? item.id : item.id}
                      className="block py-2.5 text-[#868583] hover:text-white text-lg tracking-wide rounded-lg hover:bg-[#484c44]/30 px-3"
                      whileHover={{ x: 8 }}
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

      <div className="container mx-auto px-4 py-8">
        {/* Поиск и сортировка */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#868583] w-4 h-4" />
            <input
              type="text"
              placeholder="Поиск товаров..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#121212] border border-[#484c44] rounded-lg focus:outline-none focus:border-[#4b6f91] text-white placeholder:text-[#717171]"
            />
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setSortOrder(sortOrder === "low" ? null : "low")}
              className={`px-4 py-3 rounded-lg flex items-center gap-1 ${
                sortOrder === "low"
                  ? "bg-[#4b6f91] text-[#060606]"
                  : "bg-[#121212] text-[#868583] hover:text-white border border-[#484c44]"
              }`}
            >
              <ArrowDown className="w-4 h-4" />
              Цена ↓
            </button>
            <button
              onClick={() => setSortOrder(sortOrder === "high" ? null : "high")}
              className={`px-4 py-3 rounded-lg flex items-center gap-1 ${
                sortOrder === "high"
                  ? "bg-[#4b6f91] text-[#060606]"
                  : "bg-[#121212] text-[#868583] hover:text-white border border-[#484c44]"
              }`}
            >
              <ArrowUp className="w-4 h-4" />
              Цена ↑
            </button>
          </div>
        </div>

        {/* Категории — горизонтальный скролл */}
        <div className="mb-8 pb-2 overflow-x-auto hide-scrollbar">
          <div className="flex gap-3 min-w-max">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                !selectedCategory
                  ? "bg-[#4b6f91] text-[#060606]"
                  : "bg-[#121212] text-[#868583] hover:text-white border border-[#484c44]"
              }`}
            >
              Все товары
            </button>
            {mainCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-[#4b6f91] text-[#060606]"
                    : "bg-[#121212] text-[#868583] hover:text-white border border-[#484c44]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Товары */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-[#717171]">
            Товары не найдены
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#121212] rounded-xl border border-[#484c44] overflow-hidden cursor-pointer hover:border-[#4b6f91] transition-colors backdrop-blur-sm"
                onClick={() => openProduct(product)}
              >
                <div className="aspect-square bg-[#060606] flex items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://placehold.co/300x300?text=Нет+фото&font=roboto";
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-white mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-[#868583] mb-2">
                    {product.category}
                  </p>
                  <p className="text-lg font-bold text-[#4b6f91]">
                    {product.price}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Product Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeProduct}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#060606] rounded-xl border border-[#484c44] w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-white">
                    {selectedProduct.name}
                  </h2>
                  <button 
                    onClick={closeProduct}
                    className="text-[#868583] hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="mb-6">
                  <div className="aspect-video bg-[#121212] rounded-xl overflow-hidden relative">
                    <img
                      src={
                        selectedProduct.gallery?.[currentImageIndex] ||
                        selectedProduct.image
                      }
                      alt={selectedProduct.name}
                      className="w-full h-full object-contain p-4"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Нет+фото&font=roboto";
                      }}
                    />
                    {selectedProduct.gallery && selectedProduct.gallery.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                          {selectedProduct.gallery.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full ${
                                idx === currentImageIndex
                                  ? "bg-[#4b6f91]"
                                  : "bg-[#484c44]"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-semibold text-[#868583] mb-2">Описание</h3>
                    <p className="text-[#717171]">{selectedProduct.description}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#868583] mb-2">Характеристики</h3>
                    <div className="space-y-2">
                      <div>
                        <span className="text-[#868583]">Категория:</span>{" "}
                        <span className="text-white">{selectedProduct.category}</span>
                      </div>
                      {selectedProduct.subcategory && (
                        <div>
                          <span className="text-[#868583]">Тип:</span>{" "}
                          <span className="text-white">{selectedProduct.subcategory}</span>
                        </div>
                      )}
                      <div>
                        <span className="text-[#868583]">Размеры:</span>{" "}
                        <span className="text-white">{selectedProduct.dimensions}</span>
                      </div>
                      <div>
                        <span className="text-[#868583]">Цена:</span>{" "}
                        <span className="text-[#4b6f91] font-bold">{selectedProduct.price}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-[#4b6f91] hover:bg-[#5a7ca0] text-[#060606] py-3 rounded-xl font-semibold transition-colors">
                  Заказать консультацию
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-[#060606] border-t border-[#484c44] py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-xl font-light mb-4">Городская служба</h3>
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
                <a href="/#services" className="hover:text-white block">Похороны</a>
                <a href="/#about" className="hover:text-white block">О службе</a>
                <a href="/#packages" className="hover:text-white block">Цены</a>
                <a href="/#footer" className="hover:text-white block">Контакты</a>
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

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}
