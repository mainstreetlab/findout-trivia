import React, { useState } from 'react';
import { Button } from './ui/button';
import { LuCopy as Copy, LuCheck as Done } from 'react-icons/lu';

interface CopyProps {
  text: string;
}

function CopyToClipboard({ text }: CopyProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch (err) {
      console.error('Failed to copy text:', err);
    } finally {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  };

  return (
    <Button onClick={handleCopy} type="submit" size="default" className="px-4">
      <span className="sr-only">Copy</span>
      {copied ? <Done className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
    </Button>
  );
}

export default CopyToClipboard;
