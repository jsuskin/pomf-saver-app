import { NextResponse } from "next/server";
import { addDoc } from "../../lib/firebase/firestore";

export async function POST(req: Request) {
  try {
    const { name, owner, members } = await req.json();

    const docRef: any = await addDoc("groups", {
      name,
      owner,
      members,
    });

    return NextResponse.json({ id: docRef.id }, { status: 200 });
  } catch (e) {
    console.error("Error adding asset to group:", e);

    return NextResponse.json({ error: "Add To Group failed" }, { status: 500 });
  }
}
