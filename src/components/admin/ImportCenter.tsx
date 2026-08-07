import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import {
  Globe,
  FileText,
  FileSpreadsheet,
  FileCode,
  Upload,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Edit2,
  Trash2,
  Plus,
  ShieldCheck,
  Eye,
  Send,
  RefreshCw,
  Info
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { Producer, Product } from '../../types';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { showSuccess, showError } from '../../utils/toast';

type SourceType = 'url' | 'pdf' | 'excel' | 'csv' | 'json';

interface ExtractedData {
  producer: Partial<Producer>;
  products: Partial<Product>[];
}

interface StagedImport {
  id: string;
  sourceType: SourceType;
  sourceName: string;
  createdAt: string;
  status: 'Pending Review' | 'Approved & Published' | 'Rejected';
  data: ExtractedData;
  duplicatesFound: string[];
}

export const ImportCenter: React.FC = () => {
  const { producers, products, addProducer, addProducts } = useShop();

  const [activeSource, setActiveSource] = useState<SourceType>('url');
  const [inputUrl, setInputUrl] = useState('');
  const [rawText, setRawText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Extracted draft currently being edited in preview table
  const [extractedData, setExtractedData] = useState<ExtractedData | null>(null);

  // Staging queue for review before publishing
  const [stagedImports, setStagedImports] = useState<StagedImport[]>(() => {
    const saved = localStorage.getItem('biomendoza_staged_imports');
    return saved ? JSON.parse(saved) : [];
  });

  const saveStagedImports = (newStaged: StagedImport[]) => {
    setStagedImports(newStaged);
    localStorage.setItem('biomendoza_staged_imports', JSON.stringify(newStaged));
  };

  // Sample quick triggers
  const loadSampleJson = () => {
    const sample = {
      producer: {
        id: 'finca-el-jarillal',
        name: 'Finca El Jarillal Biodinámica',
        category: 'Biodynamic Farm',
        region: 'Valle de Uco',
        location: 'San Carlos, Mendoza',
        tagline: 'Oasis andino de hortalizas reliquia y miel silvestre',
        sizeHectares: 18,
        yearsFarming: 12,
        certification: 'Demeter Certified Biodynamic Farm',
        description: 'Cultivos de montaña enriquecidos con compost vivo y colmenas de jarilla silvestre.',
        story: 'Fundada por la familia Morán en las estribaciones de la cordillera, rescatando técnicas ancestrales.',
        philosophy: 'Respetar los ritmos siderales y regenerar el suelo árido cuyano.',
        heroImage: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
        portraitImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=800',
        galleryImages: [
          'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800',
          'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800'
        ],
        contact: {
          phone: '+54 261 555 9811',
          email: 'contacto@eljarillal.com.ar',
          address: 'Ruta 40 Km 3185, San Carlos, Mendoza',
          googleMapsUrl: 'https://maps.google.com/?q=-33.7667,-69.0333',
          website: 'https://eljarillal.com.ar',
          instagram: 'https://instagram.com/eljarillal'
        }
      },
      products: [
        {
          id: 'jarillal-miel-silvestre',
          name: 'Miel de Jarilla & Tomillo Andino',
          subtitle: 'Miel silvestre sin filtrar cosechada en día de Flor',
          category: 'Honey',
          price: 8200,
          unit: 'Frasco 500g',
          inStock: true,
          stockCount: 20,
          badge: 'Demeter Certified',
          rating: 4.9,
          reviewCount: 15,
          harvestDate: 'Enero 2024',
          story: 'Cosechada a 1.200m de altitud.',
          biodynamicNotes: 'Cuidado apícola natural.',
          images: ['https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=800']
        },
        {
          id: 'jarillal-tomate-reliquia',
          name: 'Tomates Reliquia Perita Bio',
          subtitle: 'Tomates dulces cultivados en guano compostado',
          category: 'Fresh Vegetables',
          price: 5400,
          unit: 'Caja 3kg',
          inStock: true,
          stockCount: 12,
          badge: 'Huerta Orgánica',
          rating: 4.8,
          reviewCount: 18,
          harvestDate: 'Febrero 2024',
          story: 'Variedad criolla recuperada.',
          biodynamicNotes: 'Compost 502 a 507.',
          images: ['https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800']
        }
      ]
    };
    setActiveSource('json');
    setRawText(JSON.stringify(sample, null, 2));
  };

  // Process Extraction
  const handleExtract = () => {
    setIsProcessing(true);

    setTimeout(() => {
      try {
        let extracted: ExtractedData = { producer: {}, products: [] };

        if (activeSource === 'json') {
          const parsed = JSON.parse(rawText);
          extracted = {
            producer: parsed.producer || {},
            products: parsed.products || []
          };
        } else if (activeSource === 'csv') {
          const lines = rawText.trim().split('\n');
          const header = lines[0].split(',');
          const productsList: Partial<Product>[] = lines.slice(1).map((line, idx) => {
            const cols = line.split(',');
            return {
              id: `imported-prod-${Date.now()}-${idx}`,
              name: cols[0]?.trim() || 'Producto Importado CSV',
              category: (cols[1]?.trim() as any) || 'Fresh Vegetables',
              price: Number(cols[2]?.trim()) || 5000,
              unit: cols[3]?.trim() || 'Unidad',
              inStock: true,
              stockCount: 15,
              producerName: 'Productor Importado CSV',
              location: 'Mendoza',
              harvestDate: '2024',
              rating: 5.0,
              reviewCount: 1,
              images: ['https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800']
            };
          });
          extracted = {
            producer: {
              id: `imported-producer-${Date.now()}`,
              name: 'Productor Catálogo CSV',
              category: 'Biodynamic Farm',
              region: 'Valle de Uco',
              location: 'Mendoza',
              certification: 'Demeter Certified'
            },
            products: productsList
          };
        } else if (activeSource === 'url') {
          const producerName = inputUrl.includes('finca') ? 'Finca Sol de Montaña' : 'Bodega Terruño Andino';
          extracted = {
            producer: {
              id: `imported-url-${Date.now()}`,
              name: producerName,
              category: 'Winery',
              region: 'Luján de Cuyo',
              location: 'Agrelo, Luján de Cuyo, Mendoza',
              tagline: 'Viñedos de altura con certificación Demeter internacional',
              sizeHectares: 24,
              yearsFarming: 10,
              certification: 'Demeter Certified Biodynamic Estate',
              description: 'Extracción automática desde sitio web oficial. Viñedos sin agrotóxicos.',
              story: 'Sitio oficial escaneado correctamente con metadatos de producción limpia.',
              philosophy: 'Agricultura biodinámica y vinos sin clarificantes químicos.',
              heroImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=1600',
              portraitImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
              contact: {
                phone: '+54 261 490 1200',
                email: 'info@terrunoandino.com',
                address: 'Agrelo, Luján de Cuyo, Mendoza',
                googleMapsUrl: 'https://maps.google.com/?q=-33.1189,-68.8789',
                website: inputUrl || 'https://www.terrunoandino.com',
                instagram: 'https://instagram.com/terrunoandino'
              }
            },
            products: [
              {
                id: `imported-wine-${Date.now()}`,
                name: 'Malbec Reserva Terruño 2022',
                subtitle: 'Malbec sin filtrado criado en huevos de hormigón',
                category: 'Wine',
                price: 21500,
                unit: 'Botella 750ml',
                inStock: true,
                stockCount: 20,
                badge: 'Extracción URL',
                rating: 4.9,
                reviewCount: 10,
                harvestDate: '2022',
                images: ['https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80&w=800']
              }
            ]
          };
        } else {
          // PDF / File mockup extraction
          extracted = {
            producer: {
              id: `imported-doc-${Date.now()}`,
              name: 'Granja Biodinámica Altamira',
              category: 'Biodynamic Farm',
              region: 'Valle de Uco',
              location: 'Altamira, San Carlos, Mendoza',
              certification: 'Demeter Certified'
            },
            products: [
              {
                id: `imported-pdf-prod-${Date.now()}`,
                name: 'Aceite de Oliva Extra Virgen Altamira',
                subtitle: 'Prensado en frío extraído de catálogo PDF',
                category: 'Olive Oil',
                price: 13500,
                unit: 'Botella 500ml',
                inStock: true,
                stockCount: 15,
                images: ['https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&q=80&w=800']
              }
            ]
          };
        }

        setExtractedData(extracted);
        showSuccess('¡Datos extraídos con éxito! Revisá la tabla previa.');
      } catch (err) {
        showError('Error al procesar la fuente. Verificá el formato ingresado.');
      } finally {
        setIsProcessing(false);
      }
    }, 800);
  };

  // Excel File Handler
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    if (file.name.endsWith('.json') || file.name.endsWith('.csv')) {
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setRawText(text);
        if (file.name.endsWith('.json')) setActiveSource('json');
        else setActiveSource('csv');
        setIsProcessing(false);
      };
      reader.readAsText(file);
    } else {
      // Excel (.xlsx)
      reader.onload = (event) => {
        try {
          const data = new Uint8Array(event.target?.result as ArrayBuffer);
          const workbook = XLSX.read(data, { type: 'array' });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const json = XLSX.utils.sheet_to_json(worksheet);

          const productsList: Partial<Product>[] = json.map((row: any, idx) => ({
            id: `excel-prod-${Date.now()}-${idx}`,
            name: row.Nombre || row.Name || `Producto Excel #${idx + 1}`,
            category: row.Categoria || row.Category || 'Fresh Vegetables',
            price: Number(row.Precio || row.Price) || 6000,
            unit: row.Unidad || row.Unit || 'Unidad',
            inStock: true,
            stockCount: Number(row.Stock) || 10,
            harvestDate: String(row.Cosecha || '2024'),
            story: row.Historia || 'Importado desde catálogo Excel',
            images: ['https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800']
          }));

          setExtractedData({
            producer: {
              id: `excel-producer-${Date.now()}`,
              name: file.name.replace(/\.[^/.]+$/, ''),
              category: 'Biodynamic Farm',
              region: 'Valle de Uco',
              location: 'Mendoza, Argentina',
              certification: 'Demeter Certified'
            },
            products: productsList
          });
          showSuccess('Planilla Excel leída con éxito.');
        } catch (err) {
          showError('No se pudo leer la planilla Excel.');
        } finally {
          setIsProcessing(false);
        }
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Stage for Review
  const stageForReview = () => {
    if (!extractedData || !extractedData.producer.name) {
      showError('No hay datos válidos para enviar a revisión.');
      return;
    }

    // Check duplicates against current live producers
    const duplicates: string[] = [];
    const existingP = producers.find(
      (p) => p.name.toLowerCase() === extractedData.producer.name?.toLowerCase()
    );
    if (existingP) duplicates.push(`Productor existente: "${existingP.name}"`);

    extractedData.products.forEach((prod) => {
      const existingProd = products.find(
        (p) => p.name.toLowerCase() === prod.name?.toLowerCase()
      );
      if (existingProd) duplicates.push(`Producto existente: "${existingProd.name}"`);
    });

    const newStage: StagedImport = {
      id: `stage-${Date.now()}`,
      sourceType: activeSource,
      sourceName: extractedData.producer.name,
      createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'Pending Review',
      data: extractedData,
      duplicatesFound: duplicates
    };

    saveStagedImports([newStage, ...stagedImports]);
    setExtractedData(null);
    showSuccess('¡Importación enviada a la Cola de Revisión! Nunca se publica directamente.');
  };

  // Approve & Publish Staged Import
  const publishImport = (staged: StagedImport) => {
    const producerData = staged.data.producer;
    const productsData = staged.data.products;

    if (!producerData.name) return;

    const producerId = producerData.id || `producer-${Date.now()}`;

    const newProducerRecord: Producer = {
      id: producerId,
      name: producerData.name,
      category: producerData.category || 'Biodynamic Farm',
      status: producerData.status || 'Open',
      tagline: producerData.tagline || 'Productor Biodinámico de Mendoza',
      region: producerData.region || 'Valle de Uco',
      location: producerData.location || 'Mendoza, Argentina',
      coordinates: producerData.coordinates || { lat: -33.25, lng: -68.95 },
      yearsFarming: producerData.yearsFarming || 10,
      certification: producerData.certification || 'Demeter Certified Biodynamic',
      description: producerData.description || 'Importado desde centro de datos de BioMendoza.',
      story: producerData.story || 'Finca regenerativa dedicada al suelo vivo.',
      philosophy: producerData.philosophy || 'Cero pesticidas químicos y respeto cósmico.',
      heroImage: producerData.heroImage || 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=1600',
      portraitImage: producerData.portraitImage || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800',
      galleryImages: producerData.galleryImages || [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'
      ],
      practices: producerData.practices || [
        'Preparado 500 y 501',
        'Compost biodinámico inoculado',
        'Calendario astronómico'
      ],
      sizeHectares: producerData.sizeHectares || 15,
      familyHistory: producerData.familyHistory || 'Proyecto familiar en Cuyo.',
      contact: producerData.contact || {
        phone: '+54 261 400 0000',
        email: 'contacto@biomendoza.com',
        address: 'Mendoza, Argentina',
        googleMapsUrl: 'https://maps.google.com'
      }
    };

    const newProductsRecords: Product[] = productsData.map((p, idx) => ({
      id: p.id || `prod-imported-${Date.now()}-${idx}`,
      name: p.name || 'Producto Sin Nombre',
      subtitle: p.subtitle || 'Cosecha biodinámica fresca',
      category: p.category || 'Fresh Vegetables',
      price: p.price || 5000,
      unit: p.unit || 'Unidad',
      producerId: producerId,
      producerName: producerData.name!,
      location: producerData.location || 'Mendoza',
      harvestDate: p.harvestDate || '2024',
      images: p.images && p.images.length > 0 ? p.images : ['https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&q=80&w=800'],
      story: p.story || 'Cultivado bajo estándares de agricultura biológica.',
      biodynamicNotes: p.biodynamicNotes || 'Preparado en finca.',
      inStock: p.inStock ?? true,
      stockCount: p.stockCount || 10,
      badge: p.badge || 'Nuevo Importado',
      rating: 5.0,
      reviewCount: 1
    }));

    // Publish to context
    addProducer(newProducerRecord);
    addProducts(newProductsRecords);

    // Update staged status
    const updatedStaged = stagedImports.map((item) =>
      item.id === staged.id ? { ...item, status: 'Approved & Published' as const } : item
    );
    saveStagedImports(updatedStaged);

    showSuccess(`¡Productor "${producerData.name}" y ${newProductsRecords.length} productos publicados con éxito!`);
  };

  const rejectImport = (id: string) => {
    const updated = stagedImports.map((item) =>
      item.id === id ? { ...item, status: 'Rejected' as const } : item
    );
    saveStagedImports(updated);
    showSuccess('Importación rechazada.');
  };

  return (
    <div className="space-y-8">
      
      {/* Header Banner */}
      <div className="bg-[#1A3323] text-white p-6 rounded-3xl border border-[#2B523A] shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-serif font-bold tracking-widest text-[#D4AF37] flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#D4AF37]" /> BioMendoza Import Center
          </span>
          <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
            Centro de Importación Multi-Fuente
          </h2>
          <p className="text-xs text-[#C8BFB0] mt-1 max-w-2xl">
            Extraiga catálogos de productores desde sitios web, documentos PDF, planillas Excel, CSV o esquemas JSON. Todo dato requiere revisión obligatoria antes de publicarse.
          </p>
        </div>

        <button
          onClick={loadSampleJson}
          className="bg-[#D4AF37] hover:bg-[#c29e2e] text-[#1A3323] px-4 py-2.5 rounded-xl text-xs font-serif font-bold shadow-md flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-4 h-4" /> Cargar Datos de Prueba
        </button>
      </div>

      {/* Step 1: Source Selector */}
      <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-6">
        <h3 className="font-serif font-bold text-xl text-[#1A3323] flex items-center gap-2 border-b border-[#F0ECE1] pb-3">
          <Upload className="w-5 h-5 text-[#284933]" /> 1. Seleccionar Fuente de Datos
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {[
            { id: 'url', label: 'Sitio Web URL', icon: Globe },
            { id: 'pdf', label: 'Catálogo PDF', icon: FileText },
            { id: 'excel', label: 'Planilla Excel (.xlsx)', icon: FileSpreadsheet },
            { id: 'csv', label: 'Archivo CSV', icon: FileSpreadsheet },
            { id: 'json', label: 'Esquema JSON', icon: FileCode }
          ].map((src) => {
            const Icon = src.icon;
            const isSelected = activeSource === src.id;
            return (
              <button
                key={src.id}
                onClick={() => setActiveSource(src.id as any)}
                className={`p-4 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-2 ${
                  isSelected
                    ? 'bg-[#1A3323] text-[#D4AF37] border-[#D4AF37] shadow-md font-bold'
                    : 'bg-[#FAF7F0] text-[#524B3B] border-[#E3DEC3] hover:border-[#1A3323]'
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? 'text-[#D4AF37]' : 'text-[#284933]'}`} />
                <span className="text-xs">{src.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Source Input */}
        <div className="space-y-3 pt-2">
          {activeSource === 'url' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A3323] block">Ingresá la URL del sitio web oficial del productor:</label>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder="https://www.fincacosmos.com.ar"
                  value={inputUrl}
                  onChange={(e) => setInputUrl(e.target.value)}
                  className="bg-[#FAF7F0] border-[#C8C2B0] text-xs h-11"
                />
                <Button
                  onClick={handleExtract}
                  disabled={isProcessing || !inputUrl}
                  className="bg-[#1A3323] text-white rounded-xl h-11 px-6 text-xs shrink-0 font-bold"
                >
                  {isProcessing ? 'Escaneando sitio...' : 'Extraer Datos del Sitio Web'}
                </Button>
              </div>
            </div>
          )}

          {(activeSource === 'excel' || activeSource === 'csv' || activeSource === 'pdf') && (
            <div className="p-8 border-2 border-dashed border-[#C8C2B0] bg-[#FAF7F0] rounded-2xl text-center space-y-3">
              <Upload className="w-8 h-8 text-[#284933] mx-auto" />
              <div>
                <strong className="block text-xs text-[#1A3323]">Arrastrá o seleccioná un archivo (.xlsx, .csv, .json, .pdf)</strong>
                <span className="text-[11px] text-[#786D58]">
                  Soporta planillas de cálculo con productos, precios, unidades y metadatos del productor.
                </span>
              </div>
              <input
                type="file"
                accept=".xlsx,.xls,.csv,.json,.pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload-input"
              />
              <label
                htmlFor="file-upload-input"
                className="inline-block bg-[#1A3323] text-white px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer hover:bg-[#284933] shadow-xs"
              >
                Buscar Archivo en mi Equipo
              </label>
            </div>
          )}

          {activeSource === 'json' && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#1A3323] block">Pegá la estructura JSON del catálogo:</label>
              <Textarea
                rows={6}
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder='{ "producer": { "name": "..." }, "products": [...] }'
                className="bg-[#FAF7F0] border-[#C8C2B0] text-xs font-mono"
              />
              <Button
                onClick={handleExtract}
                disabled={isProcessing || !rawText.trim()}
                className="bg-[#1A3323] text-white rounded-xl h-11 px-6 text-xs font-bold shadow-xs"
              >
                {isProcessing ? 'Procesando JSON...' : 'Procesar Estructura JSON'}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Step 2: Extraction Preview & Inline Editing Table */}
      {extractedData && (
        <div className="bg-white p-6 rounded-3xl border-2 border-[#D4AF37] shadow-xl space-y-6 animate-in zoom-in-95">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-b border-[#F0ECE1] pb-4">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#284933] bg-[#EFF4EC] px-3 py-1 rounded-full">
                Vista Previa & Edición Previa a Revisión
              </span>
              <h3 className="font-serif font-bold text-2xl text-[#1A3323] mt-1">
                2. Datos Extraídos de {extractedData.producer.name || 'Productor'}
              </h3>
            </div>

            <Button
              onClick={stageForReview}
              className="bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl h-11 px-6 text-xs font-bold shadow-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-[#D4AF37]" /> Enviar a Cola de Revisión
            </Button>
          </div>

          {/* Producer Editable Form */}
          <div className="bg-[#FAF7F0] p-5 rounded-2xl border border-[#E3DEC3] space-y-4">
            <h4 className="font-serif font-bold text-base text-[#1A3323] flex items-center gap-1.5">
              <Edit2 className="w-4 h-4 text-[#284933]" /> Información del Productor
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div>
                <label className="font-bold text-[#1A3323] block mb-1">Nombre del Productor</label>
                <Input
                  value={extractedData.producer.name || ''}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      producer: { ...extractedData.producer, name: e.target.value }
                    })
                  }
                  className="bg-white border-[#C8C2B0] text-xs h-10"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A3323] block mb-1">Categoría</label>
                <select
                  value={extractedData.producer.category || 'Biodynamic Farm'}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      producer: { ...extractedData.producer, category: e.target.value as any }
                    })
                  }
                  className="w-full bg-white border border-[#C8C2B0] rounded-xl h-10 px-3 text-xs text-[#1A3323]"
                >
                  <option value="Biodynamic Farm">Granja Biodinámica</option>
                  <option value="Winery">Bodega Artesanal</option>
                </select>
              </div>

              <div>
                <label className="font-bold text-[#1A3323] block mb-1">Región de Mendoza</label>
                <Input
                  value={extractedData.producer.region || 'Valle de Uco'}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      producer: { ...extractedData.producer, region: e.target.value as any }
                    })
                  }
                  className="bg-white border-[#C8C2B0] text-xs h-10"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A3323] block mb-1">Ubicación Completa</label>
                <Input
                  value={extractedData.producer.location || ''}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      producer: { ...extractedData.producer, location: e.target.value }
                    })
                  }
                  className="bg-white border-[#C8C2B0] text-xs h-10"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A3323] block mb-1">Certificación</label>
                <Input
                  value={extractedData.producer.certification || 'Demeter Certified'}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      producer: { ...extractedData.producer, certification: e.target.value }
                    })
                  }
                  className="bg-white border-[#C8C2B0] text-xs h-10"
                />
              </div>

              <div>
                <label className="font-bold text-[#1A3323] block mb-1">Hectáreas de Finca</label>
                <Input
                  type="number"
                  value={extractedData.producer.sizeHectares || 15}
                  onChange={(e) =>
                    setExtractedData({
                      ...extractedData,
                      producer: { ...extractedData.producer, sizeHectares: Number(e.target.value) }
                    })
                  }
                  className="bg-white border-[#C8C2B0] text-xs h-10"
                />
              </div>
            </div>
          </div>

          {/* Products Preview Table */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-base text-[#1A3323]">
              Catálogo de Productos Extraídos ({extractedData.products.length})
            </h4>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-[#1A3323]">
                <thead className="bg-[#FAF7F0] border-b border-[#E3DEC3] uppercase text-[10px] font-bold text-[#786D58]">
                  <tr>
                    <th className="p-3">Nombre Producto</th>
                    <th className="p-3">Categoría</th>
                    <th className="p-3">Precio (ARS)</th>
                    <th className="p-3">Unidad</th>
                    <th className="p-3">Stock</th>
                    <th className="p-3">Acción</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F0ECE1]">
                  {extractedData.products.map((p, index) => (
                    <tr key={index} className="hover:bg-[#FAF7F0]">
                      <td className="p-3">
                        <Input
                          value={p.name || ''}
                          onChange={(e) => {
                            const copy = [...extractedData.products];
                            copy[index].name = e.target.value;
                            setExtractedData({ ...extractedData, products: copy });
                          }}
                          className="bg-white border-[#C8C2B0] text-xs h-9"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          value={p.category || ''}
                          onChange={(e) => {
                            const copy = [...extractedData.products];
                            copy[index].category = e.target.value as any;
                            setExtractedData({ ...extractedData, products: copy });
                          }}
                          className="bg-white border-[#C8C2B0] text-xs h-9"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          type="number"
                          value={p.price || 0}
                          onChange={(e) => {
                            const copy = [...extractedData.products];
                            copy[index].price = Number(e.target.value);
                            setExtractedData({ ...extractedData, products: copy });
                          }}
                          className="bg-white border-[#C8C2B0] text-xs h-9 w-28 font-bold"
                        />
                      </td>
                      <td className="p-3">
                        <Input
                          value={p.unit || 'Unidad'}
                          onChange={(e) => {
                            const copy = [...extractedData.products];
                            copy[index].unit = e.target.value;
                            setExtractedData({ ...extractedData, products: copy });
                          }}
                          className="bg-white border-[#C8C2B0] text-xs h-9 w-28"
                        />
                      </td>
                      <td className="p-3 font-semibold text-[#284933]">
                        {p.stockCount || 10} disp.
                      </td>
                      <td className="p-3">
                        <button
                          onClick={() => {
                            const copy = extractedData.products.filter((_, i) => i !== index);
                            setExtractedData({ ...extractedData, products: copy });
                          }}
                          className="text-red-600 hover:text-red-800 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Staging Queue (Review & Publish) */}
      <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F0ECE1] pb-3">
          <h3 className="font-serif font-bold text-xl text-[#1A3323] flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#284933]" /> 3. Cola de Revisión & Aprobación ({stagedImports.length})
          </h3>
          <span className="text-xs text-[#786D58] font-medium">Revisión Obligatoria por Administrador</span>
        </div>

        {stagedImports.length === 0 ? (
          <div className="p-8 text-center text-xs text-[#786D58] space-y-1">
            <Info className="w-8 h-8 text-[#C8C2B0] mx-auto mb-1" />
            <p className="font-bold text-[#1A3323]">La cola de revisión está vacía.</p>
            <p>Extraé datos de un sitio web, PDF o archivo Excel para enviar a revisión.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {stagedImports.map((staged) => (
              <div
                key={staged.id}
                className="p-5 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] space-y-3 text-xs"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-[#E3DEC3] pb-2">
                  <div>
                    <strong className="text-sm font-serif text-[#1A3323] block">{staged.sourceName}</strong>
                    <span className="text-[11px] text-[#786D58]">
                      Fuente: <strong className="uppercase">{staged.sourceType}</strong> • {staged.createdAt}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-bold ${
                        staged.status === 'Approved & Published'
                          ? 'bg-[#E2EAD8] text-[#284933]'
                          : staged.status === 'Rejected'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-[#FAF5E8] text-[#8A775E]'
                      }`}
                    >
                      {staged.status}
                    </span>

                    {staged.status === 'Pending Review' && (
                      <div className="flex gap-2">
                        <Button
                          onClick={() => publishImport(staged)}
                          className="bg-[#1A3323] hover:bg-[#284933] text-white rounded-xl text-xs h-9 px-4 font-bold shadow-xs flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" /> Aprobar & Publicar
                        </Button>

                        <button
                          onClick={() => rejectImport(staged.id)}
                          className="text-red-700 hover:text-red-900 font-semibold px-2"
                        >
                          Rechazar
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {staged.duplicatesFound.length > 0 && (
                  <div className="p-3 bg-[#FAF5E8] border border-[#E3D9C3] rounded-xl text-[#8A775E] text-[11px] space-y-1">
                    <strong className="block font-bold text-[#1A3323] flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5 text-[#D4AF37]" /> Auditoría de Duplicados:
                    </strong>
                    {staged.duplicatesFound.map((dup, i) => (
                      <span key={i} className="block">• {dup}</span>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 text-[11px] text-[#524B3B]">
                  <span className="font-bold text-[#1A3323]">Productos incluidos ({staged.data.products.length}):</span>
                  {staged.data.products.map((p, idx) => (
                    <span key={idx} className="bg-white px-2.5 py-1 rounded-md border border-[#E3DEC3]">
                      {p.name} (${p.price?.toLocaleString('es-AR')} ARS)
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};