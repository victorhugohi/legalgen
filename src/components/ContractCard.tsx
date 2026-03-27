import Link from "next/link";
import { ContractType } from "@/lib/contracts/types";

export default function ContractCard({ contract }: { contract: ContractType }) {
  return (
    <Link href={`/generar/${contract.id}`} className="block group">
      <div className="card p-6 h-full flex flex-col">
        <div className="flex items-start justify-between mb-3">
          <span className="text-3xl">{contract.icon}</span>
          {contract.tier === "premium" && (
            <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full font-medium">
              Premium
            </span>
          )}
          {contract.tier === "free" && (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
              Gratis
            </span>
          )}
        </div>
        <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-[var(--color-primary)] transition-colors">
          {contract.shortName}
        </h3>
        <p className="text-sm text-gray-600 flex-1">{contract.description}</p>
        <div className="mt-4 flex items-center text-sm text-[var(--color-primary)] font-medium">
          Generar contrato
          <svg
            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
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
        </div>
      </div>
    </Link>
  );
}
