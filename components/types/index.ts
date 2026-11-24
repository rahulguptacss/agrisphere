import data from '../data/data.json';

export interface LinkType {
  name: string;
  href: string;
}

export interface HeaderData {
  logo: string;
  logo_text: string;
  logo_tag: string;
  links: LinkType[];
  phone: string;
  phone_href: string;
  button_text: string;
  button_href: string;
  menu_label: string;
  close_label: string;
}

export interface FooterData {
  logo: string;
  logo_text: string;
  logo_tag: string;
  help_title: string;
  help_email: string;
  help_note: string;
  button_text: string;
  button_href: string;
  menu_title: string;
  links: LinkType[];
  contact_title: string;
  address: string;
  phone: string;
  phone_href: string;
  socials: LinkType[];
  watermark: string;
  copyright: string;
}

export interface BackToTopData {
  aria_label: string;
}

export interface HeroSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_accent: string;
  lead: string;
  features: { icon: string; label: string }[];
  cards: { image: string; alt: string; icon: string; label: string }[];
}

export interface AboutSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_accent: string;
  text: string;
  image: string;
  image_alt: string;
  field_image: string;
  field_alt: string;
  badge_label: string;
}

export interface ServicesSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_accent: string;
  lead: string;
  banner: string;
  banner_alt: string;
  prev_label: string;
  next_label: string;
  items: { icon: string; title: string; text: string; image: string; layout: string }[];
}

export interface WhySectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_accent: string;
  lead: string;
  image: string;
  image_alt: string;
  side_image: string;
  side_alt: string;
  points: { icon: string; title: string; text: string }[];
}

export interface TestimonialsSectionData {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  prev_label: string;
  next_label: string;
  items: { avatar: string; quote: string; name: string; role: string; stars: number }[];
}

export interface FaqSectionData {
  id: string;
  eyebrow: string;
  title: string;
  title_accent: string;
  lead: string;
  image: string;
  image_alt: string;
  scene: string;
  items: { icon: string; question: string; answer: string }[];
}

export interface ContactSectionData {
  id: string;
  watermark: string;
  eyebrow: string;
  title: string;
  title_accent: string;
  lead: string;
  image: string;
  image_alt: string;
  side_image: string;
  side_alt: string;
  name_placeholder: string;
  phone_placeholder: string;
  email_placeholder: string;
  subject_placeholder: string;
  message_placeholder: string;
  required_mark: string;
  button_text: string;
  success_message: string;
}

export const siteJson = data;
export const common = data.common;
export const template = data.categories.Agriculture.templateComponents['template-1'];
export const pages = template.pages;
export const sections = template.sections;
