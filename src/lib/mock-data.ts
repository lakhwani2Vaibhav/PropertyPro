export const portfolioProperties = [
    { id: 1, address: "Whitefield Complex", type: "Apartment", status: "Occupied", rent: 95000, occupancy: "12/12 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "modern apartment", description: "A beautiful apartment complex in the heart of Whitefield, offering modern amenities and a vibrant community.", bedrooms: 2, bathrooms: 2, sqft: 1200 },
    { id: 2, address: "JP Nagar Units", type: "House", status: "Occupied", rent: 75000, occupancy: "1/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "suburban house", description: "A charming suburban house with a spacious backyard, perfect for families.", bedrooms: 3, bathrooms: 2, sqft: 1500 },
    { id: 3, address: "Koramangala Towers", type: "Apartment", status: "Vacant", rent: 82000, occupancy: "8/9 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "apartment building", description: "Luxury apartments in Koramangala with stunning city views and premium facilities.", bedrooms: 3, bathrooms: 3, sqft: 1800 },
    { id: 4, address: "Indiranagar Homes", type: "House", status: "Occupied", rent: 120000, occupancy: "1/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "luxury home", description: "An exclusive luxury home in the trendy Indiranagar area, designed for comfort and style.", bedrooms: 4, bathrooms: 4, sqft: 2500 },
    { id: 5, address: "HSR Layout Loft", type: "Apartment", status: "Occupied", rent: 65000, occupancy: "4/4 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "urban loft", description: "A stylish urban loft in HSR Layout, perfect for young professionals.", bedrooms: 1, bathrooms: 1, sqft: 800 },
    { id: 6, address: "Marathahalli Place", type: "Condo", status: "Vacant", rent: 58000, occupancy: "0/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "condo exterior", description: "A modern condo with great amenities, located in the bustling Marathahalli area.", bedrooms: 2, bathrooms: 2, sqft: 1100 },
];

export type Property = {
  id: number;
  address: string;
  rent: number;
  tenant: string;
  status: 'Occupied' | 'Vacant' | 'Pending';
};

export const properties: Property[] = [
  { id: 1, address: "123 Oak Street, Anytown", rent: 15000, tenant: "Sarah Miller", status: "Occupied" },
  { id: 2, address: "456 Pine Avenue, Anytown", rent: 12000, tenant: "David Lee", status: "Occupied" },
  { id: 3, address: "789 Maple Drive, Anytown", rent: 18000, tenant: "Vacant", status: "Vacant" },
  { id: 4, address: "101 Elm Court, Anytown", rent: 13000, tenant: "Pending", status: "Pending" },
  { id: 5, address: "222 Cedar Lane, Anytown", rent: 16000, tenant: "Emily Chen", status: "Occupied" },
  { id: 6, address: "333 Birch Place, Anytown", rent: 21000, tenant: "Vacant", status: "Vacant" },
];

export const leases = [
  { id: 1, propertyId: 1, property: "123 Oak Street, Anytown", tenant: "Emily Carter", startDate: new Date("2023-01-01"), endDate: new Date("2023-12-31"), rent: 15000, status: "Active" },
  { id: 2, propertyId: 2, property: "456 Maple Avenue, Anytown", tenant: "David Lee", startDate: new Date("2023-02-15"), endDate: new Date("2024-02-14"), rent: 12000, status: "Active" },
  { id: 3, propertyId: 3, property: "789 Pine Lane, Anytown", tenant: "Sarah Jones", startDate: new Date("2023-03-01"), endDate: new Date("2024-02-28"), rent: 18000, status: "Expired" },
  { id: 4, propertyId: 4, property: "101 Elm Road, Anytown", tenant: "Michael Brown", startDate: new Date("2023-04-01"), endDate: new Date("2024-03-31"), rent: 13000, status: "Pending Signature" },
  { id: 5, propertyId: 5, property: "222 Cedar Drive, Anytown", tenant: "Jessica Wilson", startDate: new Date("2023-05-15"), endDate: new Date("2024-05-14"), rent: 16000, status: "Active" },
];

export type Tenant = {
  id: string;
  name: string;
  property: string;
  status: 'Active' | 'Past' | 'Eviction';
};

export const tenants: Tenant[] = [
  { id: "1", name: "Sarah Miller", property: "123 Oak Street, Anytown", status: "Active" },
  { id: "2", name: "David Lee", property: "456 Pine Avenue, Anytown", status: "Active" },
  { id: "3", name: "Emily Chen", property: "222 Cedar Lane, Anytown", status: "Active" },
  { id: "4", name: "Michael Rodriguez", property: "333 Birch Place, Anytown", status: "Past" },
  { id: "5", name: "Jessica Williams", property: "101 Elm Court, Anytown", status: "Eviction" },
];

export const financialSummary = {
    totalRevenue: 456000,
    totalExpenses: 123000,
    netIncome: 333000,
};

export const rentPayments = [
    { id: 'txn_1', tenant: 'Sarah Miller', amount: 15000, date: '2024-07-01', status: 'Paid' },
    { id: 'txn_2', tenant: 'David Lee', amount: 12000, date: '2024-07-01', status: 'Paid' },
    { id: 'txn_3', tenant: 'Emily Chen', amount: 16000, date: '2024-07-01', status: 'Paid' },
    { id: 'txn_4', tenant: 'John Smith', amount: 18000, date: '2024-07-01', status: 'Late' },
    { id: 'txn_5', tenant: 'Jane Doe', amount: 13000, date: '2024-06-30', status: 'Paid' },
];

export const conversations = [
  {
    id: 1,
    name: 'Sarah Miller',
    property: '123 Oak Street',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman face',
    messages: [
      { id: 1, sender: 'Sarah Miller', text: 'Hi, the sink in my kitchen is leaking. Can you send someone to check it?', timestamp: '10:30 AM' },
      { id: 2, sender: 'Landlord', text: 'Hi Sarah, I am sorry to hear that. I will arrange for a plumber to visit tomorrow. Is morning okay?', timestamp: '10:32 AM' },
      { id: 3, sender: 'Sarah Miller', text: 'Yes, morning works. Thanks!', timestamp: '10:35 AM' },
    ],
  },
  {
    id: 2,
    name: 'David Lee',
    property: '456 Pine Avenue',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'man face',
    messages: [
        { id: 1, sender: 'David Lee', text: 'Just confirming I\'ve paid this month\'s rent.', timestamp: 'Yesterday' },
        { id: 2, sender: 'Landlord', text: 'Got it, David. Thanks for the confirmation!', timestamp: 'Yesterday' },
    ],
  },
  {
    id: 3,
    name: 'Emily Chen',
    property: '222 Cedar Lane',
    avatar: 'https://placehold.co/100x100.png',
    avatarHint: 'woman portrait',
    messages: [],
  },
];

export const dialogProperties = [
    { id: '1', address: '123 Oak Street, Anytown' },
    { id: '2', address: '456 Pine Avenue, Anytown' },
    { id: '3', address: '789 Maple Drive, Anytown' },
    { id: '4', address: '101 Elm Court, Anytown' },
    { id: '5', address: '222 Cedar Lane, Anytown' },
    { id: '6', address: '333 Birch Place, Anytown' },
];

export const dialogTenants = [
    { id: '1', name: "Sarah Miller" },
    { id: '2', name: "David Lee" },
    { id: '3', name: "Emily Chen" },
];

export type MaintenanceRequest = {
  id: number;
  property: string;
  propertyId: number;
  tenant: string;
  issue: string;
  dateReported: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'In Progress' | 'Completed';
};

export const maintenanceRequests: MaintenanceRequest[] = [
    { id: 1, propertyId: 1, property: '123 Oak Street, Anytown', tenant: 'Sarah Miller', issue: 'Leaky faucet in kitchen', dateReported: '2024-07-15', priority: 'High', status: 'Open' },
    { id: 2, propertyId: 2, property: '456 Pine Avenue, Anytown', tenant: 'David Lee', issue: 'Broken window in living room', dateReported: '2024-07-12', priority: 'High', status: 'In Progress' },
    { id: 3, propertyId: 5, property: '222 Cedar Lane, Anytown', tenant: 'Emily Chen', issue: 'HVAC unit not cooling', dateReported: '2024-07-10', priority: 'Medium', status: 'Completed' },
    { id: 4, propertyId: 4, property: '101 Elm Court, Anytown', tenant: 'Pending', issue: 'Paint touch-up needed in hallway', dateReported: '2024-07-05', priority: 'Low', status: 'Open' },
    { id: 5, propertyId: 3, property: '789 Maple Drive, Anytown', tenant: 'Vacant', issue: 'General cleaning before new tenant', dateReported: '2024-07-18', priority: 'Low', status: 'Open' },
];

export const vendors = [
  { id: '1', name: 'PlumbPerfect Inc.' },
  { id: '2', name: 'ElecTrific Solutions' },
  { id: '3', name: 'The Handy Man' },
  { id: '4', name: 'Clean Sweep Services' },
];

export const notifications = [
  { id: 1, title: 'New Maintenance Request', description: 'Leaky faucet reported at 123 Oak Street.', time: '5m ago' },
  { id: 2, title: 'Rent Paid', description: 'David Lee paid ₹12,000 for 456 Pine Avenue.', time: '1h ago' },
  { id: 3, title: 'Lease Expiring Soon', description: 'Lease for Emily Carter at 123 Oak Street expires in 30 days.', time: '1d ago' },
  { id: 4, title: 'AI Insight', description: 'Consider a 5% rent increase for properties in Anytown.', time: '2d ago' },
];


// Data for the swipeable listing cards
export type SwipeableProperty = {
  id: number;
  title: string;
  location: string;
  rent: number;
  deposit: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  availability: 'available' | 'unavailable';
  amenities: string[];
  images: string[];
};

export const swipeableProperties: SwipeableProperty[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  title: `Modern ${i % 3 + 1}BHK in ${['Koramangala', 'Indiranagar', 'HSR Layout', 'Whitefield'][i % 4]}`,
  location: `Near ${['Tech Park', 'Metro Station', 'Shopping Mall', 'City Center'][i % 4]}, Bangalore`,
  rent: 25000 + (i * 1500),
  deposit: 75000 + (i * 5000),
  bedrooms: i % 3 + 1,
  bathrooms: i % 2 + 1,
  sqft: 800 + (i * 100),
  availability: i % 5 === 0 ? 'unavailable' : 'available',
  amenities: ['Wi-Fi', 'Refrigerator', 'Washing Machine'].slice(0, i % 3 + 1),
  images: [
    `https://placehold.co/400x300.png?text=Property+${i+1}`,
    `https://placehold.co/400x300.png?text=Living+Room`,
    `https://placehold.co/400x300.png?text=Bedroom`,
    `https://placehold.co/400x300.png?text=Kitchen`,
  ],
}));
