import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { published } = body;

    const post = await prisma.post.update({
      where: { id },
      data: { published },
      include: {
        author: {
          select: { name: true, email: true }
        }
      }
    });

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error toggling post publish status:", error);
    return NextResponse.json(
      { error: "Failed to update post status" },
      { status: 500 }
    );
  }
}