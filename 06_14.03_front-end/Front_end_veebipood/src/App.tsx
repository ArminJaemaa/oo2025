import { useEffect, useState } from 'react'
//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css'
import { category } from './models/category.ts';
import { product } from './models/products.ts';
//const kogus = 123
function App() {
  //const [count, setCount] = useState(0)  useState-i on vaja, sest ei kaotaks asju ära.
  const sonad = ["elas", "metsas", "mutionu"];
  const autod = [
    {"mark": "bmw", "mudel": "M5", "aasta": 2022},
    {"mark": "audi", "mudel": "RS7", "aasta": 2020},
    {"mark": "mercedes", "mudel": "S klass", "aasta": 2021},
    {"mark": "toyota", "mudel": "Supra mk4", "aasta": 2000}
  ];

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
    <>
{/*     <div>{7+7}</div>
    <div>7+7</div>
    <div>{kogus}</div>
    <div>{count}</div> */}
    {sonad.map(sona =>
      <div key={sona}>
      {sona}
      </div> )}
    <br />
    <br/>
    {autod.map(auto => <div key={auto.mark+auto.mudel}>
      {auto.mark} - {auto.mudel} ({auto.aasta})
      </div> )}
    <br/>
    <br />
    {kategooriad.map(kategooria =>
       <div key={kategooria.id}>
      {kategooria.name}{kategooria.active}
    </div>)}
    <br />
    <br />
    {products.map(product =>
      <div id="products" key={product.id}>
        <div>({product.category?.name})</div> {/* vaja panna category taha ? kui võib olla categoty juures kuskil NULL */}
         {product.name} - {product.price} {product.active}
          </div> )}
    </>
  )
}

//key={}
//react soovib koodi mällu jätta. Kui toimuvad re-renderdamised, siis jätab kõib mällu, va tsükli sisud.
//sest pole aimu mille järgi meelde jätta.
//selle jaoks et saaks meelde jätta, lisame key={} !! kehtib tsüklite ja array-dega !!

export default App
