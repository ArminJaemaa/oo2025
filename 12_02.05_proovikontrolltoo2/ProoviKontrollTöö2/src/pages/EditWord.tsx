import {useEffect, useRef, useState } from "react";
import { Word } from "../models/Word";
import Tagasi from "../components/Tagasi";

function EditWord() {


    const wordRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    const [word, setWord] = useState<Word[]>([]);


    const addWord = ()=>{
      const newWord = {
        word: wordRef.current?.value,
        description: descriptionRef.current?.value,
      }
      fetch(`http://localhost:8080/words`, {
      method: "POST",
      body: JSON.stringify(newWord),
      headers: {
        "content-type": "application/json",
      }
    })
    .then(res=>res.json())
    .then(json=>setWord(json))
    if (wordRef.current && descriptionRef.current) {
      wordRef.current.value = "";
      descriptionRef.current.value = "";
    }
    }
  
    useEffect(() => {
    fetch('http://localhost:8080/words')
            .then(res=>res.json())
            .then(json=>setWord(json))
    }, []);


  return (
    <>
    <Tagasi/>
    <br />
    <h1>Add Word</h1>
    <label>Sõna</label>
    <input type="text" ref={wordRef} placeholder="Lisa Sõna" /> <br />
    <label>Tähendus</label>
    <input type="text" ref={descriptionRef} placeholder="Lisa Tähendus" /> <br />
    <button onClick={() => addWord()}>Lisa sõna</button>



    {word.map((word) =>
         <div key={word.id}> {word.word} - {word.description}</div> )}
    </>
  )
}

export default EditWord