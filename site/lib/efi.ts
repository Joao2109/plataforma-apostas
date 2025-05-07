import EfiPay from "sdk-node-apis-efi";
import path from "path";
export const efi = new EfiPay({
  client_id: process.env.EFI_CLIENT_ID ?? "",
  client_secret: process.env.EFI_CLIENT_SECRET ?? "",
  certificate: path.join(
    process.cwd(),
    process.env.EFI_CERTIFICATE ??
      "./certificates/homologacao-758193-testes_cert.pem"
  ),
  pemKey: path.join(
    process.cwd(),
    process.env.EFI_CERTIFICATE ??
      "./certificates/homologacao-758193-testes_cert.pem"
  ),
  sandbox: true,
});
