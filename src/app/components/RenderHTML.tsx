import React from 'react';

type Props = {
  htmlContent: string;
};

const RenderHTML: React.FC<Props> = ({ htmlContent }) => {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default RenderHTML;
