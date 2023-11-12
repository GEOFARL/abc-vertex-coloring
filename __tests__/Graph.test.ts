import Graph from '../src/Graph';
import GraphGenerator from '../src/GraphGenerator/GraphGenerator';

describe('Graph', () => {
  it('should generate a valid copy', () => {
    const graphGenerator = new GraphGenerator();
    const graph = graphGenerator.generateGraph();
    const copyGraph = graph.getCopy();

    graph['adjMatrix'][0][0] = 1;
    expect(copyGraph['adjMatrix'][0][0]).toBe(0);
  });

  it('should check whether the coloring is valid', () => {
    const matrix = [
      [0, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
    ];

    const graph = new Graph(matrix);
    graph['colors'] = [1, 2, 3, 4];

    expect(graph.isValid()).toBe(true);
  });
});
