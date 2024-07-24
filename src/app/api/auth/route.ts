import { NextApiRequest, NextApiResponse } from "next";
import { signOut } from "@/util/auth-helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ success: false, error: error.message });
      } else {
        res.status(500).json({ success: false, error: "Unknown error" });
      }
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
