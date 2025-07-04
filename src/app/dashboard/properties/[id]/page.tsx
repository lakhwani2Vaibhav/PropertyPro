import { portfolioProperties, maintenanceRequests, leases as allLeases } from "@/lib/mock-data";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BedDouble, Bath, Square, Wallet, Wrench, FileText, ChevronRight } from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const propertyId = parseInt(params.id, 10);
    const property = portfolioProperties.find(p => p.id === propertyId);

    if (!property) {
        notFound();
    }

    const propertyMaintenance = maintenanceRequests.filter(req => req.propertyId === propertyId);
    const propertyLeases = allLeases.filter(lease => lease.propertyId === propertyId);
    const currentLease = propertyLeases.find(lease => lease.status === 'Active');

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
                <Link href="/dashboard/properties" className="text-sm text-muted-foreground hover:text-primary mb-2 inline-block">
                    &larr; Back to Properties
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
                     <div className="space-y-2">
                        <div className="flex justify-between"><span>Annual Revenue:</span> <span className="font-medium">₹{(property.rent * 12).toLocaleString()}</span></div>
                        <div className="flex justify-between"><span>YTD Income:</span> <span className="font-medium">₹{(property.rent * 7).toLocaleString()}</span></div>
                     </div>
                </InfoCard>
                 <InfoCard title="Maintenance History" icon={<Wrench className="text-muted-foreground" />}>
                     {propertyMaintenance.length > 0 ? (
                         <ul className="space-y-3">
                            {propertyMaintenance.map(req => (
                                <li key={req.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{req.issue}</p>
                                        <p className="text-xs text-muted-foreground">{req.dateReported}</p>
                                    </div>
                                    <Badge variant="outline">{req.status}</Badge>
                                </li>
                            ))}
                         </ul>
                     ) : (
                         <p>No maintenance history for this property.</p>
                     )}
                </InfoCard>
                 <InfoCard title="Lease Details" icon={<FileText className="text-muted-foreground" />}>
                     {currentLease ? (
                         <div className="space-y-2">
                             <div className="flex justify-between"><span>Tenant:</span> <span className="font-medium">{currentLease.tenant}</span></div>
                             <div className="flex justify-between"><span>Start Date:</span> <span className="font-medium">{format(currentLease.startDate, "MM/dd/yyyy")}</span></div>
                             <div className="flex justify-between"><span>End Date:</span> <span className="font-medium">{format(currentLease.endDate, "MM/dd/yyyy")}</span></div>
                             <Button variant="outline" size="sm" className="w-full mt-4">
                                View Full Lease
                                <ChevronRight className="h-4 w-4 ml-2" />
                            </Button>
                         </div>
                     ) : (
                        <p>No active lease for this property.</p>
                     )}
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
