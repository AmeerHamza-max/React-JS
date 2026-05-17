import { useEffect, useEffectEvent, useState } from "react"

export default function Users(){
    const [usersList,setUsersList]=useState([]);
    const [pending,setPending]=useState(false);

    async function  fetchAllUsers() {
        try{
            setPending(true);
            const apiResponse = await fetch("https://dummyjson.com/users");
            const result = await apiResponse.json();
            
            if(result?.users){
                setUsersList(result?.users);
                setPending(false);
            }
            else{
                setUsersList();
                setPending(false);
            }
        }
        catch(err){
            console.log(err);
        }
    }
    function handleFetchListOfUsers(){
        fetchAllUsers();
    }
    // useEffect(()=>{
    //     fetchAllUsers()
    // },[])
    console.log(usersList);
    if(pending) return <h1>Fetching User's Please Wait</h1>
    return <div>
        <h1>All Users List</h1>
        <button onClick={handleFetchListOfUsers}>Fetch Users List</button>
        <ul>{
            usersList && usersList.length > 0 ?
            usersList.map((userItem)=>(
                <li key={userItem?.id}>
                    <p>{userItem?.firstName} {userItem?.lastName}</p>
                </li>
            )):<h1>No users Found Please try again</h1>
            }
        </ul>
    </div>
}