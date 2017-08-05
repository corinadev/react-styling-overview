import dataService from './DataService';

describe('list of react libraries', () => {
  let data = [];

  beforeEach(done => {
    dataService.getReactStylingLibraries().then(info => {
      data = info;
      done();
    });
  });

  it('returns at least one item', () => {
    expect(data.length).toBeGreaterThan(0);
  });

  it('returns the correct fields', () => {
    const library = data[0];
    expect(library.name).toBeDefined();
    expect(library.version).toBeDefined();
  });
});


