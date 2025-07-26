"use client";

import { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { KeyRound } from 'lucide-react';

interface ApiKeySettingsProps {
  apiKey: string;
  setApiKey: (key: string) => void;
}

const ApiKeySettings: FC<ApiKeySettingsProps> = ({ apiKey, setApiKey }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <KeyRound className="h-6 w-6" />
            <CardTitle>API Key</CardTitle>
        </div>
        <CardDescription>
          Your OpenAI API key is loaded from your environment variables.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* The input field and save button are removed */}
      </CardContent>
    </Card>
  );
};

export default ApiKeySettings;
