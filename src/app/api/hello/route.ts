import { NextRequest, NextResponse } from "next/server";

function requestHandler(_request: NextRequest): NextResponse {
  return NextResponse.json({ message: "Hello from Next.js!" });
}

export { requestHandler as GET };
