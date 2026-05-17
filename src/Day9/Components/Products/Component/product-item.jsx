import styles from '../../product.module.css'
function ProductItem({singleProduct}){
    return <div style={{padding:'20px',border:'2px solid red',marginBottom:'10px'}}>
        <p className={styles.productTitle}>{singleProduct}</p>
        <Button />
    </div>
}

function Button(){
    return <button className={styles.buttonStyle}>Click</button>
}

export default ProductItem;

// App -> ProductList -> ProductItem -> Button -> Other Component 