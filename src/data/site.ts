export const site = {
  name: 'Hemanth Reddy',
  fullName: 'Hemanth Reddy Sankaramaddi',
  role: 'Software Engineer',
  url: 'https://hemanthufcs-beep.github.io',
  title: 'Hemanth Reddy — Software Engineer',
  description:
    'Software engineer building distributed backends, performance-critical systems code, and applied ML. 2 years shipping banking microservices at TCS; M.S. Computer Science, University of Florida.',
  location: 'Gainesville, FL',
  availability: 'Open to full-time SWE & ML engineering roles · open to relocation',
  email: 'hemanthufcs@gmail.com',
} as const;

export const nav = [
  { href: '#experience', label: 'Experience' },
  { href: '#projects', label: 'Projects' },
  { href: '#research', label: 'Research' },
  { href: '#skills', label: 'Skills' },
  { href: '#contact', label: 'Contact' },
] as const;

/** Headline numbers shown in the hero. Every figure comes straight from the resume. */
export const proof = [
  {
    value: '1.1s→180ms',
    label: 'p95 latency on the highest-traffic banking endpoints',
    source: 'TCS',
  },
  {
    value: '4×',
    label: 'throughput from a C++17 hot-path rewrite (48 → 11 ms per item)',
    source: 'UF',
  },
  {
    value: '−36%',
    label: 'distributed batch runtime on Kafka + Kubernetes (42 → 27 min)',
    source: 'UF',
  },
  {
    value: '14',
    label: 'production incidents resolved as primary on-call',
    source: 'TCS',
  },
] as const;
