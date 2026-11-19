export interface Paper {
  title: string;
  authors: string;
  status: 'Published' | 'Submitted';
  venue: string;
  summary: string;
  method: string[];
  finding?: string;
  doi?: string;
}

export const papers: Paper[] = [
  {
    title: 'Time-Series Detection of Leaf Wetness Using a CNN-LSTM-Based Vision System in Strawberry Farming',
    authors: 'H. R. Sankaramaddi, W. S. Lee, N. A. Peres',
    status: 'Published',
    venue: 'Journal of Biosystems Engineering · 51(1) · 2026',
    summary:
      'Replaced unreliable leaf-wetness sensors with a camera and a ConvLSTM sequence model (CBAM attention, focal loss): 97% validation accuracy, beating a CNN-only baseline.',
    method: [
      'ConvLSTM: a CNN extracts droplet-level spatial features while an LSTM models how droplets form and evaporate over time',
      'CBAM attention to focus on wet regions',
      'Focal loss for heavy dry/wet class imbalance',
    ],
    finding: '97% validation accuracy, outperforming a CNN-only baseline and conventional wetness sensors.',
    doi: '10.1007/s42853-026-00302-6',
  },
  {
    title: '2D-to-3D Image Reconstruction in Agriculture: A Review of Methods, Challenges, and AI-Driven Opportunities',
    authors: 'H. R. Sankaramaddi, W. S. Lee, K. Kim, Y. Hong',
    status: 'Published',
    venue: 'Sensors · 26(6), 1775 · 2026',
    summary:
      'Compares SfM/MVS, LiDAR, NeRF, 3D Gaussian Splatting and 3D foundation models on accuracy, speed and field robustness; argues for hybrid foundation-model + geometry pipelines.',
    method: [
      'Photogrammetry (SfM/MVS) and SLAM vs. active sensing (LiDAR)',
      'Neural rendering: NeRF variants and 3D Gaussian Splatting',
      'Feed-forward 3D foundation models',
    ],
    finding:
      'Argues for hybrid pipelines that pair vision foundation models with geometric priors as the path to real-time, edge-deployable 4D crop digital twins.',
    doi: '10.3390/s26061775',
  },
  {
    title: 'Canopy Height and Volume Estimation for Precision Herbicide Application from a Single Top-Down Photograph',
    authors: 'H. R. Sankaramaddi, W. S. Lee, K. Kim, Y. Hong',
    status: 'Submitted',
    venue: 'Journal manuscript · under review',
    summary:
      'Benchmarks monocular depth pipelines for estimating weed height and volume from one RGB photo, with a conformal decision rule for choosing herbicide label rates.',
    method: [
      'Benchmarked monocular depth and 3D-geometry models (MoGe-2, Depth Pro, Depth Anything, UniDepth, Metric3D) as end-to-end pipelines',
      'Held-out train/test protocol on known objects, field crops and weeds against LiDAR and manual references',
      'A conformal decision rule that picks the lower label rate only when a training-derived error bound clears the label’s height step',
    ],
  },
];
