import { Button } from "@/components/ui/button";
import AnimatedImage from "@/components/AnimatedImage";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center text-center bg-cover bg-center"
               style={{ backgroundImage: "url('/images/hero/01.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white px-4 flex flex-col items-center">
          <img src="/images/hero-logo-white.png" alt="Suspiro del Viento" className="w-4/5 max-w-2xl md:max-w-3xl" />
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl font-bold">Nuestra historia</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Somos Suspiro del Viento que llega desde el Oeste, pequeña bodega artesanal del Valle de Uco, formada a partir de la amistad de Juli y Emi, dos amigos unidos por la pasión que nos genera hacer vinos. Nuestra búsqueda es la revalorización de las variedades Criollas Argentinas en Valle de Uco.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <AnimatedImage src="/images/history/01.jpg" alt="Historia de la bodega" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Elaboraciones Ancestrales Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-center font-serif text-4xl font-bold mb-12">Elaboraciones Ancestrales</h2>
          <div className="grid grid-cols-1 md:grid-cols-5 items-center justify-items-center gap-8 text-center">
            <div className="md:col-span-2">
                <h3 className="font-serif text-3xl mb-4">VIÑA</h3>
                <AnimatedImage src="/images/hero/02.jpg" alt="Viña" className="w-full h-auto object-cover rounded-lg shadow-lg"/>
            </div>
            <div className="text-2xl font-serif text-muted-foreground transform rotate-90 md:rotate-0">↓</div>
            <div>
                <h3 className="font-serif text-3xl mb-4">HOMBRE</h3>
                <AnimatedImage src="/images/history/02.jpg" alt="Hombre" className="w-full h-auto object-cover rounded-lg shadow-lg"/>
            </div>
            <div className="text-2xl font-serif text-muted-foreground transform rotate-90 md:rotate-0">↓</div>
            <div className="md:col-span-1">
                <h3 className="font-serif text-3xl mb-4">VINO</h3>
                <AnimatedImage src="/images/winemaking/01.jpg" alt="Elaboración del vino" className="w-full h-auto object-cover rounded-lg shadow-lg"/>
            </div>
          </div>
        </div>
      </section>

      {/* Our Wines Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-4xl font-bold">Nuestros Vinos</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            La línea “Vino Fino de Mesa” busca devolver las Criollas a todas las mesas argentinas, su lugar natural, con vinos frescos, honestos y de buena calidad.
          </p>
          <div className="mt-12">
            <AnimatedImage src="/images/home/nuestros-vinos.jpg" alt="Nuestros Vinos" className="w-full max-w-4xl mx-auto h-auto object-contain" />
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="relative py-32 md:py-48 bg-cover bg-center" style={{ backgroundImage: "url('/images/vineyard/01.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white text-center px-4">
          <p className="font-serif text-3xl md:text-4xl font-bold">Valle de Uco</p>
          <p className="font-serif text-2xl md:text-3xl">Mendoza</p>
          <Button asChild variant="secondary" className="mt-8">
            <Link to="/tienda">DESCUBRIR LOS VINOS</Link>
          </Button>
        </div>
      </section>
    </>
  );
};

export default Index;
