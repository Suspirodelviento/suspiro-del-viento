import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Producer } from '../types';
import { MapPin, Award, ArrowRight, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

// Custom Map Marker Icon using SVG
const createCustomIcon = (isSelected: boolean) => {
  const color = isSelected ? '#C85A32' : '#1A3323';
  const stroke = '#D4AF37';
  
  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="32" height="48">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 9 12 24 12 24s12-15 12-24c0-6.63-5.37-12-12-12z" fill="${color}" stroke="${stroke}" stroke-width="2"/>
      <circle cx="12" cy="12" r="5" fill="#D4AF37"/>
    </svg>
  `;

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: svgString,
    iconSize: [32, 48],
    iconAnchor: [16, 48],
    popupAnchor: [0, -42],
  });
};

interface ProducerMapProps {
  producers: Producer[];
  selectedProducerId?: string;
  onSelectProducer?: (producer: Producer) => void;
}

// Controller component to re-center map when selection changes
const MapRecenter: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  React.useEffect(() => {
    map.flyTo(center, zoom, { duration: 1.2 });
  }, [center, zoom, map]);
  return null;
};

export const ProducerMap: React.FC<ProducerMapProps> = ({
  producers,
  selectedProducerId,
  onSelectProducer,
}) => {
  const mendozaCenter: [number, number] = [-33.4, -69.0]; // Central coordinates for Mendoza wine region
  const [activeRegion, setActiveRegion] = useState<string>('All');

  const filteredProducers = producers.filter(
    (p) => activeRegion === 'All' || p.region === activeRegion
  );

  const selectedProducer = producers.find((p) => p.id === selectedProducerId);
  const mapCenter: [number, number] = selectedProducer
    ? [selectedProducer.coordinates.lat, selectedProducer.coordinates.lng]
    : mendozaCenter;

  const regions = ['All', 'Valle de Uco', 'Luján de Cuyo', 'Maipú', 'San Rafael'];

  return (
    <div className="bg-white border border-[#E3DEC3] rounded-3xl overflow-hidden shadow-md flex flex-col space-y-0">
      
      {/* Map Header / Filters */}
      <div className="p-5 bg-[#1A3323] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-1.5">
            <MapPin className="w-4 h-4" /> Mapa de Terruños en Mendoza
          </span>
          <h3 className="font-serif font-bold text-xl text-white mt-0.5">
            Ubicación Geográfica de las Fincas
          </h3>
        </div>

        {/* Region Pills */}
        <div className="flex flex-wrap gap-2">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setActiveRegion(reg)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                activeRegion === reg
                  ? 'bg-[#D4AF37] text-[#1A3323] shadow-sm'
                  : 'bg-[#284933] text-white hover:bg-[#345c41]'
              }`}
            >
              {reg === 'All' ? 'Todas las Regiones' : reg}
            </button>
          ))}
        </div>
      </div>

      {/* Leaflet Container */}
      <div className="h-[420px] w-full relative z-0 bg-[#F2EFE8]">
        <MapContainer
          center={mapCenter}
          zoom={9}
          scrollWheelZoom={false}
          className="h-full w-full z-0"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapRecenter center={mapCenter} zoom={selectedProducer ? 11 : 9} />

          {filteredProducers.map((producer) => {
            const isSelected = producer.id === selectedProducerId;
            return (
              <Marker
                key={producer.id}
                position={[producer.coordinates.lat, producer.coordinates.lng]}
                icon={createCustomIcon(isSelected)}
                eventHandlers={{
                  click: () => onSelectProducer && onSelectProducer(producer),
                }}
              >
                <Popup className="producer-custom-popup">
                  <div className="p-1 space-y-2 max-w-[220px]">
                    <img
                      src={producer.heroImage}
                      alt={producer.name}
                      className="w-full h-24 object-cover rounded-xl"
                    />
                    <div>
                      <span className="text-[10px] font-bold text-[#284933] bg-[#EFF4EC] px-2 py-0.5 rounded uppercase">
                        {producer.region}
                      </span>
                      <h4 className="font-serif font-bold text-sm text-[#1A3323] mt-1 leading-snug">
                        {producer.name}
                      </h4>
                      <p className="text-[11px] text-[#625846] line-clamp-2 mt-1">
                        {producer.tagline}
                      </p>
                    </div>

                    <div className="pt-1 text-[10px] text-[#1A3323] font-semibold flex items-center justify-between border-t border-gray-200">
                      <span>{producer.sizeHectares} Hectáreas</span>
                      <Link
                        to={`/producers/${producer.id}`}
                        className="text-[#C85A32] font-bold hover:underline flex items-center gap-0.5"
                      >
                        Ver Finca <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>

      {/* Footer Info */}
      <div className="p-4 bg-[#FAF7F0] border-t border-[#E3DEC3] text-xs text-[#625846] flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="flex items-center gap-1.5 font-medium text-[#1A3323]">
          <ShieldCheck className="w-4 h-4 text-[#284933]" /> {filteredProducers.length} fincas biodinámicas mapeadas en Cuyo
        </span>
        <span className="text-[11px] text-[#786D58]">
          Hacé clic en los marcadores dorados para explorar la finca.
        </span>
      </div>

    </div>
  );
};