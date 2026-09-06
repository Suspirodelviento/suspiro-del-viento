import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ShippingZone {
  zone: string;
  cost: number;
  timeEstimate: string;
  minBottles?: number;
}

const ZONES: Record<string, ShippingZone> = {
  VALLE_DE_UCO: { zone: "Valle de Uco", cost: 0, timeEstimate: "24-48hs" },
  GRAN_MENDOZA: { zone: "Gran Mendoza", cost: 6000, timeEstimate: "48-72hs" },
  RESTO_MENDOZA: { zone: "Resto de Mendoza", cost: 10000, timeEstimate: "3-5 días" },
  RESTO_ARGENTINA: { zone: "Resto de Argentina", cost: 20000, timeEstimate: "5-10 días", minBottles: 6 },
};

const getShippingZone = (province: string, city: string): ShippingZone => {
  const normalizedProvince = province.trim().toLowerCase();
  const normalizedCity = city.trim().toLowerCase();

  if (normalizedProvince.includes("mendoza")) {
    if (["tunuyán", "tupungato", "san carlos"].some(loc => normalizedCity.includes(loc))) {
      return ZONES.VALLE_DE_UCO;
    }
    if (["ciudad de mendoza", "godoy cruz", "guaymallén", "las heras", "luján de cuyo", "maipú"].some(loc => normalizedCity.includes(loc))) {
      return ZONES.GRAN_MENDOZA;
    }
    return ZONES.RESTO_MENDOZA;
  }
  return ZONES.RESTO_ARGENTINA;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { province, city } = await req.json();
    const zoneInfo = getShippingZone(province, city);

    return new Response(JSON.stringify(zoneInfo), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Error al calcular el envío" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
