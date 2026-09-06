import { useWineStore } from "@/store/wineStore";
import { Link } from "react-router-dom";
import AnimatedImage from "@/components/AnimatedImage";

const VinoFinoDeMesaPage = () => {
  const wines = useWineStore((state) => state.wines).filter(w => w.line === 'VINO FINO DE MESA');

  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="font-serif text-4xl md:text-5xl font-bold">Vino Fino de Mesa</h1>
        <p className="text-lg text-muted-foreground mt-4">
          Nuestra primera línea, un homenaje a la amistad y a la simple alegría de compartir. Vinos francos, directos y llenos de vida, que hablan del sol, la tierra y el viento del Valle de Uco.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mt-20">
        {wines.map((wine) => (
          <Link to={`/producto/${wine.slug}`} key={wine.id} className="group text-center">
            <div className="overflow-hidden">
              <AnimatedImage src={wine.image} alt={wine.name} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out" style={{maxHeight: '500px'}} />
            </div>
            <div className="mt-6">
              <h3 className="font-serif text-2xl font-semibold">{wine.name}</h3>
              <p className="text-muted-foreground">{wine.variety} | {wine.vintage}</p>
              <p className="font-bold text-lg mt-2">${wine.price.toLocaleString('es-AR')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default VinoFinoDeMesaPage;
