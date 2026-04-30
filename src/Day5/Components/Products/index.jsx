import ProductItem from "./Component/product-item";
// const dummyProductData = ['Product1','Product2','Product3'];
import './Component/style.css'


// function renderTextBlock(getFlag){
//     return getFlag ? <h4>Name is {name}, he/she belongs to this city {city}</h4>:<h4>Hello World</h4>
// }


// function ProductList(props){
 function ProductList({name,city,listofProducts}){
    const flag = true;
    // const renderTextBlock = flag ? <h4>Name is {name}, he/she belongs to this city {city}</h4>:<h4>Hello World</h4>

    let renderTextBlock = null;
    if(flag){
        renderTextBlock = <h4>Name is {name}, he/she is belongs to this city {city}</h4>
    }
    else{
        renderTextBlock =  <h4>Hello World</h4>
    }

    // console.log(props);
    // const {name,city}=props;
    return <div>
        <h3 className="title">Ecommerce Project</h3>
        {/* <ProductItem /> */}
        {/* {
            // flag ? <h4>Name is {name}, he/she belongs to this city {city}</h4>:<h4>Hello World</h4>
            renderTextBlock(flag)
        } */}


        {renderTextBlock}

    
        
        <ul>
            {
                listofProducts.map((item,index)=>(
                    <ProductItem singleProduct={item} key={index} />
                ))
            }
        </ul>
    </div>
}
export default ProductList;