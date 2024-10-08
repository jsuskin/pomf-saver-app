import { NextRequest, NextResponse } from "next/server";
import { initializeApp, getApps, cert, ServiceAccount } from "firebase-admin/app";
import { FirebaseAuthError, getAuth } from "firebase-admin/auth";
import { signOut } from "@/util/auth-helpers";
import serviceAccount from "../../../../pomf-saver-firebase-adminsdk-52gqg-1abdbc6f9c.json";

// Firebase Admin SDK setup (initialize only if not already initialized)
if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
  });
}

export async function GET(req: NextRequest) {
  const sessionCookie = req.cookies.get("session")?.value; // Get the session cookie
  const accessToken = req.cookies.get("accessToken")?.value; // Get the session cookie

  console.log("GET method -> ", {sessionCookie, accessToken})

  if (!sessionCookie) {
    return NextResponse.json({ success: false, message: "No session cookie" }, { status: 401 });
  }

  try {
    const decodedToken = await getAuth().verifySessionCookie(sessionCookie, true); // Verify the session cookie

    return NextResponse.json({
      success: true,
      token: accessToken
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 401 });
  }
}

const COOKIE_MAX_AGE = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json(); // Extract token from request body

    if (!token) return NextResponse.json({ success: false, error: "No token provided" }, { status: 400 });

    const decodedToken = await getAuth().verifyIdToken(token);
    const sessionCookie = await getAuth().createSessionCookie(token, { expiresIn: COOKIE_MAX_AGE });
    const sessionCookieHeader = `session=${sessionCookie}; Max-Age=${COOKIE_MAX_AGE}; HttpOnly; Secure; Path=/; SameSite=Lax`;
    const accessTokenCookieHeader = `accessToken=${token}; Path=/; HttpOnly; Secure; SameSite=Lax`;

    return NextResponse.json(
      {
        success: true,
        message: "Token verified successfully",
        uid: decodedToken.uid,
      },
      { headers: { "Set-Cookie": `${sessionCookieHeader}, ${accessTokenCookieHeader}` } }
    );
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { status: 200, headers: { Allow: "POST" } });
}
