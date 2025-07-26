"use client";

import { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Wand2, LoaderCircle } from 'lucide-react';

interface PromptFormProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  isLoading: boolean;
  onSubmit: () => void;
}

const PromptForm: FC<PromptFormProps> = ({
  prompt,
  setPrompt,
  isLoading,
  onSubmit,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Prompt</CardTitle>
        <CardDescription>
          Enter the text you want the AI to start with.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Textarea
          placeholder="e.g., Write a short story about a robot who discovers music."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="min-h-[150px] text-base"
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
          Generate
        </Button>
      </CardContent>
    </Card>
  );
};

export default PromptForm;
