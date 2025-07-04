'use client';

import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
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
const ROWS_PER_FETCH = 5;

export default function FlatsPage() {
  const [listings, setListings] = useState<FlatListing[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [startRow, setStartRow] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [selectedPostContent, setSelectedPostContent] = useState<string | null>(null);
  const [isPostContentOpen, setIsPostContentOpen] = useState(false);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const observer = useRef<IntersectionObserver>();
  const loaderRef = useCallback((node: HTMLTableRowElement | null) => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    const options = {
      root: scrollContainerRef.current,
      rootMargin: '0px 0px 200px 0px', // load more when 200px from the bottom
    };
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !searchTerm) {
         setStartRow(prev => prev + ROWS_PER_FETCH);
      }
    }, options);

    if (node) observer.current.observe(node);
  }, [loading, hasMore, searchTerm]);


  const parseListings = useCallback((rows: string[][], currentHeaders: string[], baseId: number) => {
    return rows.map((row, index) => {
      const listing: any = { id: baseId + index };
      currentHeaders.forEach((header, i) => {
          const key = headerMapping[header];
          if (key) {
              listing[key] = row[i] || '';
          }
      });
      return listing as FlatListing;
    });
  }, []);

  useEffect(() => {
    if (!hasMore) return;
    
    const fetchListings = async () => {
      setLoading(true);
      setError(null);
      const isFirstFetch = startRow === 1;
      const endRow = startRow + ROWS_PER_FETCH - 1;
      const range = `Sheet1!A${startRow}:N${endRow}`;
      const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;
      
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        const values: string[][] = data.values;

        if (!values || values.length === 0) {
          setHasMore(true);
          setLoading(false);
          return;
        }

        let newRows: string[][];
        let currentHeaders: string[];

        if (isFirstFetch) {
            currentHeaders = values[0];
            setHeaders(currentHeaders);
            newRows = values.slice(1);
        } else {
            currentHeaders = headers;
            newRows = values;
        }
        
        const baseId = listings.length;
        const parsedListings = parseListings(newRows, currentHeaders, baseId);
        
        setListings(prev => [...prev, ...parsedListings]);
        
        const expectedRows = isFirstFetch ? ROWS_PER_FETCH - 1 : ROWS_PER_FETCH;
        if (newRows.length < expectedRows) {
            setHasMore(false);
        }
        
      } catch (e: any) {
        setError(e.message);
        setHasMore(false);
        console.error("Failed to fetch flat listings:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [startRow, hasMore, headers, listings.length, parseListings]);


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
    <div className="flex-1 flex flex-col">
      <Card className="flex-1 flex flex-col">
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
        <CardContent className="p-0 flex-1 overflow-y-auto" ref={scrollContainerRef}>
          <div className="overflow-x-auto">
            <Table>
                <TableHeader className="sticky top-0 bg-card z-10">
                <TableRow>
                    {headers.length > 0 
                      ? headers.map(header => <TableHead key={header} className="whitespace-nowrap">{header}</TableHead>)
                      : Array.from({ length: 14 }).map((_, i) => <TableHead key={i}><div className="h-4"></div></TableHead>)
                    }
                </TableRow>
                </TableHeader>
                <TableBody>
                {filteredListings.map((listing, index) => {
                    const isLastElement = index === filteredListings.length - 1;
                    return (
                      <TableRow key={listing.id} ref={isLastElement ? loaderRef : null}>
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
                    );
                })}
                {listings.length === 0 && loading && (
                    <TableRow>
                      <TableCell colSpan={14} className="h-48 text-center">
                          <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto" />
                      </TableCell>
                    </TableRow>
                )}
                {filteredListings.length === 0 && !loading && (
                    <TableRow>
                        <TableCell colSpan={14} className="h-24 text-center">
                            {searchTerm ? `No listings found for "${searchTerm}".` : "No listings found."}
                        </TableCell>
                    </TableRow>
                )}
                </TableBody>
            </Table>
          </div>
        </CardContent>
         <CardFooter className="flex items-center justify-center py-4 min-h-[4rem]">
            {loading && listings.length > 0 && <Loader2 className="h-6 w-6 animate-spin text-primary" />}
            {!loading && !hasMore && listings.length > 0 && searchTerm === '' && <p className="text-muted-foreground">You've reached the end.</p>}
            {error && <div className="text-red-500">Failed to load more listings: {error}</div>}
        </CardFooter>
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
