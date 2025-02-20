import { RenderBlocks } from "@/blocks/RenderBlocks";
import { ILocale } from "@/types";
import { getAppPayload } from "@/utils/getAppPayload";
import { notFound } from "next/navigation";
import React from "react";

export default async function Page({
  params,
}: {
  params: Promise<{
    slug?: string;
    locale: ILocale;
  }>;
}) {
  const { slug, locale } = await params;
  const payload = await getAppPayload();

  const pages = await payload.find({
    collection: "pages",
    limit: 1,
    where: { slug: { equals: "/" + slug } },
    locale,
  });

  if (!pages.docs.length) {
    notFound();
  }

  const { layout } = pages.docs[0];

  return <RenderBlocks blocks={layout} />;
}
