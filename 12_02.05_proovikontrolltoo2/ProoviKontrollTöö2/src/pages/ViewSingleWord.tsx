import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Word } from "../models/Word";
import Tagasi from "../components/Tagasi";

function ViewSingleWord() {

    const {wordId} = useParams();
    const [word, setWord] = useState<Word>()
    const wordRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    useEffect(()=> {
        fetch("http://localhost:8080/words/" + wordId)
            .then(res => res.json())
            .then(json=> setWord(json))
    }, [wordId]);

    const EditWord = ()=>{
        const editedWord = {
            id: wordId,
            word: wordRef.current?.value,
            description: descriptionRef.current?.value,
        }
fetch(`http://localhost:8080/words`, {
      method: "PUT",
      body: JSON.stringify(editedWord),
      headers: {
        "content-type": "application/json",
      }
    })
    .then(res=>res.json())
    .then(json=>setWord(json))
    }


  return (
    <>
    <Tagasi/>
    <h2>Muuda sõna</h2>
    <label>Sõna</label>
    <input type="text" ref={wordRef} defaultValue={word?.word}/><br />
    <label>Tähendus</label>
    <input type="text" ref={descriptionRef} defaultValue={word?.description} />
    <button onClick={()=>EditWord()}>Muuda sõna</button>

    <h1>Tähendus</h1>

    <div>
        <div>Sõna: {word?.word}</div>
        <div>Tähendus: {word?.description}</div>
    </div>
    
    </>
  )
}

export default ViewSingleWord