import { jsPDF } from "jspdf";

export function generatePDF(
  title: string,
  content: string,
  watermark: boolean = false
): Blob {
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginLeft = 25;
  const marginRight = 25;
  const marginTop = 30;
  const marginBottom = 25;
  const usableWidth = pageWidth - marginLeft - marginRight;

  const addHeader = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text("LegalGen Bolivia - Generador de Contratos Legales", marginLeft, 15);
    doc.text(`Página ${pageNum}`, pageWidth - marginRight, 15, { align: "right" });
    doc.setDrawColor(200);
    doc.line(marginLeft, 18, pageWidth - marginRight, 18);
  };

  const addFooter = () => {
    doc.setFontSize(7);
    doc.setTextColor(150);
    doc.text(
      "Documento generado por LegalGen Bolivia - www.legalgen.bo - Este documento es un modelo referencial",
      pageWidth / 2,
      pageHeight - 10,
      { align: "center" }
    );
  };

  const addWatermark = () => {
    if (!watermark) return;
    doc.setFontSize(50);
    doc.setTextColor(220, 220, 220);
    const centerX = pageWidth / 2;
    const centerY = pageHeight / 2;

    // Simple centered watermark (no rotation for type compatibility)
    doc.text("MUESTRA", centerX, centerY - 10, { align: "center" });
    doc.text("LEGALGEN", centerX, centerY + 15, { align: "center" });
  };

  let pageNum = 1;
  addHeader(pageNum);
  addWatermark();

  // Title
  doc.setFontSize(14);
  doc.setTextColor(30, 58, 95); // Primary color
  doc.setFont("helvetica", "bold");
  const titleLines = doc.splitTextToSize(title, usableWidth);
  let y = marginTop + 5;
  doc.text(titleLines, pageWidth / 2, y, { align: "center" });
  y += titleLines.length * 7 + 10;

  // Divider line
  doc.setDrawColor(30, 58, 95);
  doc.setLineWidth(0.5);
  doc.line(marginLeft, y, pageWidth - marginRight, y);
  y += 10;

  // Body text
  doc.setFontSize(10);
  doc.setTextColor(40);
  doc.setFont("helvetica", "normal");

  const lines = content.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    // Check for clause headers (CLÁUSULA)
    const isClause = /^CLÁUSULA/.test(trimmed);
    const isSignatureLine = trimmed.startsWith("_____");
    const isEmpty = trimmed === "";

    if (isClause) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(30, 58, 95);
    } else if (isSignatureLine) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40);
    } else {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40);
    }

    if (isEmpty) {
      y += 4;
    } else {
      const wrappedLines = doc.splitTextToSize(trimmed, usableWidth);
      for (const wl of wrappedLines) {
        if (y > pageHeight - marginBottom) {
          addFooter();
          doc.addPage();
          pageNum++;
          addHeader(pageNum);
          addWatermark();
          y = marginTop + 5;
        }
        doc.text(wl, marginLeft, y);
        y += 5;
      }
    }
  }

  addFooter();

  return doc.output("blob");
}
