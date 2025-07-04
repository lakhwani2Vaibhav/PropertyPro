'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
const ROWS_PER_PAGE = 50;

export default function FlatsPage() {
  const [listings, setListings] = useState<FlatListing[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  const [selectedPostContent, setSelectedPostContent] = useState<string | null>(null);
  const [isPostContentOpen, setIsPostContentOpen] = useState(false);

  const observer = useRef<IntersectionObserver>();
  const lastListingElementRef = useCallback((node: HTMLTableRowElement) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prevPage => prevPage + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [loading, hasMore]);

  const fetchListings = useCallback(async (pageNum: number) => {
    setLoading(true);
    setError(null);
    
    const startRow = (pageNum - 1) * ROWS_PER_PAGE + 1;
    // Header is row 1, so data starts at row 2.
    const dataStartRow = startRow === 1 ? 2 : startRow; 
    const endRow = dataStartRow + ROWS_PER_PAGE -1;

    // A1:N is the range for columns
    const range = `Sheet1!A${startRow}:${'N'}${endRow}`;
    const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
    
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const values: string[][] = data.values;

      if (!values) {
        setHasMore(false);
        if (pageNum === 1) {
            setListings([]);
            setError("No data returned from API.");
        }
        return;
      }
      
      const fetchedHeaders = pageNum === 1 ? values[0] : headers;
      const fetchedRows = pageNum === 1 ? values.slice(1) : values;

      if (pageNum === 1) {
        setHeaders(fetchedHeaders);
      }

      const parsedListings = fetchedRows.map((row, index) => {
        const listing: any = { id: (pageNum - 1) * ROWS_PER_PAGE + index };
        fetchedHeaders.forEach((header, i) => {
          const key = headerMapping[header];
          if (key) {
            listing[key] = row[i] || '';
          }
        });
        return listing as FlatListing;
      });
      
      setListings(prev => [...prev, ...parsedListings]);
      setHasMore(parsedListings.length === ROWS_PER_PAGE);
      
    } catch (e: any) {
      setError(e.message);
      console.error("Failed to fetch flat listings:", e);
    } finally {
      setLoading(false);
    }
  }, [headers]);

  useEffect(() => {
    // We only want to fetch page 1 on initial load
    if (page === 1) {
        fetchListings(1);
    }
  }, [fetchListings]);

  useEffect(() => {
    if (page > 1) {
        fetchListings(page);
    }
  }, [page, fetchListings]);


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
    <div className="space-y-6">
      <Card>
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
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
                <TableHeader>
                <TableRow>
                    {headers.map(header => <TableHead key={header}>{header}</TableHead>)}
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredListings.length > 0 ? (
                    filteredListings.map((listing, index) => {
                      if (filteredListings.length === index + 1) {
                        return (
                          <TableRow ref={lastListingElementRef} key={listing.id}>
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
                        )
                      } else {
                        return (
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
                        )
                      }
                    })
                ) : !loading && (
                    <TableRow>
                        <TableCell colSpan={14} className="h-24 text-center">
                            {searchTerm ? `No listings found for "${searchTerm}".` : "No listings found."}
                        </TableCell>
                    </TableRow>
                )}
                 {loading && (
                    <TableRow>
                      <TableCell colSpan={14} className="h-24 text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      </TableCell>
                    </TableRow>
                )}
                {error && !loading && (
                    <TableRow>
                      <TableCell colSpan={14} className="h-24 text-center text-red-500">
                          Failed to load listings: {error}
                      </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          </div>
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
