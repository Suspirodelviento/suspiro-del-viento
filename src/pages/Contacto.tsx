const Contacto = () => {
  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">Contacto</h1>
      <p className="text-center text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
        Nos encantaría saber de ti. Escríbenos para consultas, visitas o simplemente para compartir una copa de vino.
      </p>
      <div className="max-w-md mx-auto mt-12 text-center">
        <p className="font-sans uppercase tracking-widest">Email</p>
        <a href="mailto:contacto@suspirodelviento.com" className="text-xl hover:text-primary transition-colors">contacto@suspirodelviento.com</a>
        <p className="font-sans uppercase tracking-widest mt-8">Instagram</p>
        <a href="#" className="text-xl hover:text-primary transition-colors">@suspirodelviento</a>
      </div>
    </div>
  );
};

export default Contacto;
