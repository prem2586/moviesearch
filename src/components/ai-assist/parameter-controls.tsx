"use client";

import { type FC } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Settings } from 'lucide-react';

interface ParameterControlsProps {
  temperature: number;
  setTemperature: (value: number) => void;
  presencePenalty: number;
  setPresencePenalty: (value: number) => void;
  frequencyPenalty: number;
  setFrequencyPenalty: (value: number) => void;
}

const ParameterControls: FC<ParameterControlsProps> = ({
  temperature,
  setTemperature,
  presencePenalty,
  setPresencePenalty,
  frequencyPenalty,
  setFrequencyPenalty,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <Settings className="h-6 w-6" />
            <CardTitle>Parameters</CardTitle>
        </div>
        <CardDescription>
          Adjust the generation parameters.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="temperature">Temperature</Label>
            <span className="text-sm text-muted-foreground">{temperature.toFixed(1)}</span>
          </div>
          <Slider
            id="temperature"
            min={0}
            max={1}
            step={0.1}
            value={[temperature]}
            onValueChange={(value) => setTemperature(value[0])}
          />
        </div>
        <div className="space-y-2">
           <div className="flex justify-between items-center">
            <Label htmlFor="presence-penalty">Presence Penalty</Label>
            <span className="text-sm text-muted-foreground">{presencePenalty.toFixed(1)}</span>
          </div>
          <Slider
            id="presence-penalty"
            min={0}
            max={2}
            step={0.1}
            value={[presencePenalty]}
            onValueChange={(value) => setPresencePenalty(value[0])}
          />
        </div>
        <div className="space-y-2">
            <div className="flex justify-between items-center">
                <Label htmlFor="frequency-penalty">Frequency Penalty</Label>
                <span className="text-sm text-muted-foreground">{frequencyPenalty.toFixed(1)}</span>
            </div>
          <Slider
            id="frequency-penalty"
            min={0}
            max={2}
            step={0.1}
            value={[frequencyPenalty]}
            onValueChange={(value) => setFrequencyPenalty(value[0])}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ParameterControls;
