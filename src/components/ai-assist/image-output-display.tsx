"use client";

import { type FC } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Download, Image as ImageIcon } from 'lucide-react';

interface ImageOutputDisplayProps {
  imageUrl: string;
  isLoading: boolean;
  prompt: string;
}

const ImageOutputDisplay: FC<ImageOutputDisplayProps> = ({ imageUrl, isLoading, prompt }) => {
  const handleDownload = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'ai-assist-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="min-h-[300px] mt-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="flex items-center gap-2">
            <ImageIcon className="h-6 w-6"/>
            <CardTitle>AI Image Output</CardTitle>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={handleDownload}
          disabled={!imageUrl || isLoading}
          aria-label="Download image"
        >
          <Download className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        {isLoading ? (
          <div className="w-full aspect-square flex items-center justify-center">
            <Skeleton className="h-full w-full" />
          </div>
        ) : (
          imageUrl ? (
            <Image
              src={imageUrl}
              alt={prompt || "Generated image"}
              width={512}
              height={512}
              className="rounded-lg object-contain"
            />
          ) : (
            <div className="text-muted-foreground text-center h-64 flex items-center justify-center">
                Your generated image will appear here.
            </div>
          )
        )}
      </CardContent>
    </Card>
  );
};

export default ImageOutputDisplay;
