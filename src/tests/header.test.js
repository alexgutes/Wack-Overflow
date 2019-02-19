import { shallow } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';

import Header from '../components/Header';

const mockStore = configureMockStore();
const store = mockStore({});

it('Renders without crashing', () => {
  shallow(
    <Provider store={store}>
      <Header />
    </Provider>
  );
});
