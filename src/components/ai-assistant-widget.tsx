'use client';

import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getAssistantResponse } from '@/app/dashboard/assistant/actions';
import { Bot, Loader2, Send, User, X, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import Balancer from 'react-wrap-balancer';

const formSchema = z.object({
  message: z.string().min(1),
});

type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export function AiAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

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
    setMessages((prev) => [...prev, userMessage]);
    form.reset();
    setIsLoading(true);

    const result = await getAssistantResponse({ query: values.message });
    
    if (result.success && result.data) {
      const botMessage: Message = { id: Date.now() + 1, text: result.data.response, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } else {
      const errorMessage: Message = { id: Date.now() + 1, text: result.error || 'Sorry, something went wrong.', sender: 'bot' };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setIsLoading(false);
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2">
      <div 
        className={cn(
          "w-full max-w-sm transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}
      >
        <Card className="h-[70vh] flex flex-col shadow-2xl">
          <CardHeader className='flex-row items-center justify-between'>
            <CardTitle className="flex items-center gap-2">
              <Bot /> AI Rental Assistant
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="flex-grow overflow-hidden">
            <ScrollArea className="h-full pr-4">
              <div className="space-y-6">
                {messages.length === 0 && (
                  <div className="text-center text-muted-foreground pt-16 flex flex-col items-center">
                      <Bot className="mx-auto h-12 w-12 mb-4"/>
                      <h3 className="text-lg font-medium">Welcome to your AI Assistant</h3>
                      <p className="text-sm max-w-md">Ask me anything about property management, market trends, or tenant issues.</p>
                      <p className="text-sm max-w-md mt-2">For example, try asking: <em className="text-primary not-italic">“What are the best ways to screen tenants?”</em></p>
                  </div>
                )}
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      'flex items-start gap-4',
                      message.sender === 'user' ? 'justify-end' : 'justify-start'
                    )}
                  >
                    {message.sender === 'bot' && (
                      <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                        <Bot className="h-5 w-5"/>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-md rounded-lg p-3',
                        message.sender === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      )}
                    >
                      <Balancer>{message.text}</Balancer>
                    </div>
                    {message.sender === 'user' && (
                      <Avatar className="h-8 w-8">
                        <AvatarFallback><User/></AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-4 justify-start">
                      <Avatar className="h-8 w-8 bg-primary text-primary-foreground flex items-center justify-center">
                        <Bot className="h-5 w-5"/>
                      </Avatar>
                      <div className="max-w-md rounded-lg p-3 bg-muted flex items-center">
                        <Loader2 className="h-5 w-5 animate-spin"/>
                      </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
          </CardContent>
          <CardFooter>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex w-full items-center space-x-2">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormControl>
                        <Input placeholder="Ask anything..." {...field} autoComplete="off" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
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
            "bg-primary hover:bg-primary/90 text-primary-foreground rounded-full h-auto py-3 px-5 shadow-lg flex items-center gap-3 transition-all duration-300",
            isOpen ? "opacity-0 -translate-y-2 pointer-events-none" : "opacity-100 translate-y-0"
          )}
        >
        <div className="relative">
          <Bot className="h-6 w-6" />
           <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
        </div>
        <div className="text-left">
          <p className="font-bold">AI Rental Assistant</p>
          <p className="text-xs opacity-80">Online now</p>
        </div>
        <Sparkles className="h-5 w-5 opacity-90" />
      </Button>
    </div>
  );
}
