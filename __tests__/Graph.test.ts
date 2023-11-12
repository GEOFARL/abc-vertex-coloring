import GraphGenerator from '../src/GraphGenerator/GraphGenerator';

describe('Graph', () => {
  it('should generate a valid copy', () => {
    const graphGenerator = new GraphGenerator();
    const graph = graphGenerator.generateGraph();
    const copyGraph = graph.getCopy();

    graph['adjMatrix'][0][0] = 1;
    expect(copyGraph['adjMatrix'][0][0]).toBe(0);
  });
});
