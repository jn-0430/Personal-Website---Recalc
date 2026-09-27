import { cookies } from "next/headers";
import { readFile } from "fs/promises";
import path from "path";
import { get } from "@vercel/blob";
import { NextResponse } from "next/server";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/auth";

export const runtime = "nodejs";

const mimeTypes: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp3": "audio/mpeg",
  ".wav": "audio/wav",
  ".m4a": "audio/mp4",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".pdf": "application/pdf",
};

export async function GET(_: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!(await verifySessionToken(token, process.env.PORTFOLIO_SESSION_SECRET))) {
    return new NextResponse("Not found", { status: 404 });
  }

  const { path: pathSegments } = await params;

  if (pathSegments.some((segment) => !segment || segment === "." || segment === "..")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const blobPathname = pathSegments.join("/");

  if (process.env.BLOB_STORE_ID) {
    try {
      const result = await get(blobPathname, { access: "private" });
      if (!result || result.statusCode !== 200) {
        return new NextResponse("Not found", { status: 404 });
      }

      return new NextResponse(result.stream, {
        headers: {
          "Content-Type": result.blob.contentType,
          "Cache-Control": "private, no-store",
          "X-Content-Type-Options": "nosniff",
          "X-Robots-Tag": "noindex, nofollow, noarchive",
        },
      });
    } catch {
      return new NextResponse("Not found", { status: 404 });
    }
  }

  const mediaRoot = path.resolve(process.cwd(), "private-media");
  const requestedPath = path.resolve(mediaRoot, ...pathSegments);
  if (!requestedPath.startsWith(mediaRoot + path.sep)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const extension = path.extname(requestedPath).toLowerCase();
  const contentType = mimeTypes[extension];
  if (!contentType) return new NextResponse("Not found", { status: 404 });

  try {
    const file = await readFile(requestedPath);
    return new NextResponse(file, {
      headers: {
        "Content-Type": contentType,
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }
}
