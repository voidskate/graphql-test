import { useMutation } from '@apollo/client'
import { Button, Form, Input } from 'antd'
import { useEffect, useState } from 'react'
import { EDIT_CONTACT } from '../../queries'

const EditContact = props => {
	const { id, firstName, lastName } = props;
	const [form] = Form.useForm();
	const [, forceUpdate] = useState();
	const [edit_contact] = useMutation(EDIT_CONTACT);

	useEffect(() => {
		forceUpdate({})
	}, [])

	const onFinish = (values) => {
		const { firstName, lastName } = values;

		edit_contact({
			variables: {
				id,
				firstName,
				lastName
			}
		})

		props.onBtnClick()
	}

	return (
		<Form
			form={form}
			name="update-contact-form"
			layout="inline"
			initialValues={{
				firstName,
				lastName
			}}
			size="large"
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
                <Input placeholder="e.g. Mulaney"/>
            </Form.Item>

            {/*----- BUTTON: SUBMIT -----*/}
            <Form.Item shouldUpdate={true}>
                {() => (
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={
                            (!form.isFieldTouched("firstName") && !form.isFieldTouched("lastName")) ||
                            form.getFieldsError().filter(({ errors }) => errors.length).length
                        }
                    >Save Changes</Button>
                )}
            </Form.Item>

			{/*----- BUTTON: CANCEL -----*/}
			<Button onClick={props.onBtnClick}>Cancel</Button>
		</Form>
	)
}

export default EditContact