import React from "react";

type QuoteBlockProps = {
  quote: string;
};

const QuoteBlock = ({ quote }: QuoteBlockProps) => {
  return (
    <div className="w-full max-w-2xl lg:pl-20 lg:border-l-4 border-yellow-300 mb-24">
      <p className="text-2xl font-medium lg:max-w-md">&ldquo;{quote}&rdquo;</p>
    </div>
  );
};

export default QuoteBlock;
