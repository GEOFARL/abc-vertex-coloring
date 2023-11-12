export interface GraphGeneratorConfig {
  vertexCount: number;
  minVertexDegree: number;
  maxVertexDegree: number;
  verbose?: boolean;
}

export interface GraphGeneratorLoggingOptions {
  logMatrix?: boolean;
  matrix?: number[][];
}
