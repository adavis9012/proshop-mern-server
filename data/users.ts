import bcrypt from 'bcryptjs';

interface UserSchema {
    name: string
    email: string
    password: string
    isAdmin: boolean
}

const users: UserSchema[] = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: true,
    },
    {
        name: 'John Doe',
        email: 'john@example.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false,
    },
    {
        name: 'Jane Doe',
        email: 'jane@example.com',
        password: bcrypt.hashSync('12345', 10),
        isAdmin: false,
    },
];

export default users;
