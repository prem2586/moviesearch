"use client";

import { type FC } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Bot } from 'lucide-react';

interface OutputDisplayProps {
  generatedText: string;
  isLoading: boolean;
}

const OutputDisplay: FC<OutputDisplayProps> = ({ generatedText, isLoading }) => {
  const handleDownload = () => {
    if (!generatedText) return;
    const blob = new Blob([generatedText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'ai-assist-output.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <Card className="min-h-[300px]">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
            <Bot className="h-6 w-6"/>
            <CardTitle>AI Output</CardTitle>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDownload}
          disabled={!generatedText || isLoading}
          aria-label="Download output"
        >
          <Download className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap">
            {generatedText || (
              <p className="text-muted-foreground">
                Your generated text will appear here.
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default OutputDisplay;
