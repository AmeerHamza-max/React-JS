function ProductItem(){
    return <div>
        <p>Product 1</p>
        <Button />
    </div>
}

function Button(){
    return <button>Click</button>
}

export default ProductItem;

// App -> ProductList -> ProductItem -> Button -> Other Component 