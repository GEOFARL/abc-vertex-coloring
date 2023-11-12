import ArtificialBeeColony from './ArtificialBeeColony/ArtificialBeeColony';
import GraphGenerator from './GraphGenerator/GraphGenerator';

const graphGenerator = new GraphGenerator({
  vertexCount: 8,
  minVertexDegree: 1,
  maxVertexDegree: 4,
  verbose: true,
});
const graph = graphGenerator.generateGraph();
const ABC = new ArtificialBeeColony(graph, {
  verbose: true,
  employedBeesCount: 1,
  onlookerBeesCount: 3,
});

const chromaticNumber = ABC.getChromaticNumber();
console.log('Chromatic number: ', chromaticNumber);

export default function getData() {
  const graphGenerator = new GraphGenerator();
  const graph = graphGenerator.generateGraph();
  const ABC = new ArtificialBeeColony(graph);

  const chromaticNumbers = [];
  let minChromaticNumber = +Infinity;

  for (let i = 0; i <= 1000; i += 1) {
    const chromaticNumber = ABC.getChromaticNumber();
    console.log(i, chromaticNumber);
    ABC.reset();
    if (chromaticNumber < minChromaticNumber) {
      minChromaticNumber = chromaticNumber;
    }
    if (i % 20 === 0 && i !== 0) {
      chromaticNumbers.push(minChromaticNumber);
    }
  }

  return chromaticNumbers;
}
