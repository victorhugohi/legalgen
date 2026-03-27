import { notFound } from "next/navigation";
import Link from "next/link";
import { CONTRACT_TYPES, getContractById } from "@/lib/contracts/types";
import ContractForm from "@/components/ContractForm";

interface PageProps {
  params: Promise<{ tipo: string }>;
}

export async function generateStaticParams() {
  return CONTRACT_TYPES.map((c) => ({ tipo: c.id }));
}

export async function generateMetadata({ params }: PageProps) {
  const { tipo } = await params;
  const contract = getContractById(tipo);
  if (!contract) return { title: "Contrato no encontrado" };
  return {
    title: `${contract.name} - LegalGen Bolivia`,
    description: contract.description,
  };
}

export default async function GenerarContratoPage({ params }: PageProps) {
  const { tipo } = await params;
  const contract = getContractById(tipo);

  if (!contract) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="hover:text-[var(--color-primary)]">
              Inicio
            </Link>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <Link
              href="/#contratos"
              className="hover:text-[var(--color-primary)]"
            >
              Contratos
            </Link>
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-900 font-medium">
              {contract.shortName}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contract Header */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex items-start gap-4">
            <span className="text-4xl">{contract.icon}</span>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {contract.name}
                </h1>
                {contract.tier === "free" ? (
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                    Gratis
                  </span>
                ) : (
                  <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
                    Premium
                  </span>
                )}
              </div>
              <p className="text-gray-600 mb-2">{contract.description}</p>
              <p className="text-xs text-gray-400">
                Base legal: {contract.legalBasis}
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Complete los datos del contrato
          </h2>
          <ContractForm contract={contract} />
        </div>

        {/* Legal Notice */}
        <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-xs text-amber-800">
            <strong>Nota:</strong> Este documento es un modelo referencial
            basado en la legislación boliviana vigente ({contract.legalBasis}).
            Se recomienda la revisión por un profesional abogado antes de su uso
            formal. Para validez legal completa, considere la protocolización
            ante Notario de Fe Pública.
          </p>
        </div>
      </div>
    </div>
  );
}
