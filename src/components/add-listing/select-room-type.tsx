
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';
import { BedDouble, Users, DoorClosed } from 'lucide-react';

const roomTypes = [
  { name: 'Entire flat', description: 'Tenants have the whole place to themselves', icon: <BedDouble className="h-6 w-6" /> },
  { name: 'Private room', description: 'Tenants have their own room and share some common spaces', icon: <DoorClosed className="h-6 w-6" /> },
  { name: 'Shared room', description: 'Tenants sleep in a room or common area that may be shared with you or others', icon: <Users className="h-6 w-6" /> },
];

interface SelectRoomTypeProps {
  onContinue: () => void;
  onBack: () => void;
}

export function SelectRoomType({ onContinue, onBack }: SelectRoomTypeProps) {
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleContinue = () => {
    if (selectedType) {
      onContinue();
    }
  };

  return (
    <Card className="w-full max-w-lg">
      <CardHeader>
        <Progress value={60} className="w-full mb-4" />
        <CardTitle>What type of place will tenants have?</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {roomTypes.map((type) => (
            <button
              key={type.name}
              className={cn(
                'w-full p-4 border-2 rounded-lg flex items-center justify-between text-left transition-all',
                selectedType === type.name
                  ? 'border-primary bg-primary/10'
                  : 'border-border hover:border-primary/50'
              )}
              onClick={() => setSelectedType(type.name)}
            >
              <div>
                <p className="font-semibold">{type.name}</p>
                <p className="text-sm text-muted-foreground">{type.description}</p>
              </div>
              <div className="ml-4 flex-shrink-0">
                {type.icon}
              </div>
            </button>
          ))}
        </div>
        <div className="flex justify-between items-center pt-4">
            <Button variant="ghost" onClick={onBack}>Back</Button>
            <Button onClick={handleContinue} disabled={!selectedType}>
            Continue
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
