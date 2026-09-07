const Lugar = () => {
  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">El Lugar</h1>
      <div className="my-12 md:my-16">
        <img src="/images/place/map.jpg" alt="Mapa del Valle de Uco" className="w-full h-auto object-contain rounded-lg shadow-md" />
      </div>
      <div className="max-w-3xl mx-auto mt-12 space-y-6 text-lg text-muted-foreground">
        <p>
          Estamos en Tunuyán, corazón del Valle de Uco, una región privilegiada al pie de la Cordillera de los Andes. Nuestros viñedos crecen a más de 1100 metros sobre el nivel del mar, en un suelo aluvial y pedregoso que imprime un carácter único a nuestras uvas.
        </p>
        <p>
          El clima desértico, la gran amplitud térmica y la intensa radiación solar se combinan para crear vinos de gran concentración, color y aromas. Es un terroir extremo y generoso, y nuestro trabajo es interpretarlo con respeto y mínima intervención.
        </p>
      </div>
    </div>
  );
};

export default Lugar;
