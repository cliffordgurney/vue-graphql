const { ApolloServer, gql } = require('apollo-server')

const todos = [
    {task: 'foo', completed: false},
    {task: 'bar', completed: true}
]





const typeDefs = gql`

type Query {
  getTodos: [Todo]
}

type Todo {
    task: String
    completed: Boolean
}

type Mutation {
    addTodo(task: String, completed: Boolean): Todo
}
`;

const resolvers = { 
    Query: {
        getTodos: () => todos
    },
    Mutation: {
        addTodo: (_, { task, completed }) => {
            const todo = { task, completed }
            todos.push(todo)
            return todo
        }
    }
    
}
const server = new ApolloServer({
    typeDefs, resolvers
});

server.listen().then(({url}) => {
    console.log(`server listening`, url)
})