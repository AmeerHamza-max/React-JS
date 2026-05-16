import { useEffect, useEffectEvent, useState } from "react"

export default function Users(){
    const [usersList,setUsersList]=useState([]);

    async function  fetchAllUsers() {
        try{
            const apiResponse = await fetch("https://dummyjson.com/users");
            const result = await apiResponse.json();
            
            if(result?.users){
                setUsersList(result?.users);
            }
            else{
                setUsersList();
            }
        }
        catch(err){
            console.log(err);
        }
    }
    useEffect(()=>{
        fetchAllUsers()
    },[])
    console.log(usersList);
    return <div>
        <h1>All Users List</h1>
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