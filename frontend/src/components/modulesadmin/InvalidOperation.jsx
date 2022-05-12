import React from 'react';
import DefaultAction from '../DefaultAction';
const InvalidOperation = ({props}) => (
  <div className='containeroption'>
    <DefaultAction {...props} name={"📎 Select Operation"} />
  </div>
);

export default InvalidOperation;