import React from 'react';
import "../assets/styles/components/ModalItem.scss"

const MenuItem = ({modal,imgitem,detail="Default",handlechangeModal}) =>{

  const onclickModal = ()=>{
    handlechangeModal(modal,true)
  }

  return (
    <>
      <div className='dashboard__container-item '> 
        <div width={'100%'} height={'80%'}className="container" ><img src={imgitem}></img></div>
        <button className="btn btn-dark btn-sm  responsive-width" onClick={onclickModal}>
           {detail}
        </button>
      </div>
    </>
  );
} 

export default MenuItem;