export default class Graph {
  private adjMatrix: number[][];

  constructor(adjMatrix: number[][]) {
    this.adjMatrix = adjMatrix;
  }

  public print() {
    console.log(this.adjMatrix);
  }
}
