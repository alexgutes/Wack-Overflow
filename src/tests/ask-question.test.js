import { shallow } from 'enzyme';
import React from 'react';

import AskQuestion from '../components/AskQuestion';

it('Renders without crashing', () => {
  shallow(<AskQuestion />);
});
