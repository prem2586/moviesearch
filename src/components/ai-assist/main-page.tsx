"use client";

import { useState, useEffect } from 'react';
import { generateText, GenerateTextInput } from '@/ai/flows/generate-text';
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
import { Bot } from 'lucide-react';

import ApiKeySettings from './api-key-settings';
import ParameterControls from './parameter-controls';
import PromptForm from './prompt-form';
import OutputDisplay from './output-display';

export default function AIAssistPage() {
  const [apiKey, setApiKey] = useState('');
  const [prompt, setPrompt] = useState('');
  const [temperature, setTemperature] = useState(0.7);
  const [presencePenalty, setPresencePenalty] = useState(0);
  const [frequencyPenalty, setFrequencyPenalty] = useState(0);
  const [generatedText, setGeneratedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const storedKey = localStorage.getItem('openai_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
  }, []);

  const handleApiKeySave = (key: string) => {
    setApiKey(key);
    localStorage.setItem('openai_api_key', key);
    toast({
        title: "API Key Saved",
        description: "Your API key has been saved locally.",
    });
  };

  const handleGenerate = async () => {
    if (!prompt) {
      toast({
        title: 'Error',
        description: 'Please enter a prompt.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
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
      setIsLoading(false);
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
          <ApiKeySettings apiKey={apiKey} setApiKey={handleApiKeySave} />
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
            <h1 className="text-2xl font-bold font-headline">AI Text Generation</h1>
            <div className="md:hidden">
                <SidebarTrigger asChild>
                    <Button variant="ghost" size="icon">
                        <Bot />
                    </Button>
                </SidebarTrigger>
            </div>
        </header>
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="grid gap-8">
            <PromptForm
              prompt={prompt}
              setPrompt={setPrompt}
              isLoading={isLoading}
              onSubmit={handleGenerate}
            />
            <OutputDisplay
              generatedText={generatedText}
              isLoading={isLoading}
            />
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
