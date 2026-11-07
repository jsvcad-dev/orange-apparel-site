import clsx from 'clsx';
import type { FunctionComponent } from 'react';

interface TextProps {
  html: string;
  className?: string;
}

const Prose: FunctionComponent<TextProps> = ({ html, className }) => {
  return (
    <div
      className={clsx(
        'prose max-w-none text-base leading-7 text-[#3F3C37] prose-headings:mt-8 prose-headings:font-serif prose-headings:font-medium prose-headings:text-forest prose-h1:text-5xl prose-h2:text-4xl prose-h3:text-3xl prose-h4:text-2xl prose-h5:text-xl prose-h6:text-lg prose-a:text-forest prose-a:underline hover:prose-a:text-forest-hover prose-strong:text-ink prose-ol:list-decimal prose-ol:pl-6 prose-ul:list-disc prose-ul:pl-6',
        className
      )}
      dangerouslySetInnerHTML={{ __html: html as string }}
    />
  );
};

export default Prose;
