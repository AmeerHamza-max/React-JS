import ProductItem from "./Component/product-item";
// const dummyProductData = ['Product1','Product2','Product3'];
import './Component/style.css'


// function ProductList(props){
 function ProductList({name,city,listofProducts}){

    // console.log(props);
    // const {name,city}=props;
    return <div>
        <h3 className="title">Ecommerce Project</h3>
        {/* <ProductItem /> */}
        <h4>Name is {name}, he/she belongs to this city {city}</h4>
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