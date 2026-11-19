export interface Project {
  slug: string;
  name: string;
  kind: string;
  summary: string;
  problem: string;
  /** Request / data path, rendered as a left-to-right flow. */
  flow: string[];
  decisions: string[];
  results: { value: string; label: string }[];
  /** Short qualifier for where the numbers come from. */
  resultsNote?: string;
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: 'quick-chat',
    name: 'QuickChat',
    kind: 'Real-time messaging backend',
    summary: 'Horizontally scalable WebSocket messaging in Go, with Redis Pub/Sub as the cross-instance bus.',
    problem:
      'One WebSocket server is easy. With several, a message accepted by instance A must reach clients connected to instance B, without making servers stateful or putting the database on the hot path.',
    flow: ['Clients', 'Go WS servers', 'Redis Pub/Sub', 'Local fan-out', 'Redis history'],
    decisions: [
      'A hub goroutine owns client registration and broadcast in a single select loop: channel ownership instead of a lock around the client map.',
      'Redis Pub/Sub is the fan-out layer, so any server can accept any client and instances scale out independently.',
      'Recent history is served from Redis on connect, keeping PostgreSQL off the connection-setup path.',
      'Handles framing, backpressure and reconnection; concurrency verified data-race-free with Go’s race detector.',
    ],
    results: [
      { value: '5,000', label: 'concurrent connections' },
      { value: '8,500', label: 'messages / sec' },
      { value: '42 ms', label: 'p99 latency' },
    ],
    resultsNote: 'Load test',
    stack: ['Go', 'WebSockets', 'Redis Pub/Sub', 'PostgreSQL', 'React'],
  },
  {
    slug: 'feed-engine',
    name: 'feed-engine',
    kind: 'Event-driven feed backend',
    summary: 'Reddit-style feed generation: Kafka fan-out-on-write into per-user Redis sorted sets.',
    problem:
      'Synchronous fan-out blocks the API: a post from an account with 10k followers means 10k cache writes before the request returns. Kafka’s at-least-once delivery means every write must also be safe to replay.',
    flow: ['REST API', 'PostgreSQL', 'Kafka topics', 'Consumer group', 'Redis ZSET feeds'],
    decisions: [
      'Ingest, ranking and fan-out run as separate services; Kafka moves fan-out off the request path entirely.',
      'One Redis sorted set per user: O(log N) per follower write, O(log N + k) reads, with feeds trimmed to 1,000 entries to bound memory.',
      'Idempotent consumers: a processed_events log with ON CONFLICT DO NOTHING makes replays harmless.',
      'Consumer-group partitioning scales horizontally with no code changes; consumer lag and error rate are instrumented.',
    ],
    results: [
      { value: '3,200', label: 'events / sec sustained' },
      { value: '3', label: 'broker Kafka cluster' },
    ],
    resultsNote: 'Benchmark',
    stack: ['Go', 'Kafka', 'Redis', 'PostgreSQL', 'Docker Compose'],
  },
  {
    slug: 'llm-inference-runtime',
    name: 'LLM Inference Runtime',
    kind: 'ML systems',
    summary: 'A from-scratch serving runtime implementing the core ideas behind vLLM: scheduling, KV-cache reuse and continuous batching.',
    problem:
      'Serving frameworks hide where LLM latency actually goes. Building the scheduler, cache and batcher directly makes the prefill/decode trade-offs measurable.',
    flow: ['FastAPI', 'Continuous batcher', 'Prefill / decode', 'LRU KV cache', 'GPU'],
    decisions: [
      'An LRU KV-cache pool stores past key/values per request and tracks GPU memory per entry.',
      'An asyncio batcher admits new requests between decode steps instead of waiting for the batch to drain.',
      'Benchmarks report p50/p95 with warmup across prompt lengths and batch sizes.',
      'The README documents the remaining gap to vLLM: no padded batched forward pass, no paged attention, Python overhead.',
    ],
    results: [
      { value: '4.5×', label: 'aggregate tokens/s, batch 1 → 8' },
      { value: '~flat', label: 'decode cost across 32 → 512-token prompts' },
    ],
    resultsNote: 'GPT-2 on RTX 3090',
    stack: ['Python', 'PyTorch', 'Transformers', 'FastAPI', 'asyncio'],
  },
  {
    slug: 'gpu-kernels',
    name: 'GPU Kernels for DL',
    kind: 'Performance engineering',
    summary: 'Tiled matmul, fused softmax and parallel reduction in Triton and CUDA C++, benchmarked against cuBLAS and PyTorch.',
    problem:
      'What do vendor libraries do that a clean kernel doesn’t? The answer only shows up when you write the kernel and measure the gap.',
    flow: ['Global mem', 'Shared-mem tiles', 'Warp shuffles', 'Fused epilogue', 'CUDA events'],
    decisions: [
      'GEMM uses shared-memory tiling and L2-swizzled program order to raise cache hit rate on B tiles.',
      'Single-pass fused softmax with warp __shfl_xor_sync reductions: one read and one write instead of three and two.',
      'Two-phase reduction accumulates in fp32 regardless of input dtype to avoid fp16 overflow.',
      'Every kernel is validated against PyTorch, and the missing cuBLAS techniques are named: cp.async double-buffering, mma.sync, epilogue fusion.',
    ],
    results: [
      { value: '0.88×', label: 'of PyTorch softmax bandwidth at 8192×4096' },
      { value: '406 GB/s', label: 'effective bandwidth' },
    ],
    resultsNote: 'RTX 3090',
    stack: ['Triton', 'CUDA C++', 'PyTorch'],
  },
  {
    slug: 'agents',
    name: 'Agents from First Principles',
    kind: 'Applied AI',
    summary: 'A hand-rolled ReAct agent, extended into a LangGraph planner with specialist sub-agents and a comparative eval harness.',
    problem:
      'Agent frameworks hide the failure modes that matter in production: malformed tool calls, loops, premature answers and unbounded token spend.',
    flow: ['Planner', 'Dispatch', 'Retriever · Executor', 'Verifier', 'Aggregator'],
    decisions: [
      'Every tool call is validated against a Pydantic schema; precise validation errors are fed back for bounded retries.',
      'A self-critique pass runs before the step limit, then a forced finalization: no silent loop exhaustion.',
      'Typed shared state with append-only reducers, so no agent can clobber another’s results.',
      'Per-agent traces with latency and token accounting, plus a head-to-head eval mode against the single-agent baseline.',
    ],
    results: [
      { value: '30', label: 'multi-step tasks in the single-agent eval' },
      { value: '15', label: 'compound tasks in head-to-head eval' },
    ],
    resultsNote: 'Eval harness',
    stack: ['Python', 'LangGraph', 'Function calling', 'Pydantic'],
  },
  {
    slug: 'bias',
    name: 'Mitigating Gender Bias in AI Hiring',
    kind: 'Responsible AI · team of 6',
    summary: 'Detecting, mitigating and explaining gender bias in LLM-based candidate screening.',
    problem:
      'LLM screening models can inherit gender bias from historical hiring data, and a single accuracy number won’t reveal it.',
    flow: ['Profiles', 'LLM screening', 'Fairness metrics', 'Mitigation', 'LIME explanations'],
    decisions: [
      'Demographic parity, equalized odds and predictive parity, with bootstrapped confidence intervals.',
      'Evaluated on 73k+ Stack Overflow survey profiles and 962 resumes across local LLMs (e.g. Mistral 7B).',
      'Mitigation through counterfactual gender-swapped augmentation and chain-of-thought prompting.',
      'LIME attributions flag decisions that lean on gender cues; shipped behind an interactive web dashboard.',
    ],
    results: [{ value: '>10%', label: 'reduction in demographic-parity gap, minimal accuracy cost' }],
    resultsNote: 'Course project',
    stack: ['Python', 'LLMs', 'LIME', 'React'],
  },
];

export const moreProjects = [
  {
    name: 'File Transfer System',
    description: 'Multithreaded C++17 client/server over raw TCP with a fixed-header wire protocol, chunked I/O and path sanitization.',
    stack: ['C++17', 'POSIX sockets', 'std::thread'],
  },
  {
    name: 'Inbox Triage',
    description: 'Sorts a nonprofit’s shared inbox and drafts replies with an LLM; the OAuth scope guarantees it can never send mail.',
    stack: ['Python', 'Claude API', 'Gmail API', 'pytest'],
  },
  {
    name: 'VoiceCoder',
    description: 'Chrome extension that turns speech into code at the cursor across Monaco, CodeMirror, Ace and plain editors.',
    stack: ['JavaScript', 'Chrome MV3', 'LLM APIs'],
  },
];
