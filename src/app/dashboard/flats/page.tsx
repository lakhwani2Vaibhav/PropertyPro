'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

// Define the type for the flat listing
interface FlatListing {
  id: number;
  userType: string;
  gender: string;
  area: string;
  address: string;
  flatType: string;
  rentBudget: string;
  deposit: string;
  availability: string;
  phoneNumber: string;
  datePosted: string;
  source: string;
  emailOrMessenger: string;
  pictures: string;
  postContent: string;
}

// This mapping needs to be kept in sync with the sheet headers.
const headerMapping: { [key: string]: keyof FlatListing } = {
  'User Type': 'userType',
  'Gender': 'gender',
  'Area': 'area',
  'Address': 'address',
  'Flat Type': 'flatType',
  'Rent/ Budget': 'rentBudget',
  'Deposit': 'deposit',
  'Availability': 'availability',
  'Phone Number': 'phoneNumber',
  'Date Posted': 'datePosted',
  'Source': 'source',
  'Email/ Messenger': 'emailOrMessenger',
  'Pictures': 'pictures',
  'Post Content': 'postContent',
};

const API_KEY = 'AIzaSyDuGgoYJPAnMT1licNrIcN_pdmTeoDhqfw';
const SPREADSHEET_ID = '1qeKFSgvI5wVD9bYLjOs58C7EbT-EEGe4xQrx32VkxIo';

export default function FlatsPage() {
  const [listings, setListings] = useState<FlatListing[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const [selectedPostContent, setSelectedPostContent] = useState<string | null>(null);
  const [isPostContentOpen, setIsPostContentOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      
      const range = `Sheet1!A1:N20`; // Fetch first 20 data rows + 1 header row
      const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
      
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const values: string[][] = data.values;

        if (!values || values.length < 2) { // Need at least header and one data row
          setListings([]);
          setHeaders(values ? values[0] : Object.keys(headerMapping));
          if (!values) setError("No data returned from API.");
          return;
        }

        const fetchedHeaders = values[0];
        const fetchedRows = values.slice(1);
        
        setHeaders(fetchedHeaders);

        const parsedListings = fetchedRows.map((row, index) => {
          const listing: any = { id: index };
          fetchedHeaders.forEach((header, i) => {
            const key = headerMapping[header];
            if (key) {
              listing[key] = row[i] || '';
            }
          });
          return listing as FlatListing;
        });
        
        setListings(parsedListings);
        
      } catch (e: any) {
        setError(e.message);
        console.error("Failed to fetch flat listings:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, []);

  const filteredListings = useMemo(() => {
    if (!searchTerm) return listings;
    return listings.filter(listing =>
      listing.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [listings, searchTerm]);
  
  const handleViewPostContent = (content: string) => {
    setSelectedPostContent(content);
    setIsPostContentOpen(true);
  };

  return (
    <div className="h-full flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden">
         <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <CardTitle>Flat Listings</CardTitle>
              <p className="text-muted-foreground mt-1">Browse and manage flat listings for tenants and landlords.</p>
            </div>
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                  placeholder="Search by area..."
                  className="pl-9"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="flex-1 p-0 overflow-auto">
            <Table>
                <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                    {headers.map(header => <TableHead key={header} className="whitespace-nowrap">{header}</TableHead>)}
                </TableRow>
                </TableHeader>
                <TableBody>
                {loading ? (
                    <TableRow>
                      <TableCell colSpan={14} className="h-48 text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                          <p className="mt-2 text-muted-foreground">Loading listings...</p>
                      </TableCell>
                    </TableRow>
                ) : error ? (
                    <TableRow>
                      <TableCell colSpan={14} className="h-24 text-center text-red-500">
                          Failed to load listings: {error}
                      </TableCell>
                    </TableRow>
                ) : filteredListings.length > 0 ? (
                    filteredListings.map((listing) => (
                      <TableRow key={listing.id}>
                          <TableCell>{listing.userType}</TableCell>
                          <TableCell>{listing.gender}</TableCell>
                          <TableCell className="max-w-[150px] truncate">{listing.area}</TableCell>
                          <TableCell className="font-medium whitespace-nowrap max-w-[200px] truncate">{listing.address}</TableCell>
                          <TableCell>{listing.flatType}</TableCell>
                          <TableCell>{listing.rentBudget}</TableCell>
                          <TableCell>{listing.deposit}</TableCell>
                          <TableCell className="whitespace-nowrap">{listing.availability}</TableCell>
                          <TableCell className="whitespace-nowrap">{listing.phoneNumber}</TableCell>
                          <TableCell className="whitespace-nowrap">{listing.datePosted}</TableCell>
                          <TableCell>{listing.source}</TableCell>
                          <TableCell className="max-w-[150px] truncate">
                              {listing.emailOrMessenger && (
                                  <a href={listing.emailOrMessenger} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                      Link
                                  </a>
                              )}
                          </TableCell>
                          <TableCell className="max-w-[150px] truncate">
                             {listing.pictures && (
                              <a href={listing.pictures} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                      Link
                                  </a>
                             )}
                          </TableCell>
                          <TableCell>
                              <Button variant="link" className="p-0 h-auto" onClick={() => handleViewPostContent(listing.postContent)}>
                                  View
                              </Button>
                          </TableCell>
                      </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={14} className="h-24 text-center">
                            {searchTerm ? `No listings found for "${searchTerm}".` : "No listings found."}
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
        </CardContent>
      </Card>

       <Dialog open={isPostContentOpen} onOpenChange={setIsPostContentOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Post Content</DialogTitle>
          </DialogHeader>
          <ScrollArea className="max-h-[60vh] my-4 pr-6">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {selectedPostContent}
            </p>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
