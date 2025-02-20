import { Page } from "@/modules/admin/payload.types";
import { Fragment } from "react";
import { Quote } from "./Quote/component";

const blockComponents = {
  Quote: Quote,
};

export const RenderBlocks: React.FC<{
  blocks?: Page["layout"];
}> = (props) => {
  const { blocks } = props;

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0;

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block) => {
          const { blockType } = block;

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType];
            return <Block key={block.id} {...block} />;
          }

          return null;
        })}
      </Fragment>
    );
  }

  return null;
};
