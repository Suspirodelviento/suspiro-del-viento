import { useEffect } from "react";
import { useWineStore } from "@/store/wineStore";

const CatalogLoader = () => {
  const fetchProducts = useWineStore((state) => state.fetchProducts);

  useEffect(() => {
    void fetchProducts();
  }, [fetchProducts]);

  return null;
};

export default CatalogLoader;
