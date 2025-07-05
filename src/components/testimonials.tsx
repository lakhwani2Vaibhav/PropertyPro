'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { Heart, Smile } from 'lucide-react';

type Testimonial = {
  name: string;
  avatar: string;
  avatarHint: string;
  date: string;
  text: string;
};

const testimonials: Testimonial[] = [
  {
    name: 'Aman Sharma',
    avatar: 'https://randomuser.me/api/portraits/men/22.jpg',
    avatarHint: 'man face',
    date: 'March 25, 2025',
    text: "PropertyPro made finding my flatmate a breeze! The AI recommendations were spot on, and I found someone who shares my love for plants and good Wi-Fi.",
  },
  {
    name: 'Sneha Gupta',
    avatar: 'https://randomuser.me/api/portraits/women/23.jpg',
    avatarHint: 'woman face',
    date: 'March 22, 2025',
    text: "I was nervous about finding a stranger to live with, but PropertyPro's detailed profiles helped me find someone perfect. We're already best friends!",
  },
  {
    name: 'Raj Patel',
    avatar: 'https://randomuser.me/api/portraits/men/24.jpg',
    avatarHint: 'man portrait',
    date: 'March 23, 2025',
    text: 'Best decision ever! My new flatmate is clean, friendly, and we both love cooking. Thanks PropertyPro for making this so easy!',
  },
  {
    name: 'Priya Singh',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    avatarHint: 'woman portrait',
    date: 'March 24, 2025',
    text: 'Finally found the perfect flat AND flatmate through PropertyPro. The matching system really works - we even have the same sleep schedule!',
  },
  {
    name: 'Vikram Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/26.jpg',
    avatarHint: 'man profile',
    date: 'March 21, 2025',
    text: "The whole process was seamless. Found a great flat in my budget and a flatmate who's become like family. Highly recommend!",
  },
  {
    name: 'Anita Reddy',
    avatar: 'https://randomuser.me/api/portraits/women/17.jpg',
    avatarHint: 'woman profile',
    date: 'March 20, 2025',
    text: "PropertyPro understood exactly what I was looking for. My flatmate and I both love the same Netflix shows - it's like we were meant to be roomies!",
  },
];

const TestimonialCard = ({
  name,
  avatar,
  avatarHint,
  date,
  text,
  className,
}: Testimonial & { className?: string }) => (
  <div
    className={cn(
      'break-inside-avoid-column space-y-4 rounded-2xl bg-card p-6 shadow-md',
      className
    )}
  >
    <div className="flex items-center gap-3">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} data-ai-hint={avatarHint} />
        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-sm text-muted-foreground">{date}</p>
      </div>
    </div>
    <p className="text-muted-foreground">"{text}"</p>
    <Heart className="h-6 w-6 text-primary fill-primary/20" />
  </div>
);

const TestimonialColumn = ({
  testimonials,
  className,
}: {
  testimonials: Testimonial[];
  className?: string;
}) => (
  <div
    className={cn('flex flex-col gap-8', className)}
  >
    {testimonials.map((testimonial, index) => (
      <TestimonialCard key={index} {...testimonial} />
    ))}
  </div>
);

export function Testimonials() {
  const column1 = testimonials.slice(0, 3);
  const column2 = testimonials.slice(3, 6);
  const column3 = [...testimonials.slice(4, 6), ...testimonials.slice(0, 2)];

  return (
    <section className="bg-muted/30 py-16 sm:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
            <div className="relative inline-block">
                <Heart className="absolute -top-8 -left-12 h-16 w-16 text-primary/30 fill-primary/10" />
                <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
                    Flats figured out. <br/> Flatmates found.
                </h2>
            </div>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
            <Smile className="h-5 w-5" />
            <p className="font-medium">
              Here's what our users say after finding their perfect place (and people)
            </p>
          </div>
        </div>

        <div
          className="relative grid h-[45rem] grid-cols-1 gap-8 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] md:grid-cols-3"
        >
          {/* Column 1 */}
          <div className="animate-marquee-down space-y-8">
            <TestimonialColumn testimonials={column1} />
            <TestimonialColumn testimonials={column1} aria-hidden="true" />
          </div>

          {/* Column 2 */}
          <div className="hidden animate-marquee-up space-y-8 md:block">
            <TestimonialColumn testimonials={column2} />
            <TestimonialColumn testimonials={column2} aria-hidden="true" />
          </div>

          {/* Column 3 */}
          <div className="hidden animate-marquee-down space-y-8 md:block">
            <TestimonialColumn testimonials={column3} />
            <TestimonialColumn testimonials={column3} aria-hidden="true" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-muted/30 to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-muted/30 to-transparent" />
        </div>
      </div>
    </section>
  );
}