"use client";

import { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, LoaderCircle } from 'lucide-react';

interface ImagePromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const ImagePromptForm: FC<ImagePromptFormProps> = ({
  prompt,
  setPrompt,
  isLoading,
  onSubmit,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Image Prompt</CardTitle>
        <CardDescription>
          Enter a prompt to generate an image.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., A futuristic cityscape at sunset, with flying cars."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[100px] text-base"
          disabled={isLoading}
        />
        <Button
          onClick={onSubmit}
          disabled={isLoading || !prompt}
          className="w-full"
        >
          {isLoading ? (
            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-4 w-4" />
          )}
          Generate Image
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImagePromptForm;
