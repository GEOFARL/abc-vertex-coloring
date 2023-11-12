import GraphGenerator from './GraphGenerator/GraphGenerator';

const DEFAULT_CONFIG = {
  vertexCount: 200,
  minVertexDegree: 1,
  maxVertexDegree: 20,
  verbose: false,
};

const graphGenerator = new GraphGenerator(
  DEFAULT_CONFIG
  // Object.assign(DEFAULT_CONFIG, {
  //   vertexCount: 8,
  //   maxVertexDegree: 5,
  //   verbose: true,
  // })
);
const graph = graphGenerator.generateGraph();

// graph.print();
