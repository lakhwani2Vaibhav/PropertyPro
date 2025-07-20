
'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getAssistantResponse } from '@/app/dashboard/assistant/actions';
import { textToSpeech } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

const words = ['Speak.', 'Swipe.', 'Shift.'];

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}

interface VoiceAssistantProps {
    onNotTalkerClick: () => void;
}

export function VoiceAssistant({ onNotTalkerClick }: VoiceAssistantProps) {
  const [index, setIndex] = useState(0);
  const [status, setStatus] = useState<'idle' | 'preparing' | 'listening' | 'thinking' | 'speaking'>('idle');
  const [transcript, setTranscript] = useState('');
  const [aiAudioUrl, setAiAudioUrl] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const isGreetingRef = useRef(false); // Ref to track if the current audio is a greeting
  const { toast } = useToast();

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        const recognition = recognitionRef.current;
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US';

        recognition.onresult = async (event: any) => {
          const spokenText = event.results[0][0].transcript;
          setTranscript(spokenText);
          setStatus('thinking');

          try {
            const assistantResult = await getAssistantResponse({ query: spokenText, history: [] });
            if (assistantResult.success && assistantResult.data) {
              const ttsResult = await textToSpeech({ text: assistantResult.data.response });
              if (ttsResult.success && ttsResult.data) {
                setAiAudioUrl(ttsResult.data);
              } else {
                throw new Error(ttsResult.error || 'Failed to generate audio.');
              }
            } else {
              throw new Error(assistantResult.error || 'Failed to get assistant response.');
            }
          } catch (error: any) {
            console.error(error);
            toast({ title: "Error", description: error.message, variant: "destructive" });
            setStatus('idle');
          }
        };

        recognition.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          toast({ title: "Voice Error", description: `Could not hear you. Please try again. Error: ${event.error}`, variant: "destructive" });
          setStatus('idle');
        };

        recognition.onend = () => {
          // If recognition ends and we were in 'listening' state, it means no speech was detected.
          if (status === 'listening') {
             setStatus('idle');
          }
        };
      } else {
        console.warn('Speech Recognition not supported in this browser.');
      }
    }
  }, [status, toast]);

  useEffect(() => {
    if (aiAudioUrl && audioRef.current) {
        setStatus('speaking');
        audioRef.current.src = aiAudioUrl;
        audioRef.current.play();
        audioRef.current.onended = () => {
            setAiAudioUrl(null);
            if (isGreetingRef.current) {
                isGreetingRef.current = false;
                // After greeting, start listening for user's response
                if (recognitionRef.current) {
                    setTranscript('');
                    setStatus('listening');
                    recognitionRef.current.start();
                }
            } else {
                // After a normal AI response, go back to idle
                setStatus('idle');
            }
        }
    }
  }, [aiAudioUrl]);

  const handleMicClick = async () => {
    if (status === 'listening') {
      recognitionRef.current?.stop();
      setStatus('idle');
    } else if (status === 'idle') {
      if (recognitionRef.current) {
        setStatus('preparing'); // Show we are preparing the greeting
        try {
          const ttsResult = await textToSpeech({ text: "Welcome to PropertyPro. Are you looking for a flat, or do you want to list a flat?" });
          if (ttsResult.success && ttsResult.data) {
            isGreetingRef.current = true;
            setAiAudioUrl(ttsResult.data);
          } else {
            throw new Error(ttsResult.error || 'Failed to generate greeting audio.');
          }
        } catch (error: any) {
            console.error(error);
            toast({ title: "Error", description: error.message, variant: "destructive" });
            setStatus('idle');
        }
      } else {
        toast({ title: "Not Supported", description: "Voice commands are not supported in your browser.", variant: "destructive" });
      }
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'preparing': return 'Connecting...';
      case 'listening': return 'Listening...';
      case 'thinking': return 'Thinking...';
      case 'speaking': return 'Speaking...';
      default: return 'TALK TO MITRA';
    }
  };

  return (
    <div className="text-foreground">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-5xl font-bold text-center h-16">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="inline-block text-primary"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </h3>
        <p className="mt-4 text-center text-lg text-gray-600 dark:text-gray-400">
          Find a room in a flat, vibe with flatmates, and experience AI-powered renting.
        </p>

        <div className="mt-8 relative max-w-md mx-auto p-1.5 rounded-full bg-background/80 backdrop-blur-sm border-2 border-transparent"
             style={{ background: 'linear-gradient(white, white) padding-box, linear-gradient(90deg, rgba(167, 139, 250, 1) 0%, rgba(236, 72, 153, 1) 50%, rgba(249, 158, 11, 1) 100%) border-box' }}>
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 rounded-full">
            <span className={cn(
                "ml-6 font-semibold tracking-wider transition-colors",
                status !== 'idle' ? 'text-primary' : 'text-muted-foreground'
            )}>
                {getStatusText()}
            </span>
            <button
              onClick={handleMicClick}
              disabled={status === 'preparing' || status === 'thinking' || status === 'speaking'}
              className="relative flex items-center justify-center w-16 h-16 rounded-full bg-primary text-primary-foreground disabled:opacity-70 disabled:cursor-not-allowed animate-float"
            >
              <AnimatePresence>
                {status === 'listening' && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-primary/50"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                )}
              </AnimatePresence>
              <div className="absolute inset-0 rounded-full" style={{background: 'radial-gradient(circle, rgba(255,116,97,0.8) 0%, rgba(255,116,97,0) 70%)'}}></div>
              <Mic className="h-7 w-7 z-10" />
               {/* Flame/Particle Animation */}
               <div className="absolute inset-0 animate-orbit" style={{animationDelay: '-0.1s'}}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[28px] w-1.5 h-1.5 bg-yellow-300 rounded-full" />
              </div>
               <div className="absolute inset-0 animate-orbit" style={{animationDelay: '-0.2s'}}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[28px] w-1.5 h-1.5 bg-amber-300 rounded-full" />
              </div>
               <div className="absolute inset-0 animate-orbit" style={{animationDelay: '-0.3s'}}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[28px] w-2 h-2 bg-yellow-400 rounded-full" />
              </div>
               <div className="absolute inset-0 animate-orbit" style={{animationDelay: '-0.4s'}}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[28px] w-1 h-1 bg-orange-300 rounded-full" />
              </div>
               <div className="absolute inset-0 animate-orbit" style={{animationDelay: '-0.5s'}}>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[28px] w-1.5 h-1.5 bg-amber-200 rounded-full" />
              </div>
            </button>
          </div>
        </div>
        <p className="mt-4 text-center text-sm">
          <button 
            onClick={onNotTalkerClick}
            className="text-muted-foreground underline hover:text-primary"
          >
            not a talker? let's tap &amp; type
          </button>
        </p>
        <audio ref={audioRef} className="hidden" />
      </div>
    </div>
  );
}
