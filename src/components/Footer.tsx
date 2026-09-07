import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-secondary/50">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4 md:px-6 py-12 text-center md:text-left">
        <div className="flex flex-col items-center md:items-start">
          <h3 className="font-serif text-lg font-semibold">Suspiro del Viento</h3>
          <p className="text-sm text-muted-foreground mt-2">Tunuyán, Valle de Uco, Mendoza</p>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-sans text-sm uppercase tracking-widest text-foreground/80">Navegación</h4>
          <ul className="mt-4 space-y-2">
            <li><Link to="/vinos" className="text-sm hover:text-primary">Vinos</Link></li>
            <li><Link to="/historia" className="text-sm hover:text-primary">Historia</Link></li>
            <li><Link to="/lugar" className="text-sm hover:text-primary">El Lugar</Link></li>
            <li><Link to="/tienda" className="text-sm hover:text-primary">Tienda</Link></li>
            <li><Link to="/contacto" className="text-sm hover:text-primary">Contacto</Link></li>
          </ul>
        </div>
        <div className="flex flex-col items-center md:items-start">
          <h4 className="font-sans text-sm uppercase tracking-widest text-foreground/80">Contacto</h4>
          <ul className="mt-4 space-y-2">
            <li><a href="https://www.instagram.com/suspirodelviento_/?hl=en" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-primary">Instagram</a></li>
            <li><a href="mailto:juli.suspirodelviento@gmail.com" className="text-sm hover:text-primary">Email</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/50 py-6">
        <p className="text-center text-xs text-muted-foreground">&copy; {new Date().getFullYear()} Suspiro del Viento. Todos los derechos reservados.</p>
      </div>
    </footer>
  )
}

export default Footer
