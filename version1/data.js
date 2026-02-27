const CATEGORIES = [
  { name: "technology", color: "#7c28d7" },
  { name: "science", color: "#311f8d" },
  { name: "finance", color: "#280f2b" },
  { name: "society", color: "#662b6b" },
  { name: "entertainment", color: "#09023092" },
  { name: "health", color: "#2b56f1" },
  { name: "history", color: "#023c60" },
  { name: "news", color: "#09263d" },
];

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

// LINK TO APP SAMPLE DATA: https://docs.google.com/spreadsheets/d/1eeldcA_OwP4DHYEvjG0kDe0cRys-cDPhc_E9P9G1e3I/edit#gid=0

// 👍 🤯 ⛔️

//we need the api key to access the data in the database
//when we paste the select id bode from bash anon we get an empty array
//but we do have some data that we need to access
//so we need to enable row level security policies
//create a new policy> select template
//but we need to create policies to upload and modify data too
