// src/services/flat-service.ts

// Define the type for the flat listing
export interface FlatListing {
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

// Cache the listings to avoid fetching them on every request.
let cachedListings: FlatListing[] | null = null;
let lastFetchTime: number | null = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function fetchAllListings(): Promise<FlatListing[]> {
  const now = Date.now();
  if (cachedListings && lastFetchTime && (now - lastFetchTime < CACHE_DURATION)) {
    return cachedListings;
  }

  // Fetch all rows from the sheet. A1:N fetches columns A to N for all rows.
  const range = 'Sheet1!A1:N';
  const API_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`;

  try {
    const response = await fetch(API_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const values: string[][] = data.values;

    if (!values || values.length < 2) {
      return [];
    }

    const headers = values[0];
    const rows = values.slice(1);

    const parsedListings = rows.map((row, index) => {
      const listing: any = { id: index };
      headers.forEach((header, i) => {
        const key = headerMapping[header as keyof typeof headerMapping];
        if (key) {
          listing[key] = row[i] || '';
        }
      });
      return listing as FlatListing;
    });

    cachedListings = parsedListings;
    lastFetchTime = now;
    return parsedListings;
  } catch (e: any) {
    console.error("Failed to fetch all flat listings for tool:", e);
    // If fetching fails, return the cached version if available, otherwise an empty array.
    return cachedListings || [];
  }
}

export async function getListings(area?: string): Promise<FlatListing[]> {
    const allListings = await fetchAllListings();
    if (!area) {
        return allListings;
    }
    const lowercasedArea = area.toLowerCase();
    return allListings.filter(listing => 
        listing.area.toLowerCase().includes(lowercasedArea)
    );
}
