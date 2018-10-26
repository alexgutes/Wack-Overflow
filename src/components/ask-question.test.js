import { shallow } from 'enzyme';
import React from 'react';

import AskQuestion from './ask-question';

it('Renders without crashing', () => {
  shallow(<AskQuestion />);
});
