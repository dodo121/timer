import citiesSaga from './data/cities/saga.js';

export default function* () {
  yield* citiesSaga();
}
