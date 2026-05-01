# 📘 React Day 5 – Conditional Rendering, State, setState & Lifecycle Methods

> **Based strictly on your Day 5 code** — ClassBasedComponent, ProductList (conditional rendering), and everything you wrote.

---

## 📚 Table of Contents

1. [Conditional Rendering](#1-conditional-rendering)
2. [State in Class Components](#2-state-in-class-components)
3. [setState – How It Works](#3-setstate--how-it-works)
4. [Lifecycle Methods](#4-lifecycle-methods)
5. [Putting It All Together](#5-putting-it-all-together)
6. [Practice Exercises](#6-practice-exercises)
7. [Mini Assignment](#7-mini-assignment)
8. [Key Takeaways](#8-key-takeaways)

---

## 1. Conditional Rendering

### 🧠 What Is It?

Conditional rendering means: **show this UI if a condition is true, show something else (or nothing) if it is false.**

It is exactly like an `if/else` in regular JavaScript — but inside JSX.

---

### ✅ Method 1 — Ternary Operator (Inline)

```jsx
// From your ProductList component:
const flag = true;

return (
  <div>
    {flag
      ? <h4>Name is {name}, he/she belongs to this city {city}</h4>
      : <h4>Hello World</h4>
    }
  </div>
);
```

**How it works:**

```
condition ? "render this if TRUE" : "render this if FALSE"
```

Think of it like a one-liner if/else. Perfect for small, simple conditions.

---

### ✅ Method 2 — Variable Assignment (Your Preferred Way)

```jsx
// From your ProductList component:
let renderTextBlock = null;   // start with nothing

if (flag) {
  renderTextBlock = <h4>Name is {name}, he/she belongs to this city {city}</h4>;
} else {
  renderTextBlock = <h4>Hello World</h4>;
}

return (
  <div>
    {renderTextBlock}   {/* use the variable here */}
  </div>
);
```

**Why this is better for complex conditions:**
- Easier to read
- You can add more logic before returning
- No messy ternary inside JSX

---

### ✅ Method 3 — && Operator (Show or Show Nothing)

```jsx
// From your ClassBasedComponent:
<div>
  {this.state.showText ? <h3>Class based component</h3> : null}
</div>

// Shorter version using &&:
<div>
  {this.state.showText && <h3>Class based component</h3>}
</div>
```

**How `&&` works:**
- If left side is `true` → render the right side
- If left side is `false` → render nothing

---

### ✅ Method 4 — Function That Returns JSX (From Your Comments)

```jsx
// You had this in comments — here it is fully working:
function renderTextBlock(getFlag) {
  return getFlag
    ? <h4>Flag is true!</h4>
    : <h4>Hello World</h4>;
}

// Usage inside JSX:
return (
  <div>
    {renderTextBlock(flag)}
  </div>
);
```

> ⚠️ **Why you got confused:** You called `renderTextBlock(flag)` but the function was defined as a `const` variable holding JSX — not a function. When you use a variable, you write `{renderTextBlock}`. When it is a function, you write `{renderTextBlock(flag)}`. This is the difference!

---

### 📊 Comparison Table

| Method | When to Use |
|---|---|
| Ternary `? :` | Simple true/false, short JSX |
| Variable `let x = null` | Complex logic, multiple conditions |
| `&&` operator | Show something OR show nothing |
| Function returning JSX | Reusable conditional logic |

---

## 2. State in Class Components

### 🧠 What Is State?

**State** is data that belongs to a component and can **change over time**. When state changes, React automatically **re-renders** the component to show the updated UI.

Think of state like a **variable that React is watching**. The moment it changes, React updates the screen.

---

### ✅ How to Define State

```jsx
class ClassBasedComponent extends Component {
  // Modern way (class field syntax) — your approach ✅
  state = {
    showText: false,
    changeColor: false,
    count: 0,
  };
}
```

**Older way (constructor) — also valid:**

```jsx
constructor(props) {
  super(props);
  this.state = {
    showText: false,
    changeColor: false,
    count: 0,
  };
}
```

Both work. Your way (class field) is cleaner and modern.

---

### ✅ How to Read State

Always use `this.state` to read any value:

```jsx
// Reading directly:
console.log(this.state.showText);   // false
console.log(this.state.count);      // 0

// Destructuring (cleaner — your approach):
const { showText, changeColor, count } = this.state;
console.log(showText);   // false
```

> ❌ **Never do this:** `console.log(state)` — this throws an error because `state` alone is not accessible. You must write `this.state`.

---

### ✅ Using State in JSX

```jsx
render() {
  const { showText, changeColor, count } = this.state;

  return (
    <div>
      {/* Use state values directly in JSX */}
      {showText ? (
        <h3 style={{ color: changeColor ? "red" : "black" }}>
          Class based component
        </h3>
      ) : null}

      <h3>Count is {count}</h3>
    </div>
  );
}
```

---

## 3. setState – How It Works

### 🧠 What Is setState?

`setState` is the **only correct way** to change state in a class component.

> ❌ **Wrong — Never do this:**
> ```jsx
> this.state.showText = true;  // React will NOT re-render!
> ```

> ✅ **Correct — Always do this:**
> ```jsx
> this.setState({ showText: true });  // React sees the change and re-renders
> ```

---

### ✅ Basic setState

```jsx
// From your handleClick:
handleClick = () => {
  this.setState({
    showText: !this.state.showText,
    changeColor: !this.state.changeColor,
  });
};
```

**What happens step by step:**
1. You click the button → `handleClick` runs
2. `setState` is called with new values
3. React merges new values into existing state
4. React re-renders the component with updated state
5. Screen updates automatically

---

### ✅ setState Merges, Not Replaces

This is important. When you call `setState`, React **merges** the new object into the existing state — it does NOT delete the rest.

```jsx
// Current state:
state = { showText: false, changeColor: false, count: 0 };

// You call:
this.setState({ count: 1 });

// Result — React MERGES, so state becomes:
// { showText: false, changeColor: false, count: 1 }
// showText and changeColor are untouched ✅
```

> 📌 **Your code note:** In `handleCount`, you wrote `...this.state` with spread — that is not necessary because setState already merges automatically. Both work, but the simpler version is cleaner:

```jsx
// Your version (works, but spread is unnecessary):
handleCount = () => {
  this.setState({
    ...this.state,
    count: this.state.count + 1,
  });
};

// Cleaner version (recommended):
handleCount = () => {
  this.setState({ count: this.state.count + 1 });
};
```

---

### ✅ setState Is Asynchronous

`setState` does **not** update state immediately. React batches updates for performance.

```jsx
handleClick = () => {
  this.setState({ count: this.state.count + 1 });
  console.log(this.state.count); // ⚠️ Still shows OLD value!
};
```

**If you need to use the PREVIOUS state reliably, use the functional form:**

```jsx
// Safe way — use previous state:
this.setState((prevState) => ({
  count: prevState.count + 1,
}));
```

This guarantees you always get the latest state value.

---

### 📊 setState Quick Reference

| Situation | Code |
|---|---|
| Update one field | `this.setState({ count: 5 })` |
| Toggle a boolean | `this.setState({ show: !this.state.show })` |
| Use previous state safely | `this.setState(prev => ({ count: prev.count + 1 }))` |
| Update multiple fields | `this.setState({ a: 1, b: 2 })` |

---

## 4. Lifecycle Methods

### 🧠 What Are Lifecycle Methods?

Every class component goes through three phases of life:

```
BORN          →       LIVING          →       DYING
(Mount)             (Update)              (Unmount)
   ↓                    ↓                     ↓
componentDidMount  componentDidUpdate  componentWillUnmount
```

Each phase has a method you can hook into.

---

### ✅ componentDidMount

**When does it run?** Once — right after the component appears on the screen for the first time.

**Use it for:** Fetching data from an API, setting up timers, subscriptions.

```jsx
// From your code:
componentDidMount() {
  console.log('this is called for the first time when the page is load');

  // You toggled state here to show text on first load:
  this.setState({
    showText: !this.state.showText,
    changeColor: !this.state.changeColor,
  });
}
```

**Real-world example — fetching data:**

```jsx
componentDidMount() {
  // Fetch product data when the component first loads:
  fetch('https://api.example.com/products')
    .then(response => response.json())
    .then(data => {
      this.setState({ products: data });
    });
}
```

---

### ✅ componentDidUpdate

**When does it run?** Every time state or props change and the component re-renders.

**Use it for:** Running side effects after an update, comparing old and new values.

```jsx
// From your code:
componentDidUpdate(previousProps, previousState) {
  console.log(previousState, this.state);
  // previousState → what state WAS before the update
  // this.state    → what state IS now (after update)
}
```

**Practical use — only run code when a specific value changes:**

```jsx
componentDidUpdate(prevProps, prevState) {
  // Only fetch new data if the count actually changed:
  if (prevState.count !== this.state.count) {
    console.log('Count changed! Do something.');
  }
}
```

> ⚠️ **Warning:** If you call `setState` inside `componentDidUpdate` without a condition, you create an **infinite loop**:
> ```jsx
> // ❌ INFINITE LOOP — never do this:
> componentDidUpdate() {
>   this.setState({ count: 1 }); // triggers update → triggers componentDidUpdate → triggers setState...
> }
>
> // ✅ SAFE — always add a condition:
> componentDidUpdate(prevState) {
>   if (prevState.count !== this.state.count) {
>     this.setState({ someOtherThing: true }); // only runs when count changes
>   }
> }
> ```

---

### ✅ componentWillUnmount

**When does it run?** Right before the component is removed from the screen.

**Use it for:** Clearing timers, cancelling API calls, removing event listeners.

```jsx
// You had it in your comments — here is a full example:
componentWillUnmount() {
  console.log('Component is being removed from the screen');

  // If you started a timer in componentDidMount, clear it here:
  clearInterval(this.myTimer);
}
```

**Full lifecycle example with a timer:**

```jsx
class TimerComponent extends Component {
  state = { seconds: 0 };

  componentDidMount() {
    // Start timer when component appears
    this.myTimer = setInterval(() => {
      this.setState((prev) => ({ seconds: prev.seconds + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    // Clean up timer when component is removed — memory leak prevention!
    clearInterval(this.myTimer);
  }

  render() {
    return <h3>Timer: {this.state.seconds} seconds</h3>;
  }
}
```

---

### 📊 Lifecycle Overview Table

| Method | When It Runs | Common Use Cases |
|---|---|---|
| `componentDidMount` | Once — after first render | API calls, timers, subscriptions |
| `componentDidUpdate` | After every re-render | Respond to state/prop changes |
| `componentWillUnmount` | Before component is removed | Cleanup timers, cancel requests |

---

### 📈 Full Lifecycle Flow Diagram

```
Component Created
       ↓
   constructor / state = {}       ← initialize state
       ↓
     render()                     ← JSX is returned
       ↓
   DOM is updated
       ↓
componentDidMount()               ← ✅ safe to fetch data here
       ↓
  [User interacts / state changes]
       ↓
     render()                     ← re-renders with new state
       ↓
   DOM is updated
       ↓
componentDidUpdate()              ← compare old and new values
       ↓
  [Component is removed]
       ↓
componentWillUnmount()            ← cleanup before dying
```

---

## 5. Putting It All Together

Here is your `ClassBasedComponent` fully explained with comments:

```jsx
import { Component } from "react";

class ClassBasedComponent extends Component {

  // ── STEP 1: Define initial state ──────────────────────────────────────
  state = {
    showText: false,      // controls if the h3 is visible
    changeColor: false,   // controls text color (red or black)
    count: 0,             // counter value
  };

  // ── STEP 2: Event Handlers ────────────────────────────────────────────

  // Toggles the text visibility and color on button click
  handleClick = () => {
    console.log('button clicked');
    this.setState({
      showText: !this.state.showText,       // flip true↔false
      changeColor: !this.state.changeColor, // flip true↔false
    });
  };

  // Increases the count by 1
  handleCount = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  // ── STEP 3: Lifecycle Methods ─────────────────────────────────────────

  // Runs ONCE after the component first appears
  componentDidMount() {
    console.log('Page loaded for the first time');
    // This immediately toggles the text — so text IS visible on first load
    this.setState({
      showText: !this.state.showText,
      changeColor: !this.state.changeColor,
    });
  }

  // Runs after EVERY state update
  componentDidUpdate(previousProps, previousState) {
    // Logs what changed:
    console.log('Previous state:', previousState);
    console.log('Current state:', this.state);
  }

  // ── STEP 4: Render ─────────────────────────────────────────────────────

  render() {
    // Destructure for cleaner code
    const { showText, changeColor, count } = this.state;

    return (
      <div>
        {/* Conditional render — show h3 only if showText is true */}
        <div>
          {showText
            ? <h3 style={{ color: changeColor ? "red" : "black" }}>
                Class based component
              </h3>
            : null
          }
        </div>

        {/* Buttons trigger state changes */}
        <button onClick={this.handleClick}>Toggle Text</button>
        <button onClick={this.handleCount}>Increase Count Value</button>

        {/* Always visible — shows current count */}
        <h3>Count is {count}</h3>
      </div>
    );
  }
}

export default ClassBasedComponent;
```

---

## 6. Practice Exercises

### 🟢 Beginner

**Exercise 1 — Show/Hide Message**
Create a component with a button. When clicked, show "Hello, I am visible!" and hide it on next click.

**Exercise 2 — Color Switcher**
Create a box (`div`) that is blue by default. Add a button that toggles the background color between blue and green.

**Exercise 3 — Counter with Limit**
Build a counter that goes from 0 to 10 only. The "Increment" button should be disabled once count reaches 10.

---

### 🟡 Intermediate

**Exercise 4 — Greeting by Time**
Write a component that shows different messages based on a state variable `hour`:
- 0–11 → "Good Morning!"
- 12–17 → "Good Afternoon!"
- 18–23 → "Good Evening!"

**Exercise 5 — Fetch on Mount**
Create a class component that fetches a list of users from `https://jsonplaceholder.typicode.com/users` in `componentDidMount` and displays their names.

**Exercise 6 — Auto Counter**
Build a counter that auto-increments every second using `setInterval` in `componentDidMount`. Stop it using a "Stop" button. Clean up the interval in `componentWillUnmount`.

---

### 🔴 Advanced

**Exercise 7 — Conditional Form**
Build a multi-step form with 3 steps. Each step shows different fields. A "Next" and "Back" button controls which step is visible (use state to track current step).

**Exercise 8 — Log State Changes**
Build a component where every time state changes, the previous and current state values are logged on screen (in an array/list). Use `componentDidUpdate` to do this.

---

### 🏆 Challenge (Interview Level)

**Exercise 9 — Stopwatch**
Build a stopwatch with:
- Start, Stop, Reset buttons
- Displays MM:SS format
- Uses `setInterval` and `componentWillUnmount` for cleanup
- The "Stop" button pauses without resetting
- The "Reset" button clears and stops

---

## 7. Mini Assignment

Build this component independently:

**Traffic Light Simulator**

Requirements:
- 3 colored circles: Red, Yellow, Green
- Each light stays on for 3 seconds, then switches automatically
- Order: Red → Green → Yellow → Red (loop)
- Use `componentDidMount` to start the cycle
- Use `componentWillUnmount` to clean up
- Display the current light name as text below the lights

---

## 8. Key Takeaways

```
✅ Conditional Rendering
   - Use ternary (? :) for simple true/false
   - Use variable (let x = null) for complex logic
   - Use && when you want "show or nothing"

✅ State
   - Data that belongs to a component
   - When state changes, React re-renders automatically
   - Read state with: this.state.value

✅ setState
   - ONLY way to update state
   - Never mutate state directly: this.state.x = y ❌
   - setState is async — use functional form for safe updates
   - React MERGES, does not replace

✅ Lifecycle Methods
   - componentDidMount  → runs once after first render (fetch data here)
   - componentDidUpdate → runs after every update (compare old vs new)
   - componentWillUnmount → runs before removal (cleanup here)
```

---

## 🚀 What Comes Next (Day 6 Preview)

You are now ready to learn:

- **Functional Components + useState Hook** (modern React — replaces class state)
- **useEffect Hook** (modern React — replaces all lifecycle methods)
- **Event Handling in depth**

> The concepts you learned today (state, setState, lifecycle) are the **foundation**. In functional components, you will do the same things — just with a cleaner syntax using Hooks.

---

*Keep building. Keep breaking. Keep learning. 🔥*