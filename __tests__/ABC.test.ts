import ArtificialBeeColony from '../src/ArtificialBeeColony/ArtificialBeeColony';
import Graph from '../src/Graph';

describe('Artificial Bee Colony', () => {
  it('should send employed bees correctly', () => {
    const graph = new Graph([
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0],
    ]);

    const ABC = new ArtificialBeeColony(graph);

    const chosenVertices = ABC['sendEmployedBees']();

    // The number of employed bees is 2, so they should select 2 vertices
    expect(chosenVertices.length).toBe(2);

    // The chosen vertices are no longer available
    ABC['availableVertices'].forEach((vertex) => {
      expect(!!chosenVertices.find((v) => v === vertex)).toBe(false);
    });
  });

  it('should produce correct nectar values', () => {
    const graph = new Graph([
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0],
    ]);

    const ABC = new ArtificialBeeColony(graph);

    const chosenVertices = ABC['sendEmployedBees']();
    const degrees = ABC['getDegreesOfChosenVertices'](chosenVertices);
    const nectarValues = ABC['getNectarValues'](degrees);

    expect(nectarValues.reduce((p, a) => a + p, 0)).toBe(1);
  });

  it('should distribute onlooker bees correctly', () => {
    const graph = new Graph([
      [0, 1, 0, 1],
      [1, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0],
    ]);

    const ABC = new ArtificialBeeColony(graph);

    const chosenVertices = ABC['sendEmployedBees']();
    const degrees = ABC['getDegreesOfChosenVertices'](chosenVertices);

    const distribution = ABC['getOnlookerBeesDistribution'](degrees);
    expect(distribution.reduce((p, a) => a + p, 0)).toBe(28);
  });
});
