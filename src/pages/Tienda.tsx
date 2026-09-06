import { useWineStore } from "../store/wineStore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Tienda = () => {
  const wines = useWineStore((state) => state.wines);

  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <h1 className="font-serif text-4xl md:text-5xl font-bold text-center">Tienda</h1>
      <p className="text-center text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">
        Lleva a tu casa un pedazo de nuestro sueño. Aquí puedes encontrar las creaciones de Suspiro del Viento.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {wines.map((wine) => (
          <div key={wine.id} className="border border-border/50 rounded-lg p-4 text-center group">
            <Link to={`/producto/${wine.slug}`}>
              <div className="overflow-hidden rounded-md mb-4">
                <img src={wine.image} alt={wine.name} className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" />
              </div>
              <h3 className="font-serif text-xl font-semibold">{wine.name}</h3>
              <p className="text-muted-foreground text-sm">{wine.line}</p>
              <p className="font-bold text-lg mt-2">${wine.price.toLocaleString('es-AR')}</p>
            </Link>
            <Button asChild className="mt-4">
              <Link to={`/producto/${wine.slug}`}>Ver Detalles</Link>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tienda;
