"use client";

import { useState } from 'react';
import { generateText, GenerateTextInput } from '@/ai/flows/generate-text';
import { generateImage, GenerateImageInput } from '@/ai/flows/generate-image';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
  SidebarTitle,
} from '@/components/ui/extended-sidebar';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Bot, Image as ImageIcon } from 'lucide-react';

import ApiKeySettings from './api-key-settings';
import ParameterControls from './parameter-controls';
import PromptForm from './prompt-form';
import OutputDisplay from './output-display';
import ImagePromptForm from './image-prompt-form';
import ImageOutputDisplay from './image-output-display';

export default function AIAssistPage() {
  const [prompt, setPrompt] = useState('');
  const [imagePrompt, setImagePrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [generatedText, setGeneratedText] = useState('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState('');
  const [isTextLoading, setIsTextLoading] = useState(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { toast } = useToast();

  const handleTextGenerate = async () => {
    if (!prompt) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt.',
        variant: 'destructive',
      });
      return;
    }

    setIsTextLoading(true);
    setGeneratedText('');

    try {
      const input: GenerateTextInput = {
        prompt,
        temperature,
        presencePenalty,
        frequencyPenalty,
      };
      const result = await generateText(input);
      setGeneratedText(result.text);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Generation Failed',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsTextLoading(false);
    }
  };

  const handleImageGenerate = async () => {
    if (!imagePrompt) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt for the image.',
        variant: 'destructive',
      });
      return;
    }

    setIsImageLoading(true);
    setGeneratedImageUrl('');

    try {
      const input: GenerateImageInput = {
        prompt: imagePrompt,
      };
      const result = await generateImage(input);
      setGeneratedImageUrl(result.imageUrl);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Image Generation Failed',
        description:
          error instanceof Error ? error.message : 'An unknown error occurred.',
        variant: 'destructive',
      });
    } finally {
      setIsImageLoading(false);
    }
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
            <SidebarTitle>
                <Bot className="mr-2" />
                AIAssist
            </SidebarTitle>
        </SidebarHeader>
        <SidebarContent className="p-4 space-y-4">
          <ApiKeySettings />
          <ParameterControls
            temperature={temperature}
            setTemperature={setTemperature}
            presencePenalty={presencePenalty}
            setPresencePenalty={setPresencePenalty}
            frequencyPenalty={frequencyPenalty}
            setFrequencyPenalty={setFrequencyPenalty}
          />
        </SidebarContent>
      </Sidebar>
      <SidebarInset className="flex flex-col">
        <header className="flex items-center justify-between p-4 border-b">
            <h1 className="text-2xl font-bold font-headline">AI-ssist</h1>
            <div className="md:hidden">
                <SidebarTrigger>
                    <Button variant="ghost" size="icon">
                        <Bot />
                    </Button>
                </SidebarTrigger>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="grid gap-8">
            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center"><Bot className="mr-2" /> Text Generation</h2>
              <PromptForm
                prompt={prompt}
                setPrompt={setPrompt}
                isLoading={isTextLoading}
                onSubmit={handleTextGenerate}
              />
              <OutputDisplay
                generatedText={generatedText}
                isLoading={isTextLoading}
              />
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4 flex items-center"><ImageIcon className="mr-2" /> Image Generation</h2>
              <ImagePromptForm
                prompt={imagePrompt}
                setPrompt={setImagePrompt}
                isLoading={isImageLoading}
                onSubmit={handleImageGenerate}
              />
              <ImageOutputDisplay
                imageUrl={generatedImageUrl}
                isLoading={isImageLoading}
                prompt={imagePrompt}
              />
            </div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
