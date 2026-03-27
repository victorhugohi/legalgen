import ContractCard from "@/components/ContractCard";
import { CONTRACT_TYPES, CATEGORIES } from "@/lib/contracts/types";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
            Genera Contratos Legales
            <br />
            <span className="text-[var(--color-accent)]">para Bolivia</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
            Crea contratos profesionales basados en la legislación boliviana.
            Compraventa, alquiler, trabajo, anticrético y más. Descarga en PDF o
            Word.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contratos"
              className="bg-[var(--color-accent)] text-[var(--color-primary-dark)] px-8 py-3 rounded-lg font-semibold hover:bg-[var(--color-accent-light)] transition-colors text-center"
            >
              Ver contratos disponibles
            </a>
            <a
              href="#como-funciona"
              className="border-2 border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors text-center"
            >
              ¿Cómo funciona?
            </a>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="como-funciona" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Elige tu contrato",
                desc: "Selecciona el tipo de contrato que necesitas de nuestra lista de modelos bolivianos.",
              },
              {
                step: "2",
                title: "Completa los datos",
                desc: "Llena el formulario con los datos de las partes, montos, plazos y condiciones.",
              },
              {
                step: "3",
                title: "Descarga tu documento",
                desc: "Obtén tu contrato en PDF o Word, listo para imprimir, firmar y notarizar.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-[var(--color-primary)] text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contracts by Category */}
      <section id="contratos" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Contratos Disponibles
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Todos nuestros modelos están basados en la legislación boliviana
            vigente: Código Civil, Código de Comercio, Ley General del Trabajo y
            normativa complementaria.
          </p>

          {(
            Object.keys(CATEGORIES) as Array<keyof typeof CATEGORIES>
          ).map((catKey) => {
            const cat = CATEGORIES[catKey];
            const contracts = CONTRACT_TYPES.filter(
              (c) => c.category === catKey
            );
            if (contracts.length === 0) return null;

            return (
              <div key={catKey} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl">{cat.icon}</span>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {cat.label}
                    </h3>
                    <p className="text-sm text-gray-500">{cat.description}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {contracts.map((contract) => (
                    <ContractCard key={contract.id} contract={contract} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pricing */}
      <section id="precios" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 mb-4">
            Planes y Precios
          </h2>
          <p className="text-center text-gray-600 mb-12">
            Comienza gratis y accede a más contratos cuando lo necesites.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="card p-8 border-2 border-gray-200">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Plan Gratuito
                </h3>
                <div className="text-4xl font-bold text-[var(--color-primary)]">
                  Bs. 0
                </div>
                <p className="text-gray-500 text-sm mt-1">por semana</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "3 contratos básicos por semana",
                  "3 contratos con marca de agua por semana",
                  "Descarga en PDF y Word",
                  "Todos los tipos de contrato",
                  "Solo necesitas tu email",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <a
                href="#contratos"
                className="btn-secondary block text-center w-full"
              >
                Comenzar gratis
              </a>
            </div>

            {/* Premium Plan */}
            <div className="card p-8 border-2 border-[var(--color-accent)] relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[var(--color-accent)] text-[var(--color-primary-dark)] text-xs font-bold px-4 py-1 rounded-full">
                RECOMENDADO
              </div>
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Plan Premium
                </h3>
                <div className="text-4xl font-bold text-[var(--color-primary)]">
                  Bs. 50
                </div>
                <p className="text-gray-500 text-sm mt-1">por semana</p>
              </div>
              <ul className="space-y-3 mb-8">
                {[
                  "Contratos ilimitados",
                  "Sin marca de agua",
                  "Descarga en PDF y Word",
                  "Todos los tipos de contrato",
                  "Soporte prioritario",
                  "Contratos personalizados",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-500 mt-0.5 shrink-0"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    <span className="text-gray-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <button className="btn-primary block text-center w-full">
                Obtener código de acceso
              </button>
              <p className="text-xs text-gray-500 text-center mt-3">
                Deposita en cuenta bancaria y envía tu comprobante por WhatsApp
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Legal Disclaimer */}
      <section className="py-8 bg-gray-100 border-t">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-xs text-gray-500">
            <strong>Aviso Legal:</strong> Los contratos generados por LegalGen
            Bolivia son modelos referenciales basados en la legislación boliviana
            vigente (Código Civil, Código de Comercio, Ley General del Trabajo).
            Se recomienda la revisión por un abogado antes de su uso formal.
            Para validez legal completa, algunos contratos requieren
            protocolización ante Notario de Fe Pública. LegalGen no sustituye el
            asesoramiento legal profesional.
          </p>
        </div>
      </section>
    </div>
  );
}
