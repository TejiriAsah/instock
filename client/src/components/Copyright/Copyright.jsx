import React, { Component } from 'react';

import './Copyright.scss';

class Copyright extends Component {
  render() {
    return (
      <div className='copyright'>
        <p className='copyright__text'>
          &#169; InStock Inc. All Rights Reserved
        </p>
      </div>
    )
  }
}

export default Copyright;
