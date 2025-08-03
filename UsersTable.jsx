import UsersTableRow from "./UsersTableRow.jsx";

function UsersTable({ userFields, users, setId, setName, setEmail, deleteUser }) {
    return (
        <table>
            <thead>
                <tr>
                    {userFields.map(field => (
                        <th key={field}>{field}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {users.map(user => (
                    <UsersTableRow
                        user={user}
                        setId={setId}
                        setName={setName}
                        setEmail={setEmail}
                        deleteUser={deleteUser}
                    />
                ))}
            </tbody>

        </table>
    );
}

export default UsersTable;