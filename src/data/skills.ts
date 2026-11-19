/** Grouped by how they are used. Only tools with real usage in roles or projects. */
export const skills = [
  { group: 'Languages', items: ['Java', 'Python', 'C++', 'Go', 'C#', 'TypeScript', 'SQL'] },
  { group: 'Backend & distributed systems', items: ['Spring Boot', '.NET', 'FastAPI', 'Kafka', 'gRPC', 'REST', 'Microservices', 'Event-driven design', 'WebSockets'] },
  { group: 'AI / ML', items: ['PyTorch', 'Multi-GPU DDP', 'Computer vision', '3D reconstruction', 'LLM APIs', 'RAG', 'LangGraph', 'Triton', 'CUDA'] },
  { group: 'Cloud & infrastructure', items: ['AWS', 'Azure', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions', 'Linux'] },
  { group: 'Data', items: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'DynamoDB'] },
  { group: 'Practices', items: ['Profiling (perf, GDB)', 'Benchmarking in CI', 'Canary releases', 'On-call & incident response', 'Code review'] },
] as const;
