import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import catDisappointed from "@/assets/pets/cat_disappointed.webp";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <section className="container not-found">
      <Image src={catDisappointed} alt="A tabby cat looking a little let down" sizes="200px" priority />
      <h1 className="section-title">This page wandered off.</h1>
      <p>It isn’t here any more, or it never was. The cat is as surprised as you are.</p>
      <p>
        <Link href="/" className="button">
          Back to the room
        </Link>
      </p>
    </section>
  );
}
