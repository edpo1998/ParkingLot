import React from 'react';
import classNames from 'classnames';



const MenuItem = ({modal,imgitem,detail="Default",handlechangeModal}) =>{

  const onclickModal = ()=>{
    handlechangeModal(modal,true)
  }

  return (
    <>
      <div className='dashboard__container-item'> 
        <img width={'50%'} height={'60%'} src={imgitem}></img>
        <button type="button"  className="btn btn-dark btn-lg" onClick={onclickModal}>{detail}</button>
      </div>
    </>
  );
} 

export default MenuItem;