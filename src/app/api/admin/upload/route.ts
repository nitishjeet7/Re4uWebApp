import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session) {
      console.warn("[Upload API] Unauthorized: no session");
      return NextResponse.json({ message: "Unauthorized", error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.formData();
    const file: File | null = data.get("file") as unknown as File;

    if (!file) {
      console.warn("[Upload API] No file in form data");
      return NextResponse.json({ message: "No file uploaded", error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          message: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
          error: "Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.",
        },
        { status: 400 }
      );
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { message: "File too large. Maximum size is 5MB.", error: "File too large. Maximum size is 5MB." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const timestamp = Date.now();
    const extension = file.name.split(".").pop() || "jpg";
    const filename = `${timestamp}-${Math.random().toString(36).substring(2)}.${extension}`;

    // Save to public/uploads directory — ensure directory exists first
    const uploadDir = join(process.cwd(), "public", "uploads");
    const filepath = join(uploadDir, filename);

    await mkdir(uploadDir, { recursive: true });
    await writeFile(filepath, buffer);

    // Return the public URL (absolute)
    const baseUrl = process.env.NEXTAUTH_URL || request.nextUrl.origin;
    const url = new URL(`/uploads/${filename}`, baseUrl).toString();

    console.log("[Upload API] Saved:", filename, "→", filepath);
    return NextResponse.json({
      url,
      filename,
      size: file.size,
      type: file.type,
    });
  } catch (error) {
    const err = error instanceof Error ? error : new Error(String(error));
    console.error("[Upload API] 500 Error:", err.message);
    console.error("[Upload API] Stack:", err.stack);
    return NextResponse.json(
      {
        message: "Failed to upload file",
        error: process.env.NODE_ENV === "development" ? err.message : "Failed to upload file",
      },
      { status: 500 }
    );
  }
}
