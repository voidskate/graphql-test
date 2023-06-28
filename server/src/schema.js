import find from "lodash.find";
import remove from "lodash.remove";

const contactsArray = [
    {
        id: "1",
        firstName: "Apple",
        lastName: "Cider"
    },

    {
        id: "2",
        firstName: "Banana",
        lastName: "Smoothie"
    },

    {
        id: "3",
        firstName: "Cranberry",
        lastName: "Juice"
    }
]

// 🤔 define the schema type(s)
// 🤔 typeDefs is short for "type definitions"
// 🤔 notice the lack of commas despite it being an object schema
// 📌 "type Query" is GraphQL's default root query
// 📌 "!" in value slots indicate that it's a required field
// 🌱 "contacts: [Contact]" means we call the Query, we're expecting an array of "Contact"
// 🌱 each "Contact" has a schema (with types) that we defined
const typeDefs = `
    type Contact {
        id: String!
        firstName: String
        lastName: String
    }

    type Query {
        contacts: [Contact]
        find_contact_by_ID(id: String!): Contact
    }

    type Mutation {
        add_contact(id: String!, firstName: String!, lastName: String!): Contact
        edit_contact(id: String!, firstName: String!, lastName: String!): Contact
        remove_contact(id: String!): Contact
    }
`

// define how we resolve these queries
// for an external DB, "contactsArray" would be replaced with the method that retrieves that DB
const resolvers = {
    Query: {
        // return all contacts (array)
        contacts: () => contactsArray,

        // return a contact via knowing its ID
        find_contact_by_ID: (parent, args, contacts, info) => {
            return find(contactsArray, { id: args.id })
        }
    },

    Mutation: {
        // define what add_contact() function should do
        add_contact: (root, args) => {
            // create a new contact
            const new_contact = {
                id: args.id,
                firstName: args.firstName,
                lastName: args.lastName
            }

            // add new contact into our contacts array
            contactsArray.push(new_contact);

            return new_contact
        },

        // define what edit_contact() function should do
        edit_contact: (root, args) => {
            // find a contact
            const get_contact = find(contactsArray, { id: args.id });

            // if such contact exists,
            // edit their info to whatever the user just entered
            // id isn't included here bc it won't change
            if(get_contact){
                get_contact.firstName = args.firstName;
                get_contact.lastName = args.lastName;
            } else {
                throw new Error(`Contact "id: ${args.id}" not found.`)
            }

            return get_contact
        },

        // define what remove_contact() function should do
        remove_contact: (root, args) => {
            // find a contact
            const get_contact = find(contactsArray, { id: args.id });

            // if such contact exists,
            // REMOVE it
            if(get_contact){
                remove(contactsArray, c => {
                    return c.id === get_contact.id
                })
            } else {
                throw new Error(`Contact "id: ${args.id}" not found.`)
            }

            return get_contact
        }
    }
}

export { typeDefs, resolvers }