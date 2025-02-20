type QuoteProps = {
  quoteHeader: string;
  quoteText?: string | null;
};
export const Quote: React.FC<QuoteProps> = ({ quoteHeader, quoteText }) => {
  return (
    <div>
      <h1>{quoteHeader}</h1>
      <p>{quoteText}</p>
    </div>
  );
};
