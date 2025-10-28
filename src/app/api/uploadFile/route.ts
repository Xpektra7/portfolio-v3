// /app/api/uploadFile/route.ts
import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  const data = await req.formData();
  const file = data.get("image") as File;
  if (!file) return NextResponse.json({ success: 0, message: "No file" });

  const buffer = Buffer.from(await file.arrayBuffer());
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  const filePath = path.join(uploadDir, `${Date.now()}-${file.name}`);
  await writeFile(filePath, buffer);

  const fileUrl = `/uploads/${path.basename(filePath)}`;
  return NextResponse.json({ success: 1, file: { url: fileUrl } });
}
