import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const samplePosts = [
  {
    title: "Designing for Calm Interfaces",
    slug: "designing-for-calm-interfaces",
    excerpt:
      "A field guide for building product surfaces that breathe—calm, legible, and intentional.",
    coverImage: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80",
    authorName: "Ava Lin",
    content: `
      <h2>Why calm matters</h2>
      <p>Teams build velocity when the interface removes noise. Calm UI isn't bland—it's intentional clarity that lets the product speak.</p>
      <ul>
        <li>Reduce simultaneous actions</li>
        <li>Favor soft contrast and rhythm</li>
        <li>Let hierarchy do the explaining</li>
      </ul>
      <p>When calm becomes a system, velocity follows.</p>
    `.trim(),
  },
  {
    title: "The Editorial System Behind Lumen",
    slug: "the-editorial-system-behind-lumen",
    excerpt:
      "How we structure voice, pacing, and narrative so every post feels cohesive and unmistakably ours.",
    coverImage: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
    authorName: "Noah Reed",
    content: `
      <h2>Editorial foundations</h2>
      <p>We treat writing as a design system: consistent tokens, reusable components, and deliberate cadence.</p>
      <h3>Editorial tokens</h3>
      <p>The result is a consistent voice that scales with the team.</p>
    `.trim(),
  },
  {
    title: "From Workshop to Release Notes",
    slug: "from-workshop-to-release-notes",
    excerpt:
      "A behind-the-scenes look at how we turn workshop artifacts into clear product updates.",
    coverImage: "https://images.unsplash.com/photo-1471879832106-c7ab9e0cee23?w=800&q=80",
    authorName: "Noah Reed",
    content: `
      <h2>Turning insights into outcomes</h2>
      <p>We move from raw notes to a shared narrative in three steps: align, distill, publish.</p>
      <p>Each release note becomes a small piece of editorial memory.</p>
    `.trim(),
  },
];

async function main() {
  for (const post of samplePosts) {
    const existing = await prisma.post.findUnique({ where: { slug: post.slug } });
    if (existing) continue;
    await prisma.post.create({
      data: {
        ...post,
        published: true,
      },
    });
    console.log("Created post:", post.slug);
  }
  console.log("Blog seed done.");
}

main()
  .catch((e: unknown) => {
    const err = e as { code?: string; message?: string };
    if (err?.code === "P2021") {
      console.error("The Post table does not exist. Create it first with:\n  npx prisma db push\n");
    } else {
      console.error(e);
    }
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
