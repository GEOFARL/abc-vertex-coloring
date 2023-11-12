import Graph from '../Graph';
import { getRandomNumberInRange } from '../utils';
import { ArtificialBeeColonyConfig } from './ArtificialBeeColony.types';

const DEFAULT_CONFIG: ArtificialBeeColonyConfig = {
  employedBeesCount: 2,
  onlookerBeesCount: 28,
};

export default class ArtificialBeeColony {
  private readonly EMPLOYED_BEES_COUNT: number;
  private readonly ONLOOKER_BEES_COUNT: number;
  private readonly PALETTE_SIZE = 10000;

  private readonly initialGraph: Graph;
  private graph: Graph;
  private palette: number[];

  private availableVertices: number[];
  private usedColors: number[] = [];

  constructor(
    graph: Graph,
    config: ArtificialBeeColonyConfig = DEFAULT_CONFIG
  ) {
    const { employedBeesCount, onlookerBeesCount } = config;
    this.EMPLOYED_BEES_COUNT = employedBeesCount;
    this.ONLOOKER_BEES_COUNT = onlookerBeesCount;

    this.initialGraph = graph;
    this.graph = this.initialGraph.getCopy();
    this.palette = this.generatePalette();

    this.availableVertices = this.graph.getVertexArray();
  }

  public getChromaticNumber() {
    while (!this.isCompleted()) {
      const chosenVertices = this.sendEmployedBees();
    }
  }

  private sendEmployedBees() {
    const chosenVertices = [];
    for (let i = 0; i < this.EMPLOYED_BEES_COUNT; i += 1) {
      const randomVertexIndex = getRandomNumberInRange(
        0,
        this.availableVertices.length
      );

      const randomVertex = this.availableVertices[randomVertexIndex];
      this.availableVertices = this.availableVertices.filter(
        (vertex) => vertex !== randomVertex
      );
      chosenVertices.push(randomVertex);
    }
    return chosenVertices;
  }

  private generatePalette() {
    return Array.from({ length: this.PALETTE_SIZE }, (_, i) => i);
  }

  private isCompleted() {
    return this.graph.isValid();
  }
}
