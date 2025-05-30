import React from 'react';
import ReactMarkdown from 'react-markdown';

interface ContentSectionProps {
  title: string;
  markdownContent: string;
  titleClassName?: string;
  bodyClassName?: string;
}

const ContentSection: React.FC<ContentSectionProps> = ({ title, markdownContent, titleClassName, bodyClassName }) => {
  if (!markdownContent) {
    // Optionally handle empty/loading content, or let ReactMarkdown handle it
    return <p>Loading content for {title}...</p>; 
  }
  return (
    <div>
      <h2 className={`text-2xl font-bold mb-4 text-purple-500 ${titleClassName || ''}`}>{title}</h2>
      <ReactMarkdown className={`prose prose-invert prose-green max-w-none ${bodyClassName || ''}`}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};

export default ContentSection;
