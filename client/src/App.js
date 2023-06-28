import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"

import "./App.css";
import "antd/dist/reset.css";

import Title from "./components/layout/Title";
import Contacts from "./components/lists/Contacts";
import AddContact from "./components/forms/AddContact";
import EditContact from "./components/forms/EditContact";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache()
})

const App = () => (
  <ApolloProvider client={client}>
    <div className="App">
      <Title/>
      <AddContact/>
      <EditContact/>
      <Contacts/>
    </div>
  </ApolloProvider>
)

export default App;