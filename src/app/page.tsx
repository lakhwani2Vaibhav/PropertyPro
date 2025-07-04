import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Building, DollarSign, MessageSquare, LineChart, KeyRound } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <KeyRound className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-primary">KirayaEase Lite</h1>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/dashboard" passHref>
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/dashboard" passHref>
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
                Sign Up <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary bg-primary/10 rounded-lg p-4 inline-block">
            Smarter Renting, Simplified.
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-foreground/80">
            KirayaEase Lite brings AI-powered insights and streamlined management to your rental properties. Spend less time on admin, more on what matters.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link href="/dashboard" passHref>
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="#features" passHref>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </Link>
          </div>
        </section>

        <section id="features" className="py-16 md:py-24 bg-primary/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-primary">Features for Modern Landlords</h3>
              <p className="mt-4 text-md text-foreground/70">Everything you need to manage your properties efficiently.</p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<DollarSign className="h-8 w-8" />}
                title="AI Rent Suggestions"
                description="Leverage AI to find the optimal rent price for your properties based on market data, location, and features."
              />
              <FeatureCard
                icon={<Building className="h-8 w-8" />}
                title="Property Management"
                description="Easily add, track, and manage all your properties from a single, intuitive dashboard."
              />
              <FeatureCard
                icon={<KeyRound className="h-8 w-8" />}
                title="Lease Management"
                description="Create and manage lease agreements, track key dates, and store documents securely."
              />
              <FeatureCard
                icon={<LineChart className="h-8 w-8" />}
                title="Automated Invoicing"
                description="Generate and send rent invoices automatically. Get notified when tenants view and pay."
              />
              <FeatureCard
                icon={<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-stripe"><path d="M11.4 18.2c-2.02 0-3.83.96-5.01 2.54a1 1 0 0 0 1.54 1.28c.84-.98 2-1.54 3.46-1.54s2.62.56 3.46 1.54a1 1 0 0 0 1.54-1.28c-1.18-1.58-2.99-2.54-5.01-2.54z"/><path d="M12 2a10 10 0 1 0 10 10c0-5.52-4.48-10-10-10z"/><path d="M16.5 13.7a4.5 4.5 0 0 0-9 0"/><path d="M12 2a10 10 0 0 0-3.5 1.7L12 12l3.5-8.3A10 10 0 0 0 12 2z"/></svg>}
                title="Secure Payments"
                description="Integrate with Stripe to offer tenants a secure and convenient way to pay rent online."
              />
              <FeatureCard
                icon={<MessageSquare className="h-8 w-8" />}
                title="Internal Messaging"
                description="Communicate directly with your tenants for important notifications and quick resolutions."
              />
            </div>
          </div>
        </section>
        
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <h3 className="text-3xl font-bold text-primary">Powered by AI, Built for You</h3>
                    <p className="mt-4 text-lg text-foreground/80">
                        Our AI-powered rent suggestion engine analyzes millions of data points to give you a competitive edge. Set the right price, attract the best tenants, and maximize your ROI.
                    </p>
                    <div className="mt-6 space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <LineChart className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Market Analysis</h4>
                                <p className="text-foreground/70">Compares your property against similar listings in the area.</p>
                            </div>
                        </div>
                         <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <Building className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-semibold">Demand Trends</h4>
                                <p className="text-foreground/70">Adjusts for seasonal and regional demand fluctuations.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                  <Image src="https://placehold.co/600x400.png" alt="AI Dashboard" width={600} height={400} className="rounded-lg shadow-xl" data-ai-hint="data analytics dashboard" />
                </div>
            </div>
        </section>

      </main>
      <footer className="bg-primary/5 py-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-foreground/60">
          <p>&copy; {new Date().getFullYear()} KirayaEase Lite. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode, title: string, description:string }) {
  return (
    <Card className="bg-card/80 backdrop-blur-sm border-primary/20 hover:shadow-lg hover:border-primary/40 transition-all duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-4">
        <div className="p-3 rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        <CardTitle className="text-primary">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground/70">{description}</p>
      </CardContent>
    </Card>
  )
}
