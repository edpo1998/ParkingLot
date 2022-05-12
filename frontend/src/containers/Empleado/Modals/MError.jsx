import { useState } from 'react'
import {
  Button,
  Modal, ModalHeader, ModalBody, ModalFooter,
  } from 'reactstrap'

import "./styles/MRSalida.scss"


const MError = ({stateopen,response}) => {

const [state,setState] =useState(stateopen)

  const setError = () =>{
    setState(false)
    localStorage.removeItem("modalstatus")
  }
  return(
    <>
    <Modal isOpen={state} className="ModalStyleSalida">
      <ModalHeader>
        Estado de La Operacion
      </ModalHeader> 
     
      <ModalBody className='FormModal'>
        {
          response.message?
          <p className={response.error?"alert mt-2 alert-danger":"alert mt-2 alert-success"}>{response.message}</p>:
          ""
        }
      </ModalBody>
      <ModalFooter>
        <Button className="btn-lg bg-secondary" onClick={setError}>Ok</Button>
      </ModalFooter>
    </Modal> 
  </>

);
}
export default MError;