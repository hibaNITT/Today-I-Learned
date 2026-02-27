//importing style.cc

import "./style.css";
import { useEffect, useState } from "react";
import supabase from "./supabase";

//app component will have all the other components
//components
// 1. header
// 2. categories
// 3. fact list
// 4. each fact
// we can also create a js file for each component

// in order to accomodate two components in one return state ment we can use
// <> known as the fragment element

const initialFacts = [
  {
    id: 1,
    text: "React is being developed by Meta (formerly facebook)",
    source: "https://opensource.fb.com/",
    category: "technology",
    votesInteresting: 24,
    votesMindblowing: 9,
    votesFalse: 4,
    createdIn: 2021,
  },
  {
    id: 2,
    text: "Millennial dads spend 3 times as much time with their kids than their fathers spent with them. In 1982, 43% of fathers had never changed a diaper. Today, that number is down to 3%",
    source:
      "https://www.mother.ly/parenting/millennial-dads-spend-more-time-with-their-kids",
    category: "society",
    votesInteresting: 11,
    votesMindblowing: 2,
    votesFalse: 0,
    createdIn: 2019,
  },
  {
    id: 3,
    text: "Lisbon is the capital of Portugal",
    source: "https://en.wikipedia.org/wiki/Lisbon",
    category: "society",
    votesInteresting: 8,
    votesMindblowing: 3,
    votesFalse: 1,
    createdIn: 2015,
  },
];

function App() {
  // 1.define sate variable

  //we need this state variable in both newFactForm and factList
  //therefore we define the state variable in the parent function
  //we need facts in factList
  // and setFacts should be updated in newFactsForm
  const [showForm, setShowForm] = useState(false);
  const [facts, setFacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCat, setSelectCat] = useState("all");

  //initial state is an empty array
  //once the page loads setfacts(facts)
  //then call the function getFacts
  //this i didnt understand properly

  useEffect(
    function () {
      setIsLoading(true);
      async function getFacts() {
        //supabase. is called a query
        let query = supabase.from("Facts").select("*");

        //to see only the facts with that category
        // use eq function
        if (selectCat !== "all") query = query.eq("category", selectCat);

        //we await only when we r fetching the data
        const { data: facts, error } = await query
          .order("votesInteresting", { ascending: false })
          .limit(1000);

        if (!error) setFacts(facts);
        else {
          alert(error?.message || "Error loading facts");
          console.error("Load facts error:", error);
        }
        setIsLoading(false);
      }
      getFacts();
    },
    //when the value in this array changes the entire function is rendered
    //if it is an empty array it is only rendered once
    [selectCat],
  );

  return (
    <>
      {/* Header */}

      <Header showForm={showForm} setShowForm={setShowForm} />

      {/* <Counter /> */}

      {/* 2.use state variable */}
      {showForm ? (
        <NewFactForm setFacts={setFacts} setShowForm={setShowForm} />
      ) : null}

      <main className="main">
        <CategoryFilter selectCat={selectCat} setSelectCat={setSelectCat} />
        {isLoading ? (
          <Loader />
        ) : (
          <FactList facts={facts} setFacts={setFacts} />
        )}
      </main>
    </>
  );
}

function Loader() {
  return <p className="loader">LOADING HOT POTATOES............</p>;
}

//usage of prompts

function Header({ showForm, setShowForm }) {
  const appTitle = "Today I Learned";
  return (
    <header className="header">
      <div className="logo">
        <img src="logo.png" height="68" width="68" alt="Today I Learned Logo" />
        <h1>{appTitle}</h1>
      </div>

      <button
        className="btn btn-large btn-shareFact"
        onClick={() => setShowForm((s) => !s)}
      >
        {showForm ? "Close" : "Share a fact"}
      </button>
    </header>
  );
}
const CATEGORIES = [
  { name: "technology", color: "#7c28d7" },
  { name: "science", color: "#311f8d" },
  { name: "finance", color: "#280f2b" },
  { name: "society", color: "#662b6b" },
  { name: "entertainment", color: "#563de092" },
  { name: "health", color: "#2b56f1" },
  { name: "history", color: "#023c60" },
  { name: "news", color: "#09263d" },
];

function isValidURL(text) {
  if (typeof text !== "string" || !text.trim()) return false;
  try {
    new URL(text);
    return true;
  } catch {
    return false;
  }
}

function NewFactForm({ setFacts, setShowForm }) {
  const [text, setText] = useState("");
  const [source, setSource] = useState("");
  const [category, setCategory] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  //e - event object
  //only asynchronous functions can await promises and make the code stop
  async function handleSubmit(e) {
    //1.prevent browser reload
    e.preventDefault();
    console.log(text, source, category);

    // 2. check if data is valid, if so create a new fact

    // empty string is a falsy value
    if (!(text && isValidURL(source) && category && textLength <= 200)) return;

    // 3. create a new fact object

    // const newFact = {
    //   id: Math.round(Math.random() * 10000),
    //   text, //just specify the variable name
    //   source,
    //   category,
    //   votesInteresting: 0,
    //   votesMindblowing: 0,
    //   votesFalse: 0,
    //   createdIn: new Date().getFullYear(),
    // };

    //3.upload the fact to supabase and recieve the new fact object
    //we need to insert only the data that is not automatically generated
    //we use select() to retrieve the info

    const newId = Math.floor(Date.now() / 1000);

    setIsUploading(true);
    const { data: newFact, error } = await supabase
      .from("Facts")
      .insert([
        {
          id: newId,
          text,
          source,
          category,
          votesInteresting: 0,
          votesMindblowing: 0,
          votesFalse: 0,
        },
      ])
      .select();
    setIsUploading(false);

    if (error || !newFact?.length) {
      alert(error?.message || "Fact could not be saved. Please try again.");
      console.error("Insert fact error:", error);
      return;
    }

    // 4. add the new fact to the ui : add the fact to the state
    //...spread operator is used to take out all the elements from the prvious facts array

    // WHENEVER WE NEED TO CREATE A NEW THING THAT HAS TO BE VISIBLE IN TH UI

    // WE NEED TO UPDATE THE UI BY CREATING A NEW STATE VARIABLE

    //if an error occurs a null value will be added to array
    if (!error) setFacts((facts) => [newFact[0], ...facts]);

    // 5. reset input fields
    setText("");
    setCategory("");
    setSource("");

    // 6. close the form
    setShowForm(false);
  }

  // whenever there is a change in state this function will be rerendered
  //no need for new state variable

  const textLength = text.length;

  return (
    <form className="fact-form" onSubmit={handleSubmit}>
      {/* controlled input field */}
      <input
        type="text"
        placeholder="Share a fact with the world..."
        value={text}
        // everytime there is an input this functin is called
        // target means the current element,whose value we read
        //then that new value is added to state variable text
        //it is then updated as the value

        onChange={(e) => setText(e.target.value)}
        disabled={isUploading}
      />
      <span>{200 - textLength}</span>
      <input
        type="text"
        placeholder="Trustworthy source..."
        value={source}
        onChange={(e) => setSource(e.target.value)}
        disabled={isUploading}
      />
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="">Choose category:</option>

        {CATEGORIES.map((category) => (
          <option
            key={category.name}
            value={category.name}
            disabled={isUploading}
          >
            {category.name.toUpperCase()}
          </option>
        ))}
      </select>
      {/* in html whenever there is a button in a form element
      the form will get submitted and page gets reloaded whenever clicked  */}

      <button className="btn btn-large" disabled={isUploading}>
        Post
      </button>
    </form>
  );
}

function CategoryFilter({ setSelectCat }) {
  return (
    <aside>
      <ul>
        <li className="category">
          <button
            className="btn btn-all-categories"
            onClick={() => setSelectCat("all")}
          >
            All
          </button>
        </li>
        {CATEGORIES.map((category) => (
          <li className="category" key={category.name}>
            <button
              className="btn btn-category"
              style={{ backgroundColor: category.color }}
              onClick={() => setSelectCat(category.name)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}

function FactList({ facts, setFacts }) {
  if (facts.length === 0) {
    return <p className="loader">No facts for this category yet :| </p>;
  }
  return (
    <section>
      <ul className="fact-list">
        {facts.map((fact) => (
          // we need to pass the each fact data into the fact component
          <Fact key={fact.id} fact={fact} setFacts={setFacts} />
        ))}
      </ul>
      <p className="footer">
        There are {facts.length} facts in the database. Add your own so that
        everyone can see!!!!!
      </p>
      <p>Made by Hiba ☆*: .｡. o(≧▽≦)o .｡.:*☆</p>
    </section>
  );
}

function Fact({ fact, setFacts }) {
  const [isUpdating, setIsUpdating] = useState(false);
  const isDisputed =
    fact.votesInteresting + fact.votesMindblowing < fact.votesFalse;

  // or we can restructure
  // const {factObj} = props is similar to
  //  const factObj = props.factObj
  //or we can restructure directly in the parameter
  // fact({factObj})

  async function handleVote(columnName) {
    setIsUpdating(true);

    const { data: updatedFact, error } = await supabase
      .from("Facts")
      .update({ [columnName]: fact[columnName] + 1 })
      .eq("id", fact.id)
      .select();
    setIsUpdating(false);

    if (!error && updatedFact?.length)
      setFacts((facts) =>
        facts.map((f) => (f.id === fact.id ? updatedFact[0] : f)),
      );
    else {
      alert(error?.message || "Vote update failed");
      console.error("Vote update error:", error);
    }
  }

  const category = CATEGORIES.find((cat) => cat.name === fact.category);
  return (
    <li className="fact">
      <p>
        {isDisputed ? <span className="disputed">[DISPUTED ☠️ ] </span> : null}
        {fact.text}
        <a className="source" href={fact.source} target="_blank">
          (Source)
        </a>
      </p>
      <span
        className="tag"
        style={{
          backgroundColor: category?.color,
        }}
      >
        {category?.name}
      </span>
      <div className="vote-buttons">
        <button
          disabled={isUpdating}
          onClick={() => handleVote("votesInteresting")}
        >
          👍 {fact.votesInteresting}
        </button>
        <button
          disabled={isUpdating}
          onClick={() => handleVote("votesMindblowing")}
        >
          🤯 {fact.votesMindblowing}
        </button>
        <button disabled={isUpdating} onClick={() => handleVote("votesFalse")}>
          ⛔️ {fact.votesFalse}
        </button>
      </div>
    </li>
  );
}

// USING STATE WITH COUNTER FUNCTION

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <>
//       <span style={{ fontSize: "40px" }}>{count}</span>
//       <button className="btn btn-large" onClick={() => setCount((c) => c + 1)}>
//         +1
//       </button>
//     </>
//   );
// }

//as we are importing app.js into index.js
//index.js is the first file getting loaded
export default App;
