interface User  {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    region: string; 
    postalCode: string;
    country: string;
  };
  
interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

export type { User, UserState };

