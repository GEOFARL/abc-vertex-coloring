import ArtificialBeeColony from './ArtificialBeeColony/ArtificialBeeColony';
import GraphGenerator from './GraphGenerator/GraphGenerator';

// const graphGenerator = new GraphGenerator();
// Object.assign(DEFAULT_CONFIG, {
//   vertexCount: 8,
//   maxVertexDegree: 5,
//   verbose: true,
// })
// const graph = graphGenerator.generateGraph();
// const ABC = new ArtificialBeeColony(graph);

// for (let i = 0; i < 1000; i += 1) {
//   const chromaticNumber = ABC.getChromaticNumber();
//   console.log('Chromatic number: ', chromaticNumber);
//   ABC.reset();
// }

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

  // for (let i = 0; i < 100; i += 1) {
  //   const chromaticNumber = ABC.getChromaticNumber();

  //   console.log(chromaticNumber);
  //   ABC.reset();
  //   if (chromaticNumber < minChromaticNumber) {
  //     minChromaticNumber = chromaticNumber;
  //   }
  //   if (i % 2 === 0 && i !== 0) {
  //     chromaticNumbers.push(minChromaticNumber);
  //   }
  // }

  return chromaticNumbers;
}

// graph.print();
