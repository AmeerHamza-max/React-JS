const fruits = ["Apple","Mango","Banana"];

const List = () =>{
    return <div>
        <ul>
            {
                fruits.map((fruit,index)=>(
                    <li key={index}>{fruit}</li>
                ))
            }
        </ul>
    </div>
}

export default List;