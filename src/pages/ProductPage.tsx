import { useState } from "react";
import { useParams } from "react-router-dom";
import { useWineStore } from "../store/wineStore";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

const ProductPage = () => {
  const { id } = useParams<{ id: string }>();
  const wines = useWineStore((state) => state.wines);
  const addToCart = useWineStore((state) => state.addToCart);
  const wine = wines.find((w) => w.id === id);

  const [format, setFormat] = useState<"bottle" | "box">("bottle");

  if (!wine) {
    return <div>Vino no encontrado</div>;
  }

  const handleAddToCart = () => {
    addToCart(wine, format === "box");
    toast({
      title: "Producto añadido",
      description: `${wine.name} (${format === 'box' ? 'Caja de 6' : 'Botella'}) fue añadido al carrito.`,
    })
  };

  const price = format === 'box' ? wine.price * 6 * 0.9 : wine.price; // 10% discount on boxes

  return (
    <div className="container mx-auto py-20 md:py-32 px-4">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          <img src={wine.image} alt={wine.name} className="w-full h-auto object-cover rounded-lg shadow-lg" />
        </div>
        <div>
          <p className="font-sans uppercase tracking-widest text-sm text-muted-foreground">{wine.line}</p>
          <h1 className="font-serif text-4xl font-bold mt-2">{wine.name}</h1>
          <p className="text-2xl font-bold mt-4">${price.toLocaleString('es-AR')}</p>
          
          <div className="mt-6">
            <p className="font-sans uppercase tracking-widest text-sm text-muted-foreground">Formato</p>
            <RadioGroup defaultValue="bottle" onValueChange={(value) => setFormat(value as any)} className="mt-2">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bottle" id="bottle" />
                <Label htmlFor="bottle">Botella</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="box" id="box" />
                <Label htmlFor="box">Caja de 6 (10% off)</Label>
              </div>
            </RadioGroup>
          </div>

          <Button onClick={handleAddToCart} className="mt-8 w-full md:w-auto">Añadir al Carrito</Button>

          <div className="mt-12 space-y-6 border-t border-border/50 pt-8">
            <div>
              <h3 className="font-sans uppercase tracking-widest text-sm text-muted-foreground">Descripción</h3>
              <p className="mt-2">{wine.description}</p>
            </div>
            <div>
              <h3 className="font-sans uppercase tracking-widest text-sm text-muted-foreground">Notas de Cata</h3>
              <p className="mt-2">{wine.tastingNotes}</p>
            </div>
            <div>
              <h3 className="font-sans uppercase tracking-widest text-sm text-muted-foreground">Maridaje</h3>
              <p className="mt-2">{wine.pairing}</p>
            </div>
            <div>
              <h3 className="font-sans uppercase tracking-widest text-sm text-muted-foreground">Terroir</h3>
              <p className="mt-2">{wine.soil}, {wine.altitude}.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
