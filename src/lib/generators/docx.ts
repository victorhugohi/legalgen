import {
  Document,
  Paragraph,
  TextRun,
  AlignmentType,
  HeadingLevel,
  BorderStyle,
  Footer,
  Header,
  PageNumber,
  Packer,
} from "docx";

export async function generateDOCX(
  title: string,
  content: string,
  watermark: boolean = false
): Promise<Blob> {
  const paragraphs: Paragraph[] = [];

  // Title
  paragraphs.push(
    new Paragraph({
      children: [
        new TextRun({
          text: title,
          bold: true,
          size: 28,
          color: "1E3A5F",
          font: "Arial",
        }),
      ],
      alignment: AlignmentType.CENTER,
      spacing: { after: 200 },
    })
  );

  // Divider
  paragraphs.push(
    new Paragraph({
      border: {
        bottom: { style: BorderStyle.SINGLE, size: 3, color: "1E3A5F" },
      },
      spacing: { after: 300 },
    })
  );

  // Body
  const lines = content.split("\n");
  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === "") {
      paragraphs.push(new Paragraph({ spacing: { after: 100 } }));
      continue;
    }

    const isClause = /^CLÁUSULA/.test(trimmed);
    const isListItem = /^[a-z]\)/.test(trimmed);
    const isSignatureLine = trimmed.startsWith("_____");
    const isBulletData = trimmed.startsWith("- ");

    if (isClause) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: trimmed,
              bold: true,
              size: 22,
              color: "1E3A5F",
              font: "Arial",
            }),
          ],
          spacing: { before: 300, after: 100 },
          heading: HeadingLevel.HEADING_2,
        })
      );
    } else if (isListItem) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: trimmed, size: 22, font: "Arial" }),
          ],
          spacing: { after: 60 },
          indent: { left: 720 },
        })
      );
    } else if (isBulletData) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: trimmed, size: 22, font: "Arial" }),
          ],
          spacing: { after: 60 },
          indent: { left: 720 },
        })
      );
    } else if (isSignatureLine) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({ text: trimmed, size: 22, font: "Arial" }),
          ],
          spacing: { before: 400, after: 40 },
        })
      );
    } else {
      const runs: TextRun[] = [];

      if (watermark) {
        runs.push(
          new TextRun({ text: trimmed, size: 22, font: "Arial" })
        );
      } else {
        runs.push(
          new TextRun({ text: trimmed, size: 22, font: "Arial" })
        );
      }

      paragraphs.push(
        new Paragraph({
          children: runs,
          spacing: { after: 80 },
          alignment: AlignmentType.JUSTIFIED,
        })
      );
    }
  }

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1440,
              right: 1440,
              bottom: 1440,
              left: 1440,
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "LegalGen Bolivia - Generador de Contratos Legales",
                    size: 16,
                    color: "999999",
                    font: "Arial",
                  }),
                ],
                alignment: AlignmentType.LEFT,
              }),
            ],
          }),
        },
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: watermark
                      ? "DOCUMENTO DE MUESTRA - LegalGen Bolivia | Página "
                      : "LegalGen Bolivia - Documento referencial | Página ",
                    size: 14,
                    color: "999999",
                    font: "Arial",
                  }),
                  new TextRun({
                    children: [PageNumber.CURRENT],
                    size: 14,
                    color: "999999",
                    font: "Arial",
                  }),
                ],
                alignment: AlignmentType.CENTER,
              }),
            ],
          }),
        },
        children: paragraphs,
      },
    ],
  });

  return await Packer.toBlob(doc);
}
