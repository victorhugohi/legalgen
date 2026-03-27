export default function Footer() {
  return (
    <footer className="bg-[var(--color-primary-dark)] text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center font-bold text-[var(--color-primary-dark)] text-sm">
                LG
              </div>
              <span className="text-white font-bold">LegalGen Bolivia</span>
            </div>
            <p className="text-sm">
              Generador de contratos legales para Bolivia. Documentos
              profesionales basados en la legislación boliviana vigente.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Contratos Populares</h3>
            <ul className="space-y-2 text-sm">
              <li>Contrato de Alquiler</li>
              <li>Contrato de Compraventa</li>
              <li>Contrato de Trabajo</li>
              <li>Contrato de Anticrético</li>
              <li>Contrato de Préstamo</li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-3">Aviso Legal</h3>
            <p className="text-sm">
              Los documentos generados son modelos referenciales basados en la
              legislación boliviana. Se recomienda la revisión por un profesional
              abogado antes de su uso formal. Para validez legal completa,
              algunos contratos requieren protocolización notarial.
            </p>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} LegalGen Bolivia. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
