export type ServiceCategory = 'all' | 'layanan' | 'pegawai' | 'sosmed';

export interface ServiceItem {
  id: string;
  title: string;
  category: 'layanan' | 'pegawai' | 'sosmed';
  categoryLabel: string;
  subTitle?: string;
  description: string;
  url: string;
  websiteUrl?: string;
  actionText: string;
  icon: string;
  badge?: string;
  badgeColor?: string;
  tags: string[];
  featured?: boolean;
  hasWorkflow?: boolean;
}

export interface WorkingSchedule {
  day: string;
  hours: string;
  isOpen: boolean;
}

export interface KilasBalikItem {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
  linkUrl?: string;
}
