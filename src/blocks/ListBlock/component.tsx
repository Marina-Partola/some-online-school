type ListBlockProps = {
  items: { id: string; text: string }[];
};

export const ListBlock: React.FC<ListBlockProps> = ({ items }) => {
  return (
    <ul className="list-disc pl-5 space-y-2">
      {items.map((it) => (
        <li key={it.id}>{it.text}</li>
      ))}
    </ul>
  );
};
