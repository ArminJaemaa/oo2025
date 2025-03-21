import { useEffect, useState } from "react";
import { result } from "../models/result";

function Result() {

    const [result, setResult] = useState<result[]>([])

    useEffect(() => {
        fetch('http://localhost:8080/results')
        .then(res=>res.json())
        .then(json=>setResult(json))
      }, []);

      
  return (
    <div>
        <h1>Tulemused</h1>
        <div>
            {result.map(result=> <div key={result.id}>
                {result.competitor.firstName}({result.event.name}) - {Math.round(result.result)} </div>
             )}
        </div>
    </div>
  )
}

export default Result