import createMemoryHistory from 'history/createMemoryHistory';

import configureStore from 'store';

import FeaturePage from '../index';
import loader from '../loader';

describe('FeaturePage loader', () => {
  const store = configureStore({}, createMemoryHistory());

  it('loads FeaturePage', () => {
    const loaded = new Promise((resolve) => (loader(store, resolve)));
    expect.assertions(1);
    return loaded.then((comp) => expect(comp.default).toEqual(FeaturePage));
  });
});
