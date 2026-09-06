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
        <div className="relative z-10 text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl font-bold tracking-tight">
            SUSPIRO DEL VIENTO
          </h1>
          <p className="font-serif text-2xl md:text-3xl mt-4">
            que llega desde el oeste
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center px-4">
          <div className="order-2 md:order-1">
            <h2 className="font-serif text-4xl font-bold">Nuestra historia</h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Somos Suspiro del Viento que llega desde el Oeste, una pequeña bodega artesanal del Valle de Uco, formada a partir de la amistad y la pasión por hacer vinos.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <AnimatedImage src="/images/history/01.jpg" alt="Historia de la bodega" className="w-full h-auto object-cover rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* The Air Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto text-center px-4">
          <h3 className="font-serif text-3xl font-bold mb-4">El Aire</h3>
          <div className="flex justify-center space-x-8 text-muted-foreground font-sans tracking-widest uppercase">
            <span>sueños</span>
            <span>ideas</span>
            <span>imaginación</span>
            <span>creatividad</span>
            <span>posibilidades</span>
          </div>
        </div>
      </section>

      {/* Viña - Hombre - Vino Section */}
      <section className="py-20 md:py-32 bg-background">
        <div className="container mx-auto text-center px-4 grid grid-cols-1 md:grid-cols-5 items-center justify-items-center gap-8">
            <div className="md:col-span-2">
                <AnimatedImage src="/images/hero/02.jpg" alt="Viña" className="w-full h-auto object-cover rounded-lg shadow-lg"/>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-2xl font-serif text-muted-foreground">
                <span>VIÑA</span>
                <span className="transform rotate-90 md:rotate-0">↓</span>
                <span>HOMBRE</span>
                <span className="transform rotate-90 md:rotate-0">↓</span>
                <span>VINO</span>
            </div>
            <div className="md:col-span-2">
                <AnimatedImage src="/images/winemaking/01.jpg" alt="Elaboración del vino" className="w-full h-auto object-cover rounded-lg shadow-lg"/>
            </div>
        </div>
      </section>

      {/* Our Wines Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-center font-serif text-4xl font-bold">Nuestros Vinos</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Una línea que captura la esencia de nuestros comienzos, la amistad y el trabajo artesanal.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mt-12 items-center">
              <AnimatedImage src="/images/wines/atardecer.png" alt="Vino Atardecer" className="w-full h-auto object-contain p-4" />
              <AnimatedImage src="/images/wines/divaricata.png" alt="Vino Divaricata" className="w-full h-auto object-contain p-4" />
              <AnimatedImage src="/images/wines/rubiginosa.png" alt="Vino Rubiginosa" className="w-full h-auto object-contain p-4" />
          </div>
          <div className="text-center mt-12">
            <Button asChild>
                <Link to="/tienda">Ver la colección</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Final Section */}
      <section className="relative py-32 md:py-48 bg-cover bg-center" style={{ backgroundImage: "url('/images/vineyard/01.jpg')" }}>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-white text-center px-4">
          <p className="font-serif text-2xl md:text-3xl">Tunuyán</p>
          <p className="font-serif text-3xl md:text-4xl font-bold">Valle de Uco</p>
          <p className="font-serif text-2xl md:text-3xl">Mendoza</p>
          <Button variant="secondary" className="mt-8">DESCUBRIR LOS VINOS</Button>
        </div>
      </section>
    </>
  );
};

export default Index;
