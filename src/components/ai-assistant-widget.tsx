
'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAssistantResponse } from '@/app/dashboard/assistant/actions';
import type { FlatListingOutput } from '@/ai/flows/assistant-flow';
import { Bot, Loader2, Send, User, X, Sparkles, Home, Phone, IndianRupee } from 'lucide-react';
import { cn } from '@/lib/utils';
import Balancer from 'react-wrap-balancer';
import { usePathname } from 'next/navigation';

const formSchema = z.object({
  message: z.string().min(1),
});

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  listings?: FlatListingOutput[];
};

function FlatListingCard({ listing }: { listing: FlatListingOutput }) {
  return (
    <Card className="bg-background/60 text-foreground text-sm border-primary/20">
      <CardHeader className="p-3">
        <CardTitle className="text-base flex items-center gap-2">
            <Home className="h-4 w-4 text-primary" />
            {listing.flatType} in {listing.area}
        </CardTitle>
        <CardDescription className="text-xs !mt-1">{listing.address}</CardDescription>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Rent</span>
          <span className="font-semibold flex items-center gap-1">
            <IndianRupee className="h-3.5 w-3.5" />
            {listing.rentBudget}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground">Deposit</span>
          <span className="font-semibold flex items-center gap-1">
            <IndianRupee className="h-3.5 w-3.5" />
            {listing.deposit}
          </span>
        </div>
        {listing.phoneNumber && (
           <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button variant="link" size="sm" className="p-0 h-auto text-xs flex items-center">
                        <Phone className="mr-1.5 h-3 w-3" />
                        Show Contact Details
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 text-xs rounded-md bg-muted p-2 text-center font-mono">
                    {listing.phoneNumber}
                </CollapsibleContent>
            </Collapsible>
        )}
      </CardContent>
    </Card>
  );
}

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: '',
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const userMessage: Message = { id: Date.now(), text: values.message, sender: 'user' };
    
    const currentMessages = [...messages, userMessage];
    setMessages(currentMessages);
    
    form.reset();
    setIsLoading(true);

    // Prepare history for the AI. Send the last 10 messages from the UI state.
    // The server will perform the final trimming and sanitation.
    const historyForAI = currentMessages
        .slice(0, -1) // Exclude the current user message which is sent as `query`
        .slice(-10) // Send a buffer of the last 10 messages
        .map(msg => ({
            role: msg.sender === 'user' ? 'user' as const : 'model' as const,
            content: msg.text
        }));

    const result = await getAssistantResponse({ 
      query: values.message, 
      history: historyForAI
    });
    
    if (result.success && result.data) {
      const botMessage: Message = { 
        id: Date.now() + 1, 
        text: result.data.response, 
        sender: 'bot',
        listings: result.data.listings
      };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      const errorMessage: Message = { id: Date.now() + 1, text: result.error || 'Sorry, something went wrong.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  }
  
  const pagesToHideOn = ['/dashboard/messaging', '/dashboard/flats'];
  const shouldHide = pagesToHideOn.includes(pathname);

  if (shouldHide) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 pointer-events-none">
      <div className="flex flex-col items-end gap-2">
        <div
          className={cn(
            'w-full max-w-sm transition-all duration-300',
            isOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 translate-y-4 pointer-events-none'
          )}
        >
          <Card className="h-[70vh] flex flex-col shadow-2xl">
            <CardHeader className="flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Bot /> AI Rental Assistant
              </CardTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="flex-grow overflow-hidden">
              <ScrollArea className="h-full pr-4">
                <div className="space-y-6 h-full">
                  {messages.length === 0 && (
                    <div className="text-center text-muted-foreground flex flex-col items-center h-full justify-center">
                      <Bot className="mx-auto h-12 w-12 mb-4" />
                      <h3 className="text-lg font-medium">
                        Welcome to your AI Assistant
                      </h3>
                      <p className="text-sm max-w-xs">
                        Ask me anything about property management, or try one of these suggestions to get started.
                      </p>
                      <div className="mt-6 space-y-2 w-full max-w-xs">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 leading-tight"
                          onClick={() => onSubmit({ message: 'Show me flats in Indiranagar' })}
                        >
                          Show me flats in Indiranagar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 leading-tight"
                          onClick={() => onSubmit({ message: "What's the rent for a 2BHK in Koramangala?" })}
                        >
                          What's the rent for a 2BHK in Koramangala?
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start text-left h-auto py-2 leading-tight"
                          onClick={() => onSubmit({ message: 'Find me a furnished apartment near HSR Layout' })}
                        >
                          Find me a furnished apartment near HSR Layout
                        </Button>
                      </div>
                    </div>
                  )}
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={cn(
                        'w-full flex flex-col',
                        message.sender === 'user'
                          ? 'items-end'
                          : 'items-start'
                      )}
                    >
                      {/* Text bubble part */}
                      <div
                        className={cn(
                          'flex items-start gap-4 w-full',
                          message.sender === 'user'
                            ? 'justify-end'
                            : 'justify-start'
                        )}
                      >
                        {message.sender === 'bot' && (
                          <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                            <Bot className="h-5 w-5" />
                          </Avatar>
                        )}
                        <div
                          className={cn(
                            'max-w-[85%] rounded-lg p-3',
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          )}
                        >
                          <Balancer>{message.text}</Balancer>
                        </div>
                        {message.sender === 'user' && (
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>
                              <User />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </div>

                      {/* Listing cards part */}
                      {message.sender === 'bot' &&
                        message.listings &&
                        message.listings.length > 0 && (
                          <div className="mt-2 w-full max-w-md self-start pl-12 space-y-3">
                            {message.listings.map((listing, index) => (
                              <FlatListingCard key={index} listing={listing} />
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start gap-4 justify-start">
                      <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                        <Bot className="h-5 w-5" />
                      </Avatar>
                      <div className="max-w-md rounded-lg p-3 bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex w-full items-center space-x-2"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Ask anything..."
                            {...field}
                            autoComplete="off"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                    <span className="sr-only">Send</span>
                  </Button>
                </form>
              </Form>
            </CardFooter>
          </Card>
        </div>
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            'bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-16 w-16 md:h-auto md:w-auto md:py-3 md:px-5 shadow-lg flex items-center gap-3 transition-all duration-300',
            isOpen
              ? 'opacity-0 -translate-y-2 pointer-events-none'
              : 'opacity-100 translate-y-0 pointer-events-auto'
          )}
        >
          <div className="relative">
            <Bot className="h-6 w-6" />
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
          </div>
          <div className="text-left hidden md:block">
            <p className="font-bold">AI Rental Assistant</p>
            <p className="text-xs opacity-80">Online now</p>
          </div>
          <Sparkles className="h-5 w-5 opacity-90 hidden md:block" />
        </Button>
      </div>
    </div>
  );
}
