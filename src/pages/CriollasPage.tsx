import AnimatedImage from "@/components/AnimatedImage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import GenealogyTree from "@/components/GenealogyTree";

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

const CriollasPage = () => {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative h-[70vh] w-full flex items-center justify-center text-center bg-cover bg-center"
               style={{ backgroundImage: "url('/images/story/03.jpg')" }}>
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-white px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">Criollas Argentinas</h1>
          <p className="font-serif text-xl md:text-2xl mt-6">
            Las variedades criollas forman parte de la historia profunda de la vitivinicultura argentina. Nacidas en este territorio a partir del encuentro entre antiguas cepas europeas y las nuevas condiciones del continente americano, representan siglos de adaptación, mestizaje, cultura y memoria.
          </p>
        </div>
      </section>

      <div className="container mx-auto py-20 md:py-32 px-4">
        {/* Un Poco de Historia */}
        <section className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold">Un Poco de Historia</h2>
          <div className="space-y-6 text-lg text-muted-foreground mt-8">
            <p>Las uvas criollas son parte de la historia profunda de la vitivinicultura sudamericana. Nacieron a partir de las vides introducidas por los españoles desde el siglo XVI y de los procesos de reproducción, cruzamiento y adaptación que tuvieron lugar durante generaciones en este territorio.</p>
            <p>No son simplemente variedades antiguas: son el resultado de siglos de historia, de circulación de plantas y saberes, y de una relación cada vez más estrecha entre la vid y los paisajes de América.</p>
            <p>Durante siglos, las criollas fueron protagonistas de la vitivinicultura argentina. Estuvieron presentes en los viñedos, en el vino cotidiano y en la construcción de una cultura vitivinícola propia. Sin embargo, con el tiempo, muchas de estas variedades fueron relegadas, asociadas principalmente a la producción de volumen y desplazadas por la expansión de variedades internacionales.</p>
            <p>Hoy, nuestra búsqueda parte de volver a mirarlas. De conocer su historia, comprender su diversidad y descubrir lo que todavía pueden expresar. De revalorizarlas no como una curiosidad del pasado, sino como una parte viva de nuestra identidad vitivinícola.</p>
            <p>Porque creemos que recuperar las criollas también significa recuperar una historia que muchas veces no fue contada.</p>
          </div>
          <div className="mt-12 border-y border-border/50 py-8">
            <p className="font-serif text-3xl md:text-4xl font-bold tracking-tight text-center">NO SON UNA MODA NUEVA.<br/>SON PARTE DE NUESTRA HISTORIA.</p>
          </div>
        </section>

        {/* Origen Section */}
        <section className="py-20 md:py-32">
            <StoryBlock image="/images/story/02.jpg" title="Un Encuentro que Cambió Nuestra Viticultura" imageLeft>
                <p>El origen de las criollas es la historia de un encuentro. Por un lado, las cepas europeas que llegaron a América, principalmente <strong>Listán Prieto</strong> y <strong>Moscatel de Alejandría</strong>. Por otro, un nuevo continente, un nuevo clima y un nuevo suelo.</p>
                <p>A lo largo de los siglos, a través de cruces naturales y espontáneos, estas vides ancestrales dieron lugar a una nueva familia de variedades. Uvas que son, en esencia, el resultado de la adaptación y el mestizaje. Son, en el sentido más profundo, uvas de aquí.</p>
            </StoryBlock>
        </section>

        {/* Árbol Genealógico */}
        <section className="py-20 md:py-32 text-center">
            <h2 className="font-serif text-4xl font-bold">El Árbol de Nuestras Criollas</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">Detrás de cada variedad hay una historia. Un árbol genealógico construido durante siglos de viajes, cruces, adaptación y territorio.</p>
            <div className="mt-12">
              <GenealogyTree />
            </div>
        </section>

        {/* Las Grandes Criollas */}
        <section className="py-20 md:py-32 border-t">
            <h2 className="text-center font-serif text-4xl font-bold mb-12">Las Variedades que Marcaron Nuestra Historia</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center"><h3 className="font-serif text-2xl">Pedro Giménez</h3><p className="text-muted-foreground">Una de las blancas más importantes, hoy en retroceso.</p></div>
                <div className="text-center"><h3 className="font-serif text-2xl">Torrontés Riojano</h3><p className="text-muted-foreground">La insignia blanca de Argentina.</p></div>
                <div className="text-center"><h3 className="font-serif text-2xl">Criolla Grande</h3><p className="text-muted-foreground">Protagonista histórica del viñedo argentino.</p></div>
                <div className="text-center"><h3 className="font-serif text-2xl">Cereza</h3><p className="text-muted-foreground">De gran presencia en la superficie nacional.</p></div>
            </div>
        </section>

        {/* Por qué son importantes */}
        <section className="py-20 md:py-32 text-center max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl font-bold">¿Por Qué Mantenerlas Vivas?</h2>
            <div className="grid md:grid-cols-2 gap-12 mt-12 text-lg">
                <div><h3 className="font-bold mb-2">IDENTIDAD</h3><p className="text-muted-foreground">Forman parte del patrimonio vitivinícola argentino.</p></div>
                <div><h3 className="font-bold mb-2">DIVERSIDAD</h3><p className="text-muted-foreground">Cada variedad es una expresión genética y cultural única.</p></div>
                <div><h3 className="font-bold mb-2">TERRITORIO</h3><p className="text-muted-foreground">Llevan siglos adaptándose a nuestros paisajes y climas.</p></div>
                <div><h3 className="font-bold mb-2">FUTURO</h3><p className="text-muted-foreground">Permiten pensar un vino argentino más diverso y auténtico.</p></div>
            </div>
            <p className="mt-16 font-serif text-2xl">Conservar las criollas no significa mirar hacia atrás. Significa recuperar una parte de nuestra historia para imaginar nuevas posibilidades hacia adelante.</p>
        </section>

        {/* Nuestra Búsqueda */}
        <section className="py-20 md:py-32 border-t">
            <StoryBlock image="/images/story/01.jpg" title="Nuestra Búsqueda">
                <p>Suspiro del Viento nació con la intención de volver a mirar estas variedades. En los viñedos del Valle de Uco encontramos plantas, historias y expresiones que durante mucho tiempo permanecieron fuera del centro de la vitivinicultura argentina.</p>
                <p>Nuestro trabajo busca conocerlas, interpretarlas y darles un nuevo lugar. No buscamos reproducir el pasado. Buscamos descubrir qué pueden decir estas variedades hoy.</p>
            </StoryBlock>
            <p className="text-center font-serif text-3xl md:text-4xl font-bold tracking-tight mt-16">HACER VINO TAMBIÉN PUEDE SER<br/>UNA FORMA DE CONSERVAR LA MEMORIA.</p>
        </section>

        {/* Cierre */}
        <section className="py-20 text-center bg-secondary/30 rounded-lg">
            <h2 className="font-serif text-4xl font-bold">Conocé Nuestra Interpretación</h2>
            <p className="mt-4 text-lg text-muted-foreground">Cada vino es una manera de seguir contando esta historia.</p>
            <div className="mt-8 flex justify-center gap-4">
                <Button asChild><Link to="/tienda">Conocé Nuestros Vinos</Link></Button>
                <Button asChild variant="outline"><Link to="#">Explorá el Árbol Genealógico</Link></Button>
            </div>
        </section>

      </div>
    </div>
  );
};

export default CriollasPage;
