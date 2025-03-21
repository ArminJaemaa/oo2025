//rfce snippet
// terminalis ( npm install react-router-dom )!!

import { useEffect, useState } from "react";
import { category } from "../models/category";
import { product } from "../models/products";

function MainPage() {

     // muutuja - HTML   muudab muutuja + HTMLi     sulgude sees - algväärtus
  const [kategooriad, setKategooriad] = useState<category[]>([]);
  const [products, setProducts] = useState<product[]>([]);

  //uef --> enter või tab ---> onload funktsioon, funktsioon läheb kohe käima kui lehele minna.

  useEffect(() => {
    fetch('http://localhost:8080/categories') //API otspunkt kuhu läheb päring
            .then(res=>res.json())             // Kogu tagastus: headers, status code.
            .then(json=>setKategooriad(json))     // body: sisu mille tagastab back-end.
  }, []);
  useEffect(() => {
    fetch('http://localhost:8080/products')
            .then(res=>res.json())
            .then(json=>setProducts(json))
  }, []);
    
  return (
    <div className="mainPageContainer">

{kategooriad.map(kategooria =>
       <div key={kategooria.id}>
      {kategooria.name}{kategooria.active}
    </div>)}
    <br />
    <br />
    {products.map(product =>
      <div id="products" key={product.id}>
        <div>({product.category?.name})</div> {/* vaja panna category taha '?' kui võib olla categoty juures kuskil NULL */}
         {product.name} - {product.price} {product.active}
          </div> )}
    </div>
    
  )
}

export default MainPage