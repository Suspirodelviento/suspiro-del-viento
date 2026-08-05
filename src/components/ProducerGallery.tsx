import React, { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Camera } from 'lucide-react';

interface ProducerGalleryProps {
  images: string[];
  producerName: string;
}

export const ProducerGallery: React.FC<ProducerGalleryProps> = ({ images, producerName }) => {
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  if (!images || images.length === 0) return null;

  const handlePrev = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! === 0 ? images.length - 1 : prev! - 1));
  };

  const handleNext = () => {
    if (activeImageIndex === null) return;
    setActiveImageIndex((prev) => (prev! === images.length - 1 ? 0 : prev! + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 border-b border-[#E3DEC8] pb-3">
        <Camera className="w-5 h-5 text-[#284933]" />
        <h3 className="font-serif font-bold text-2xl text-[#1A3323]">
          Galería Fotográfica de la Finca
        </h3>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImageIndex(idx)}
            className="group relative aspect-4/3 rounded-2xl overflow-hidden cursor-pointer bg-[#EFECE3] border border-[#E3DEC3] shadow-xs hover:shadow-xl transition-all duration-300"
          >
            <img
              src={img}
              alt={`${producerName} foto ${idx + 1}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="w-10 h-10 rounded-full bg-white/90 text-[#1A3323] flex items-center justify-center shadow-lg">
                <Maximize2 className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-6 right-6 text-white/80 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors z-20"
          >
            <X className="w-6 h-6" />
          </button>

          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-20"
          >
            <ChevronLeft className="w-8 h-8" />
          </button>

          <div className="max-w-4xl max-h-[85vh] p-2 flex flex-col items-center justify-center space-y-3">
            <img
              src={images[activeImageIndex]}
              alt=""
              className="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <span className="text-xs text-[#E3DCCE] font-serif">
              {producerName} • Fotografía {activeImageIndex + 1} de {images.length}
            </span>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors z-20"
          >
            <ChevronRight className="w-8 h-8" />
          </button>
        </div>
      )}
    </div>
  );
};