import { useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Form, Input, Button } from 'antd'

import { useMutation } from '@apollo/client'
import { ADD_CONTACT, GET_CONTACTS } from '../../queries'

const AddContact = () => {
    const [id] = useState(uuidv4());
    const [add_contact] = useMutation(ADD_CONTACT)

    const [form] = Form.useForm();
    const [, forceUpdate] = useState();

    // disable submit button at the start
    useEffect(() => {
        forceUpdate({});
    }, [])

    // on form submit,
    // add a contact based on the info the user has entered
    const onFinish = (values) => {
        const { firstName, lastName } = values;

        add_contact({
            variables: {
                id,
                firstName,
                lastName
            },

            update: (cache, { data: { add_contact } }) => {
                const data = cache.readQuery({ query: GET_CONTACTS })
                cache.writeQuery({
                    query: GET_CONTACTS,
                    data: {
                        ...data,
                        contacts: [...data.contacts, add_contact]
                    }
                })
            }
        })
    }

    return(
        <Form
            form={form} name="add-contact-form"
            layout="inline"
            size="large"
            style={{marginBottom: "40px"}}
            onFinish={onFinish}
        >
            {/*----- INPUT: FIRST NAME -----*/}
            <Form.Item
                name="firstName"
                rules={[{ required: true, message: "Please input your first name!" }]}
            >
                <Input placeholder="e.g. John"/>
            </Form.Item>

            {/*----- INPUT: LAST NAME -----*/}
            <Form.Item
                name="lastName"
                rules={[{ required: true, message: "Please input your last name!" }]}
            >
                <Input placeholder="e.g. Smith"/>
            </Form.Item>

            {/*----- BUTTON: SUBMIT -----*/}
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            !form.isFieldsTouched(true) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >Add Contact</Button>
                )}
            </Form.Item>
        </Form>
    )
}

export default AddContact