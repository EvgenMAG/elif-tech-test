import React, { useState, useEffect, useSyncExternalStore } from 'react';
// import { OperationsAuth } from '../redux/auth';
import { v4 as uuidv4 } from 'uuid'
// import { useDispatch } from 'react-redux';
import s from './CreateBankForm.module.css';
import basket from '../../img/basket3.png'
import edit from '../../img/edit.png'

console.log(basket);


export default function CreateBankForm() {
  const [user, setUser] = useState({ name: '', interestRate: '', maxLoan: '' , minDownPay: '',loanTerm:'', id: '' });
  const [store, setStore] = useState([]);


  const { name, interestRate, maxLoan, minDownPay, loanTerm,id} = user;

  

  useEffect(()=>{
  const saved = localStorage.getItem("bank");
  const dataFromLocalStorage = JSON.parse(saved);
  console.log("Hi!!!!!!!!!!!!!!")
  setStore((prevState)=> !dataFromLocalStorage? [...prevState] : [...dataFromLocalStorage])
 
  },[localStorage.getItem("bank")])

  // window.addEventListener('storage', () => console.log("Fuck"));
//   const disputch = useDispatch();

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
    console.log(user);
    const userId = !user.id? { name, interestRate, maxLoan, minDownPay, loanTerm,  id: uuidv4() }:
    { name, interestRate, maxLoan, minDownPay, loanTerm,  id }
    const editedList = store.filter((item)=> item.id !== userId.id)
    // setStore((prevStore)=> [...prevStore, user])
    
    console.log(editedList);
    // console.log([...store, user]);
    localStorage.setItem("bank", JSON.stringify([...editedList, userId]))
    // disputch(OperationsAuth.registerUser({ name, email, password }));
    reset();
  };

  const reset = () => {
    setUser({ name: '', interestRate: '', maxLoan: '' , minDownPay: '',loanTerm:'' });
   
  };

  const deleteItem =id=>{
   const  updatedList = store.filter((item)=> item.id !== id)
    setStore(() => updatedList )
   localStorage.setItem("bank", JSON.stringify(updatedList))
   console.log(updatedList);
  //  reset();
  }

  const editItem = id => {
    const  item = store.find((item)=> item.id === id)
    setUser(() => item )

  }

  console.log(user);

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
            value={maxLoan}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
        Minimum down payment
          <input
            type="number"
            name="minDownPay"
            placeholder= "300 $"
            value={minDownPay}
            onChange={handleChange}
          />
        </label>

        <label className={s.label}>
        Loan term
          <input
            type="number"
            name="loanTerm"
            value={loanTerm}
            placeholder= "36 months"
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={disable}>Create</button>
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
    <td className={s.bankName} onClick={()=>{console.log("Hi")}}>{item.name}</td>
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
