import React, { useState } from 'react';
import { Bot, X, Send, Sparkles, MessageCircle, RefreshCw, Leaf } from 'lucide-react';
import { PRODUCTS, PREPARATIONS } from '../data/mockData';
import { useShop } from '../context/ShopContext';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}

export const AIBiodynamicChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setSelectedProductModal } = useShop();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: '¡Hola! I am BioBot, your Mendoza Biodynamic Agriculture Assistant. Ask me anything about Preparation 500, cosmic planting calendars, wine pairings, or what’s fresh today in Mendoza!'
    }
  ]);

  const sampleQuestions = [
    'What is Preparation 500?',
    'Which wine pairs best with root vegetables?',
    'Why is biodynamic food better than standard organic?',
    'What foods are in harvest in Mendoza right now?'
  ];

  const generateAnswer = (query: string): string => {
    const q = query.toLowerCase();

    if (q.includes('500') || q.includes('horn manure') || q.includes('preparation 500')) {
      return 'Preparation 500 (Horn Manure) is the foundation of biodynamic soil vitality. Organic cow manure is buried in cow horns through winter soil. In spring, it is dynamized in water for 1 hour and sprayed on crops at dusk. It creates deep root branching and multiplies beneficial soil microorganisms!';
    }
    if (q.includes('501') || q.includes('silica')) {
      return 'Preparation 501 (Horn Silica) is made from crushed quartz crystal buried in horns over summer. It is sprayed as a fine mist at sunrise to enhance light absorption, sweetness, and aroma in wine grapes and fruits!';
    }
    if (q.includes('wine') || q.includes('pair') || q.includes('malbec')) {
      return 'Our 2022 Single Vineyard Malbec from Finca El Sol pairs magnificently with slow-roasted vegetables, aged cheeses, or braised wild mushrooms! Aged 14 months in neutral concrete without added sulfites.';
    }
    if (q.includes('difference') || q.includes('organic') || q.includes('biodynamic')) {
      return 'While organic farming avoids synthetic chemicals, Biodynamic agriculture goes further: it treats the entire farm as a self-sustaining living ecosystem, uses astronomical lunar timing, and applies natural herbal preparations (500–508) to actively regenerate soil health.';
    }
    if (q.includes('fresh') || q.includes('harvest') || q.includes('season')) {
      return 'Currently in Mendoza: Heirloom Root Vegetables, Raw Mountain Jarilla Honey, Arauco Extra Virgin Olive Oil, and High-Altitude Criolla Apples are at peak lunar freshness!';
    }

    return `That's a fantastic question about biodynamics! BioMendoza works with certified Demeter farms in Uco Valley, Luján, and Maipú. Every product is cultivated without synthetic inputs and in alignment with lunar calendar cycles. Check out our Education section to read full research studies!`;
  };

  const handleSend = (questionText?: string) => {
    const textToSend = questionText || input;
    if (!textToSend.trim()) return;

    const userMsg: Message = { sender: 'user', text: textToSend };
    setMessages((prev) => [...prev, userMsg]);
    if (!questionText) setInput('');

    setTimeout(() => {
      const botReply: Message = { sender: 'bot', text: generateAnswer(textToSend) };
      setMessages((prev) => [...prev, botReply]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-[#1A3323] text-[#F4F1EA] hover:bg-[#284933] px-4 py-3 rounded-full shadow-2xl flex items-center gap-2.5 transition-all hover:scale-105 border-2 border-[#D4AF37]"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-[#D4AF37]" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#C85A32] rounded-full animate-pulse" />
          </div>
          <span className="text-xs font-serif font-bold tracking-wide">Ask BioBot AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-sm sm:max-w-md bg-[#FBF9F5] border border-[#D5CFBE] rounded-3xl shadow-2xl overflow-hidden flex flex-col h-[520px] animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#1A3323] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-serif font-bold text-sm">BioBot Assistant</h4>
                <p className="text-[10px] text-[#C8BFB0] flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Expert on Mendoza Biodynamics
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 text-gray-300 hover:text-white rounded-full hover:bg-[#284933]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F4F1EA]">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 text-xs leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-[#1A3323] text-white rounded-br-none shadow-sm'
                      : 'bg-white text-[#1A3323] border border-[#E3DEC3] rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompts */}
          <div className="p-2 bg-[#EFECE3] border-t border-[#E3DEC3] flex flex-wrap gap-1">
            {sampleQuestions.slice(0, 2).map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-[10px] bg-white text-[#1A3323] hover:bg-[#1A3323] hover:text-white px-2.5 py-1 rounded-full border border-[#D8D2C0] transition-colors truncate max-w-full"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-[#E3DEC3] flex items-center gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about preparations, pairings, or farms..."
              className="bg-[#FBF9F5] border-[#D8D2C0] text-xs h-10 flex-1 rounded-xl"
            />
            <Button
              type="submit"
              className="bg-[#1A3323] text-white rounded-xl h-10 w-10 p-0 flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" />
            </Button>
          </form>

        </div>
      )}
    </>
  );
};