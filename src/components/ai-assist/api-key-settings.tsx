"use client";

import { useState, useEffect, type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Save } from 'lucide-react';

interface ApiKeySettingsProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeySettings: FC<ApiKeySettingsProps> = ({ apiKey, setApiKey }) => {
  const [keyInput, setKeyInput] = useState(apiKey);

  useEffect(() => {
    setKeyInput(apiKey);
  }, [apiKey]);

  const handleSave = () => {
    setApiKey(keyInput);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <KeyRound className="h-6 w-6" />
            <CardTitle>API Key</CardTitle>
        </div>
        <CardDescription>
          Enter your OpenAI API key. It is stored securely in your browser.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">OpenAI API Key</Label>
          <Input
            id="api-key"
            type="password"
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="sk-..."
          />
        </div>
        <Button onClick={handleSave} className="w-full">
            <Save className="mr-2 h-4 w-4" /> Save Key
        </Button>
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
