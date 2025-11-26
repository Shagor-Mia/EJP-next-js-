import type { User, Event } from './definitions';
import { PlaceHolderImages } from './placeholder-images';

let users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@eventflow.com',
    // password: 'password123' (hashed)
    password:
      '$2a$10$2.GQTnJ42a42SXOv5z8C1.JJhYmJjT0R1wzX2/fB/E/2fE/2fE/2f',
    image: 'https://i.pravatar.cc/150?u=admin@eventflow.com',
  },
];

const getImage = (hint: string) => {
    const image = PlaceHolderImages.find(img => img.imageHint.includes(hint));
    return image ? image.imageUrl : PlaceHolderImages[0].imageUrl;
}

let events: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    description:
      'Join us for a three-day music festival featuring the biggest names in pop, rock, and electronic music. Enjoy live performances, food trucks, and art installations under the summer sun.',
    price: 150.0,
    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'High',
    imageUrl: getImage('concert'),
    category: 'Music',
    createdBy: '1',
  },
  {
    id: '2',
    title: 'Global Tech Conference 2024',
    description:
      'The premier event for technology professionals. Hear from industry leaders, discover the latest trends, and network with peers from around the world. Topics include AI, blockchain, and quantum computing.',
    price: 499.0,
    date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'High',
    imageUrl: getImage('conference'),
    category: 'Technology',
    createdBy: '1',
  },
  {
    id: '3',
    title: 'Creative Coding Workshop',
    description:
      'Unleash your creativity in this hands-on workshop. Learn to create interactive art and visualizations using JavaScript and p5.js. No prior coding experience required, just a curious mind.',
    price: 75.0,
    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Medium',
    imageUrl: getImage('workshop'),
    category: 'Workshop',
    createdBy: '1',
  },
  {
    id: '4',
    title: 'Startup Pitch Night',
    description: 'Watch the next generation of entrepreneurs pitch their innovative ideas to a panel of venture capitalists. A great opportunity for networking and inspiration. Free entry, but registration is required.',
    price: 0.00,
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Medium',
    imageUrl: getImage('meetup'),
    category: 'Business',
    createdBy: '1',
  },
   {
    id: '5',
    title: 'Charity Gala Dinner',
    description:
      'An elegant evening of dining, entertainment, and fundraising for a good cause. Black-tie optional. All proceeds will go to supporting local community projects.',
    price: 250.0,
    date: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Low',
    imageUrl: getImage('gala'),
    category: 'Gala',
    createdBy: '1',
  },
  {
    id: '6',
    title: 'AI in Healthcare Webinar',
    description: 'A virtual seminar exploring the impact of artificial intelligence on the healthcare industry. Join experts as they discuss breakthroughs, challenges, and the future of medicine.',
    price: 25.0,
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
    priority: 'Low',
    imageUrl: getImage('webinar'),
    category: 'Webinar',
    createdBy: '1',
  },
];

// --- User Functions ---
export const findUserByEmail = async (email: string): Promise<User | undefined> => {
  return users.find((user) => user.email === email);
};

export const findUserById = async (id: string): Promise<User | undefined> => {
    return users.find((user) => user.id === id);
}

export const createUser = async (user: Omit<User, 'id'>): Promise<User> => {
  const newUser = { ...user, id: (users.length + 1).toString() };
  users.push(newUser);
  return newUser;
};

// --- Event Functions ---
export const getEvents = async (query?: string, category?: string): Promise<Event[]> => {
  let filteredEvents = [...events];
  if (query) {
    filteredEvents = filteredEvents.filter(event => 
      event.title.toLowerCase().includes(query.toLowerCase()) || 
      event.description.toLowerCase().includes(query.toLowerCase())
    );
  }
  if (category && category !== 'All') {
    filteredEvents = filteredEvents.filter(event => event.category === category);
  }
  return filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

export const getEventById = async (id: string): Promise<Event | undefined> => {
  return events.find((event) => event.id === id);
};

export const getEventsByUser = async (userId: string): Promise<Event[]> => {
    return events.filter(event => event.createdBy === userId).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const createEvent = async (event: Omit<Event, 'id'>): Promise<Event> => {
  const newEvent = { ...event, id: (events.length + 1).toString() };
  events.unshift(newEvent);
  return newEvent;
};

export const deleteEvent = async (id: string): Promise<void> => {
  events = events.filter((event) => event.id !== id);
};

export const getEventCategories = async (): Promise<string[]> => {
    return ['All', ...Array.from(new Set(events.map(event => event.category)))];
}
