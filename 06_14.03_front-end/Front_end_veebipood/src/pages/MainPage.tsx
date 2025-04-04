//rfce snippet
// terminalis ( npm install react-router-dom )!!

import { useEffect, useState } from "react";
import { category } from "../models/category";
import { product } from "../models/products";

function MainPage() {

     // muutuja - HTML   muudab muutuja + HTMLi     sulgude sees - algväärtus
  const [kategooriad, setKategooriad] = useState<category[]>([]);
  const [products, setProducts] = useState<product[]>([]);
  const [totalProducts, setTotalProducts] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const productsByPage = 2;
  const [page, setPage] = useState(0);
  const [activeCategory, setActiveCategory] = useState(-1);

  //uef --> enter või tab ---> onload funktsioon, funktsioon läheb kohe käima kui lehele minna.

  useEffect(() => {
    fetch('http://localhost:8080/categories') //API otspunkt kuhu läheb päring
            .then(res=>res.json())             // Kogu tagastus: headers, status code.
            .then(json=>setKategooriad(json))     // body: sisu mille tagastab back-end.
  }, []);
  useEffect(() => {
/*     fetch('http://localhost:8080/products')
            .then(res=>res.json())
            .then(json=>setProducts(json)) */
    showByCategory(-1,0)
  }, []);

  function showByCategory(categoryId: number, currentPage:number){
    setActiveCategory(categoryId)
    setPage(currentPage);
    fetch('http://localhost:8080/category-products?categoryId='+categoryId +
       "&size="+productsByPage+"&page="+currentPage)
    .then(res=>res.json())
    .then(json=>{
      setProducts(json.content);
      setTotalProducts(json.totalElements);
      setTotalPages(json.totalPages);
    }) //mida set'in see muutub. Ehk kui panna setKategooria, siis muutvad kategooriad ja tänu sellele ka nupud.

  }

  function updatePage(newPage:number){
    showByCategory(activeCategory, newPage);
  }

/*   const showByCategory = () => {
      on kaks võimalust teha funkstioone.
  } */
    
  return (
    <div className="mainPageContainer">

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
          <button disabled={page===Math.ceil(totalProducts/productsByPage-1)} onClick={()=>updatePage(page+1)}>Järgmine</button>
    </div>
    
  )
}

export default MainPage