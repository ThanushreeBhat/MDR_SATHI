export interface WhatsAppMessageInput {
  shopName: string;
  status: string;
  effectiveDate: string;
}

export function createWhatsAppLink({
  shopName,
  status,
  effectiveDate,
}: WhatsAppMessageInput): string {
  const message = [
    "MDR Sathi UPI MDR Status",
    "",
    `Shop: ${shopName}`,
    `Status: ${status}`,
    `Effective date: ${effectiveDate}`,
    "",
    "Check your own status with MDR Sathi.",
  ].join("\n");

  return `https://wa.me/?text=${encodeURIComponent(message)}`;
}
