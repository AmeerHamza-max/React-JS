# React `useEffect` — Complete Guide

## What is `useEffect`?

`useEffect` is a React Hook that lets you **synchronize your component with the outside world** — things like fetching data from an API, setting up timers, updating the browser title, or listening to events.

The name itself is a hint: it handles **side effects**. A side effect is anything that reaches *outside* the component's render logic — network requests, DOM manipulation, subscriptions, console logs, etc.

---

## Basic Syntax

```js
useEffect(() => {
  // your side effect code here

  return () => {
    // optional cleanup function
  };
}, [dependencies]);
```

There are three parts:

| Part | What it is |
|---|---|
| Callback function | The code that runs as your effect |
| Cleanup function | Returned from the callback; runs before the next effect or on unmount |
| Dependency array | Controls *when* the effect runs |

---

## The Dependency Array — The Heart of `useEffect`

The second argument `[]` is the **dependency array**. It tells React *when* to re-run the effect.

### Case 1 — No dependency array

```js
useEffect(() => {
  console.log("runs after every render");
});
```

Runs after **every** render. Rarely what you want.

---

### Case 2 — Empty dependency array `[]`

```js
useEffect(() => {
  console.log("runs only once, on page load");
}, []);
```

Runs **only once** when the component first mounts. Perfect for initial data fetching.

From your code (`Users` component):
```js
useEffect(() => {
  fetchAllUsers();
}, []);
```
This fetches users once when the page loads — never again unless the component unmounts and remounts.

---

### Case 3 — With dependencies

```js
useEffect(() => {
  console.log("count changed!");
  if (count === 10) {
    setChangeStyle(true);
  }
}, [count]);
```

Runs when the component mounts **and** every time `count` changes.

From your code (`ProductList` component) — this is exactly what happens:
- Button is clicked → `count` increases → React sees `count` changed → effect runs → checks if `count === 10` → updates style.

---

## Execution Order

Understanding *when* effects run is important:

```
1. Component renders (JSX is evaluated)
2. React updates the DOM
3. useEffect callback runs
```

Effects always run **after** the render is painted to the screen. They never block the browser.

---

## The Cleanup Function

Some effects need to be cleaned up — event listeners, timers, subscriptions. If you don't clean them up, you get **memory leaks**.

```js
useEffect(() => {
  const timer = setInterval(() => {
    console.log("tick");
  }, 1000);

  return () => {
    clearInterval(timer); // cleanup runs before next effect or on unmount
  };
}, []);
```

The cleanup function runs:
- Before the effect runs again (if dependencies changed)
- When the component is removed from the screen (unmounted)

---

## Fetching Data with `useEffect`

This is the most common use case, seen in your `Users` component:

```js
async function fetchAllUsers() {
  try {
    const apiResponse = await fetch("https://dummyjson.com/users");
    const result = await apiResponse.json();

    if (result?.users) {
      setUsersList(result.users);
    } else {
      setUsersList([]);
    }
  } catch (err) {
    console.log(err);
  }
}

useEffect(() => {
  fetchAllUsers();
}, []); // empty array = run once on mount
```

**Why can't we make the `useEffect` callback itself `async`?**

```js
// ❌ WRONG — React doesn't support this
useEffect(async () => {
  const data = await fetch("...");
});

// ✅ CORRECT — define async function inside, then call it
useEffect(() => {
  async function load() {
    const data = await fetch("...");
  }
  load();
}, []);
```

React expects the callback to either return nothing or return a cleanup function. An `async` function always returns a Promise, which breaks this contract.

---

## Multiple `useEffect` Hooks

You can (and should) use multiple `useEffect` hooks in one component — one for each concern:

```js
// Effect 1: runs once on mount
useEffect(() => {
  console.log("run only once page load");
  setFlag(!flag);
}, []);

// Effect 2: runs when count changes
useEffect(() => {
  console.log("count changes");
  if (count === 10) {
    setChangeStyle(true);
  }
}, [count]);
```

This is exactly what your `ProductList` component does. Each effect has a single responsibility, which keeps the code clean and easy to debug.

---

## Common Patterns at a Glance

| Goal | How |
|---|---|
| Run once on mount | `useEffect(() => { ... }, [])` |
| Run when a value changes | `useEffect(() => { ... }, [value])` |
| Run on every render | `useEffect(() => { ... })` |
| Fetch data on load | `useEffect(() => { fetchData(); }, [])` |
| Clean up a timer | Return `() => clearInterval(timer)` from the callback |
| Watch multiple values | `useEffect(() => { ... }, [a, b, c])` |

---

## Common Mistakes

**1. Missing dependency array → infinite loop**
```js
const [data, setData] = useState(null);

useEffect(() => {
  setData("something"); // triggers re-render
  // re-render runs effect again → infinite loop
});
```

**2. Stale closure — using an old value**
```js
useEffect(() => {
  console.log(count); // this might log an outdated value
}, []); // count is not in the dependency array
```

Always include every variable that your effect reads in the dependency array.

**3. Forgetting cleanup**
```js
useEffect(() => {
  window.addEventListener("resize", handleResize);
  // ❌ no cleanup — listener keeps running even after component is gone
}, []);

// ✅ correct
useEffect(() => {
  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);
```

---

## Quick Mental Model

Think of `useEffect` as a way to say:

> "Hey React, after you finish rendering, please also do *this* — and here's when to do it again."

The dependency array is your way of telling React the *when*.

---

## Summary

- `useEffect` runs **after** render, not during.
- The **dependency array** controls when it re-runs.
- `[]` = run once. `[value]` = run when value changes. No array = run always.
- **Async data fetching** belongs inside `useEffect` with `[]`.
- Always **clean up** subscriptions and timers using the return function.
- Use **multiple** `useEffect` hooks for different concerns — don't combine unrelated logic.