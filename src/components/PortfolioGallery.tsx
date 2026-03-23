"use client";

import { useState } from "react";
import { X, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";

interface PortfolioItem {
  id: number;
  title: string;
  client: string;
  image: string;
}

export default function PortfolioGallery({ portfolio }: { portfolio: PortfolioItem[] }) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % portfolio.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + portfolio.length) % portfolio.length);
    }
  };

  return (
    <>
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back button */}
          <div className="mb-8">
            <a
              href="/#portfolio"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับหน้าหลัก
            </a>
          </div>

          <div className="text-center mb-4">
            <p className="text-gray-medium">ทั้งหมด {portfolio.length} ผลงาน</p>
          </div>

          {/* Grid - 4 columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
            {portfolio.map((item, index) => (
              <div
                key={item.id || index}
                onClick={() => openLightbox(index)}
                className="group cursor-pointer relative overflow-hidden rounded-xl bg-gray-bg border border-gray-light hover:shadow-xl transition-all duration-300"
              >
                <div className="aspect-square">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/400x400/0f3460/ffffff?text=${encodeURIComponent(item.title || "Project")}`;
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-white font-semibold text-sm lg:text-base truncate">{item.title}</h3>
                  <p className="text-white/80 text-xs lg:text-sm truncate">{item.client}</p>
                </div>
                {/* Always visible title on mobile */}
                <div className="md:hidden p-3 bg-white">
                  <h3 className="font-semibold text-foreground text-sm truncate">{item.title}</h3>
                  <p className="text-gray-medium text-xs truncate">{item.client}</p>
                </div>
              </div>
            ))}
          </div>

          {portfolio.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-medium text-lg">ยังไม่มีผลงาน</p>
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {selectedIndex !== null && portfolio[selectedIndex] && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation */}
          {portfolio.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-4 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-4 z-10 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Image */}
          <div
            className="max-w-4xl max-h-[85vh] mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={portfolio[selectedIndex].image}
              alt={portfolio[selectedIndex].title}
              className="max-w-full max-h-[75vh] object-contain rounded-lg mx-auto"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://via.placeholder.com/800x600/0f3460/ffffff?text=${encodeURIComponent(portfolio[selectedIndex]?.title || "Project")}`;
              }}
            />
            <div className="text-center mt-4">
              <h3 className="text-white font-semibold text-lg">{portfolio[selectedIndex].title}</h3>
              <p className="text-white/70 text-sm">{portfolio[selectedIndex].client}</p>
              <p className="text-white/50 text-xs mt-1">{selectedIndex + 1} / {portfolio.length}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
