'use client';

import { useState, useMemo, useRef, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Search, Send, ArrowLeft } from 'lucide-react';
import { conversations as initialConversations } from '@/lib/mock-data';
import { useIsMobile } from '@/hooks/use-mobile';

type Conversation = typeof initialConversations[0];
type Message = Conversation['messages'][0];

export default function MessagingPage() {
    const [conversations, setConversations] = useState(initialConversations);
    const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(initialConversations[0]);
    const [newMessage, setNewMessage] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const isMobile = useIsMobile();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        if (selectedConversation) {
            scrollToBottom();
        }
    }, [selectedConversation, selectedConversation?.messages]);


    const filteredConversations = useMemo(() => {
        if (!searchTerm) return conversations;
        const lowercasedTerm = searchTerm.toLowerCase();
        return conversations.filter(convo =>
            convo.name.toLowerCase().includes(lowercasedTerm) ||
            convo.property.toLowerCase().includes(lowercasedTerm)
        );
    }, [conversations, searchTerm]);

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim() || !selectedConversation) return;

        const updatedMessage = { id: Date.now(), sender: 'Landlord', text: newMessage, timestamp: 'Now' };

        const updatedConversation: Conversation = {
            ...selectedConversation,
            messages: [
                ...selectedConversation.messages,
                updatedMessage,
            ],
        };
        
        setSelectedConversation(updatedConversation);
        
        const updatedConversations = conversations.map(c => 
            c.id === updatedConversation.id ? updatedConversation : c
        );
        setConversations(updatedConversations);

        setNewMessage('');
    };
    
    const handleConversationSelect = (convo: Conversation) => {
        setSelectedConversation(convo);
    }

    const landlordAvatar = "https://placehold.co/100x100.png";
    const landlordAvatarHint = "man face";

    return (
        <div className="h-[calc(100vh-8.5rem)] flex border bg-card rounded-lg overflow-hidden">
            <div className={cn(
                "w-1/3 xl:w-1/4 border-r bg-muted/20 flex-col",
                isClient && isMobile ? (selectedConversation ? "hidden" : "flex w-full") : "flex"
            )}>
                <div className="p-4 border-b">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search"
                            className="pl-9 bg-background rounded-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
                <ScrollArea className="flex-grow">
                    {filteredConversations.map((convo) => (
                        <div
                            key={convo.id}
                            className={cn(
                                "flex items-center gap-4 p-4 cursor-pointer hover:bg-accent/50",
                                selectedConversation?.id === convo.id && "bg-primary/10"
                            )}
                            onClick={() => handleConversationSelect(convo)}
                        >
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={convo.avatar} data-ai-hint={convo.avatarHint} />
                                <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-grow truncate">
                                <p className="font-semibold">{convo.name}</p>
                                <p className="text-sm text-muted-foreground truncate">{convo.property}</p>
                            </div>
                        </div>
                    ))}
                </ScrollArea>
            </div>
            
            <div className={cn(
                "flex-1 flex flex-col h-full bg-background",
                isClient && isMobile && !selectedConversation && "hidden"
            )}>
                {selectedConversation ? (
                    <>
                        <div className="flex items-center gap-4 p-4 border-b">
                            {isClient && isMobile && (
                                <Button variant="ghost" size="icon" className="-ml-2" onClick={() => setSelectedConversation(null)}>
                                    <ArrowLeft className="h-5 w-5" />
                                </Button>
                            )}
                            <div>
                                <h2 className="text-2xl font-bold">{selectedConversation.name}</h2>
                                <p className="text-muted-foreground">{selectedConversation.property}</p>
                            </div>
                        </div>

                        <ScrollArea className="flex-grow p-6">
                            <div className="space-y-6">
                                {selectedConversation.messages.map((msg: Message) => (
                                    <div
                                        key={msg.id}
                                        className={cn(
                                            'flex w-full items-end gap-3',
                                            msg.sender === 'Landlord' ? 'justify-end' : 'justify-start'
                                        )}
                                    >
                                        {msg.sender !== 'Landlord' && (
                                            <Avatar className="h-8 w-8 shrink-0">
                                                <AvatarImage src={selectedConversation.avatar} data-ai-hint={selectedConversation.avatarHint}/>
                                                <AvatarFallback>
                                                    {msg.sender.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                        )}
                                        
                                        <div className={cn('flex flex-col max-w-[75%]', msg.sender === 'Landlord' && 'items-end')}>
                                           <p className="text-xs text-muted-foreground mb-1 px-1">
                                                {msg.sender === 'Landlord' ? 'Landlord' : msg.sender}
                                            </p>
                                            <div
                                                className={cn(
                                                    'rounded-2xl p-3 shadow-sm',
                                                    msg.sender === 'Landlord'
                                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                                        : 'bg-muted rounded-bl-none'
                                                )}
                                            >
                                                <p className="text-sm whitespace-pre-wrap break-words">{msg.text}</p>
                                            </div>
                                        </div>

                                        {msg.sender === 'Landlord' && (
                                            <Avatar className="h-8 w-8 shrink-0">
                                                <AvatarImage src={landlordAvatar} data-ai-hint={landlordAvatarHint}/>
                                                <AvatarFallback>L</AvatarFallback>
                                            </Avatar>
                                        )}
                                    </div>
                                ))}
                                <div ref={messagesEndRef} />
                            </div>
                        </ScrollArea>
                        
                        <div className="p-4 border-t bg-background">
                            <form onSubmit={handleSendMessage} className="flex w-full items-center space-x-4">
                               <Avatar className="h-10 w-10 shrink-0">
                                    <AvatarImage src={landlordAvatar} data-ai-hint={landlordAvatarHint}/>
                                    <AvatarFallback>L</AvatarFallback>
                                </Avatar>
                                <Input
                                    placeholder="Type a message..."
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    autoComplete="off"
                                    className="flex-1 bg-muted rounded-full"
                                />
                                <Button type="submit">
                                    Send
                                </Button>
                            </form>
                        </div>
                    </>
                ) : (
                    !isMobile && (
                        <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-4 text-center">
                            <h3 className="text-lg font-medium">Select a conversation</h3>
                            <p className="text-sm">Choose a tenant from the list to see your message history.</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
}