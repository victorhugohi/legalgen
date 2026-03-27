"use client";

import { useState } from "react";
import { ContractType, ContractField } from "@/lib/contracts/types";
import { generateContractText } from "@/lib/contracts/templates";
import { generatePDF } from "@/lib/generators/pdf";
import { generateDOCX } from "@/lib/generators/docx";
import { saveAs } from "file-saver";

interface Props {
  contract: ContractType;
}

export default function ContractForm({ contract }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreview = () => {
    const text = generateContractText(contract.id, formData);
    setPreview(text);
    setShowPreview(true);
  };

  const handleDownloadPDF = async (watermark: boolean = false) => {
    setGenerating(true);
    try {
      const text = generateContractText(contract.id, formData);
      const blob = generatePDF(contract.name, text, watermark);
      saveAs(
        blob,
        `${contract.id}_${new Date().toISOString().split("T")[0]}.pdf`
      );
    } finally {
      setGenerating(false);
    }
  };

  const handleDownloadDOCX = async (watermark: boolean = false) => {
    setGenerating(true);
    try {
      const text = generateContractText(contract.id, formData);
      const blob = await generateDOCX(contract.name, text, watermark);
      saveAs(
        blob,
        `${contract.id}_${new Date().toISOString().split("T")[0]}.docx`
      );
    } finally {
      setGenerating(false);
    }
  };

  // Group fields
  const groups: Record<string, ContractField[]> = {};
  for (const field of contract.fields) {
    const group = field.group || "General";
    if (!groups[group]) groups[group] = [];
    groups[group].push(field);
  }

  const renderField = (field: ContractField) => {
    const value = formData[field.name] || "";

    switch (field.type) {
      case "textarea":
        return (
          <div key={field.name} className="col-span-full">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <textarea
              className="input-field min-h-[100px] resize-y"
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            />
            {field.helperText && (
              <p className="text-xs text-gray-500 mt-1">{field.helperText}</p>
            )}
          </div>
        );
      case "select":
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <select
              className="input-field"
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
            >
              <option value="">Seleccionar...</option>
              {field.options?.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            {field.helperText && (
              <p className="text-xs text-gray-500 mt-1">{field.helperText}</p>
            )}
          </div>
        );
      default:
        return (
          <div key={field.name}>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {field.label}
              {field.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            <input
              type={field.type === "currency" ? "number" : field.type}
              className="input-field"
              placeholder={field.placeholder}
              value={value}
              onChange={(e) => handleChange(field.name, e.target.value)}
              required={field.required}
              min={field.type === "currency" || field.type === "number" ? 0 : undefined}
              step={field.type === "currency" ? "0.01" : undefined}
            />
            {field.helperText && (
              <p className="text-xs text-gray-500 mt-1">{field.helperText}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className="space-y-8">
      {/* Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handlePreview();
        }}
      >
        {Object.entries(groups).map(([groupName, fields]) => (
          <div key={groupName} className="mb-8">
            <h3 className="text-lg font-semibold text-[var(--color-primary)] mb-4 pb-2 border-b border-gray-200">
              {groupName}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {fields.map(renderField)}
            </div>
          </div>
        ))}

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <button type="submit" className="btn-primary flex-1 text-center">
            Vista previa del contrato
          </button>
        </div>
      </form>

      {/* Preview Modal */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-bold text-[var(--color-primary)]">
                Vista Previa - {contract.shortName}
              </h2>
              <button
                onClick={() => setShowPreview(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Preview Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="bg-gray-50 rounded-lg p-6 font-mono text-sm whitespace-pre-wrap leading-relaxed">
                {preview}
              </div>
            </div>

            {/* Download Actions */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <p className="text-xs text-gray-500 mb-3 text-center">
                Descarga tu contrato en el formato que prefieras
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleDownloadPDF(false)}
                  disabled={generating}
                  className="btn-primary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  PDF
                </button>
                <button
                  onClick={() => handleDownloadPDF(true)}
                  disabled={generating}
                  className="btn-secondary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  PDF (muestra)
                </button>
                <button
                  onClick={() => handleDownloadDOCX(false)}
                  disabled={generating}
                  className="btn-primary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  Word
                </button>
                <button
                  onClick={() => handleDownloadDOCX(true)}
                  disabled={generating}
                  className="btn-secondary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  Word (muestra)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
