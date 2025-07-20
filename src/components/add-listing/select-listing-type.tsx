
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';

interface SelectListingTypeProps {
  onContinue: () => void;
}

export function SelectListingType({ onContinue }: SelectListingTypeProps) {
  const handleContinue = () => {
    onContinue();
  };

  return (
    <Card className="w-full max-w-md shadow-2xl border-orange-200/50">
      <CardContent className="p-8 text-center space-y-8">
        <h2 className="text-2xl font-semibold text-foreground">
          Room in a shared flat or 1 BHK
        </h2>
        <Button
          variant="outline"
          className="w-full max-w-xs h-12 text-base"
          onClick={handleContinue}
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload media
        </Button>
        <button
          onClick={handleContinue}
          className="text-primary underline text-base"
        >
          I want to list an entire flat (2/3/4 BHK)
        </button>
      </CardContent>
    </Card>
  );
}
