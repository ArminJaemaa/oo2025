import { useEffect, useState } from "react";
import { result } from "../models/result";
import { competitor } from "../models/competitor";

function Result() {

    const [result, setResult] = useState<result[]>([]);
    const [competitor, setCompetitor] = useState<competitor[]>([]);
    const [TotalResults, setTotalResults] = useState(0)
    const resultsPerPage = 2;
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0);
    const [ActiveCompetitor, setActiveCompetitor] = useState(-1);

    useEffect(() => {
/*         fetch('http://localhost:8080/results')
        .then(res=>res.json())
        .then(json=>setResult(json)) */
        showByCompetitor(-1,0)
      }, []);
      useEffect(() => {
        fetch('http://localhost:8080/competition')
        .then(res=>res.json())
        .then(json=>setCompetitor(json))
      }, []);

      function showByCompetitor(competitorId: number, currentPage: number){
        setActiveCompetitor(competitorId);
        setPage(currentPage);
        fetch('http://localhost:8080/competitor-result?competitorId='+competitorId+"&size="+resultsPerPage+"&page="+currentPage)
        .then(res=>res.json())
        .then(json=>{
          setResult(json.content);
          setTotalResults(json.totalElements);
          setTotalPages(json.totalPages);
        });
      }

      function updatePage(newPage:number){
        showByCompetitor(ActiveCompetitor,newPage)
      }

      
  return (
    <div id="tulemused">
        <h1>Tulemused</h1>
        <div>
            {competitor.map(competitor=> <button key={competitor.id} onClick={()=>showByCompetitor(competitor.id,0)}>
                {competitor.firstName} </button>
             )}
             <button onClick={()=>showByCompetitor(-1,0)}>
              Kõik võistlejad
              </button>
        </div>
        <br />
        <br />
        <div>kokku tulemusi: {TotalResults} |  Kokku lehti {totalPages}</div>
        {result.map(results =>
          <div key={results.id}>
            {results.event.name} ({Math.round(results.result)}) ({results.competitor.firstName})
          </div>
        )}
        <button disabled={page===0} onClick={()=>updatePage(page-1)}>eelmine</button>
        <span>{page+1}</span>
        <button disabled={page===Math.ceil(TotalResults/resultsPerPage-1)} onClick={()=>updatePage(page+1)}>Järgmine</button>
    </div>
  )
}

export default Result