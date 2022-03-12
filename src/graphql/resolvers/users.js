import User from '../../models/user.js';

export default {
    Query: {
        getUsers: async () => {
            const users = await User.find();
            return users;
        }
    }  
}