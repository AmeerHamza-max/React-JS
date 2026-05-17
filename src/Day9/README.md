# React Context API & useContext Hook — Complete Guide

---

## Table of Contents

1. [Problem: Prop Drilling](#1-problem-prop-drilling)
2. [Solution: Context API](#2-solution-context-api)
3. [Context API — Core Building Blocks](#3-context-api--core-building-blocks)
4. [Step-by-Step Setup](#4-step-by-step-setup)
5. [useContext Hook](#5-usecontext-hook)
6. [Complete Working Example (Theme Switcher)](#6-complete-working-example-theme-switcher)
7. [Multiple Values in Context](#7-multiple-values-in-context)
8. [Updating Context from a Child](#8-updating-context-from-a-child)
9. [Default Value in createContext](#9-default-value-in-createcontext)
10. [Multiple Contexts](#10-multiple-contexts)
11. [Common Mistakes](#11-common-mistakes)
12. [When to Use Context API (and When NOT to)](#12-when-to-use-context-api-and-when-not-to)
13. [Context API vs Redux](#13-context-api-vs-redux)
14. [Summary Cheat Sheet](#14-summary-cheat-sheet)

---

## 1. Problem: Prop Drilling

**Prop Drilling** — jab hum data ko parent se child tak pass karte hain, lekin beech ke components ko us data ki zaroorat nahi hoti — phir bhi unhe props receive karni padti hain sirf aage pass karne ke liye.

```
App (theme state yahan hai)
 └── Layout         ← theme ki zaroorat nahi, but pass karna padta hai
      └── Sidebar   ← theme ki zaroorat nahi, but pass karna padta hai
           └── Button ← yahan actual zaroorat hai
```

```jsx
// ❌ Prop Drilling — boring aur problematic
function App() {
  const [theme, setTheme] = useState("light");
  return <Layout theme={theme} setTheme={setTheme} />;
}

function Layout({ theme, setTheme }) {
  return <Sidebar theme={theme} setTheme={setTheme} />;
}

function Sidebar({ theme, setTheme }) {
  return <Button theme={theme} setTheme={setTheme} />;
}

function Button({ theme, setTheme }) {
  return <button onClick={() => setTheme("dark")}>{theme}</button>;
}
```

**Problem:** Layout aur Sidebar ko `theme` ki zaroorat nahi thi, lekin sirf pass karne ke liye unhe props receive karne pade. Jitna deep component tree, utna zyada mess.

---

## 2. Solution: Context API

Context API ek **global state management** system hai jo React ke andar built-in hai. Isse tum koi bhi value **directly** kisi bhi component ko de sakte ho — beech ke components ko bypass karke.

```
App (Provider — theme value yahan wrap hai)
 └── Layout         ← context se directly le sakta hai
      └── Sidebar   ← context se directly le sakta hai
           └── Button ← context se directly le sakta hai
```

**Koi bhi extra prop pass karne ki zaroorat nahi!**

---

## 3. Context API — Core Building Blocks

| Concept | Kya karta hai |
|---|---|
| `createContext()` | Ek naya context object banata hai |
| `Context.Provider` | Value ko wrap karta hai — jo bhi andar ho use deta hai |
| `useContext(Context)` | Kisi bhi child component mein value access karta hai |

---

## 4. Step-by-Step Setup

### Step 1 — Context File Banao

Ek alag file banao: `src/context/index.js`

```jsx
import { createContext, useState } from "react";

// 1. Context create karo
export const GlobalContext = createContext();

// 2. Provider component banao
export function GlobalProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function handleChangeThemeOnButtonClick() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  // 3. Value object mein jo chahiye wo daal do
  const value = {
    theme,
    handleChangeThemeOnButtonClick,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
```

### Step 2 — App ko Provider mein Wrap karo

`src/main.jsx` ya `src/index.js` mein:

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GlobalProvider>
    <App />
  </GlobalProvider>
);
```

**Ya** `App.jsx` mein bhi wrap kar sakte ho:

```jsx
import { GlobalProvider } from "./context";
import ContextTextComponent from "./components/ContextText";
import ContextButtonComponent from "./components/ContextButton";

function App() {
  return (
    <GlobalProvider>
      <ContextTextComponent />
      <ContextButtonComponent />
    </GlobalProvider>
  );
}

export default App;
```

> **Rule:** Provider sirf un components ko value deta hai jo us ke **andar** (children) hain.

---

## 5. useContext Hook

`useContext` ek React hook hai jo Context ki value directly consume karta hai — kisi bhi functional component ke andar.

### Syntax

```jsx
const value = useContext(ContextObject);
```

### Rules

- Sirf **functional components** mein use karo
- Component ke **top level** par call karo (loops ya conditions ke andar nahi)
- Jis Context ki value chahiye, wahi Context import karo

---

## 6. Complete Working Example (Theme Switcher)

Yeh wahi example hai jo tumhara code demonstrate karta hai:

### `src/context/index.js`

```jsx
import { createContext, useState } from "react";

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [theme, setTheme] = useState("light");

  function handleChangeThemeOnButtonClick() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <GlobalContext.Provider value={{ theme, handleChangeThemeOnButtonClick }}>
      {children}
    </GlobalContext.Provider>
  );
}
```

---

### `src/components/ContextText/index.jsx`

```jsx
import { useContext } from "react";
import { GlobalContext } from "../../context";

function ContextTextComponent() {
  const { theme } = useContext(GlobalContext);

  return (
    <h1
      style={{
        fontSize: theme === "light" ? "50px" : "100px",
        backgroundColor: theme === "light" ? "yellow" : "black",
        color: theme === "light" ? "blue" : "yellow",
      }}
    >
      Ameer Hamza
    </h1>
  );
}

export default ContextTextComponent;
```

**Kya ho raha hai:**
- `useContext(GlobalContext)` → `theme` value milti hai
- `theme` ke basis par style change hota hai dynamically
- Koi prop receive nahi kar raha — directly context se le raha hai

---

### `src/components/ContextButton/index.jsx`

```jsx
import { useContext } from "react";
import { GlobalContext } from "../../context";

function ContextButtonComponent() {
  const { theme, handleChangeThemeOnButtonClick } = useContext(GlobalContext);

  return (
    <button onClick={handleChangeThemeOnButtonClick}>
      Change Theme
    </button>
  );
}

export default ContextButtonComponent;
```

**Kya ho raha hai:**
- `useContext(GlobalContext)` → `handleChangeThemeOnButtonClick` milta hai
- Button click karte hi Provider ka state update hota hai
- **Dono components** (Text + Button) ek hi context share kar rahe hain — isliye ek jagah update hone se dono rerender hote hain

---

### `src/App.jsx`

```jsx
import { GlobalProvider } from "./context";
import ContextTextComponent from "./components/ContextText";
import ContextButtonComponent from "./components/ContextButton";

function App() {
  return (
    <GlobalProvider>
      <ContextTextComponent />
      <ContextButtonComponent />
    </GlobalProvider>
  );
}

export default App;
```

---

## 7. Multiple Values in Context

Ek hi context mein multiple state values aur functions daal sakte ho:

```jsx
export function GlobalProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [language, setLanguage] = useState("en");
  const [user, setUser] = useState(null);

  function login(userData) {
    setUser(userData);
  }

  function logout() {
    setUser(null);
  }

  const value = {
    // State
    theme,
    language,
    user,
    // Functions
    setTheme,
    setLanguage,
    login,
    logout,
  };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
}
```

Consumer mein sirf jo chahiye wo destructure karo:

```jsx
// Sirf theme chahiye
const { theme } = useContext(GlobalContext);

// Sirf user aur logout chahiye
const { user, logout } = useContext(GlobalContext);
```

---

## 8. Updating Context from a Child

Child component context ki value directly update kar sakta hai — agar Provider ne update function bhi value mein diya ho.

```jsx
// Provider
const [count, setCount] = useState(0);
const value = { count, setCount }; // setCount bhi pass karo

// Child
const { count, setCount } = useContext(GlobalContext);
return <button onClick={() => setCount(count + 1)}>Count: {count}</button>;
```

**Flow:**
```
Child → setCount call → Provider ka state update → 
  → Provider re-render → 
    → Saare consumers (children) re-render with new value
```

---

## 9. Default Value in createContext

`createContext()` mein ek default value de sakte ho — yeh tab use hoti hai jab component **kisi Provider ke andar nahi** ho:

```jsx
// Default value define karo
const GlobalContext = createContext({
  theme: "light",
  handleChangeThemeOnButtonClick: () => {},
});
```

**Kab kaam aata hai:**
- Testing mein jab Provider wrap karna mushkil ho
- Component library banate waqt
- Fallback ke liye

**Note:** Tumhare code mein `createContext()` khali hai — matlab agar koi component Provider ke bahar ho, to `undefined` milega. Isliye aksar default value dena acha practice hai.

---

## 10. Multiple Contexts

Alag-alag concerns ke liye alag contexts bana sakte ho:

```jsx
// ThemeContext.js
export const ThemeContext = createContext();
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// AuthContext.js
export const AuthContext = createContext();
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
```

```jsx
// App.jsx — dono providers nest karo
function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <MainContent />
      </ThemeProvider>
    </AuthProvider>
  );
}
```

```jsx
// Kisi bhi child mein
const { theme } = useContext(ThemeContext);
const { user } = useContext(AuthContext);
```

---

## 11. Common Mistakes

### ❌ Mistake 1 — Component Provider ke bahar hai

```jsx
// WRONG
function App() {
  return (
    <>
      <ContextTextComponent />     {/* Provider ke bahar! */}
      <GlobalProvider>
        <ContextButtonComponent />
      </GlobalProvider>
    </>
  );
}
// ContextTextComponent ko undefined milega
```

```jsx
// CORRECT — sab andar
function App() {
  return (
    <GlobalProvider>
      <ContextTextComponent />
      <ContextButtonComponent />
    </GlobalProvider>
  );
}
```

---

### ❌ Mistake 2 — Wrong Context Import

```jsx
// WRONG — different context import kiya
import { ThemeContext } from "../../context/ThemeContext";
const { theme } = useContext(GlobalContext); // GlobalContext use kar raha hai lekin ThemeContext import kiya
```

```jsx
// CORRECT
import { GlobalContext } from "../../context";
const { theme } = useContext(GlobalContext);
```

---

### ❌ Mistake 3 — useContext ko Condition mein Use Karna

```jsx
// WRONG — hooks conditionally nahi call hote
function MyComponent({ show }) {
  if (show) {
    const { theme } = useContext(GlobalContext); // ❌ Error!
  }
}
```

```jsx
// CORRECT — pehle call karo, phir condition lagao
function MyComponent({ show }) {
  const { theme } = useContext(GlobalContext); // ✅ Top level par
  if (!show) return null;
  return <div style={{ color: theme === "light" ? "black" : "white" }}>...</div>;
}
```

---

### ❌ Mistake 4 — Value Object Directly Mein Banana (Performance Issue)

```jsx
// WRONG — har render par naya object banta hai, saare consumers rerender hote hain
<GlobalContext.Provider value={{ theme, setTheme }}>
```

```jsx
// BETTER — useMemo se object memoize karo (large apps mein)
const value = useMemo(() => ({ theme, handleChangeThemeOnButtonClick }), [theme]);
<GlobalContext.Provider value={value}>
```

---

## 12. When to Use Context API (and When NOT to)

### ✅ Context API Use Karo Jab:

- **Global state** ho — theme, language, user authentication
- **Deeply nested components** ko same data chahiye
- Data bar bar nahi badalta (low frequency updates)
- App medium-size ka ho

### ❌ Context API Se Bachao Jab:

- **Frequently changing data** ho (every second ya millisecond)
  - *(Context change → saare consumers rerender — performance issue)*
- **Sirf 2-3 levels deep** prop drilling ho — props theek hain
- **Very complex state logic** ho — Redux/Zustand better hain
- **Server state** manage karna ho — React Query better hai

---

## 13. Context API vs Redux

| Feature | Context API | Redux |
|---|---|---|
| Built-in | ✅ React ka part | ❌ Alag library |
| Setup | Simple | Complex |
| Performance | Medium | Better (selective updates) |
| DevTools | ❌ Basic | ✅ Excellent |
| Best for | Small-Medium apps | Large apps |
| Async handling | Manual | Redux Thunk / Saga |
| Learning curve | Low | High |

**Rule of thumb:**
- Side project / small app → Context API
- Production large-scale app → Redux Toolkit ya Zustand

---

## 14. Summary Cheat Sheet

```jsx
// ─── 1. CONTEXT BANAO ───────────────────────────────────────────
import { createContext, useState } from "react";
export const MyContext = createContext();

// ─── 2. PROVIDER BANAO ──────────────────────────────────────────
export function MyProvider({ children }) {
  const [state, setState] = useState("initial");
  return (
    <MyContext.Provider value={{ state, setState }}>
      {children}
    </MyContext.Provider>
  );
}

// ─── 3. APP WRAP KARO ───────────────────────────────────────────
// main.jsx ya App.jsx mein:
<MyProvider>
  <App />
</MyProvider>

// ─── 4. KISI BHI CHILD MEIN CONSUME KARO ───────────────────────
import { useContext } from "react";
import { MyContext } from "../../context";

function AnyChild() {
  const { state, setState } = useContext(MyContext);
  return <button onClick={() => setState("updated")}>{state}</button>;
}
```

---

## Flow Diagram

```
createContext()          →   Context Object banta hai
        ↓
Context.Provider         →   Value wrap karta hai (saare children ko deta hai)
        ↓
useContext(Context)      →   Child component mein value milti hai
        ↓
State Update (setState)  →   Provider re-renders
        ↓
Saare Consumers          →   Automatically new value ke sath re-render hote hain
```

---

> **Tumhara Code Summary:**
> - `GlobalContext` → context object
> - `GlobalProvider` → state + function rakhta hai, Provider wrap karta hai
> - `ContextTextComponent` → sirf `theme` consume karta hai → style change karta hai
> - `ContextButtonComponent` → `handleChangeThemeOnButtonClick` consume karta hai → click par theme toggle karta hai
> - Dono components ek doosre se connected hain bina kisi prop ke — sirf Context ke zariye

---

*Prepared for learning React Hooks — useEffect → useContext series*