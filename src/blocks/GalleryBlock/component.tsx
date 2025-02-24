type GalleryProps = {
  title?: string;
};

export const GalleryBlock: React.FC<React.PropsWithChildren & GalleryProps> = ({
  title,
  children,
}) => {
  return (
    <>
      {title && <h2 className="text-3xl font-semibold mb-4">{title}</h2>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </>
  );
};
