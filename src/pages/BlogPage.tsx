import React from 'react';
import { EDU_ARTICLES } from '../data/mockData';
import { BookOpen, Calendar, User, Clock, ArrowRight } from 'lucide-react';

export const BlogPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3 py-1 rounded-full inline-flex items-center gap-1">
          <BookOpen className="w-3.5 h-3.5" /> Living Terroir Journal
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1A3323]">
          Stories, Harvests & Philosophy
        </h1>
        <p className="text-xs sm:text-base text-[#625846] leading-relaxed">
          In-depth articles exploring seasonality, soil restoration, mountain gastronomy, and interviews with Mendoza growers.
        </p>
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {EDU_ARTICLES.map((article) => (
          <article
            key={article.id}
            className="bg-white border border-[#E3DEC3] rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="aspect-16/10 overflow-hidden bg-[#EFECE3]">
                <img src={article.image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-[11px] text-[#786D58]">
                  <span className="bg-[#EFF4EC] text-[#284933] font-bold px-2.5 py-0.5 rounded-full">
                    {article.category}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {article.readTime}</span>
                </div>

                <h3 className="font-serif font-bold text-xl text-[#1A3323] hover:text-[#C85A32] cursor-pointer transition-colors">
                  {article.title}
                </h3>

                <p className="text-xs text-[#524B3B] leading-relaxed">
                  {article.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0">
              <div className="pt-4 border-t border-[#F0ECE1] flex items-center justify-between text-xs text-[#8A7E68]">
                <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {article.author}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" /> {article.date}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

    </div>
  );
};