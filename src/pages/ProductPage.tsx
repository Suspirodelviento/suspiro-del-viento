import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useWineStore } from "@/store/wineStore";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import AnimatedImage from "@/components/AnimatedImage";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { wines, addToCart } = useWineStore();
  const wine = wines.find((w) => w.slug === slug);
  const otherWines = wines.filter(w => w.line === wine?.line && w.slug !== slug);

  const [quantity, setQuantity] = useState(1);
  const [format, setFormat] = useState<"bottle" | "box">("bottle");

  if (!wine) {
    return <div className="text-center py-40">Vino no encontrado</div>;
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
        addToCart(wine, format === 'box');
    }
    toast({
      title: "Producto añadido",
      description: `${quantity} x ${wine.name} (${format === 'box' ? 'Caja de 6' : 'Botella'}) fue añadido al carrito.`,
    })
  };

  const price = format === 'box' ? wine.price * 6 * 0.9 : wine.price;

  return (
    <div className="container mx-auto py-20 md:py-24 px-4">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-start">
        <div className="text-center">
          <AnimatedImage src={wine.image} alt={wine.name} className="w-full h-auto object-contain max-h-[70vh]" />
        </div>
        <div className="pt-10">
          <p className="font-sans uppercase tracking-widest text-sm text-muted-foreground">{wine.line}</p>
          <h1 className="font-serif text-4xl lg:text-5xl font-bold mt-2">{wine.name}</h1>
          <p className="text-2xl font-bold mt-4">${price.toLocaleString('es-AR')}</p>
          
          <p className="text-lg mt-6 text-muted-foreground">{wine.shortDescription}</p>

          <div className="mt-8 border-t pt-8 space-y-4">
             <div>
                <h3 className="font-sans uppercase tracking-widest text-sm text-foreground">Origen</h3>
                <p className="text-muted-foreground mt-1">{wine.region}, {wine.province}, Argentina</p>
            </div>
             <div>
                <h3 className="font-sans uppercase tracking-widest text-sm text-foreground">Variedad</h3>
                <p className="text-muted-foreground mt-1">{wine.variety} | {wine.vintage}</p>
            </div>
          </div>

          <div className="mt-6">
            <p className="font-sans uppercase tracking-widest text-sm text-foreground">Formato</p>
            <RadioGroup defaultValue="bottle" onValueChange={(value) => setFormat(value as any)} className="mt-2 flex space-x-4">
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

          <div className="mt-8 flex items-center space-x-4">
            <input 
              type="number" 
              min="1" 
              value={quantity} 
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
              className="w-20 text-center border rounded-md py-2"
            />
            <Button onClick={handleAddToCart} className="w-full">AGREGAR AL CARRITO</Button>
          </div>
        </div>
      </div>

      <div className="mt-24 md:mt-32 border-t">
        <h2 className="text-center font-serif text-3xl font-bold my-12">Otros vinos de la colección</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {otherWines.map(otherWine => (
            <Link to={`/producto/${otherWine.slug}`} key={otherWine.id} className="group text-center">
              <div className="overflow-hidden bg-secondary/30 rounded-lg">
                <AnimatedImage src={otherWine.image} alt={otherWine.name} className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-500 ease-in-out p-8" style={{maxHeight: '400px'}} />
              </div>
              <div className="mt-4">
                <h3 className="font-serif text-xl font-semibold">{otherWine.name}</h3>
                <p className="text-muted-foreground text-sm">{otherWine.variety}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
