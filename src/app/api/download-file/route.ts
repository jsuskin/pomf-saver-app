import { NextResponse } from "next/server";
import axios from "axios";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  const name = searchParams.get("name");

  if (!url) {
    return NextResponse.json({ error: "Missing URL or name" }, { status: 400 });
  }

  try {
    const response = await axios({
      method: "GET",
      url: url,
      responseType: "stream",
    });

    const extension = url.split(".").slice(-1)[0];
    const filename = `${name}.${extension}`;

    return new NextResponse(response.data, {
      headers: {
        "Content-Type": response.headers["content-type"],
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json({ error: "Failed to download file" }, { status: 500 });
  }
}
