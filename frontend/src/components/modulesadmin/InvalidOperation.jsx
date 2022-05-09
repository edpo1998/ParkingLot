import React from 'react';
import DefaultAction from '../DefaultAction';
const InvalidOperation = ({props}) => (
  <div className='containeroption'>
    <DefaultAction {...props} name={"❌ Not Operation"} />
  </div>
);

export default InvalidOperation;