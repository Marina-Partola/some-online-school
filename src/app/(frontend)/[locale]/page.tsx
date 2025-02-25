import { ILocale } from "@/types";
import Page from "./[slug]/page";
import { getAppPayload } from "@/utils/getAppPayload";

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug?: string;
    locale: ILocale;
  }>;
}) {
  const { slug = "", locale } = await params;
  const payload = await getAppPayload();

  const pages = await payload.find({
    collection: "pages",
    limit: 1,
    where: { slug: { equals: "/" + slug } },
    locale,
  });

  const { title, description } = pages.docs[0].seo;
  console.log(pages.docs[0]);

  return {
    title,
    description,
  };
}

export default Page;
