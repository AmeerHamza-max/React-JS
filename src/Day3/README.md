# 📘 React Day 3 – Core Concepts (From Your Code)

This documentation is strictly based on the topics used in your code. No extra concepts are included.

---

## 🔑 Topics Covered

* Component Nesting
* Props (Destructuring)
* Passing Data (Parent → Child)
* Rendering Lists using map()
* key in Lists
* Reusable Components
* Data Flow (Top → Down)

---

## 🧩 1. Component Nesting

Using a component inside another component is called nesting.

### ✅ Example

```jsx
function ProductItem(){
    return (
        <div>
            <p>Product 1</p>
            <Button />
        </div>
    );
}

function Button(){
    return <button>Click</button>;
}
```

### 📌 Explanation

* `ProductItem` contains `Button`
* Structure:

```
App → ProductList → ProductItem → Button
```

### 🧪 Exercise

Create a `Card` component with:

* title
* description
* a Button component

---

## 📦 2. Props (Passing Data)

Props are used to send data from a parent component to a child component.

### ✅ Example

```jsx
<ProductList 
  name="Ameer Hamza" 
  city="Sargodha" 
  listofProducts={dummyProductData} 
/>
```

---

## 🎯 3. Props Destructuring

You can destructure props directly in the function parameters.

### ✅ Example

```jsx
function ProductList({name, city, listofProducts}) {
```

### 📌 Explanation

* Cleaner syntax
* Direct access to values

---

## 🔁 4. Rendering Lists using map()

`map()` is used to render arrays into UI elements.

### ✅ Example

```jsx
<ul>
  {
    listofProducts.map((item, index) => (
      <li key={index}>{item}</li>
    ))
  }
</ul>
```

### 📌 Explanation

* Works like a loop
* Converts each item into JSX

### 🧪 Exercise

```js
const fruits = ["Apple", "Mango", "Banana"];
```

Render this array as a list using `map()`

---

## 🆔 5. key in Lists

Each list item must have a unique key.

### ✅ Example

```jsx
<li key={index}>{item}</li>
```

### 📌 Explanation

* Helps React identify elements
* Improves performance

### 🧪 Exercise

Render the same list:

* using index as key
* using custom id (if available)

---

## 🔄 6. Reusable Components

A component can be reused multiple times.

### ✅ Example Idea

```jsx
<ProductItem />
<ProductItem />
<ProductItem />
```

### 📌 Explanation

* Avoids repetition
* Keeps code clean

### 🧪 Exercise

Make `ProductItem` reusable:

* pass prop: `productName`
* show different names for each item

---

## 🧱 7. Data Flow (Parent → Child)

Data flows from parent to child components.

### ✅ Flow

```
App → ProductList → ProductItem
```

### 📌 Explanation

* Parent sends data
* Child receives and uses it

### 🧪 Exercise

Create this flow:

App → UserList → UserItem

Pass `name` to UserItem and display it

---

## 🎯 Final Challenge

Build a simple Product UI:

* App contains an array of products
* ProductList receives props
* ProductItem:

  * displays product name
  * includes a "Buy Now" button

---

## 💡 Notes

* Props are read-only
* `map()` is a core React concept
* Nesting helps structure UI

---

## 🚀 Next Step

Next topics:

* Event Handling
* State (important)

Keep practicing 🚀
