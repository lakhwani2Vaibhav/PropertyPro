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

export type FlatListing = {
  id: number;
  userType: 'Tenant' | 'Landlord';
  gender: 'Male' | 'Female';
  area: string;
  address: string;
  flatType: 'Apartment' | 'House' | 'Condo';
  rent: number;
  deposit: number;
  availability: string;
  phoneNumber: string;
  datePosted: string;
  source: string;
  emailOrMessenger: string;
  pictures: number;
  postContent: string;
};

export const flatListings: FlatListing[] = [
  { id: 1, userType: 'Tenant', gender: 'Female', area: 'Downtown', address: '123 Main St', flatType: 'Apartment', rent: 15000, deposit: 30000, availability: 'Immediate', phoneNumber: '987-654-3210', datePosted: '2024-07-20', source: 'Facebook', emailOrMessenger: 'user1@email.com', pictures: 3, postContent: 'Young professional looking for a 1BHK in a quiet neighborhood. Preferably furnished.' },
  { id: 2, userType: 'Landlord', gender: 'Male', area: 'Uptown', address: '456 Oak Ave', flatType: 'House', rent: 20000, deposit: 40000, availability: '2024-08-01', phoneNumber: '987-654-3211', datePosted: '2024-07-19', source: 'Website', emailOrMessenger: 'landlord2@email.com', pictures: 5, postContent: 'Spacious 3BHK house with a garden, perfect for families. Pets allowed.' },
  { id: 3, userType: 'Tenant', gender: 'Female', area: 'Midtown', address: '789 Pine Ln', flatType: 'Condo', rent: 18000, deposit: 36000, availability: 'Immediate', phoneNumber: '987-654-3212', datePosted: '2024-07-18', source: 'Zillow', emailOrMessenger: 'user3@email.com', pictures: 0, postContent: 'Student seeking a room in a shared condo. Budget is 18k.' },
  { id: 4, userType: 'Landlord', gender: 'Male', area: 'Downtown', address: '101 Elm St', flatType: 'Apartment', rent: 16000, deposit: 32000, availability: 'Immediate', phoneNumber: '987-654-3213', datePosted: '2024-07-18', source: 'Facebook', emailOrMessenger: 'landlord4@email.com', pictures: 4, postContent: 'Modern 2BHK apartment with city views and pool access.' },
  { id: 5, userType: 'Tenant', gender: 'Male', area: 'Uptown', address: '222 Maple Ave', flatType: 'House', rent: 22000, deposit: 44000, availability: '2024-09-01', phoneNumber: '987-654-3214', datePosted: '2024-07-17', source: 'Broker', emailOrMessenger: 'user5@email.com', pictures: 1, postContent: 'Family of 4 looking for a house with at least 2 bathrooms.' },
  { id: 6, userType: 'Landlord', gender: 'Female', area: 'Midtown', address: '333 Cedar Ln', flatType: 'Condo', rent: 20000, deposit: 40000, availability: 'Immediate', phoneNumber: '987-654-3215', datePosted: '2024-07-16', source: 'Website', emailOrMessenger: 'landlord6@email.com', pictures: 6, postContent: 'Luxury condo with gym and security. Fully furnished.' },
  { id: 7, userType: 'Tenant', gender: 'Female', area: 'Downtown', address: '444 Oak St', flatType: 'Apartment', rent: 17000, deposit: 34000, availability: 'Immediate', phoneNumber: '987-654-3216', datePosted: '2024-07-15', source: 'Facebook', emailOrMessenger: 'user7@email.com', pictures: 2, postContent: 'Looking for a pet-friendly apartment near the metro station.' },
  { id: 8, userType: 'Landlord', gender: 'Male', area: 'Uptown', address: '555 Pine Ave', flatType: 'House', rent: 23000, deposit: 46000, availability: '2024-08-15', phoneNumber: '987-654-3217', datePosted: '2024-07-14', source: 'Zillow', emailOrMessenger: 'landlord8@email.com', pictures: 8, postContent: 'Beautifully renovated house with a modern kitchen and a large garage.' },
  { id: 9, userType: 'Tenant', gender: 'Male', area: 'Midtown', address: '666 Elm Ln', flatType: 'Condo', rent: 19000, deposit: 38000, availability: 'Immediate', phoneNumber: '987-654-3218', datePosted: '2024-07-13', source: 'Broker', emailOrMessenger: 'user9@email.com', pictures: 0, postContent: 'Urgently need a condo in Midtown for a 1-year lease.' },
];
