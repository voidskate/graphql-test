import { gql } from "@apollo/client";

export const GET_CONTACTS = gql`
    query {
        contacts {
            id
            firstName
            lastName
        }
    }
`

export const ADD_CONTACT = gql`
    mutation AddContact($id: String!, $firstName: String!, $lastName: String!){
        add_contact(id: $id, firstName: $firstName, lastName: $lastName){
            id
            firstName
            lastName
        }
    }
`

export const REMOVE_CONTACT = gql`
    mutation RemoveContact($id: String!){
        remove_contact(id: $id){
            id
            firstName
            lastName
        }
    }
`

export const EDIT_CONTACT = gql`
    mutation EditContact($id: String!, $firstName: String!, $lastName: String!){
        edit_contact(id: $id, firstName: $firstName, lastName: $lastName)
    }
`