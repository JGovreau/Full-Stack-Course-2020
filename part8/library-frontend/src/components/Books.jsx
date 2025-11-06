import { useQuery, useLazyQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_BOOKS_FILTERED } from "../../queries"
import { useEffect, useState } from "react";

const Books = (props) => {

  if (!props.show) { return null; }

  const [allGenres, setAllGenres] = useState([]);
  const [booksToDisplay, setBooksToDisplay] = useState([]);
  const [allBooks, setAllBooks] = useState([]);

  const allBooksResult = useQuery(ALL_BOOKS);
  const [getFilteredBooks] = useLazyQuery(ALL_BOOKS_FILTERED);

  useEffect(() => {
    if (allBooksResult.data?.allBooks) {
      setBooksToDisplay(allBooksResult.data.allBooks);
      setAllBooks(allBooksResult.data.allBooks);
      const genres = Array.from(
        new Set(allBooksResult.data.allBooks.flatMap(book => book.genres))
      );
      setAllGenres(genres);
    }
  }, [allBooksResult.data]);

  const handleFilter = async (genre) => {
    if (genre === null) {
      setBooksToDisplay(allBooks);
      return;
    }

    const result = await getFilteredBooks({ variables: { genre } });
    setBooksToDisplay(result.data?.allBooks || []);
  };

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          { booksToDisplay.map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author?.name}</td>
                <td>{a.published}</td>
              </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <div>
        {allGenres.map(genre => (
          <button key={genre} onClick={() => handleFilter(genre)}>{genre}</button>
        ))}
        <button onClick={() => handleFilter(null)}>all genres</button>
      </div>
    </div>
  )
}

export default Books
