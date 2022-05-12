import { useState } from 'react';
import { connect } from 'react-redux';
import { loginRequest } from '../../actions';
import Header from '../../components/Header';
import MenuStatus from '../../components/MenuStatus'
import '../../assets/styles/components/Dashboard.scss';
import MenuItem from '../../components/MenuItem';
import estacionamiento from '../../assets/static/estacionamiento.png'
import carro from '../../assets/static/carro.png'
import prohibido from '../../assets/static/prohibido.png'
import reporte from '../../assets/static/reporte.png'
import pago from '../../assets/static/pago.png'
import caja from '../../assets/static/caja.png'
import ModalMaster from './Modals/ModalMaster';

const Dashboard = props => {
  // Modal en ejecucion
  const [modals, setModals]=useState({
    parqueo: false,
    vehiculo: false,
    bussy: false,
    mounth: false,
    pays:false,
    box:false,
  })

  const handlechangeModal= (name,value)=>{
    setModals({
      ...modals,
        [name]:value,
    })
  }


  return (
    <>
      <Header isLogin/>
      <section className="dashboard">
        <ModalMaster 
          modalstate = {modals} 
          handlechangeModal={handlechangeModal} 
        />
        <section className="dashboard__container">
            <div className='dashboard__container-bar'>
                <div>Caja Habilitada</div>
                <div><MenuStatus/></div>
            </div>
            <div className="dashboard__container-menu">
                <MenuItem 
                  modal="parqueo" 
                  imgitem={estacionamiento} 
                  detail="Registrar parqueo" 
                  handlechangeModal={handlechangeModal}
                />

                <MenuItem 
                  modal="vehiculo" 
                  imgitem={carro} 
                  detail="Registrar vehiculo" 
                  handlechangeModal={handlechangeModal}
                />

                <MenuItem 
                  modal="bussy" 
                  imgitem={prohibido} 
                  detail={`Ocupados`} 
                  handlechangeModal={handlechangeModal}
                />

                <MenuItem 
                  modal="mounth" 
                  imgitem={reporte} 
                  detail="Reporte" 
                  handlechangeModal={handlechangeModal}
                />

                <MenuItem 
                  modal="pays"
                  imgitem={pago} 
                  detail="Pago" 
                  handlechangeModal={handlechangeModal}
                />

                <MenuItem 
                  modal="box"
                  imgitem={caja} 
                  detail="Abrir Caja" 
                  handlechangeModal={handlechangeModal}
                />                
            </div>
        </section>
      </section>
    </>
  );
}

const mapDispatchToProps = {
  loginRequest,
};

export default connect(null, mapDispatchToProps)(Dashboard);