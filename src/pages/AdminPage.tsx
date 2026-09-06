import { useEffect, useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { LogOut, PackagePlus, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/contexts/SessionContext";
import { useWineStore } from "@/store/wineStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";

interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  collection: string;
  variety: string;
  vintage: number;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  featured: boolean;
}

const emptyProduct = {
  slug: "",
  name: "",
  collection: "VINO FINO DE MESA",
  variety: "",
  vintage: new Date().getFullYear(),
  description: "",
  price: 0,
  stock: 0,
  active: true,
  featured: false,
  imageUrl: "",
};

const AdminPage = () => {
  const { session, loading, isAdmin, signOut } = useSession();
  const refreshPublicCatalog = useWineStore((state) => state.fetchProducts);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [newProduct, setNewProduct] = useState(emptyProduct);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);

  const loadProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("id, slug, name, collection, variety, vintage, description, price, stock, active, featured")
      .order("created_at", { ascending: true });

    if (error) {
      toast({ title: "No pudimos cargar los productos", description: error.message, variant: "destructive" });
      return;
    }
    setProducts((data ?? []).map((product) => ({ ...product, price: Number(product.price) })));
  };

  useEffect(() => {
    if (isAdmin) void loadProducts();
  }, [isAdmin]);

  if (loading) {
    return <div className="min-h-[70vh] grid place-items-center text-sm uppercase tracking-[0.22em] text-muted-foreground">Verificando acceso</div>;
  }

  if (!session) {
    return (
      <section className="min-h-[75vh] px-5 py-20">
        <div className="mx-auto max-w-md rounded-[2rem] border border-border/70 bg-card p-7 sm:p-10">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Administración</p>
          <h1 className="mt-3 font-serif text-4xl">Acceso a la bodega</h1>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">Ingresá con la cuenta administrativa para gestionar catálogo y disponibilidad.</p>
          <div className="mt-8">
            <Auth
              supabaseClient={supabase}
              providers={[]}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: "#6B2737",
                      brandAccent: "#51202b",
                      inputBackground: "#fffdf8",
                    },
                    radii: { borderRadiusButton: "999px", inputBorderRadius: "12px" },
                  },
                },
              }}
              theme="light"
              view="sign_in"
              showLinks={false}
            />
          </div>
        </div>
      </section>
    );
  }

  if (!isAdmin) {
    return (
      <section className="min-h-[70vh] grid place-items-center px-5 text-center">
        <div className="max-w-lg">
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Acceso restringido</p>
          <h1 className="mt-4 font-serif text-4xl">Esta cuenta no es administradora</h1>
          <p className="mt-4 text-muted-foreground">El rol administrativo debe asignarse de forma segura en los metadatos del usuario.</p>
          <Button variant="outline" className="mt-8 rounded-full" onClick={() => void signOut()}>
            <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
          </Button>
        </div>
      </section>
    );
  }

  const updateProduct = (id: string, patch: Partial<AdminProduct>) => {
    setProducts((current) => current.map((product) => (product.id === id ? { ...product, ...patch } : product)));
  };

  const saveProduct = async (product: AdminProduct) => {
    setSavingId(product.id);
    const { error } = await supabase
      .from("products")
      .update({
        name: product.name,
        collection: product.collection,
        variety: product.variety,
        vintage: product.vintage,
        description: product.description,
        price: product.price,
        stock: product.stock,
        active: product.active,
        featured: product.featured,
      })
      .eq("id", product.id);
    setSavingId(null);

    if (error) {
      toast({ title: "No pudimos guardar el producto", description: error.message, variant: "destructive" });
      return;
    }
    await refreshPublicCatalog();
    toast({ title: "Producto actualizado", description: `${product.name} ya refleja los nuevos datos.` });
  };

  const createProduct = async (event: React.FormEvent) => {
    event.preventDefault();
    setCreating(true);
    const { imageUrl, ...productData } = newProduct;
    const { data, error } = await supabase.from("products").insert(productData).select("id").single();

    if (error) {
      setCreating(false);
      toast({ title: "No pudimos crear el producto", description: error.message, variant: "destructive" });
      return;
    }

    if (imageUrl.trim()) {
      const { error: imageError } = await supabase.from("product_images").insert({
        product_id: data.id,
        image_url: imageUrl.trim(),
        position: 0,
      });
      if (imageError) {
        await supabase.from("products").delete().eq("id", data.id);
        setCreating(false);
        toast({ title: "No pudimos guardar la imagen", description: imageError.message, variant: "destructive" });
        return;
      }
    }

    setNewProduct(emptyProduct);
    setCreating(false);
    await Promise.all([loadProducts(), refreshPublicCatalog()]);
    toast({ title: "Producto creado", description: "El nuevo vino ya forma parte del catálogo." });
  };

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="flex flex-col gap-6 border-b border-border/70 pb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-primary">Administración</p>
          <h1 className="mt-3 font-serif text-5xl">Catálogo de vinos</h1>
          <p className="mt-3 text-muted-foreground">Productos, precios y disponibilidad en un solo lugar.</p>
        </div>
        <Button variant="outline" className="self-start rounded-full" onClick={() => void signOut()}>
          <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
        </Button>
      </div>

      <section className="py-12">
        <div className="mb-7 flex items-center gap-3">
          <PackagePlus className="h-5 w-5 text-primary" />
          <h2 className="font-serif text-3xl">Agregar un vino</h2>
        </div>
        <form onSubmit={createProduct} className="grid gap-5 rounded-[2rem] bg-secondary/35 p-6 sm:grid-cols-2 lg:grid-cols-4 lg:p-8">
          <div className="space-y-2"><Label>Nombre</Label><Input required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} /></div>
          <div className="space-y-2"><Label>Slug</Label><Input required pattern="[a-z0-9-]+" value={newProduct.slug} onChange={(e) => setNewProduct({ ...newProduct, slug: e.target.value.toLowerCase() })} /></div>
          <div className="space-y-2"><Label>Línea</Label><Input required value={newProduct.collection} onChange={(e) => setNewProduct({ ...newProduct, collection: e.target.value })} /></div>
          <div className="space-y-2"><Label>Variedad</Label><Input required value={newProduct.variety} onChange={(e) => setNewProduct({ ...newProduct, variety: e.target.value })} /></div>
          <div className="space-y-2"><Label>Añada</Label><Input required type="number" value={newProduct.vintage} onChange={(e) => setNewProduct({ ...newProduct, vintage: Number(e.target.value) })} /></div>
          <div className="space-y-2"><Label>Precio</Label><Input required min="0" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })} /></div>
          <div className="space-y-2"><Label>Stock</Label><Input required min="0" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })} /></div>
          <div className="space-y-2"><Label>URL de imagen</Label><Input value={newProduct.imageUrl} placeholder="/images/wines/..." onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} /></div>
          <div className="space-y-2 sm:col-span-2 lg:col-span-3"><Label>Descripción</Label><Textarea required value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} /></div>
          <div className="flex items-end"><Button disabled={creating} className="w-full rounded-full">{creating ? "Creando…" : "Agregar producto"}</Button></div>
        </form>
      </section>

      <section className="space-y-5 border-t border-border/70 pt-12">
        {products.map((product) => (
          <article key={product.id} className="rounded-[2rem] border border-border/70 bg-card p-6 lg:p-8">
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
              <div className="space-y-2 lg:col-span-2"><Label>Nombre</Label><Input value={product.name} onChange={(e) => updateProduct(product.id, { name: e.target.value })} /></div>
              <div className="space-y-2 lg:col-span-2"><Label>Línea</Label><Input value={product.collection} onChange={(e) => updateProduct(product.id, { collection: e.target.value })} /></div>
              <div className="space-y-2"><Label>Variedad</Label><Input value={product.variety} onChange={(e) => updateProduct(product.id, { variety: e.target.value })} /></div>
              <div className="space-y-2"><Label>Añada</Label><Input type="number" value={product.vintage} onChange={(e) => updateProduct(product.id, { vintage: Number(e.target.value) })} /></div>
              <div className="space-y-2"><Label>Precio</Label><Input min="0" type="number" value={product.price} onChange={(e) => updateProduct(product.id, { price: Number(e.target.value) })} /></div>
              <div className="space-y-2"><Label>Stock</Label><Input min="0" type="number" value={product.stock} onChange={(e) => updateProduct(product.id, { stock: Number(e.target.value) })} /></div>
              <div className="flex items-center gap-3 pt-7"><Switch checked={product.active} onCheckedChange={(active) => updateProduct(product.id, { active })} /><Label>Activo</Label></div>
              <div className="flex items-center gap-3 pt-7"><Switch checked={product.featured} onCheckedChange={(featured) => updateProduct(product.id, { featured })} /><Label>Destacado</Label></div>
              <div className="space-y-2 md:col-span-2 lg:col-span-5"><Label>Descripción</Label><Textarea value={product.description} onChange={(e) => updateProduct(product.id, { description: e.target.value })} /></div>
              <div className="flex items-end"><Button className="w-full rounded-full" disabled={savingId === product.id} onClick={() => void saveProduct(product)}><Save className="mr-2 h-4 w-4" />{savingId === product.id ? "Guardando…" : "Guardar"}</Button></div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default AdminPage;
