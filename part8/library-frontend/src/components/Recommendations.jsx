import { useQuery } from "@apollo/client"
import { ALL_BOOKS_FILTERED } from "../../queries"

const Recommentations = ({ show, genre }) => {

    if (!show) {
        return null;
    }

    const bookRecommendations = useQuery(ALL_BOOKS_FILTERED, { variables: { genre } });

    return (
        <div>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{genre}</b></p>
            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                { bookRecommendations?.data?.allBooks?.map((a) => (
                    <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author?.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Recommentations;
