import GraphGenerator from './GraphGenerator/GraphGenerator';

const graphGenerator = new GraphGenerator();
// Object.assign(DEFAULT_CONFIG, {
//   vertexCount: 8,
//   maxVertexDegree: 5,
//   verbose: true,
// })
const graph = graphGenerator.generateGraph();

// graph.print();
