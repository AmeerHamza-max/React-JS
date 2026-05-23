import { useEffect, useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import heroImg from './assets/hero.png';
import './App.css';
import FunctionalComponent from './Day2/functional-component';
import MultipleTags from './Day2/exercise';
import ChangeToFunction from './Day2/exercise';
import ProductList from './Day7/Components/Products';
import Card from './Day3/Exercise/Card';
import List from './Day3/Exercise/List';
import Product from './Day3/Exercise/Product';
import ClassBasedComponent from './Day6/class-based-component';
import Users from './Day8/users';
import ContextButtonComponent from './Day8/Components/context-concept/button';
import ContextTextComponent from './Day8/Components/context-concept/text';
import UseReducerExample from './Day9/use-reducer-example';
import { SettingsEthernet } from '@mui/icons-material';
import classes from './styles.module.css';
import TodoItem from './Projects/Todo List/components/todo-item';
import TodoDetails from './Projects/Todo List/components/todo-details';
import { Skeleton } from '@mui/material';

const dummyProductData = ['Product1','Product2','Product3'];




function App() {
  const [count, setCount] = useState(0);
  const [todoList,setTodoList]=useState([]);
  const [loading,setLoading]=useState(false);
  const [errorMsg,setErrorMsg]=useState(null);
  const [todoDetails,setTodoDetails]=useState(null);
  const [openDialog,setOpenDialog]=useState(false);
  async function fetchListOfTodos(){
    try {
      setLoading(true);
      const apiResponse=await fetch("https://dummyjson.com/todos");
      const result =await apiResponse.json();
      if(result ?.todos && result?.todos.length > 0){
        setTodoList(result?.todos);
        setLoading(false);
        setErrorMsg('');
      }
      else{
        setTodoList([]);
        setLoading(false);
        setErrorMsg('');
      }
    } catch (error) {
      console.log(error);
      setErrorMsg('Some error occured');
    }
  }
  async function fetchDetailsofCurrentTodos(getCurrentTodoId){
    try{
      const apiResponse = await fetch(`https://dummyjson.com/todo/${getCurrentTodoId}`);
      const details = await apiResponse.json();
      if(details){
           setTodoDetails(details);
           setOpenDialog(true);
      }else{
        setTodoDetails(details);
        setOpenDialog(false); 
      }
    }
    catch(error){
      console.log(error);
    }
  }
  useEffect(()=>{
    fetchListOfTodos();
  },[])
  if(loading) return <Skeleton variant='rectangular' width={650} height={650} />

  return (
    <div className={classes.mainWrapper}>
     {/* <h1>Hello React from react app</h1> */}
     {/* <ProductList name="Ameer Hamza" city="Sargodha" dummyProductData={dummyProductData} /> */}
     {/* <ProductList name="Ameer Hamza" city="Sargodha" listofProducts={dummyProductData} /> */}
     {/* <ClassBasedComponent /> */}
     {/* <Users /> */}
     {/* <ContextButtonComponent />
     <ContextTextComponent />
      */}
      {/* <UseReducerExample /> */}
      <h1 className={classes.headerTitle}>Simple Todo APP Using Material UI</h1>
      <div className={classes.todoListWrapper}>
        {
          todoList && todoList.length > 0 ?
          todoList.map(todoItem => <TodoItem fetchDetailsofCurrentTodos={fetchDetailsofCurrentTodos} todo={todoItem} />):null
        }
      </div>
      <TodoDetails openDialog={openDialog} todoDetails={todoDetails} setOpenDialog={setOpenDialog} setTodoDetails={setTodoDetails} />

    </div>
  )
}

export default App
