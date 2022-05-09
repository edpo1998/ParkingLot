import React from 'react';




const MenuStatus = () => (
  <>
    <table className="table table-bordered table-dark">
    <thead>
        <tr >
        <th scope="col" >🟢 Disponibles</th>
        <th scope="col" >🔴 Ocupados</th>
        <th scope="col" >🔼 Ultimo Ingreso</th>
        <th scope="col" >🔽 Ultimo Egreso</th>
        </tr>
    </thead>
    <tbody>
        <tr >
        <th scope="row" >15</th>
        <td>20</td>
        <td>A-000001</td>
        <td>B-000005</td>
        </tr>
    </tbody>
    </table>  
  </>
);

export default MenuStatus;