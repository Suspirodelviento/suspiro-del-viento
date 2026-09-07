const Contacto = () => {
  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">Contacto</h1>
      <p className="text-center text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
        Nos encantaría saber de ti. Escríbenos para consultas, visitas o simplemente para compartir una copa de vino.
      </p>
      <div className="max-w-md mx-auto mt-12 text-center space-y-8">
        <div>
          <p className="font-sans uppercase tracking-widest">Email</p>
          <a href="mailto:juli.suspirodelviento@gmail.com" className="text-xl hover:text-primary transition-colors">juli.suspirodelviento@gmail.com</a>
          <br />
          <a href="mailto:emi.suspirodelviento@gmail.com" className="text-xl hover:text-primary transition-colors">emi.suspirodelviento@gmail.com</a>
        </div>
        <div>
          <p className="font-sans uppercase tracking-widest">Teléfono</p>
          <a href="tel:2622657364" className="text-xl hover:text-primary transition-colors">2622657364</a>
        </div>
        <div>
          <p className="font-sans uppercase tracking-widest">Instagram</p>
          <a href="https://www.instagram.com/suspirodelviento_/?hl=en" target="_blank" rel="noopener noreferrer" className="text-xl hover:text-primary transition-colors">@suspirodelviento_</a>
        </div>
      </div>
    </div>
  );
};

export default Contacto;
