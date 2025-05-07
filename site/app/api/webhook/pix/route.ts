import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isAuthorized = (req as any).authorized;
    if (isAuthorized) {
      const filePath = path.join(process.cwd(), "data.json");
      fs.appendFile(filePath, JSON.stringify(req.body) + "\n", (err) => {
        if (err) {
          console.error(err);
          res.status(500).end();
        } else {
          res.status(200).end();
        }
      });
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end();
  }
}
