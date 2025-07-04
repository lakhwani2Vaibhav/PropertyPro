export const portfolioProperties = [
    { id: 1, address: "Whitefield Complex", type: "Apartment", status: "Occupied", rent: 95000, occupancy: "12/12 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "modern apartment", description: "A beautiful apartment complex in the heart of Whitefield, offering modern amenities and a vibrant community.", bedrooms: 2, bathrooms: 2, sqft: 1200 },
    { id: 2, address: "JP Nagar Units", type: "House", status: "Occupied", rent: 75000, occupancy: "1/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "suburban house", description: "A charming suburban house with a spacious backyard, perfect for families.", bedrooms: 3, bathrooms: 2, sqft: 1500 },
    { id: 3, address: "Koramangala Towers", type: "Apartment", status: "Vacant", rent: 82000, occupancy: "8/9 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "apartment building", description: "Luxury apartments in Koramangala with stunning city views and premium facilities.", bedrooms: 3, bathrooms: 3, sqft: 1800 },
    { id: 4, address: "Indiranagar Homes", type: "House", status: "Occupied", rent: 120000, occupancy: "1/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "luxury home", description: "An exclusive luxury home in the trendy Indiranagar area, designed for comfort and style.", bedrooms: 4, bathrooms: 4, sqft: 2500 },
    { id: 5, address: "HSR Layout Loft", type: "Apartment", status: "Occupied", rent: 65000, occupancy: "4/4 Units", imageUrl: "https://placehold.co/600x400.png", imageHint: "urban loft", description: "A stylish urban loft in HSR Layout, perfect for young professionals.", bedrooms: 1, bathrooms: 1, sqft: 800 },
    { id: 6, address: "Marathahalli Place", type: "Condo", status: "Vacant", rent: 58000, occupancy: "0/1 Unit", imageUrl: "https://placehold.co/600x400.png", imageHint: "condo exterior", description: "A modern condo with great amenities, located in the bustling Marathahalli area.", bedrooms: 2, bathrooms: 2, sqft: 1100 },
];

export const properties = [
  { id: 1, address: "123 Oak Street, Anytown", rent: 1500, tenant: "Sarah Miller", status: "Occupied" },
  { id: 2, address: "456 Pine Avenue, Anytown", rent: 1200, tenant: "David Lee", status: "Occupied" },
  { id: 3, address: "789 Maple Drive, Anytown", rent: 1800, tenant: "Vacant", status: "Vacant" },
  { id: 4, address: "101 Elm Court, Anytown", rent: 1300, tenant: "Pending", status: "Pending" },
  { id: 5, address: "222 Cedar Lane, Anytown", rent: 1600, tenant: "Emily Chen", status: "Occupied" },
  { id: 6, address: "333 Birch Place, Anytown", rent: 2100, tenant: "Vacant", status: "Vacant" },
];

export const leases = [
  { id: 1, property: "123 Oak Street, Anytown", tenant: "Sarah Miller", startDate: new Date("2023-08-01"), endDate: new Date("2024-07-31"), rent: 1500, status: "Active" },
  { id: 2, property: "456 Pine Avenue, Anytown", tenant: "David Lee", startDate: new Date("2023-06-15"), endDate: new Date("2024-06-14"), rent: 1200, status: "Active" },
  { id: 3, property: "222 Cedar Lane, Anytown", tenant: "Emily Chen", startDate: new Date("2024-01-01"), endDate: new Date("2024-12-31"), rent: 1600, status: "Active" },
  { id: 4, property: "333 Birch Place, Anytown", tenant: "Michael Rodriguez", startDate: new Date("2022-11-01"), endDate: new Date("2023-10-31"), rent: 2100, status: "Expired" },
  { id: 5, property: "101 Elm Court, Anytown", tenant: "Jessica Williams", startDate: new Date("2024-03-01"), endDate: new Date("2025-02-28"), rent: 1300, status: "Upcoming" },
];

export const tenants = [
  { id: "1", name: "Sarah Miller", property: "123 Oak Street, Anytown", status: "Active" },
  { id: "2", name: "David Lee", property: "456 Pine Avenue, Anytown", status: "Active" },
  { id: "3", name: "Emily Chen", property: "222 Cedar Lane, Anytown", status: "Active" },
  { id: "4", name: "Michael Rodriguez", property: "333 Birch Place, Anytown", status: "Past" },
  { id: "5", name: "Jessica Williams", property: "101 Elm Court, Anytown", status: "Eviction" },
];

export const financialSummary = {
    totalRevenue: 45600,
    totalExpenses: 12300,
    netIncome: 33300,
};

export const rentPayments = [
    { id: 'txn_1', tenant: 'Sarah Miller', amount: 1500, date: '2024-07-01', status: 'Paid' },
    { id: 'txn_2', tenant: 'David Lee', amount: 1200, date: '2024-07-01', status: 'Paid' },
    { id: 'txn_3', tenant: 'Emily Chen', amount: 1600, date: '2024-07-01', status: 'Paid' },
    { id: 'txn_4', tenant: 'John Smith', amount: 1800, date: '2024-07-01', status: 'Late' },
    { id: 'txn_5', tenant: 'Jane Doe', amount: 1300, date: '2024-06-30', status: 'Paid' },
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
      { id: 2, sender: 'You', text: 'Hi Sarah, I am sorry to hear that. I will arrange for a plumber to visit tomorrow. Is morning okay?', timestamp: '10:32 AM' },
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
        { id: 2, sender: 'You', text: 'Got it, David. Thanks for the confirmation!', timestamp: 'Yesterday' },
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
];

export const dialogTenants = [
    { id: '1', name: "Sarah Miller" },
    { id: '2', name: "David Lee" },
    { id: '3', name: "Emily Chen" },
];
