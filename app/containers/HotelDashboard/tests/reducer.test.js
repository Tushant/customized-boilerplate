
import { fromJS } from 'immutable';
import hotelOwnerContainerReducer from '../reducer';

describe('hotelOwnerContainerReducer', () => {
  it('returns the initial state', () => {
    expect(hotelOwnerContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
