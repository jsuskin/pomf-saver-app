// app/api/auth/route.ts
import { signOut } from "@/util/auth-helpers";

export async function handler(req: any, res: any) {
  if (req.method === "POST") {
    const { action } = req.body;

    try {
      if (action === "signOut") {
        await signOut();
        res
          .status(200)
          .json({ success: true, message: "Successfully signed out" });
      } else {
        res.status(400).json({ success: false, error: "Invalid action" });
      }
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
