import { useQuery } from "@apollo/client";
import { GET_CONTACTS } from "../../queries";

import ContactsItems from "./ContactsItems";

import { List } from "antd";

const someStyling = () => ({
    list: {
        display: "flex",
        justifyContent: "center"
    }
})

const AddContact = () => {
    const styles = someStyling();
    const { loading, error, data } = useQuery(GET_CONTACTS);

    if (loading) return "Loading..."
    if (error) return `Error! ${error.message}`

    console.log("data", data);

    return (
        <List
            grid={{ gutter: 20, column: 1}}
            style={styles.list}
        >
            { data.contacts.map(({ id, firstName, lastName }) => (
                <List.Item key={id}>
                    <ContactsItems id={id} firstName={firstName} lastName={lastName}/>
                </List.Item>
            ))}
        </List>
    )
}

export default AddContact