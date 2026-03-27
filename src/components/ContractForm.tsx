"use client";

import { useState, useEffect } from "react";
import { ContractType, ContractField } from "@/lib/contracts/types";
import { generateContractText } from "@/lib/contracts/templates";
import { generatePDF } from "@/lib/generators/pdf";
import { generateDOCX } from "@/lib/generators/docx";
import { saveAs } from "file-saver";
import {
  getUsageLimits,
  canDownload,
  recordDownload,
  setUserEmail,
  getUserEmail,
  isAdmin,
  activateAdmin,
  UsageLimits,
} from "@/lib/usage";

interface Props {
  contract: ContractType;
}

export default function ContractForm({ contract }: Props) {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState<string>("");
  const [showPreview, setShowPreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSaved, setEmailSaved] = useState(false);
  const [limits, setLimits] = useState<UsageLimits | null>(null);
  const [downloadError, setDownloadError] = useState("");
  const [adminMode, setAdminMode] = useState(false);
  const [adminInput, setAdminInput] = useState("");
  const [showAdminInput, setShowAdminInput] = useState(false);

  useEffect(() => {
    const savedEmail = getUserEmail();
    if (savedEmail) {
      setEmail(savedEmail);
      setEmailSaved(true);
    }
    setAdminMode(isAdmin());
    setLimits(getUsageLimits());
  }, []);

  const handleSaveEmail = () => {
    if (!email.includes("@")) return;
    setUserEmail(email);
    setEmailSaved(true);
    setLimits(getUsageLimits());
  };

  const handleAdminActivate = () => {
    if (activateAdmin(adminInput)) {
      setAdminMode(true);
      setShowAdminInput(false);
      setAdminInput("");
      setLimits(getUsageLimits());
    } else {
      setDownloadError("Código de administrador inválido");
      setTimeout(() => setDownloadError(""), 3000);
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePreview = () => {
    const text = generateContractText(contract.id, formData);
    setPreview(text);
    setShowPreview(true);
    setDownloadError("");
  };

  const handleDownload = async (
    format: "pdf" | "docx",
    watermark: boolean
  ) => {
    if (!emailSaved) {
      setDownloadError("Por favor ingresa tu email primero.");
      return;
    }

    const type = watermark ? "watermark" : "basic";

    if (!canDownload(type)) {
      setDownloadError(
        watermark
          ? "Has alcanzado el límite de 3 contratos con marca de agua esta semana. Obtén un código de acceso para contratos ilimitados."
          : "Has alcanzado el límite de 3 contratos básicos esta semana. Puedes descargar con marca de agua o obtener un código de acceso."
      );
      return;
    }

    setGenerating(true);
    setDownloadError("");

    try {
      const text = generateContractText(contract.id, formData);
      const filename = `${contract.id}_${new Date().toISOString().split("T")[0]}`;

      if (format === "pdf") {
        const blob = generatePDF(contract.name, text, watermark);
        saveAs(blob, `${filename}.pdf`);
      } else {
        const blob = await generateDOCX(contract.name, text, watermark);
        saveAs(blob, `${filename}.docx`);
      }

      recordDownload(type);
      setLimits(getUsageLimits());
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
              min={
                field.type === "currency" || field.type === "number"
                  ? 0
                  : undefined
              }
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
      {/* Email + Usage Bar */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        {!emailSaved ? (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingresa tu email para comenzar
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                className="input-field flex-1"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSaveEmail()}
              />
              <button
                onClick={handleSaveEmail}
                className="btn-primary whitespace-nowrap"
              >
                Continuar
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">
                {email}
              </span>
              {adminMode && (
                <span className="bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full font-bold">
                  ADMIN
                </span>
              )}
              <button
                onClick={() => { setEmailSaved(false); setEmail(""); }}
                className="text-xs text-blue-600 hover:underline"
              >
                Cambiar
              </button>
            </div>
            {limits && !adminMode && (
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <span>
                  Básicos:{" "}
                  <strong className={limits.basicRemaining === 0 ? "text-red-600" : "text-green-600"}>
                    {limits.basicRemaining}/3
                  </strong>
                </span>
                <span>
                  Con marca:{" "}
                  <strong className={limits.watermarkRemaining === 0 ? "text-red-600" : "text-green-600"}>
                    {limits.watermarkRemaining}/3
                  </strong>
                </span>
                <span className="text-gray-400">esta semana</span>
              </div>
            )}
            {adminMode && (
              <span className="text-xs text-purple-600 font-medium">
                Acceso ilimitado
              </span>
            )}
          </div>
        )}

        {/* Admin code input */}
        {emailSaved && !adminMode && (
          <div className="mt-2 pt-2 border-t border-blue-200">
            {!showAdminInput ? (
              <button
                onClick={() => setShowAdminInput(true)}
                className="text-xs text-gray-500 hover:text-gray-700"
              >
                ¿Tienes un código de acceso?
              </button>
            ) : (
              <div className="flex gap-2">
                <input
                  type="text"
                  className="input-field flex-1 text-sm py-2"
                  placeholder="Ingresa tu código de acceso"
                  value={adminInput}
                  onChange={(e) => setAdminInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleAdminActivate()}
                />
                <button
                  onClick={handleAdminActivate}
                  className="btn-primary text-sm py-2 px-4"
                >
                  Activar
                </button>
                <button
                  onClick={() => { setShowAdminInput(false); setAdminInput(""); }}
                  className="text-sm text-gray-500 hover:text-gray-700 px-2"
                >
                  Cancelar
                </button>
              </div>
            )}
          </div>
        )}
      </div>

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

            {/* Error Message */}
            {downloadError && (
              <div className="mx-4 mt-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                {downloadError}
              </div>
            )}

            {/* Download Actions */}
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <p className="text-xs text-gray-500 mb-3 text-center">
                {adminMode
                  ? "Modo administrador — descargas ilimitadas"
                  : "Descarga tu contrato en el formato que prefieras"}
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <button
                  onClick={() => handleDownload("pdf", false)}
                  disabled={generating || (!adminMode && !canDownload("basic"))}
                  className="btn-primary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  PDF
                  {!adminMode && limits && (
                    <span className="block text-[10px] opacity-75">
                      ({limits.basicRemaining} restantes)
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleDownload("pdf", true)}
                  disabled={generating || (!adminMode && !canDownload("watermark"))}
                  className="btn-secondary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  PDF (muestra)
                  {!adminMode && limits && (
                    <span className="block text-[10px] opacity-75">
                      ({limits.watermarkRemaining} restantes)
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleDownload("docx", false)}
                  disabled={generating || (!adminMode && !canDownload("basic"))}
                  className="btn-primary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  Word
                  {!adminMode && limits && (
                    <span className="block text-[10px] opacity-75">
                      ({limits.basicRemaining} restantes)
                    </span>
                  )}
                </button>
                <button
                  onClick={() => handleDownload("docx", true)}
                  disabled={generating || (!adminMode && !canDownload("watermark"))}
                  className="btn-secondary text-sm py-2 px-3 text-center disabled:opacity-50"
                >
                  Word (muestra)
                  {!adminMode && limits && (
                    <span className="block text-[10px] opacity-75">
                      ({limits.watermarkRemaining} restantes)
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
