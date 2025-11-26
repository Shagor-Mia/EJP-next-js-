export type User = {
  id: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
};

export type Event = {
  id: string;
  title: string;
  description: string;
  price: number;
  date: string;
  priority: 'High' | 'Medium' | 'Low';
  imageUrl?: string;
  category: string;
  createdBy: string; // User ID
};
