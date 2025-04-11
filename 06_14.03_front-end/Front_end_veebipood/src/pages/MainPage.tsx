//rfce snippet
// terminalis ( npm install react-router-dom )!!

import { useCallback, useEffect, useRef, useState } from "react";
import { category } from "../models/category";
import { product } from "../models/products";

function MainPage() {

     // muutuja - HTML   muudab muutuja + HTMLi     sulgude sees - algväärtus
  const [kategooriad, setKategooriad] = useState<category[]>([]);
  const [products, setProducts] = useState<product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [productsByPage, setProductsByPage] = useState(1);
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);

  //uef --> enter või tab ---> onload funktsioon, funktsioon läheb kohe käima kui lehele minna.

  useEffect(() => {
    fetch('http://localhost:8080/categories') //API otspunkt kuhu läheb päring
            .then(res=>res.json())             // Kogu tagastus: headers, status code.
            .then(json=>setKategooriad(json))     // body: sisu mille tagastab back-end.
  }, []);

  const showByCategory = useCallback((categoryId: number, currentPage:number)=>{
    setActiveCategory(categoryId)
    setPage(currentPage);
    fetch('http://localhost:8080/category-products?categoryId='+categoryId +
       "&size="+productsByPage+
       "&page="+currentPage)
    .then(res=>res.json())
    .then(json=>{
      setProducts(json.content);
      setTotalProducts(json.totalElements);
      setTotalPages(json.totalPages);
    }) //mida set'in see muutub. Ehk kui panna setKategooria, siis muutvad kategooriad ja tänu sellele ka nupud.
  },[productsByPage]);

  useEffect(() => {
    /*     fetch('http://localhost:8080/products')
                .then(res=>res.json())
                .then(json=>setProducts(json)) */
        showByCategory(-1,0)
      }, [showByCategory]);

  function updatePage(newPage:number){
    showByCategory(activeCategory, newPage);
  }

  const productsByPageRef = useRef<HTMLSelectElement>(null);   //HTML-i inputiga/selectiga siduiseks

/*   const showByCategory = () => {
      on kaks võimalust teha funkstioone.
  } */
    
  return (
    <div className="mainPageContainer">

    <select ref={productsByPageRef}
     onChange={() => setProductsByPage(Number(productsByPageRef.current?.value))}>
      <option>1</option>
      <option>2</option>
      <option>3</option>
    </select>

      {kategooriad.map(kategooria =>
       <button key={kategooria.id} onClick={()=>showByCategory(kategooria.id,0)}>
      {kategooria.name}{kategooria.active}
    </button>)}
    <button onClick={()=>showByCategory(-1,0)}>
      Kõik kategooriad
    </button>
    <br />
    <br />
    <div>Kokku tooteid: {totalProducts} | Kokku lehti: {totalPages}</div>
    {products.map(product =>
      <div id="products" key={product.id}>
        <div>({product.category?.name})</div> {/* vaja panna category taha '?' kui võib olla categoty juures kuskil NULL */}
         {product.name} - {product.price} {product.active}
          </div> )}
          <button disabled={page===0} onClick={()=>updatePage(page-1)}>eelmine</button>
          <span>{page+1}</span>
          <button disabled={page>=totalPages-1} onClick={()=>updatePage(page+1)}>Järgmine</button>
    </div>
    
  )
}

export default MainPage