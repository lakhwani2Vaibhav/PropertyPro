
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { Building, Home } from 'lucide-react';

const propertyTypes = [
  { name: 'Apartment', icon: <Building className="h-8 w-8" /> },
  { name: 'Independent House/Villa', icon: <Home className="h-8 w-8" /> },
];

interface SelectPropertyTypeProps {
  onContinue: () => void;
  onBack: () => void;
}

export function SelectPropertyType({ onContinue, onBack }: SelectPropertyTypeProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onContinue();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <Progress value={40} className="w-full mb-4" />
        <CardTitle>What kind of property do you have?</CardTitle>
        <CardDescription>Select the type of property you are listing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {propertyTypes.map((type) => (
            <button
              key={type.name}
              className={cn(
                'w-full p-4 border-2 rounded-lg flex items-center justify-between transition-all',
                selectedType === type.name
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => setSelectedType(type.name)}
            >
              <span className="text-lg font-semibold">{type.name}</span>
              {type.icon}
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center">
            <Button variant="ghost" onClick={onBack}>Back</Button>
            <Button onClick={handleContinue} disabled={!selectedType}>
            Continue
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
