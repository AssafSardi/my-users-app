function UsersTableRow({ user, setId, setName, setEmail, deleteUser }) {
    return (
        <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.name}</td>
            <td>{user.email}</td>
            <td>
                <span
                    style={{cursor: 'pointer', marginRight: '10px', marginLeft: '8px'}}
                    title='Fill details'
                    onClick={() => {
                        setId(user.id);
                        setName(user.name);
                        setEmail(user.email);
                    }}
                >
                ✏️
                </span>
                <span
                    style={{cursor: 'pointer'}}
                    title='Delete'
                    onClick={() => {
                        deleteUser(user.id)
                    }}
                >
                ❌️
                </span>
            </td>
        </tr>
    );
}

export default UsersTableRow;
