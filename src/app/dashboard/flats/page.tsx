'use client';

import {
  Card,
  CardContent,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { flatListings, type FlatListing } from '@/lib/mock-data';

export default function FlatsPage() {
  return (
    <div className="space-y-4">
       <div>
            <h1 className="text-3xl font-bold">Flat Listings</h1>
            <p className="text-muted-foreground">Browse and manage flat listings for tenants and landlords.</p>
        </div>
      <Card>
        <CardContent className="p-0">
            <Table>
                <TableHeader>
                <TableRow>
                    <TableHead>Listing Type</TableHead>
                    <TableHead>Gender</TableHead>
                    <TableHead>Area</TableHead>
                    <TableHead>Address</TableHead>
                    <TableHead>Flat Type</TableHead>
                    <TableHead className="text-right">Rent/Budget</TableHead>
                    <TableHead className="text-right">Deposit</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                {flatListings.map((listing: FlatListing) => (
                    <TableRow key={listing.id}>
                    <TableCell>{listing.listingType}</TableCell>
                    <TableCell>{listing.gender}</TableCell>
                    <TableCell>{listing.area}</TableCell>
                    <TableCell className="font-medium">{listing.address}</TableCell>
                    <TableCell>{listing.flatType}</TableCell>
                    <TableCell className="text-right">
                        ₹{listing.rent.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-right">
                        ₹{listing.deposit.toLocaleString('en-IN')}
                    </TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  );
}
