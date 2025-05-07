import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
  const isAuthorized = req.headers.get("authorization") === "your-secret-key";
  if (isAuthorized) {
    return new NextResponse(null, { status: 200 });
  } else {
    return new NextResponse(null, { status: 401 });
  }
}
export function GET() {
  return new NextResponse(null, { status: 405 });
}
