export type ServiceCategory = 'all' | 'layanan' | 'pegawai';

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
  isFromCloud?: boolean;
}

export interface OfficeProfileData {
  officeName: string;
  subTitle: string;
  aboutText: string;
  address: string;
  phone: string;
  email: string;
  vision: string;
  mission: string;
}

export interface OfficerData {
  title: string;
  name: string;
  nip: string;
  initials: string;
  color: string;
  photoUrl?: string;
  description?: string;
  quote?: string;
  duties?: string[];
}

export interface PetaJabatanData {
  structureImageUrl?: string;
  kepalaLapas: OfficerData;
  kaurTu: OfficerData;
  subseksi: OfficerData[];
}
