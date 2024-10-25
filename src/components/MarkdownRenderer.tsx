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
        width="0"
        height="0"
        sizes="100vw"
        className="w-full max-h-80 aspect-[5/3] object-contain my-6"
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