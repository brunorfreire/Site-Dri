export interface ServiceItem {
  id: string;
  category: 'fisioterapia' | 'pilates' | 'performance';
  title: string;
  subtitle: string;
  description: string;
  indications: string[];
  benefits: string[];
  tag: string;
  iconName: string;
}

export interface AudienceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  badge: string;
  imageHint: string;
}

export interface CredentialItem {
  title: string;
  institution: string;
  yearOrDetail: string;
  description: string;
  iconName: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  age?: number;
  content: string;
  outcome: string;
  stars: number;
}

export interface PainAssessmentState {
  region: string;
  duration: string;
  intensity: number;
  primaryGoal: string;
  patientName: string;
  phone: string;
}
