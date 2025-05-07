import { createServer } from "https";
import { parse } from "url";
import fs from "fs";
import next from "next";
import { IncomingMessage, ServerResponse } from "http";
import path from "path";
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const httpsOptions = {
  cert: fs.readFileSync(path.resolve(__dirname, "certificates/localhost.pem")),
  key: fs.readFileSync(
    path.resolve(__dirname, "certificates/localhost-key.pem")
  ),
  ca: fs.readFileSync(
    process.env.EFI_CERT ||
      path.resolve(__dirname, "certificates/homologacao-758193-testes_cert.pem")
  ),
  minVersion: "TLSv1.2",
  requestCert: true,
  rejectUnauthorized: dev,
};
app.prepare().then(() => {
  createServer(
    // @ts-expect-error string-to-SecureVersion
    httpsOptions,
    async (req: IncomingMessage, res: ServerResponse) => {
      // Make mTLS info available to API handlers
      // @ts-expect-error any
      // eslint-disable-next-line
      (req as any).authorized = req.socket.authorized;

      const parsedUrl = parse(req.url!, true);
      await handle(req, res, parsedUrl);
    }
  ).listen(3000, () => {
    console.log("✅ Next.js HTTPS server with mTLS running on port 3000");
  });
});
