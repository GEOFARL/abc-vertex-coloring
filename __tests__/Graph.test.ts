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

    const matrix1 = [
      [0, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
    ];

    const graph1 = new Graph(matrix1);
    graph['colors'] = [1, 1, 2, 3];

    expect(graph1.isValid()).toBe(false);
  });

  it('should color a vertex only if it is possible', () => {
    const matrix = [
      [0, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
    ];

    const graph = new Graph(matrix);
    graph['colors'] = [1, 2, 3, 4];

    expect(graph['tryToColor'](0, 3)).toBe(true);
    expect(graph['colors'][0]).toBe(3);

    const matrix1 = [
      [0, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 1, 0, 1],
      [0, 0, 1, 0],
    ];

    const graph1 = new Graph(matrix1);
    graph1['colors'] = [1, 2, 3, 4];

    expect(graph1['tryToColor'](1, 3)).toBe(false);
    expect(graph1['colors'][1]).toBe(2);
  });
});
