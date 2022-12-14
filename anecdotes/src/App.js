import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate 
} from "react-router-dom"
import { useState } from 'react'
import useField from "./hooks/index"

const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to ="/anecdotes">anecdotes</Link>
      <Link style={padding} to ="/create">create new</Link>
      <Link style={padding} to ="/">about</Link>
    </div>
  )
}

const AnecdoteList = ({ anecdotes, notification }) => (
  <div>
    <Notification notification={notification}/>
    <h1>Software anecdotes</h1>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map(anecdote => 
        <li key={anecdote.id} >
          <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
        </li>)}
    </ul>
  </div>
)

const Anecdote = ({anecdotes}) => {
  const id= useParams().id
  const anecdote = anecdotes.find(anec => anec.id === Number(id))
  console.log(anecdote)
  return (
    <>
    <h1><strong>{anecdote.content}</strong></h1>
    <ul>
      <li>AUTHOR: {anecdote.author}</li>
      <li>INFO: {anecdote.info}</li>
      <li>VOTES: {anecdote.votes}</li>
    </ul>
    </>
  )
}

// const About = () => (
//   <div>
//     <h2>About anecdote app</h2>
//     <p>According to Wikipedia:</p>

//     <em>An anecdote is a brief, revealing account of an individual person or an incident.
//       Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
//       such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
//       An anecdote is "a story with a point."</em>

//     <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
//   </div>
// )

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)
const Notification = ({ notification }) =>{ 
  const style = {
    color: "green",
    background: "lightgrey",
    padding: "10px"
  }
  if (notification !== '') {
    return (
      <div style={ style }>
        <strong>{ notification }</strong>
      </div>
    )
  }
  return false
}
const CreateNew = (props) => {
  const history= useNavigate()

  const content = useField("text")
  const author = useField("text")
  const info = useField("text")

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    history("/")
  }
  const onClick = (e) =>{
    e.preventDefault()
    content.onClick()
    author.onClick()
    info.onClick()
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button onClick={onClick}>reset</button>
        <button>create</button>
      </form>
    </div>
  )
}
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])
  // const [response, setResponse] = useState(false)
  const [notification, setNotification] = useState('')

  
  const addNew = (anecdote) => {
    try {
      anecdote.id = Math.round(Math.random() * 10000)
      setAnecdotes(anecdotes.concat(anecdote))
      // setResponse(true)
      setNotification('anecdote added')
      setTimeout(()=>{
        setNotification('')
      }, 10000)
    } catch (error) {
      setNotification('ERROR ')
      console.log(error)
      setTimeout(()=>{
        setNotification('')
      }, 10000)
    }  
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }
  
  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      <Routes>
        <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes}/>} />
        <Route path="/create" element={ <CreateNew addNew={addNew} />}
         />
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} notification={notification} />} />
      </Routes>
      <div>
        {/* <About /> */}
        <Footer />
      </div>
    </Router>
  )
}

export default App
