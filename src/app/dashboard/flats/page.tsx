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
const ITEMS_PER_PAGE = 10;

export default function FlatsPage() {
  const [allListings, setAllListings] = useState<FlatListing[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  const [selectedPostContent, setSelectedPostContent] = useState<string | null>(null);
  const [isPostContentOpen, setIsPostContentOpen] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      // Fetch header row + 50 data rows
      const range = `Sheet1!A1:N51`; 
      const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
      
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const values: string[][] = data.values;

        if (!values || values.length <= 1) {
          if (values && values.length > 0) {
            setHeaders(values[0]);
          } else {
             setError("No data returned from API.");
          }
          setAllListings([]);
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
        
        setAllListings(parsedListings);
        
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
    if (!searchTerm) return allListings;
    return allListings.filter(listing =>
      listing.area.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allListings, searchTerm]);

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);

  const paginatedListings = useMemo(() => {
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      return filteredListings.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredListings, currentPage]);
  
  const handleViewPostContent = (content: string) => {
    setSelectedPostContent(content);
    setIsPostContentOpen(true);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="flex flex-col h-full">
      <Card className="flex flex-col flex-grow">
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
                  onChange={handleSearchChange}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-auto">
          <Table>
              <TableHeader className="sticky top-0 bg-background z-10">
              <TableRow>
                  {headers.map(header => <TableHead key={header}>{header}</TableHead>)}
              </TableRow>
              </TableHeader>
              <TableBody>
              {loading ? (
                  <TableRow>
                    <TableCell colSpan={headers.length || 14} className="h-24 text-center">
                        <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                    </TableCell>
                  </TableRow>
              ) : error ? (
                  <TableRow>
                    <TableCell colSpan={headers.length || 14} className="h-24 text-center text-red-500">
                        Failed to load listings: {error}
                    </TableCell>
                  </TableRow>
              ) : paginatedListings.length > 0 ? (
                  paginatedListings.map((listing) => (
                    <TableRow key={listing.id}>
                      <TableCell>{listing.userType}</TableCell>
                      <TableCell>{listing.gender}</TableCell>
                      <TableCell>{listing.area}</TableCell>
                      <TableCell>{listing.address}</TableCell>
                      <TableCell>{listing.flatType}</TableCell>
                      <TableCell>{listing.rentBudget}</TableCell>
                      <TableCell>{listing.deposit}</TableCell>
                      <TableCell>{listing.availability}</TableCell>
                      <TableCell>{listing.phoneNumber}</TableCell>
                      <TableCell>{listing.datePosted}</TableCell>
                      <TableCell>{listing.source}</TableCell>
                      <TableCell>
                          {listing.emailOrMessenger && (
                              <a href={listing.emailOrMessenger} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  Link
                              </a>
                          )}
                      </TableCell>
                      <TableCell>
                         {listing.pictures && (
                          <a href={listing.pictures} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                  Link
                              </a>
                         )}
                      </TableCell>
                      <TableCell>
                          <Button variant="link" onClick={() => handleViewPostContent(listing.postContent)}>
                              View
                          </Button>
                      </TableCell>
                    </TableRow>
                  ))
              ) : (
                  <TableRow>
                      <TableCell colSpan={headers.length || 14} className="h-24 text-center">
                          {searchTerm ? `No listings found for "${searchTerm}".` : "No listings found."}
                      </TableCell>
                  </TableRow>
              )}
              </TableBody>
          </Table>
        </CardContent>
        {!loading && totalPages > 1 && (
          <CardFooter className="flex items-center justify-between border-t p-4">
              <div className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center gap-2">
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                  >
                      Previous
                  </Button>
                  <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                  >
                      Next
                  </Button>
              </div>
          </CardFooter>
        )}
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
