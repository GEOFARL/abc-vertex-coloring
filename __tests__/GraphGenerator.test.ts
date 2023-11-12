import GraphGenerator from '../src/GraphGenerator/GraphGenerator';

describe('Graph Generator', () => {
  it('should generate an empty adjacent matrix of the correct size filled with zeros', () => {
    const graphGenerator = new GraphGenerator({
      vertexCount: 6,
      minVertexDegree: 1,
      maxVertexDegree: 3,
    });

    expect(graphGenerator['adjMatrix'].length).toBe(6);
    graphGenerator['adjMatrix'].forEach((row) => {
      expect(row.length).toBe(6);

      row.forEach((value) => {
        expect(value).toBe(0);
      });
    });
  });

  it('should correctly place a new connection', () => {
    const graphGenerator = new GraphGenerator({
      vertexCount: 6,
      minVertexDegree: 1,
      maxVertexDegree: 3,
    });

    graphGenerator['placeConnection'](0, 0);
    graphGenerator['placeConnection'](5, 5);
    graphGenerator['placeConnection'](2, 3);

    expect(graphGenerator['adjMatrix'][0][0]).toBe(1);
    expect(graphGenerator['adjMatrix'][5][5]).toBe(1);
    expect(graphGenerator['adjMatrix'][2][3]).toBe(1);
  });

  it('should correctly check if the connection exists', () => {
    const graphGenerator = new GraphGenerator({
      vertexCount: 6,
      minVertexDegree: 1,
      maxVertexDegree: 3,
    });

    graphGenerator['placeConnection'](2, 3);

    expect(graphGenerator['connectionExists'](2, 3)).toBe(true);
  });

  it('should correctly check if the new connection is possible', () => {
    const graphGenerator = new GraphGenerator({
      vertexCount: 6,
      minVertexDegree: 1,
      maxVertexDegree: 3,
    });

    graphGenerator['placeConnection'](2, 3);
    graphGenerator['placeConnection'](2, 4);
    graphGenerator['placeConnection'](2, 5);

    expect(graphGenerator['isPossibleNewConnection'](2, 2)).toBe(false);
    expect(graphGenerator['isPossibleNewConnection'](2, 4)).toBe(false);

    graphGenerator['placeConnection'](3, 2);
    graphGenerator['placeConnection'](3, 3);

    expect(graphGenerator['isPossibleNewConnection'](3, 3)).toBe(false);
    expect(graphGenerator['isPossibleNewConnection'](3, 4)).toBe(true);
  });

  it('should get correct number of current degree of the vertes', () => {
    const graphGenerator = new GraphGenerator({
      vertexCount: 6,
      minVertexDegree: 1,
      maxVertexDegree: 3,
    });

    graphGenerator['placeConnection'](2, 3);
    graphGenerator['placeConnection'](2, 4);

    expect(graphGenerator['getVertexDegree'](2)).toBe(2);
  });
});
