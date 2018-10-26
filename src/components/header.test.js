import { shallow } from 'enzyme';
import React from 'react';

import Header from './header';

it('Renders without crashing', () => {
  shallow(<Header />);
});
