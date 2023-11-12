import Graph from '../Graph';
import {
  GraphGeneratorConfig,
  GraphGeneratorLoggingOptions,
} from './GraphGenerator.types';
import { getRandomNumberInRange } from '../utils';
import Logger from '../utils/Logger';

const DEFAULT_CONFIG = {
  vertexCount: 200,
  minVertexDegree: 1,
  maxVertexDegree: 20,
  verbose: false,
};

export default class GraphGenerator {
  private readonly VERTEX_COUNT: number;
  private readonly MIN_VERTEX_DEGREE: number;
  private readonly MAX_VERTEX_DEGREE: number;
  private readonly IS_VERBOSE: boolean;

  private adjMatrix: number[][];

  constructor(config: GraphGeneratorConfig = DEFAULT_CONFIG) {
    const { vertexCount, minVertexDegree, maxVertexDegree, verbose } = config;
    this.VERTEX_COUNT = vertexCount;
    this.MIN_VERTEX_DEGREE = minVertexDegree;
    this.MAX_VERTEX_DEGREE = maxVertexDegree;

    this.IS_VERBOSE = !!verbose;

    this.adjMatrix = this.generateAdjMatrix();
  }

  public generateGraph(): Graph {
    this.log('Generating a graph');
    for (let i = 0; i < this.VERTEX_COUNT; i += 1) {
      this.log(`Generating connections for the vertex: ${i}`);
      const numberOfConnections = this.getNumberOfConnectionsToGenerate(i);
      this.log(`Number of connections to be generated: ${numberOfConnections}`);

      for (let j = 0; j < numberOfConnections; j += 1) {
        while (true) {
          const newVertex = getRandomNumberInRange(
            i + 1,
            this.VERTEX_COUNT - 1
          );

          if (this.isPossibleNewConnection(i, newVertex)) {
            this.log(`Creating a connection with vertex ${newVertex}`);
            this.placeConnection(i, newVertex);
            this.placeConnection(newVertex, i);
            break;
          }
        }
      }

      this.log(null, { logMatrix: true });
    }

    this.log('Graph generated!');
    return new Graph(this.adjMatrix);
  }

  private generateAdjMatrix() {
    this.log('Generating adjacency matrix...');

    const adjMatrix = new Array(this.VERTEX_COUNT)
      .fill(0)
      .map(() => new Array(this.VERTEX_COUNT).fill(0));

    this.log('Matrix generated!');
    this.log(null, { logMatrix: true, matrix: adjMatrix });
    return adjMatrix;
  }

  private getVertexDegree(vertexIndex: number) {
    const vertexConnections = this.adjMatrix[vertexIndex];
    return vertexConnections.filter((n) => n === 1).length;
  }

  private getNumberOfConnectionsToGenerate(vertexIndex: number) {
    const currentVertexDegree = this.getVertexDegree(vertexIndex);
    const expectedValue = Math.min(
      getRandomNumberInRange(this.MIN_VERTEX_DEGREE, this.MAX_VERTEX_DEGREE) -
        currentVertexDegree,
      this.VERTEX_COUNT - vertexIndex - 1
    );
    return expectedValue > 0 ? expectedValue : 0;
  }

  private isPossibleNewConnection(vertexIndex: number, newVertexIndex: number) {
    const newVertexConnectionsCount = this.getVertexDegree(newVertexIndex);

    return (
      !this.connectionExists(vertexIndex, newVertexIndex) &&
      newVertexConnectionsCount < this.MAX_VERTEX_DEGREE
    );
  }

  private connectionExists(
    firstVertexIndex: number,
    secondVertexIndex: number
  ) {
    return this.adjMatrix[firstVertexIndex][secondVertexIndex] === 1;
  }

  private placeConnection(firstVertexIndex: number, secondVertexIndex: number) {
    this.adjMatrix[firstVertexIndex][secondVertexIndex] = 1;
  }

  private log(message: string | null, options?: GraphGeneratorLoggingOptions) {
    let logMatrix, matrix;

    if (options) {
      logMatrix = options.logMatrix;
      matrix = options.matrix;
    }

    if (this.IS_VERBOSE) {
      if (message) {
        Logger.log(message);
      } else if (logMatrix) {
        if (!matrix) {
          Logger.logMatrix(this.adjMatrix);
        } else {
          Logger.logMatrix(matrix);
        }
      }
    }
  }
}
