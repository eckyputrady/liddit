
export interface Profile {
  id: string,
  bgUrl?: string;
  profPicUrl?: string;
  title?: string;
  subtitle?: string;
  paragraph?: string;
}

export interface Link {
  id: string,
  logo?: 'whatsapp' | 'linkedin' | 'facebook' | 'youtube' | 'twitter' | 'medium' | 'cart';
  text: string;
  url: string
}