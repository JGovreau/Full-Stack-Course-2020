import { Link } from "react-router-native";
import Text from "./Text";

const AppBarTab = ({ title, linkTo }) => {

    return (
        <Link to={linkTo}>
            <Text fontWeight="bold" style={{ padding: 20, color: 'white', fontSize: 18 }}>
                {title}
            </Text>
        </Link>
    );
};

export default AppBarTab;
