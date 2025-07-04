import { portfolioProperties } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Bath, Square, Wallet, Wrench, Building } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const property = portfolioProperties.find(p => p.id.toString() === params.id);

    if (!property) {
        notFound();
    }

    const galleryImages = [
        { src: property.imageUrl, alt: property.address, hint: property.imageHint },
        { src: "https://placehold.co/800x600.png", alt: "Living Room", hint: "living room" },
        { src: "https://placehold.co/800x600.png", alt: "Bedroom", hint: "bedroom" },
        { src: "https://placehold.co/800x600.png", alt: "Kitchen", hint: "kitchen" },
        { src: "https://placehold.co/800x600.png", alt: "Bathroom", hint: "bathroom" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
                    &larr; Back to Portfolio
                </Link>
                <h1 className="text-3xl font-bold">{property.address}</h1>
                <p className="text-muted-foreground">{property.type}</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                     <Carousel className="w-full">
                        <CarouselContent>
                            {galleryImages.map((image, index) => (
                                <CarouselItem key={index}>
                                    <Card className="overflow-hidden">
                                        <Image 
                                            src={image.src} 
                                            alt={image.alt} 
                                            width={800} 
                                            height={600} 
                                            className="w-full h-auto object-cover aspect-[4/3]"
                                            data-ai-hint={image.hint}
                                        />
                                    </Card>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious className="left-4" />
                        <CarouselNext className="right-4" />
                    </Carousel>
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Key Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Status</span>
                                <Badge variant={property.status === 'Occupied' ? 'default' : 'secondary'}>{property.status}</Badge>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Monthly Rent</span>
                                <span className="font-semibold text-lg">₹{property.rent.toLocaleString()}</span>
                            </div>
                             <div className="border-t pt-4 grid grid-cols-3 gap-4 text-center">
                                <DetailItem icon={<BedDouble className="h-5 w-5 mx-auto text-primary" />} label="Bedrooms" value={property.bedrooms} />
                                <DetailItem icon={<Bath className="h-5 w-5 mx-auto text-primary" />} label="Bathrooms" value={property.bathrooms} />
                                <DetailItem icon={<Square className="h-5 w-5 mx-auto text-primary" />} label="Sq. Ft." value={property.sqft} />
                            </div>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Description</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">{property.description}</p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard title="Financials" icon={<Wallet className="text-muted-foreground" />}>
                     <p>Placeholder for property-specific financial charts or stats.</p>
                </InfoCard>
                 <InfoCard title="Maintenance History" icon={<Wrench className="text-muted-foreground" />}>
                     <p>Placeholder for maintenance requests and history for this property.</p>
                </InfoCard>
                 <InfoCard title="Lease Details" icon={<Building className="text-muted-foreground" />}>
                     <p>Placeholder for current and past lease information.</p>
                     <Button variant="outline" size="sm" className="mt-4">View Current Lease</Button>
                </InfoCard>
            </div>
        </div>
    );
}

function DetailItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string | number }) {
    return (
        <div>
            {icon}
            <p className="font-bold text-xl mt-1">{value}</p>
            <p className="text-xs text-muted-foreground">{label}</p>
        </div>
    )
}

function InfoCard({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-medium">{title}</CardTitle>
                {icon}
            </CardHeader>
            <CardContent>
                <div className="text-sm text-muted-foreground">
                    {children}
                </div>
            </CardContent>
        </Card>
    );
}
