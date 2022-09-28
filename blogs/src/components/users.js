// import users from './services/users'

const Users = ({ objUser }) => {
  return(
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
        <tr>
          <td>{objUser.name}</td>
        </tr>
      </table>
    </div>
  )
}

export default Users