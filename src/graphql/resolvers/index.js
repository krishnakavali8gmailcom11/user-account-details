import usersResolvers from './users.js';
import addUsersResolvers from './AddUser.js';

export default {
    Query: {
        ...usersResolvers.Query
    },
    Mutation: {
        ...addUsersResolvers.Mutation
    }
}