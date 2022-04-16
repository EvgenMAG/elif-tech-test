
import React, { useState, useEffect } from 'react';

import s from './Calculator.module.css';



export default function  MortgageCalculator(){
    const [store, setStore] = useState([]);
    const [bank, setBank] = useState({ name: '', interestRate: '', maxLoan: '' , minDownPay: '',loanTerm:'', id: '' });
    const [unit, setUnit] = useState({loanAmount:'',months:''}); 
    const [result, setResult] = useState('');
    const { name, interestRate, maxLoan , minDownPay,loanTerm, id} = bank
    const {loanAmount, months} = unit
    
    console.log(typeof loanAmount);

    const handleChange = e => {
        const { name, value } = e.currentTarget;
        switch (name) {
          case 'loanAmount':
            setUnit(prevState => ({ ...prevState, [name]: value }));
            break;
          case 'months':
            setUnit(prevState => ({ ...prevState, [name]: value }));
            break;
          default:
            console.log("There aren't such data");
        }
      };
  
     

     const fnCalcMortgage = () =>{
        const P = Number(loanAmount)
        const m = Number(months)
        const i = Number(interestRate)

          const MonthlyPayment = P*((i*0.1/12)*Math.pow((1+(i*0.1/12)),m))/Math.pow((1+(i*0.1/12)),(m-1));
          setResult(() => Math.round(MonthlyPayment) )
     }
  
      const handleSubmit = (e)=>{
        e.preventDefault();
        fnCalcMortgage(); 
          
      }

      

    useEffect(()=>{
        const saved = localStorage.getItem("bank");
        const dataFromLocalStorage = JSON.parse(saved);
        console.log("Hi I am new page!!!!!!!!!!!!!!")
        setStore((prevState)=> !dataFromLocalStorage? [...prevState] : [...dataFromLocalStorage])
       
        },[localStorage.getItem("bank")])

     console.log(store);   

     const onChoosingBank =(e)=>{
         console.log("Hi!!!");
         console.log(e.target.value);
         const id = e.target.value
         const currentBank = store.find((item)=> item.id === id)
         setBank(()=> currentBank)
         reset()
     }
     console.log(bank);

     const reset = () => {
        setUnit({ loanAmount:'', months:'' });
        setResult("");
       
      };
     

     let disable = true;
  if ( loanAmount, months) {
    disable = false;
  }

    return(
        <div className={s.Container}>
            
         <h1 className={s.title}> Your Mortgage Calculator</h1>

   
  


  <form onSubmit={handleSubmit}  autoComplete="off" className={s.form}>
  <label className={s.label}> Choose the bank
    <select 
    onChange={onChoosingBank}>
    <option></option>
    {store.map((item)=> <option key={item.id} value={item.id}>{item.name}</option>)}
  </select>
    </label>

  <label className={s.label}>
        Amount borrowed 
          <input
            type="number"
            name="loanAmount"
            placeholder={`not more than ${bank.maxLoan}`}
            value={loanAmount}
            onChange={handleChange}
          />
        </label>
        <label className={s.label}>
        Number of pay-out  months 
          <input
            type="number"
            name="months"
            placeholder={`not more than ${bank.loanTerm}`}
            value={months}
            onChange={handleChange}
          />
        </label>
        <button type="submit" disabled={disable}>Calculate</button>
  </form>
    <div>
        {result && <><span>{result}</span><span className={s.perMonth}>per month</span></>}
    </div>

        </div>
    )
}