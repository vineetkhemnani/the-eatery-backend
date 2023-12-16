import express from 'express'
// above code is to call code asyncronously
// and causes errors so add "type":"module" in package.json,
import axios from 'axios'
import cors from 'cors'
import bodyParser from 'body-parser'
const app = express()
app.use(cors())
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('Server is ready')
})

// fetch restaurants
app.get('/api/restaurants', (req, res) => {
  //   const { lat, lng } = req.query
  //   console.log(req.query)
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=27.2074205&lng=78.01525769999999`

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('An error occurred')
    })
})

// fetch each restaurant menu
app.post('/api/restaurants/menu/', (req, res) => {
  const { id } = req.body
  // console.log(id)
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=27.2074205&lng=78.01525769999999&restaurantId=${id}`
  console.log(url)
  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('An error occurred')
    })
})

// get a list of 5 jokes
app.get('/jokes', (req, res) => {
  const jokes = [
    {
      id: 1,
      title: 'first joke',
      content: 'This is the first joke',
    },
    {
      id: 2,
      title: 'A second joke',
      content: 'This is a second joke',
    },
    {
      id: 3,
      title: 'A third joke',
      content: 'This is a third joke',
    },
    {
      id: 4,
      title: 'A fourth joke',
      content: 'This is a fourth joke',
    },
    {
      id: 5,
      title: 'A fifth joke',
      content: 'This is a fifth joke',
    },
  ]
  res.send(jokes)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`)
})
