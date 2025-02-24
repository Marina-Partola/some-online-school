import React from "react";

type TextBlockProps = {
  text?: string;
};

export const TextBlock: React.FC<TextBlockProps> = ({ text }) => {
  return <p>{text}</p>;
};
