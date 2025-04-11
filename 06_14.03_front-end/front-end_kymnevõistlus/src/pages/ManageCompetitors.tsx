import {useEffect, useRef, useState } from 'react'
import { competitor } from '../models/competitor';
import { ToastContainer, toast } from 'react-toastify';

function ManageCompetitors() {

    const [competitors, setCompetitors] = useState<competitor[]>([]);

    useEffect(() => {
        fetch("http://localhost:8080/competition")
            .then(res=>res.json())
            .then(json=> setCompetitors(json))
      }, []);


      const deleteCompetitor=(id:number)=>{
        fetch(`http://localhost:8080/competition/${id}`, {
            method: "DELETE",
          })
          .then(res=>res.json())
          .then(json=> {
            setCompetitors(json)
            toast.success("Võistleja kustutatud");
        }); 
      }

      const addCompetitor = ()=>{
        const newCompetitor = {
            firstName: firstNameRef.current?.value,
            lastName: lastNameRef.current?.value,
            country: countryRef.current?.value,
            age: ageRef.current?.value,
        }
        fetch(`http://localhost:8080/competition`, {
            method: "POST",
            body: JSON.stringify(newCompetitor),
            headers: {
              "content-type": "application/json",
            }
          })
          .then(res=>res.json())
          .then(json=> {
            if(json.message === undefined && json.timestamp === undefined && json.status === undefined){
            setCompetitors(json)
            toast.success("Uus võistleja lisatud");
          }else{
            toast.error(json.message);
          }
          })
      }

      const firstNameRef = useRef<HTMLInputElement>(null);
      const lastNameRef = useRef<HTMLInputElement>(null);
      const countryRef = useRef<HTMLInputElement>(null);
      const ageRef = useRef<HTMLInputElement>(null);



  return (
    <div>

        <h1>ManageCompetitors</h1>
        <div id="addCompetitor">
            <h2>Lisa võistleja</h2>
            <label>Eesnimi</label>
            <input ref={firstNameRef} type="text" /><br />
            <label>Perekonnanimi</label>
            <input ref={lastNameRef} type="text"/><br />
            <label>Riik</label>
            <input ref={countryRef} type="text" /> <br />
            <label>Vanus</label>
            <input ref={ageRef} type="number" />
            <button id='addCompetitorButton' onClick={()=>addCompetitor()}>Add Competitor</button>
        </div>
<br /><br />
        <table>
            <thead>
                <tr>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Country</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {competitors.map(competitor => (
                    <tr key={competitor.id}>
                        <td>{competitor.firstName}</td>
                        <td>{competitor.lastName}</td>
                        <td>{competitor.country}</td>
                        <td>
                            <button onClick={()=>deleteCompetitor(competitor.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        <ToastContainer />
    </div>
  )
}

export default ManageCompetitors