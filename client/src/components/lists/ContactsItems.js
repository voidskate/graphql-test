import { Card } from "antd";

import { useState } from "react";

import RemoveContact from "../buttons/RemoveContact";
import EditContact from "../forms/EditContact";

import { EditOutlined } from "@ant-design/icons";

const someStyling = () => ({
    card: {
        width: "500px"
    }
})

const ContactsItems = (props) => {
    const {id, firstName, lastName} = props;
    const [editMode, setEditMode] = useState(false);
    const styles = someStyling();

    const editClick = () => {
        setEditMode(!editMode)
    }

    return (
        <>
            {/* if editMode, show the edit contact form */}
            {editMode ? (
                <EditContact
                    onBtnClick={editClick}
                    id={id}
                    firstName={firstName}
                    lastName={lastName}
                />
            ) :
            
            // otherwise, show row controls
            (
            <Card
                style={styles.card}
                actions={[
                    // <RemoveContact id={id} firstName={firstName} lastName={lastName} />,
                    <EditOutlined key="edit" onClick={editClick}/>,
                    <RemoveContact id={id} firstName={firstName} lastName={lastName} />
                ]}
            >
                {firstName} {lastName}
            </Card>
            )}
        </>
    )
}

export default ContactsItems