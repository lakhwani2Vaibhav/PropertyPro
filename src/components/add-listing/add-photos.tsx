
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import { Progress } from '@/components/ui/progress';
import { UploadCloud, Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function AddPhotos() {
  const router = useRouter();
  const { toast } = useToast();

  const handleFinish = () => {
    toast({
        title: "Listing Created!",
        description: "Your property is now ready for tenants to view."
    })
    router.push('/dashboard/listings');
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <Progress value={95} className="w-full mb-4" />
        <CardTitle>Next, let's add some photos</CardTitle>
        <CardDescription>Upload at least 5 photos to get started. You can always add more later.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <Label htmlFor="photos" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload from your device
          </Label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed rounded-md">
            <div className="space-y-1 text-center">
                <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
              <div className="flex text-sm text-gray-600 dark:text-gray-400">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer rounded-md font-medium text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary hover:text-primary/80"
                >
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">PNG, JPG, GIF up to 10MB</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
            <Label htmlFor='title'>Now, let's give your place a title</Label>
            <Input id="title" placeholder="e.g. Cozy room with a great view"/>
            <p className="text-xs text-muted-foreground">Short titles work best. Have fun with it—you can always change it later.</p>
        </div>

        <div className="space-y-2">
            <Label htmlFor='description'>Create your description</Label>
            <Textarea id="description" placeholder="Share what makes your place special." rows={5} />
        </div>
        
        <div className="flex justify-between items-center pt-4">
          <Button variant="ghost" onClick={() => router.back()}>Back</Button>
          <Button onClick={handleFinish}>Finish</Button>
        </div>
      </CardContent>
    </Card>
  );
}
