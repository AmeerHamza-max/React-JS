# 📘 React Components (Class vs Functional)

React applications are built using **components**, which are reusable building blocks of the UI. There are two main types of components in React:

* Class-Based Components
* Functional Components

This guide focuses only on **basic understanding of components** without advanced concepts.

---

## 🧠 Class-Based Components

Class-based components are written using ES6 classes.

### ✅ Example

```jsx
import { Component } from "react";

class ClassBasedComponent extends Component {
    render() {
        return (
            <div>
                <h3>Class Based Component</h3>
            </div>
        );
    }
}

export default ClassBasedComponent;
```

### 📌 Key Concepts

* Uses the `class` keyword
* Extends `Component` from React
* Must include a `render()` method
* Uses `this` keyword

---

## ⚡ Functional Components

Functional components are simple JavaScript functions.

### ✅ Example

```jsx
const FunctionalComponent = () => {
    return (
        <div>
            <h4>Functional Component (Arrow Function)</h4>
        </div>
    );
};

export default FunctionalComponent;
```

---

### 📌 Key Concepts

* Simple JavaScript function
* No `this` keyword
* Cleaner and shorter syntax
* Easier to understand for beginners

---

## 🔄 Class vs Functional (Comparison)

| Feature     | Class Component | Functional Component |
| ----------- | --------------- | -------------------- |
| Syntax      | More complex    | Simple               |
| Structure   | Uses class      | Uses function        |
| Keyword     | Uses `this`     | No `this`            |
| Learning    | Slightly harder | Easier               |
| Usage Today | Less used       | More used            |

---

## 🧪 Practice Exercises

### 🟢 Exercise 1: Basic Functional Component

Create a functional component that displays your name. Try using different heading tags and add a paragraph below it.

---

### 🟡 Exercise 2: Class Component Practice

Create a class-based component that displays your favorite subject or hobby. Try modifying the text and observe how the structure works.

---

### 🟡 Exercise 3: Multiple Elements

Create a component (functional or class) that returns multiple elements like heading, paragraph, and a button inside a single parent div.

---

### 🔴 Exercise 4: Convert Component

Take a class-based component and rewrite it as a functional component. Focus on removing the class syntax and using a simple function instead.

---

### 🔴 Exercise 5: Component Reuse

Create one component and use it multiple times inside another component. Try changing the content slightly each time.

---

## 🎯 Challenge Section

Try building small UI parts using components:

* A simple profile card (name, image, description)
* A heading section for a website
* A reusable button component
* A simple layout with multiple components

---

## 💡 Final Notes

* Focus on understanding how components are structured
* Practice writing both types manually
* Try converting class components into functional ones

---

## 🚀 Next Step

After this, you can move towards:

* Props (passing data between components)
* State (dynamic data handling)
* Hooks (modern React features)

Keep practicing to build strong fundamentals 🚀
