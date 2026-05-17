import { useState } from 'react';
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


const dummyProductData = ['Product1','Product2','Product3'];




function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     {/* <h1>Hello React from react app</h1> */}
     {/* <ProductList name="Ameer Hamza" city="Sargodha" dummyProductData={dummyProductData} /> */}
     {/* <ProductList name="Ameer Hamza" city="Sargodha" listofProducts={dummyProductData} /> */}
     {/* <ClassBasedComponent /> */}
     {/* <Users /> */}
     {/* <ContextButtonComponent />
     <ContextTextComponent />
      */}
      {/* <UseReducerExample /> */}
      <h1>Simple Todo APP Using Material UI</h1>

     

    </>
  )
}

export default App
