import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommendations from "./components/Recommendations";
import { useApolloClient, useLazyQuery } from '@apollo/client';
import { useEffect } from "react";
import { ME } from "../queries"

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const client = useApolloClient();

  const [user, setUser] = useState(null);

  const [getUser] = useLazyQuery(ME);

  const logout = () => {
      setToken(null);
      localStorage.clear();
      client.resetStore();
  }
  
  useEffect(() => {
    if (token) {
      getUser().then(({ data }) => {
        setUser(data.me);
      });
    }
    else { setUser(null); }
  }, [token]);

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        { token && 
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendations")}>recommendations</button>
          </>
        }
        { token 
          ? <button onClick={logout}>logout</button>
          : <button onClick={() => setPage("login")}>login</button>
        }
      </div>
      <Authors show={page === "authors"} />
      <Books show={page === "books"} />
      <NewBook show={page === "add"} />
      <Recommendations show={page === "recommendations"} genre={user?.favoriteGenre} />
      <LoginForm setToken={setToken} show={page === "login"} setPage={setPage} />
    </div>
  );
};

export default App;
