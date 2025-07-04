'use client';

import { useState, useEffect, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardFooter,
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
import { Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

// Define the type for the flat listing based on API response
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

// Map headers to the FlatListing interface keys
const headerMapping: { [key: string]: keyof FlatListing } = {
  'User Type': 'userType',
  Gender: 'gender',
  Area: 'area',
  Address: 'address',
  'Flat Type': 'flatType',
  'Rent/ Budget': 'rentBudget',
  Deposit: 'deposit',
  Availability: 'availability',
  'Phone Number': 'phoneNumber',
  'Date Posted': 'datePosted',
  Source: 'source',
  'Email/ Messenger': 'emailOrMessenger',
  Pictures: 'pictures',
  'Post Content': 'postContent',
};

const API_URL = 'https://sheets.googleapis.com/v4/spreadsheets/1qeKFSgvI5wVD9bYLjOs58C7EbT-EEGe4xQrx32VkxIo/values/Sheet1!A1:N50?key=AIzaSyDuGgoYJPAnMT1licNrIcN_pdmTeoDhqfw';

export default function FlatsPage() {
  const [listings, setListings] = useState<FlatListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [selectedPostContent, setSelectedPostContent] = useState<string | null>(null);
  const [isPostContentOpen, setIsPostContentOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const values: string[][] = data.values;

        if (!values || values.length < 2) {
          setListings([]);
          return;
        }
        
        const headers = values[0];
        const rows = values.slice(1);

        const parsedListings: FlatListing[] = rows.map((row, index) => {
            const listing: any = { id: index };
            headers.forEach((header, i) => {
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

  // Pagination logic
  const totalPages = Math.ceil(listings.length / itemsPerPage);
  const paginatedListings = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return listings.slice(startIndex, endIndex);
  }, [listings, currentPage, itemsPerPage]);

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };
  
  const handleViewPostContent = (content: string) => {
    setSelectedPostContent(content);
    setIsPostContentOpen(true);
  };


  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 bg-red-50 p-4 rounded-md">
        <h3 className="font-bold">Error</h3>
        <p>Failed to load listings: {error}</p>
      </div>
    );
  }

  return (
    <>
      <div className="space-y-4">
        <Card>
           <CardHeader>
            <CardTitle>Flat Listings</CardTitle>
            <p className="text-muted-foreground">Browse and manage flat listings for tenants and landlords.</p>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                  <TableHeader>
                  <TableRow>
                      <TableHead className="whitespace-nowrap">User Type</TableHead>
                      <TableHead>Gender</TableHead>
                      <TableHead>Area</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead className="whitespace-nowrap">Flat Type</TableHead>
                      <TableHead className="whitespace-nowrap">Rent/Budget</TableHead>
                      <TableHead>Deposit</TableHead>
                      <TableHead>Availability</TableHead>
                      <TableHead className="whitespace-nowrap">Phone Number</TableHead>
                      <TableHead className="whitespace-nowrap">Date Posted</TableHead>
                      <TableHead>Source</TableHead>
                      <TableHead className="whitespace-nowrap">Email/Messenger</TableHead>
                      <TableHead>Pictures</TableHead>
                      <TableHead className="whitespace-nowrap">Post Content</TableHead>
                  </TableRow>
                  </TableHeader>
                  <TableBody>
                  {paginatedListings.length > 0 ? paginatedListings.map((listing: FlatListing) => (
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
                  )) : (
                    <TableRow>
                      <TableCell colSpan={14} className="h-24 text-center">
                        No listings found.
                      </TableCell>
                    </TableRow>
                  )}
                  </TableBody>
              </Table>
            </div>
          </CardContent>
          {totalPages > 1 && (
            <CardFooter className="flex items-center justify-between py-4">
                <div className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handlePrevPage} disabled={currentPage === 1}>
                        <ChevronLeft className="h-4 w-4" />
                        <span className="sr-only">Previous</span>
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleNextPage} disabled={currentPage === totalPages}>
                        <span className="sr-only">Next</span>
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </CardFooter>
          )}
        </Card>
      </div>

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
    </>
  );
}
