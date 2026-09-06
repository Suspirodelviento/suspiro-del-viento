import AnimatedImage from "@/components/AnimatedImage";

const StoryBlock = ({ image, title, children, imageLeft = false }) => (
  <div className={`grid md:grid-cols-2 gap-12 items-center py-12 md:py-20`}>
    <div className={`order-2 ${imageLeft ? 'md:order-2' : 'md:order-1'}`}>
      <h2 className="font-serif text-3xl font-bold mb-4">{title}</h2>
      <div className="space-y-4 text-lg text-muted-foreground">
        {children}
      </div>
    </div>
    <div className={`order-1 ${imageLeft ? 'md:order-1' : 'md:order-2'}`}>
      <AnimatedImage src={image} alt={title} className="w-full h-auto object-cover rounded-lg shadow-lg" />
    </div>
  </div>
);

const Historia = () => {
  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-6xl font-bold">Nuestra Historia</h1>
        <p className="text-xl text-muted-foreground mt-6">
          Suspiro del Viento es el resultado de un viaje, de una amistad y de una profunda conexión con la tierra del Valle de Uco. Es la historia de cómo dos amigos, Juli y Emi, decidieron apostar por un sueño: revalorizar las variedades Criollas Argentinas.
        </p>
      </div>

      <div className="mt-20 md:mt-32">
        <StoryBlock image="/images/story/09.jpg" title="El Comienzo">
          <p>Todo empezó con una pasión compartida por el vino y la tierra. Julián y Emiliano, dos amigos de toda la vida, encontraron en los paisajes de Mendoza la inspiración para un proyecto que fuera más allá de la enología tradicional. Querían contar una historia, la de las uvas que vieron nacer a la viticultura argentina.</p>
        </StoryBlock>

        <StoryBlock image="/images/story/01.jpg" title="La Búsqueda de las Criollas" imageLeft>
          <p>La búsqueda los llevó a viñedos antiguos, a parrales de más de 70 años que habían sido olvidados por la industria. Allí, encontraron un tesoro: variedades criollas que habían resistido el paso del tiempo, uvas con una identidad única y un potencial enorme por redescubrir.</p>
        </StoryBlock>

        <StoryBlock image="/images/story/05.jpg" title="Viña, Hombre, Vino">
          <p>El proyecto se fundamenta en el respeto por este ciclo vital. La viña, con su sabiduría ancestral; el hombre, con su trabajo artesanal y su mínima intervención; y el vino, como la expresión líquida de esa unión. Cada botella es un testimonio de esta filosofía.</p>
        </StoryBlock>

        <StoryBlock image="/images/story/08.jpg" title="Elaboraciones Ancestrales" imageLeft>
          <p>Decidieron volver a las bases, a métodos de elaboración que respetaran la pureza de la uva. Fermentaciones espontáneas, uso de materiales nobles y un enfoque en la expresión del terroir son los pilares de una enología que busca ser honesta y transparente.</p>
        </StoryBlock>

        <StoryBlock image="/images/story/06.jpg" title="Un Equipo, una Familia">
          <p>Lo que comenzó como el sueño de dos amigos, pronto se convirtió en un proyecto colectivo. Suspiro del Viento es hoy una familia de apasionados que comparten la misma visión y el mismo amor por el vino y por el Valle de Uco. Cada vendimia es una celebración de esa unión.</p>
        </StoryBlock>
      </div>
    </div>
  );
};

export default Historia;
