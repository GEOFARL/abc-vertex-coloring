import ArtificialBeeColony from './ArtificialBeeColony/ArtificialBeeColony';
import GraphGenerator from './GraphGenerator/GraphGenerator';

const graphGenerator = new GraphGenerator();
// Object.assign(DEFAULT_CONFIG, {
//   vertexCount: 8,
//   maxVertexDegree: 5,
//   verbose: true,
// })
const graph = graphGenerator.generateGraph();
const ABC = new ArtificialBeeColony(graph);

for (let i = 0; i < 1000; i += 1) {
  const chromaticNumber = ABC.getChromaticNumber();
  console.log('Chromatic number: ', chromaticNumber);
  ABC.reset();
}

// graph.print();
