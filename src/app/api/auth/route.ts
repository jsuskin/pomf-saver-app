import { NextRequest, NextResponse } from "next/server";
import { signOut } from "@/util/auth-helpers";

export async function POST(req: NextRequest) {
  const { action } = await req.json();

  try {
    if (action === "signOut") {
      await signOut();
      return NextResponse.json({
        success: true,
        message: "Successfully signed out",
      });
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
