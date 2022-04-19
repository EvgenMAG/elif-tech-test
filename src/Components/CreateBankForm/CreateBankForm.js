import React, { useState, useEffect, useSyncExternalStore } from 'react';

import { v4 as uuidv4 } from 'uuid'

import s from './CreateBankForm.module.css';
import basket from '../../img/basket3.png'
import edit from '../../img/edit.png'




export default function CreateBankForm() {
  const [user, setUser] = useState({ name: '', interestRate: '', maxLoan: '' , minDownPay: '',loanTerm:'', id: '' });
  const [store, setStore] = useState([]);


  const { name, interestRate, maxLoan, minDownPay, loanTerm,id} = user;

  

  useEffect(()=>{
  const saved = localStorage.getItem("bank");
  const dataFromLocalStorage = JSON.parse(saved);
  
  setStore((prevState)=> !dataFromLocalStorage? [...prevState] : [...dataFromLocalStorage])
 
  },[localStorage.getItem("bank")])

  


  const handleChange = e => {
    const { name, value } = e.currentTarget;
    switch (name) {
      case 'name':
        setUser(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'interestRate':
        setUser(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'maxLoan':
        setUser(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'minDownPay':
        setUser(prevState => ({ ...prevState, [name]: value }));
        break;
      case 'loanTerm':
        setUser(prevState => ({ ...prevState, [name]: value }));
        break;
      default:
        console.log("There aren't such data");
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    const userId = !user.id? { name, interestRate, maxLoan, minDownPay, loanTerm,  id: uuidv4() }:
    { name, interestRate, maxLoan, minDownPay, loanTerm,  id }
    const editedList = store.filter((item)=> item.id !== userId.id) 
   
    localStorage.setItem("bank", JSON.stringify([...editedList, userId]))
    
    reset();
  };

  const reset = () => {
    setUser({ name: '', interestRate: '', maxLoan: '' , minDownPay: '',loanTerm:'' });
   
  };

  const deleteItem =id=>{
   const  updatedList = store.filter((item)=> item.id !== id)
    setStore(() => updatedList )
   localStorage.setItem("bank", JSON.stringify(updatedList))
  
  }

  const editItem = id => {
    const  item = store.find((item)=> item.id === id)
    setUser(() => item )

  }



  let disable = true;
  if (name && interestRate && maxLoan && minDownPay && loanTerm ) {
    disable = false;
  }

  return (
    <div className={s.Container}>
    <div className={s.formContainer}>
      <h1 className={s.title}>Bank details</h1>

      <form onSubmit={handleSubmit} className={s.form} autoComplete="off">
        <label className={s.label}>
        Bank name
          <input type="text" name="name" placeholder='MonoBank' value={name} onChange={handleChange} />
        </label>

        <label className={s.label}>
        Interest rate 
          <input
            type="number"
            name="interestRate"
            placeholder='5 %'
            min={0}
            max = {25}
            value={interestRate}
            onChange={handleChange}
          />

        </label>

        <label className={s.label}>
        Maximum loan
          <input
            type="number"
            name="maxLoan"
            placeholder= "100000000 $"
            min={0}
            value={maxLoan}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
        Minimum down payment
          <input
            type="number"
            name="minDownPay"
            placeholder= "10 %"
            min={0}
            max = {50}
            value={minDownPay}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
        Loan term
          <input
            type="number"
            name="loanTerm"
            placeholder= "36 months"
            min={0}
            max = {120}
            value={loanTerm}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={disable} className={s.btnCreate}>Create</button>
      </form>
    </div>
    <div className={s.banksContainer}>

    { store.length > 0 && 
        <div >
          <h1 className={s.title}>Bank List</h1>
          <table>
          <thead>
               <tr>
      <th className={s.tablHead}>Bank</th>
      <th className={s.tablHead}>Int.Rate</th>
      <th className={s.tablHead}>Max.Loan</th>
      <th className={s.tablHead}>Min.Pay</th>
      <th className={s.tablHead}>Loan Term</th>
              </tr>
         </thead>
         <tbody> 
    { store.map((item)=>
    <tr key={item.id} >
    <td className={s.bankName}>{item.name}</td>
    <td className={s.tabData}>{item.interestRate}</td>
    <td className={s.tabData}>{item.maxLoan}</td>
    <td className={s.tabData}>{item.minDownPay}</td>
    <td className={s.tabData}>{item.loanTerm}</td>
    <td  onClick={()=> deleteItem(item.id)} >
      <img className = {s.deleteBtn} src={basket}></img>  
     </td>
    <td  onClick={()=> editItem(item.id)} >
    <img className = {s.deleteBtn} src={edit}></img>
    </td>
  </tr>        
        )}
  </tbody>     
          </table>
      </div>
       } 
    </div>
    </div>
    

    
  );
}
