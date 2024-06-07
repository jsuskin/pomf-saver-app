import { NextResponse } from "next/server";
import { db, addDoc } from "../../lib/firebase/firestore";

// Named export for the POST method
export async function POST(req: Request) {
  try {
    const { url } = await req.json(); // Parse the request body
    const docRef: any = await addDoc({ url, createdAt: new Date() });
    return NextResponse.json({ id: docRef.id }, { status: 200 }); // Return success response
  } catch (e) {
    console.error("Error saving URL:", e); // Log the error
    return NextResponse.json({ error: "Failed to save URL" }, { status: 500 }); // Return error response
  }
}