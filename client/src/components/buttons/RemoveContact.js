import { useMutation } from '@apollo/client'
import { GET_CONTACTS, REMOVE_CONTACT } from '../../queries'

import { DeleteOutlined } from '@ant-design/icons'
import filter from 'lodash.filter'

const RemoveContact = ({ id }) => {
  const [remove_contact] = useMutation(REMOVE_CONTACT, {
    update(cache, { data: { remove_contact } }) {
      const { contacts } = cache.readQuery({ query: GET_CONTACTS })
      cache.writeQuery({
        query: GET_CONTACTS,
        data: {
          contacts: filter(contacts, c => {
            return c.id !== remove_contact.id
          })
        }
      })
    }
  })

  const deleteAction = () => {
    let result = window.confirm('Are you sure you want to delete this contact?')
    if (result) {
      remove_contact({
        variables: {
          id
        }
      })
    }
  }

  return <DeleteOutlined key='delete' onClick={deleteAction} style={{ color: 'red' }} />
}

export default RemoveContact