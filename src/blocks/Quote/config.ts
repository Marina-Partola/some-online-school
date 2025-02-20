import type { Block } from "payload";

export const QuoteBlock: Block = {
  slug: "Quote",
  imageURL: "https://google.com/path/to/image.jpg",
  imageAltText: "A nice thumbnail image to show what this block looks like",
  interfaceName: "QuoteBlock",
  fields: [
    {
      name: "quoteHeader",
      type: "text",
      required: true,
      localized: true,
    },
    {
      name: "quoteText",
      type: "text",
      localized: true,
    },
  ],
};
