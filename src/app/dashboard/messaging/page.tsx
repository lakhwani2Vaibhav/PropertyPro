'use client'

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Send, Bot, Loader2, MessageSquare } from 'lucide-react';
import Balancer from 'react-wrap-balancer';
import { summarizeConversation } from './actions';
import { toast } from '@/hooks/use-toast';

const conversations = [
  {
    id: 1,
    name: 'Sarah Miller',
    property: '123 Oak Street',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman face',
    messages: [
      { id: 1, sender: 'Sarah Miller', text: 'Hi, the sink in my kitchen is leaking. Can you send someone to check it?', timestamp: '10:30 AM' },
      { id: 2, sender: 'You', text: 'Hi Sarah, I am sorry to hear that. I will arrange for a plumber to visit tomorrow. Is morning okay?', timestamp: '10:32 AM' },
      { id: 3, sender: 'Sarah Miller', text: 'Yes, morning works. Thanks!', timestamp: '10:35 AM' },
    ],
  },
  {
    id: 2,
    name: 'David Lee',
    property: '456 Pine Avenue',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'man face',
    messages: [
        { id: 1, sender: 'David Lee', text: 'Just confirming I\'ve paid this month\'s rent.', timestamp: 'Yesterday' },
        { id: 2, sender: 'You', text: 'Got it, David. Thanks for the confirmation!', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 3,
    name: 'Emily Chen',
    property: '222 Cedar Lane',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman portrait',
    messages: [],
  },
];

type Conversation = typeof conversations[0];
type Message = Conversation['messages'][0] & { isSummary?: boolean };


export default function MessagingPage() {
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(conversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        const updatedConversation: Conversation = {
            ...selectedConversation,
            messages: [
                ...selectedConversation.messages,
                { id: Date.now(), sender: 'You', text: newMessage, timestamp: 'Now' },
            ],
        };
        
        setSelectedConversation(updatedConversation);
        // In a real app, you would also update the main conversations array state
        setNewMessage('');
    };

    const handleSummarize = async () => {
        if (!selectedConversation || selectedConversation.messages.length === 0) {
            toast({
                title: "Cannot summarize",
                description: "There are no messages in this conversation to summarize.",
                variant: "destructive",
            });
            return;
        }
        setIsSummarizing(true);
        const conversationText = selectedConversation.messages.map(m => `${m.sender}: ${m.text}`).join('\n');
        const result = await summarizeConversation({ conversation: conversationText });
        setIsSummarizing(false);
        if (result.success && result.data) {
             const summaryMessage: Message = {
                id: Date.now(),
                sender: 'AI Assistant',
                text: result.data.summary,
                timestamp: 'Just now',
                isSummary: true,
            };
            const updatedConversation = {
                ...selectedConversation,
                messages: [...selectedConversation.messages, summaryMessage],
            };
            setSelectedConversation(updatedConversation);
        } else {
            toast({
                title: "Summarization Failed",
                description: result.error || "Could not generate summary.",
                variant: "destructive",
            });
        }
    };

  return (
    <div className="h-[calc(100vh-8.5rem)] border rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-full">
            <div className="col-span-1 md:col-span-1 lg:col-span-1 border-r bg-muted/50 flex flex-col">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold">Messages</h2>
                    <div className="relative mt-2">
                        <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input placeholder="Search messages..." className="pl-8" />
                    </div>
                </div>
                <ScrollArea className="flex-grow">
                    {conversations.map((convo) => (
                        <div
                            key={convo.id}
                            className={cn(
                                "flex items-start gap-3 p-4 cursor-pointer hover:bg-accent/50",
                                selectedConversation?.id === convo.id && "bg-accent/80"
                            )}
                            onClick={() => setSelectedConversation(convo)}
                        >
                            <Avatar>
                                <AvatarImage src={convo.avatar} data-ai-hint={convo.avatarHint} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow truncate">
                                <p className="font-semibold">{convo.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{convo.property}</p>
                                <p className="text-sm text-muted-foreground truncate">
                                    {convo.messages.length > 0 ? convo.messages[convo.messages.length - 1].text : "No messages yet"}
                                </p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
            <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col h-full bg-background">
                {selectedConversation ? (
                    <>
                        <CardHeader className="flex flex-row items-center justify-between border-b">
                            <div>
                                <h3 className="text-lg font-bold">{selectedConversation.name}</h3>
                                <p className="text-sm text-muted-foreground">{selectedConversation.property}</p>
                            </div>
                            <Button variant="outline" size="sm" onClick={handleSummarize} disabled={isSummarizing}>
                                {isSummarizing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Bot className="mr-2 h-4 w-4" />}
                                Summarize
                            </Button>
                        </CardHeader>
                        <ScrollArea className="flex-grow p-6">
                            <div className="space-y-6">
                                {selectedConversation.messages.map((msg: Message) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            'flex items-start gap-4',
                                            msg.sender === 'You' ? 'justify-end' : 'justify-start'
                                        )}
                                    >
                                        {msg.sender !== 'You' && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={msg.sender === 'AI Assistant' ? undefined : selectedConversation.avatar} data-ai-hint={selectedConversation.avatarHint}/>
                                                <AvatarFallback>
                                                    {msg.sender === 'AI Assistant' ? <Bot className="h-5 w-5"/> : msg.sender.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        <div
                                            className={cn(
                                                'max-w-md rounded-lg p-3',
                                                msg.sender === 'You'
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted',
                                                msg.isSummary && 'border border-primary/50 bg-primary/10'
                                            )}
                                        >
                                            <p className="font-bold text-sm mb-1">{msg.sender}</p>
                                            <Balancer>{msg.text}</Balancer>
                                            <p className="text-xs text-right mt-2 opacity-70">{msg.timestamp}</p>
                                        </div>
                                        {msg.sender === 'You' && (
                                            <Avatar className="h-8 w-8">
                                                <AvatarFallback>Y</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t bg-background">
                            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-2">
                                <Input
                                    placeholder={`Message ${selectedConversation.name}...`}
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    autoComplete="off"
                                />
                                <Button type="submit">
                                    <Send className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
                        <MessageSquare className="h-16 w-16 mb-4" />
                        <h3 className="text-lg font-medium">Select a conversation</h3>
                        <p className="text-sm">Choose a tenant from the list to see your message history.</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
