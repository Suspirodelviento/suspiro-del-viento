import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Leaf, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { showSuccess } from '../utils/toast';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      showSuccess('Subscribed to the Living Terroir Journal!');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-[#1A3323] text-[#F4F1EA] rounded-3xl p-8 sm:p-12 border border-[#2B523A] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -right-16 -bottom-16 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
              <Leaf className="w-4 h-4" /> The Living Terroir Journal
            </span>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white leading-tight">
              Stay connected with Mendoza’s seasonal soil cycles.
            </h2>
            <p className="text-xs sm:text-sm text-[#C8BFB0] leading-relaxed max-w-xl">
              Receive our monthly astronomical planting guide, notification of micro-batch wine allocations, and invites to biodynamic preparation workshops in Uco Valley.
            </p>
          </div>

          <div className="lg:col-span-5">
            {submitted ? (
              <div className="bg-[#244530] p-4 rounded-2xl border border-[#30593E] text-xs space-y-1 text-[#E3DCCE]">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm">
                  <CheckCircle2 className="w-4 h-4" /> Welcome to BioMendoza Journal
                </div>
                <p>We've sent your first monthly cosmic calendar guide to {email}.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#14261A] border-[#2A4B35] text-white text-xs h-12 rounded-xl placeholder:text-[#887D6B] flex-1"
                  required
                />
                <Button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#b8952b] text-[#14261A] font-bold rounded-xl h-12 px-6 text-xs shrink-0 shadow-md"
                >
                  Subscribe <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </form>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
};