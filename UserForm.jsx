function UserForm({ id, setId, name, setName, email, setEmail, addUser, updateUser, message, setMessage, error, setError }) {
    return (
        <>
            <table>
                <tbody>
                    <tr key="id">
                        <td><label htmlFor="id">Id:</label></td>
                        <td><input id="id" value={id} onChange={e => setId(e.target.value)}/></td>
                    </tr>
                    <tr key="name">
                        <td><label htmlFor="name">Name:</label></td>
                        <td><input id="name" value={name} onChange={e => setName(e.target.value)}/></td>
                    </tr>
                    <tr key="email">
                        <td><label htmlFor="email">Email:</label></td>
                        <td><input id="email" value={email} onChange={e => setEmail(e.target.value)}/></td>
                    </tr>
                </tbody>
            </table>

            <button style={{marginTop: '10px', marginRight: '10px', marginLeft: '10px'}} onClick={addUser}>Add</button>
            <button style={{marginRight: '10px'}} onClick={() => updateUser(id)}>Update</button>
            <button onClick={() => {
                setId('')
                setName('')
                setEmail('')
                setMessage('')
                setError('')
            }}>Clear form</button>

            {message && <p style={{color: 'green'}}>{message}</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    );
}

export default UserForm;