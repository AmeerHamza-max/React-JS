import { useEffect, useState } from "react";
import ProductItem from "./Component/product-item";
// const dummyProductData = ['Product1','Product2','Product3'];
import './Component/style.css'


// function renderTextBlock(getFlag){
//     return getFlag ? <h4>Name is {name}, he/she belongs to this city {city}</h4>:<h4>Hello World</h4>
// }

// const initialState={

// }
const initialState = false;

// function ProductList(props){
 function ProductList({name,city,dummyProductData}){
    // const flag = true;
    // const renderTextBlock = flag ? <h4>Name is {name}, he/she belongs to this city {city}</h4>:<h4>Hello World</h4>

    const [flag,setFlag] = useState(initialState);
    const [count,setCount]=useState(0);
    const [changeStyle,setChangeStyle]=useState(false);
    // const [flag,setFlag] = useState(null);
    // const [flag,setFlag] = useState({});
    // const [flag,setFlag] = useState([]);

    // let renderTextBlock = null;
    // if(flag){
    //     renderTextBlock = <h4>Name is {name}, he/she is belongs to this city {city}</h4>
    // }
    // else{
    //     renderTextBlock =  <h4>Hello World</h4>
    // }

    // console.log(props);
    // const {name,city}=props;
    function handleToggleText(){
        setFlag(!flag);
    }
    useEffect(()=>{
    console.log('run only once page load');
    setFlag(!flag);

},[]);// this will only run on page load once

useEffect(()=>{
    console.log('count changes');
    if(count==10){
        setChangeStyle(true);
    }
},[count]);

function handleIncreaseCount(){
    setCount(count + 1);
}

console.log(changeStyle);


    
    return <div>
        <h3 className="title">Ecommerce Project</h3>
        <button onClick={handleToggleText}style={{backgroundColor:changeStyle ? 'black':'white',color:changeStyle ?'white':'black'}}>Toogle Text</button>
        {/* <ProductItem /> */}
        {/* {
            // flag ? <h4>Name is {name}, he/she belongs to this city {city}</h4>:<h4>Hello World</h4>
            renderTextBlock(flag)
        } */}


        {flag ? <h4>{name} and {city}</h4>:<h4>Hello</h4>}

    
        
        <ul>
            {
                dummyProductData.map((item,index)=>(
                    <ProductItem singleProduct={item} key={index} />
                ))
            }
        </ul>
        <div>
            <button onClick={handleIncreaseCount}>Increase Count</button>
            <p>Count is {count}</p>
        </div>
    </div>
    
}
export default ProductList;