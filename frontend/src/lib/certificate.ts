export interface CertificateDetail {
  label: string;
  value: string;
}

export interface CertificateImageData {
  businessName: string;
  status: string;
  statusExplanation: string;
  effectiveDate: string;
  generatedDate: string;
  details: CertificateDetail[];
}

function escapeXml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrapText(value: string, maxCharacters: number): string[] {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  let currentLine = "";

  words.forEach((word) => {
    const nextLine = currentLine ? `${currentLine} ${word}` : word;
    if (nextLine.length > maxCharacters && currentLine) {
      lines.push(currentLine);
      currentLine = word;
    } else {
      currentLine = nextLine;
    }
  });

  if (currentLine) lines.push(currentLine);
  return lines.length > 0 ? lines : [""];
}

function textLines(
  value: string,
  x: number,
  y: number,
  maxCharacters: number,
  lineHeight: number,
  attributes: string,
): string {
  return wrapText(value, maxCharacters)
    .map(
      (line, index) =>
        `<text x="${x}" y="${y + index * lineHeight}" ${attributes}>${escapeXml(line)}</text>`,
    )
    .join("");
}

export function createCertificateSvg(data: CertificateImageData): string {
  const statusIsExempt = data.status === "EXEMPT";
  const accent = statusIsExempt ? "#19734e" : "#946324";
  const softAccent = statusIsExempt ? "#e8f5ed" : "#fff5e4";
  const detailRows = Math.ceil(data.details.length / 2);
  const detailMarkup = data.details
    .map(
      (detail, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const labelX = column === 0 ? 100 : 650;
        const valueX = column === 0 ? 600 : 1100;
        const y = 585 + row * 38;
        return `<text x="${labelX}" y="${y}" fill="#607671" font-size="16">${escapeXml(detail.label)}</text><text x="${valueX}" y="${y}" text-anchor="end" fill="#123d37" font-size="16" font-weight="700">${escapeXml(detail.value)}</text>`;
      },
    )
    .join("");
  const footerY = Math.max(736, 585 + detailRows * 38 + 18);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="850" viewBox="0 0 1200 850">
  <rect width="1200" height="850" fill="#f7faf8"/>
  <rect x="28" y="28" width="1144" height="794" rx="24" fill="#ffffff" stroke="#b8d9d0" stroke-width="3"/>
  <rect x="48" y="48" width="1104" height="754" rx="16" fill="none" stroke="#e3eeea" stroke-width="2"/>
  <circle cx="104" cy="112" r="30" fill="#0e6658"/>
  <text x="104" y="122" text-anchor="middle" fill="#ffffff" font-size="28" font-family="Arial, sans-serif" font-weight="700">M</text>
  <text x="154" y="108" fill="#123d37" font-size="28" font-family="Arial, sans-serif" font-weight="700">MDR Sathi</text>
  <text x="154" y="136" fill="#59736e" font-size="14" font-family="Arial, sans-serif">UPI Impact &amp; Trust Assistant</text>
  <text x="100" y="220" fill="#0e6658" font-size="16" font-family="Arial, sans-serif" font-weight="700" letter-spacing="2">OFFICIAL ASSESSMENT SUMMARY</text>
  <text x="100" y="274" fill="#123d37" font-size="42" font-family="Arial, sans-serif" font-weight="700">UPI MDR Status Certificate</text>
  <text x="100" y="330" fill="#607671" font-size="18" font-family="Arial, sans-serif">Prepared for</text>
  <text x="100" y="370" fill="#123d37" font-size="30" font-family="Arial, sans-serif" font-weight="700">${escapeXml(data.businessName)}</text>
  <rect x="100" y="410" width="1000" height="92" rx="14" fill="${softAccent}"/>
  <text x="130" y="448" fill="${accent}" font-size="14" font-family="Arial, sans-serif" font-weight="700" letter-spacing="1.5">STATUS RETURNED BY MDR SATHI</text>
  <text x="130" y="484" fill="${accent}" font-size="28" font-family="Arial, sans-serif" font-weight="700">${escapeXml(data.status)}</text>
  ${textLines(data.statusExplanation, 700, 450, 45, 24, `fill="#45625d" font-size="16" font-family="Arial, sans-serif" text-anchor="end"`)}
  <line x1="100" y1="548" x2="1100" y2="548" stroke="#e3eeea" stroke-width="2"/>
  ${detailMarkup}
  <line x1="100" y1="${footerY}" x2="1100" y2="${footerY}" stroke="#e3eeea" stroke-width="2"/>
  <text x="100" y="${footerY + 34}" fill="#718580" font-size="14" font-family="Arial, sans-serif">Effective: ${escapeXml(data.effectiveDate)}</text>
  <text x="1100" y="${footerY + 34}" text-anchor="end" fill="#718580" font-size="14" font-family="Arial, sans-serif">Generated: ${escapeXml(data.generatedDate)}</text>
  <text x="600" y="${footerY + 64}" text-anchor="middle" fill="#8a9b97" font-size="11" font-family="Arial, sans-serif">Informational guidance only. Not financial, tax, or legal advice.</text>
</svg>`;
}

export async function downloadCertificateImage(
  data: CertificateImageData,
  filename = "mdr-sathi-certificate.png",
): Promise<void> {
  const svgBlob = new Blob([createCertificateSvg(data)], {
    type: "image/svg+xml;charset=utf-8",
  });
  const svgUrl = URL.createObjectURL(svgBlob);

  try {
    const image = new window.Image();
    const imageReady = new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Certificate image could not be created."));
    });
    image.src = svgUrl;
    await imageReady;

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 850;
    const context = canvas.getContext("2d");
    if (!context) throw new Error("Certificate image could not be created.");
    context.drawImage(image, 0, 0, canvas.width, canvas.height);

    const imageBlob = await new Promise<Blob | null>((resolve) => {
      canvas.toBlob(resolve, "image/png");
    });
    if (!imageBlob) throw new Error("Certificate image could not be created.");

    const downloadUrl = URL.createObjectURL(imageBlob);
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 0);
  } finally {
    URL.revokeObjectURL(svgUrl);
  }
}
