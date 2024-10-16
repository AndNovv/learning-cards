import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image';

interface MarkdownRendererProps {
    content: string;
}

// Custom Image component for ReactMarkdown
const MarkdownImage = ({ src = '', alt = '' }: { src?: string; alt?: string }) => (
    <Image
        src={src}
        alt={alt || 'Image'}
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: '100%', height: 'auto' }}
    />
);

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
    return (
        <ReactMarkdown
            components={{
                img: ({ node, ...props }) => <MarkdownImage {...props} />,
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;