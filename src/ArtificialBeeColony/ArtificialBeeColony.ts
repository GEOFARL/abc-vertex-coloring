import Graph from '../Graph';
import { ArtificialBeeColonyConfig } from './ArtificialBeeColony.types';

export default class ArtificialBeeColony {
  private readonly EMPLOYED_BEES_COUNT: number;
  private readonly ONLOOKER_BEES_COUNT: number;
  private readonly PALETTE_SIZE = 10000;

  private readonly initialGraph: Graph;
  private graph: Graph;
  private palette: number[];

  private availableVertices: number[];
  private usedColors: number[] = [];

  constructor(graph: Graph, config: ArtificialBeeColonyConfig) {
    const { employedBeesCount, onlookerBeesCount } = config;
    this.EMPLOYED_BEES_COUNT = employedBeesCount;
    this.ONLOOKER_BEES_COUNT = onlookerBeesCount;

    this.initialGraph = graph;
    this.graph = this.initialGraph.getCopy();
    this.palette = this.generatePalette();

    this.availableVertices = this.graph.getVertexArray();
  }

  public getChromaticNumber() {
    while (!this.isCompleted) {}
  }

  private generatePalette() {
    return Array.from({ length: this.PALETTE_SIZE }, (_, i) => i);
  }

  private isCompleted() {
    return this.graph.isValid();
  }
}
