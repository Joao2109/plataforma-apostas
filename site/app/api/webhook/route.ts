import { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isAuthorized = (req as any).authorized;
    if (isAuthorized) {
      res.status(200).end();
    } else {
      res.status(401).end();
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
