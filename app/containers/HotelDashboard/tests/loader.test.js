import createMemoryHistory from 'history/createMemoryHistory';

import configureStore from 'store';

import HotelOwnerContainer from '../index';
import createLoader from '../loader';

describe('HotelOwnerContainer loader', () => {
  const store = configureStore({}, createMemoryHistory());

  const loader = createLoader(store);

  it('loads HotelOwnerContainer', () => {
    const loaded = new Promise((resolve) => (loader(resolve)));
    expect.assertions(1);
    return loaded.then((comp) => expect(comp.default).toEqual(HotelOwnerContainer));
  });
});
