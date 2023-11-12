export default class Graph {
  private adjMatrix: number[][];
  private colors: number[];

  constructor(adjMatrix: number[][]) {
    this.adjMatrix = adjMatrix;
    this.colors = Array(adjMatrix.length).fill(-1);
  }

  public print() {
    console.log(this.adjMatrix);
  }

  public getCopy() {
    return new Graph(JSON.parse(JSON.stringify(this.adjMatrix)));
  }

  public getVertexArray() {
    return Array.from({ length: this.adjMatrix.length }, (_, i) => i);
  }

  public getVertexDegree(vertexIndex: number) {
    return this.adjMatrix[vertexIndex].filter((el) => el === 1).length;
  }

  public getAdjacentVertices(vertexIndex: number) {
    return this.adjMatrix[vertexIndex]
      .map((vertex, i) => {
        return vertex === 1 ? i : null;
      })
      .filter((el) => el !== null) as number[];
  }

  public isValid() {
    const uncoloredVerticesCount = this.colors.filter(
      (color) => color === -1
    ).length;
    return uncoloredVerticesCount === 0 && this.isValidColoring();
  }

  public isValidColoring() {
    for (let i = 0; i < this.adjMatrix.length; i += 1) {
      for (let j = 0; j < this.adjMatrix[i].length; j += 1) {
        if (
          this.adjMatrix[i][j] === 1 &&
          this.isColored(i) &&
          this.isColored(j) &&
          this.isTheSameColor(i, j)
        ) {
          return false;
        }
      }
    }

    return true;
  }

  private isColored(vertexIndex: number) {
    return this.colors[vertexIndex] !== -1;
  }

  private isTheSameColor(firstVertexIndex: number, secondVertexIndex: number) {
    return this.colors[firstVertexIndex] === this.colors[secondVertexIndex];
  }
}
