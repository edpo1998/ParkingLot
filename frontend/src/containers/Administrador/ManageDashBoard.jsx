import React,{useState} from 'react';
import Header from '../../components/Header';
import {Navigation} from 'react-minimal-side-navigation';
import "../../assets/styles/components/Manage.scss"
import LayoutAdmin from '../../components/LayoutAdmin';
import {sidebarItems,menus} from "../../utils/navitems.js"
const ManageDashBoard = ({history}) =>{
  return(  
    <>
    <Header/>
      <section className="Manage">
        <div className='Manage__sidebar'>
          <Navigation
            onSelect={({itemId})=>{ history.push(itemId); }}
            items= {sidebarItems}
          />
        </div>
        <LayoutAdmin/>
      </section>
    </>
  );
}
  

export default ManageDashBoard;