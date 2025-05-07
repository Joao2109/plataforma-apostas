import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
export async function POST(req: NextRequest) {
  const isAuthorized = req.headers.get("authorization") === "your-secret-key";
  if (!isAuthorized) {
    return new NextResponse(null, { status: 401 });
  }

  const body = await req.json();
  const filePath = path.join(process.cwd(), "data.json");
  try {
    fs.appendFileSync(filePath, JSON.stringify(body) + "\n");
    return new NextResponse(null, { status: 200 });
  } catch (err) {
    console.error(err);
    return new NextResponse(null, { status: 500 });
  }
}
