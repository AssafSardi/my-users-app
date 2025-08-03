import {useState, useEffect, use} from "react";
import UserForm from "./UserForm.jsx";
import UsersTable from "./UsersTable.jsx";

function Users() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const userFields = ['id', 'name', 'email', 'actions'];

    const fetchUsers = () => {
        fetch('/users')
            .then(res => res.json())
            .then(setUsers)
            .catch(err => console.log(err));
    };

    useEffect(fetchUsers, []);

    const handleResponse = async (res) => {
        if (res.ok) {
            const ack = await res.json();
            setMessage(ack.message);
            setId('');
            setName('');
            setEmail('');
            setError('');
            fetchUsers();
        }
        else if (!(res.status === 304)) {
            const errData = await res.json();
            throw new Error(errData.error || 'Something went wrong');
        }
    };

    const addUser = async () => {
        try {
            const res = await fetch('/users', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email})
            });

            await handleResponse(res);
        } catch (err) {
            setError(err.message);
            setMessage('');
        }

    };

    const updateUser = async (id) => {
        try {
            if (!id) {
                throw new Error("User id is missing");
            }

            const res = await fetch(`/users/${id}`, {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({name, email})
            });

            await handleResponse(res);
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    const deleteUser = async (id) => {
        try {
            if (!id) {
                throw new Error("User id is missing");
            }

            const res = await fetch(`/users/${id}`, {
                method: 'DELETE'
            });

            await handleResponse(res);
        } catch (err) {
            setError(err.message);
            setMessage('');
        }
    };

    return (
        <>
            <h2>User Operations:</h2>
            <UserForm
                id={id}
                setId={setId}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                addUser={addUser}
                updateUser={updateUser}
                message={message}
                setMessage={setMessage}
                error={error}
                setError={setError}
            />

            <h2>Users List:</h2>
            <UsersTable
                userFields={userFields}
                users={users}
                setId={setId}
                setName={setName}
                setEmail={setEmail}
                deleteUser={deleteUser}
            />
        </>
    );
}

export default Users;