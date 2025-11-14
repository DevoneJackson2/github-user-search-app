import { useState } from 'react'
import './App.css'


function UserInfo({username, pfp, link}){

  return (
    <div className='user'>
      <img src={pfp}></img><br></br>
      <a href={link}>{username}</a>
    </div>
  )

}

function App() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  async function handleSubmit(event){
    event.preventDefault();
    const res = await fetch(`https://api.github.com/search/users?q=${query}`).then((response) => response.json()).then((data => {return data}));
    console.log(res.items);
    setUsers(Array.from(res.items));
  }

  function handleChange(event){
    setQuery(event.target.value);
  }

  return (
    <>
      <h1>Github User Search</h1>
      <form  onChange={handleChange} onSubmit={handleSubmit}>
        <input type="text" id="search" name="search" placeholder='Enter username or email' required></input>
        <button name="search" type="submit" id="btn">Search</button>
      </form>
      <h2>Results</h2>
      <div className='userlist'>
        {users.map(user => (
          <UserInfo key={user.id} username={user.login} pfp={user.avatar_url} link={user.html_url}/>
        ))}
      </div>
    </>
  )
}

export default App
