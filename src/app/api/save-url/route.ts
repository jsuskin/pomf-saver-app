import { NextResponse } from "next/server";
import { db, addDoc } from "../../lib/firebase/firestore";
import { auth } from "../../lib/firebase";

export async function POST(req: Request) {
  try {
    const { url, uid, displayName } = await req.json();

    const docRef: any = await addDoc({
      url,
      name: url,
      owner: { uid, displayName },
      tags: [],
      sharedWith: [],
      createdAt: new Date(),
    });

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (e) {
    console.error("Error saving URL:", e);

    return NextResponse.json({ error: "Failed to save URL" }, { status: 500 });
  }
}
