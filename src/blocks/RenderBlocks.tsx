import { Page } from "@/modules/admin/payload.types";
import { Fragment } from "react";
import { CardBlock } from "./CardBlock/component";
import { TextBlock } from "./TextBlock/component";
import { ListBlock } from "./ListBlock/component";
import { PersonCardBlock } from "./PersonCardBlock/component";
import { GalleryBlock } from "./GalleryBlock/component";

const blockComponents = {
  Card: CardBlock,
  TextBlock,
  ListBlock,
  PersonCardBlock,
  GalleryBlock,
};

export const RenderBlocks: React.FC<{
  blocks?: Page["layout"];
  title?: string;
}> = (props) => {
  const { blocks, title } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {title && (
          <h1 className="text-4xl font-bold mb-8 text-center">{title}</h1>
        )}

        {blocks.map((block) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];
            return (
              <Block key={block.id} {...block}>
                {block.layout && <RenderBlocks blocks={block.layout} />}
              </Block>
            );
          }

          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
