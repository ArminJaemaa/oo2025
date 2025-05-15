import { useCallback, useEffect, useState } from "react";
import { Word } from "../models/Word";
import { Link } from "react-router-dom";


function MainPage() {

    const [words, setWords] = useState<Word[]>([]);
    const [sort, setSort] = useState("");
    const [totalWords, setTotalWords] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [wordsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(0);
    
    const fetchWords = useCallback(() => {
        fetch(`http://localhost:8080/words-meaning?page=${currentPage}&size=${wordsPerPage}&sort=${sort}`)
        .then(res => res.json())
        .then(json => {
            setWords(json.content);
            setTotalWords(json.totalElements);
            setTotalPages(json.totalPages);
        });
    }, [currentPage, wordsPerPage, sort]);

        useEffect(() => {
        fetchWords();
    }, [fetchWords]);

    const handleSortChange = (newSort: string) => {
        setSort(newSort);
        setCurrentPage(0);
    };

  return (
    <>
    <button onClick={()=>handleSortChange("word,asc")}>Sorteeri A-Z</button>
    <button onClick={()=>handleSortChange("word,desc")}>Sorteeri Z-A</button>
    <br />
    <div>Kokku sõnu: {totalWords} Kokku lehti: {totalPages}</div>
    <Link to={"/edit"}>
    <button id="addWordButton">Lisa Sõnu</button>
    </Link>
    <Link to={"/admin"}>
    <button id="Administrators">Vaata administraatoreid</button>
    </Link>
    <br />
    {words.map((word) =>
        <div key={word.id}>
            {word.word}
            {<Link to={"/word/" + word.id}>
        <button id="viewWordButton">Vaata sõna</button>
        </Link>}
        </div>
        )}

    <button disabled={currentPage===0} onClick={()=>setCurrentPage(currentPage-1)}>Eelmine</button>
    <span>{currentPage+1}</span>
    <button disabled={currentPage>=totalPages-1} onClick={()=>setCurrentPage(currentPage+1)}>Järgmine</button>
    
    </>
  )
}

export default MainPage