// Link.react.test.js
import React from 'react';
import Login from './Login';

import { shallow, mount, render } from 'enzyme';

describe('A suite', function() {
    it('should render without throwing an error', function() {
      expect(shallow(<Login />).contains(<div className="Login">Bar</div>)).toBe(true);
    });
  
    it('should be selectable by class "Login"', function() {
      expect(shallow(<Login />).is('.Login')).toBe(true);
    });
  
    it('should mount in a full DOM', function() {
      expect(mount(<Login />).find('.Login').length).toBe(1);
    });
  
    it('should render to static HTML', function() {
      expect(render(<Login />).text()).toEqual('Bar');
    });
  });