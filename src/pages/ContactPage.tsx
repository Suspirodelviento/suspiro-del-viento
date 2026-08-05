import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, MessageSquare } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { showSuccess } from '../utils/toast';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Consulta de Pedidos',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    showSuccess('¡Mensaje enviado con éxito! Te responderemos en breve.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="text-xs uppercase font-bold tracking-widest text-[#284933] bg-[#E2EAD8] px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5" /> Atención Personalizada
        </span>
        <h1 className="font-serif font-bold text-4xl sm:text-6xl text-[#1A3323]">
          Contactate con BioMendoza
        </h1>
        <p className="text-sm sm:text-base text-[#625846] leading-relaxed">
          ¿Tenés dudas sobre las zonas de entrega, quieres programar una visita a las fincas en el Valle de Uco o sumar tu finca biodinámica? Estamos a tu disposición.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Contact Info Side */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#1A3323] text-white p-8 rounded-3xl border border-[#2B523A] shadow-xl space-y-6">
            <h3 className="font-serif font-bold text-2xl text-white">
              Sede Central Mendoza
            </h3>
            <p className="text-xs text-[#C8BFB0] leading-relaxed">
              Atendemos consultas de consumidores, restaurantes conscientes y sommeliers de lunes a sábados.
            </p>

            <div className="space-y-4 text-xs text-[#E3DCCE]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Oficina & Centro de Distribución:</strong>
                  <span>Av. Arístides Villanueva 420, Mendoza Capital, Argentina</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Atención por WhatsApp / Teléfono:</strong>
                  <span>+54 261 555 3912</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Correo Electrónico:</strong>
                  <span>contacto@biomendoza.com</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-white font-bold">Horarios de Atención:</strong>
                  <span>Lunes a Viernes: 08:30 a 19:30 hs <br /> Sábados: 09:00 a 14:00 hs</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#EFF4EC] p-6 rounded-3xl border border-[#C8DAC0] text-xs text-[#1A3323] space-y-2">
            <strong className="block font-serif font-bold text-base">
              ¿Sos Productor Biodinámico en Cuyo?
            </strong>
            <p className="text-[#524B3B] leading-relaxed">
              Si contás con certificación Demeter o estás en proceso de transición agroecológica en Mendoza o San Juan, queremos conocer tu finca.
            </p>
          </div>
        </div>

        {/* Form Side */}
        <div className="lg:col-span-7 bg-white p-8 sm:p-10 rounded-3xl border border-[#E3DEC3] shadow-xs">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-[#EFF4EC] text-[#284933] rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8 text-[#D4AF37]" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-[#1A3323]">¡Mensaje Recibido!</h3>
              <p className="text-xs text-[#625846] max-w-md mx-auto">
                Gracias por escribirnos. Un integrante del equipo de BioMendoza te responderá al correo ingresado en menos de 24 horas hábiles.
              </p>
              <Button
                onClick={() => setSubmitted(false)}
                className="bg-[#1A3323] text-white rounded-xl text-xs px-6 h-10 mt-2"
              >
                Enviar Otro Mensaje
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="font-serif font-bold text-2xl text-[#1A3323] mb-4">
                Envianos tu Consulta
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1A3323] block mb-1">Nombre Completo</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Martín Soler"
                    className="bg-[#FBF9F5] border-[#C8C2B0] text-xs h-11"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1A3323] block mb-1">Correo Electrónico</label>
                  <Input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="martin@ejemplo.com"
                    className="bg-[#FBF9F5] border-[#C8C2B0] text-xs h-11"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#1A3323] block mb-1">Teléfono / WhatsApp</label>
                  <Input
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+54 261..."
                    className="bg-[#FBF9F5] border-[#C8C2B0] text-xs h-11"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#1A3323] block mb-1">Motivo de Contacto</label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FBF9F5] border border-[#C8C2B0] rounded-xl text-xs h-11 px-3 text-[#1A3323] focus:outline-none"
                  >
                    <option value="Consulta de Pedidos">Consulta de Pedidos y Envíos</option>
                    <option value="Restaurantes y Sommeliers">Ventas a Restaurantes y Sommeliers</option>
                    <option value="Visitas a Fincas">Visitas a Fincas en Valle de Uco</option>
                    <option value="Unirme como Productor">Unirme como Productor Biodinámico</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#1A3323] block mb-1">Mensaje</label>
                <Textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Escribí aquí tu mensaje..."
                  className="bg-[#FBF9F5] border-[#C8C2B0] text-xs min-h-[120px]"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl h-12 text-xs font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4 text-[#D4AF37]" /> Enviar Mensaje
              </Button>
            </form>
          )}
        </div>

      </div>

    </div>
  );
};