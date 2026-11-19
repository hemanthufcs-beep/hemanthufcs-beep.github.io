export interface Role {
  company: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  stack: string[];
}

export const experience: Role[] = [
  {
    company: 'University of Florida',
    title: 'Software Engineer',
    period: 'Jan 2025 — Present',
    location: 'Gainesville, FL',
    summary: 'Performance, data pipelines and computer vision for research workloads.',
    highlights: [
      'Rewrote a hot path in **C++17** (cache-friendly layouts, vectorized transforms): **4× throughput**, **48 → 11 ms** per item.',
      'Re-architected a **Kafka** worker pipeline on **Kubernetes**: batch runtime **42 → 27 min (−36%)**.',
      'Built **PyTorch** computer-vision pipelines with **multi-GPU DDP** training for segmentation and plant measurement.',
      'Shipped full-stack **FastAPI/React** services on Kubernetes, with automated benchmarks in **CI** that catch performance regressions before release.',
    ],
    stack: ['C++17', 'Python', 'PyTorch', 'Kafka', 'Kubernetes', 'FastAPI', 'PostgreSQL'],
  },
  {
    company: 'Tata Consultancy Services',
    title: 'Software Engineer',
    period: 'Jun 2022 — Jul 2024',
    location: 'India',
    summary: 'Backend engineer on production banking services.',
    highlights: [
      'Built **Java/Spring Boot** and **.NET** microservices at **~1,200 req/min**, shipped with canaries and feature flags.',
      'Cut **p95 latency 1.1 s → 180 ms** on the busiest endpoints by profiling, indexing and removing N+1 queries.',
      'Led a **monolith → Kafka** event-driven migration with clear service boundaries and circuit breakers.',
      'Built a graph-based **alert-correlation tool (BFS + Union-Find)** for root-cause analysis; primary on-call for **14 production incidents**.',
    ],
    stack: ['Java', 'Spring Boot', 'C#/.NET', 'Kafka', 'Redis', 'Azure', 'Kubernetes'],
  },
];

export const education = [
  {
    school: 'University of Florida',
    degree: 'M.S. Computer Science (CISE)',
    period: 'Aug 2024 — May 2026',
    location: 'Gainesville, FL',
    detail: 'GPA 3.80 / 4.0',
    notes: [
      'Research in the UF/IFAS Precision Agriculture Laboratory: vision systems for crop disease risk and single-image 3D measurement.',
    ],
  },
  {
    school: 'Osmania University',
    degree: 'B.E. Computer Science and Engineering',
    location: 'Hyderabad, India',
    detail: 'CGPA 8.50 / 10',
    notes: [
      'Coursework: Data Structures & Algorithms, Analysis of Algorithms, Distributed Systems, Database Systems, Operating Systems.',
    ],
  },
] as const;
