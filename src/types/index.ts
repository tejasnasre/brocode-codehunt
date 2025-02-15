export interface Company {
  id: string;
  name: string;
  logo: string;
  description: string;
  location?: string;
  jobCount: number;
  revenue?: string;
  tags: string[];
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  resultCount?: number;
}
