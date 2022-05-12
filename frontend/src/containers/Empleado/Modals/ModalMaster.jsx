import React, { useState } from 'react';
import MRvehiculo from './MRvehiculo';
import MRparqueo from './MRparqueo';
import MRSalida from './MRSalida';
import MRMes from './MRMes';
import MPago from './MPago';
import MRCaja from './MRCaja';


const ModalMaster = ({modalstate,handlechangeModal}) => {


const returnModal = () =>{
  const modales = Object.keys(modalstate)
  const shomodal = modales.find( modal => modalstate[modal] === true)

  switch(shomodal){
    case "parqueo":
        return <MRparqueo stateopen={modalstate.parqueo} handlechangeModal={handlechangeModal}></MRparqueo>
    case "vehiculo":
        return <MRvehiculo stateopen={modalstate.vehiculo} handlechangeModal={handlechangeModal}></MRvehiculo> 
    case "bussy":
        return <MRSalida stateopen={modalstate.bussy} handlechangeModal={handlechangeModal}></MRSalida> 
    case "mounth":
        return <MRMes stateopen={modalstate.mounth} handlechangeModal={handlechangeModal}></MRMes> 
    case "pays":
        return <MPago stateopen={modalstate.pays} handlechangeModal={handlechangeModal}></MPago> 
    case "box":
        return <MRCaja stateopen={modalstate.box} handlechangeModal={handlechangeModal}></MRCaja> 
    default:
        return 
    }
}

return(
    <>
    {returnModal()}    
    </>
)};

  
export default (ModalMaster);

