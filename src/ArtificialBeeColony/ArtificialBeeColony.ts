import Graph from '../Graph';
import { getRandomNumberInRange } from '../utils';
import Logger from '../utils/Logger';
import {
  ArtificialBeeColonyConfig,
  ArtificialBeeColonyLoggerOptions,
} from './ArtificialBeeColony.types';

const DEFAULT_CONFIG: ArtificialBeeColonyConfig = {
  employedBeesCount: 2,
  onlookerBeesCount: 28,
};

export default class ArtificialBeeColony {
  private readonly EMPLOYED_BEES_COUNT: number;
  private readonly ONLOOKER_BEES_COUNT: number;
  private readonly PALETTE_SIZE = 10000;
  private readonly IS_VERBOSE: boolean;

  private readonly initialGraph: Graph;
  private graph: Graph;
  private palette: number[];

  private availableVertices: number[];
  private usedColors: number[] = [];

  constructor(
    graph: Graph,
    config: ArtificialBeeColonyConfig = DEFAULT_CONFIG
  ) {
    const { employedBeesCount, onlookerBeesCount, verbose } = config;
    this.EMPLOYED_BEES_COUNT = employedBeesCount;
    this.ONLOOKER_BEES_COUNT = onlookerBeesCount;
    this.IS_VERBOSE = !!verbose;

    this.initialGraph = graph;
    this.graph = this.initialGraph.getCopy();
    this.palette = this.generatePalette();

    this.availableVertices = this.graph.getVertexArray();
  }

  public getChromaticNumber() {
    this.log('===== STARTING ALGORITHM =====\n');
    while (!this.isCompleted()) {
      this.log('SENDING Employed bees\n');

      const chosenVertices = this.sendEmployedBees();

      this.log('CHOSEN VERTICES:');
      this.log(null, { array: chosenVertices });

      this.log('SENDING Onlooker bees\n');
      this.sendOnlookerBees(chosenVertices);

      this.log('CURRENT COLORING: ');
      this.log(null, { array: this.graph.getColors() });
    }

    const chromaticNumber = this.usedColors.length;
    return chromaticNumber;
  }

  public reset() {
    this.usedColors = [];
    this.availableVertices = this.graph.getVertexArray();
    this.graph = this.initialGraph.getCopy();
  }

  private sendEmployedBees() {
    const chosenVertices = [];
    for (let i = 0; i < this.EMPLOYED_BEES_COUNT; i += 1) {
      const randomVertexIndex = getRandomNumberInRange(
        0,
        this.availableVertices.length - 1
      );

      const randomVertex = this.availableVertices[randomVertexIndex];
      this.availableVertices = this.availableVertices.filter(
        (vertex) => vertex !== randomVertex
      );
      chosenVertices.push(randomVertex);
    }
    return chosenVertices;
  }

  private sendOnlookerBees(chosenVertices: number[]) {
    const degreesOfChosenVertices =
      this.getDegreesOfChosenVertices(chosenVertices);

    const onlookerBeesDistribution = this.getOnlookerBeesDistribution(
      degreesOfChosenVertices
    );

    chosenVertices.forEach((chosenVertex, chosenVertexIndex) => {
      const onlookerBeesCount = onlookerBeesDistribution[chosenVertexIndex];

      const adjacentVertices = this.graph.getAdjacentVertices(chosenVertex);
      this.colorAdjacentVertices(adjacentVertices, onlookerBeesCount);
      this.colorVertex(chosenVertex);
    });
  }

  private getOnlookerBeesDistribution(degreesOfChosenVertices: number[]) {
    const nectarValues = this.getNectarValues(degreesOfChosenVertices);
    let numberOfLeftOnlookerBees = this.ONLOOKER_BEES_COUNT;

    return nectarValues.map((nectar, index) => {
      if (index === nectarValues.length - 1) {
        return numberOfLeftOnlookerBees;
      }
      const numberOfBeesForThisSpot = Math.floor(
        nectar * numberOfLeftOnlookerBees
      );
      numberOfLeftOnlookerBees -= numberOfBeesForThisSpot;
      return numberOfBeesForThisSpot;
    });
  }

  private getNectarValues(degreesOfChosenVertices: number[]) {
    const sumOfDegrees = degreesOfChosenVertices.reduce(
      (prev, acc) => acc + prev,
      0
    );
    return degreesOfChosenVertices.map((degree) => degree / sumOfDegrees);
  }

  private colorAdjacentVertices(
    adjacentVertices: number[],
    onlookerBeesCount: number
  ) {
    adjacentVertices
      .slice(0, onlookerBeesCount)
      .forEach((adjacentVertex) => this.colorVertex(adjacentVertex));
  }

  private colorVertex(vertex: number) {
    const availableColors = [...this.usedColors];
    let isColored = false;

    while (!isColored) {
      if (availableColors.length === 0) {
        const newColor = this.getNextColor();
        this.usedColors.push(newColor);

        this.graph.tryToColor(vertex, newColor);
        break;
      }

      const randomColorIdx = getRandomNumberInRange(
        0,
        availableColors.length - 1
      );
      const color = availableColors[randomColorIdx];

      availableColors.splice(randomColorIdx, 1);
      isColored = this.graph.tryToColor(vertex, color);
    }
  }

  private getNextColor() {
    return this.palette[this.usedColors.length];
  }

  private getDegreesOfChosenVertices(chosenVertices: number[]) {
    return chosenVertices.map((vertex) => this.graph.getVertexDegree(vertex));
  }

  private generatePalette() {
    return Array.from({ length: this.PALETTE_SIZE }, (_, i) => i);
  }

  private isCompleted() {
    return this.graph.isValid();
  }

  private log(
    message: string | null,
    options?: ArtificialBeeColonyLoggerOptions
  ) {
    let array;

    if (options) {
      array = options.array;
    }

    if (this.IS_VERBOSE) {
      if (array) {
        Logger.logArray(array);
      } else {
        if (message) {
          Logger.log(message);
        }
      }
    }
  }
}
