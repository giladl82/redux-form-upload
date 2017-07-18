import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import ejs from 'ejs'
import multer from 'multer'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import App from '../client/App'
import configureStore from '../client/store'

import fs from 'fs'

const ejsExpress = ejs.__express

const app = express()

app.use(express.static(path.join(__dirname, '../public')))
app.set('view engine', 'ejs')
app.engine('.ejs', ejsExpress)
app.set('views', path.join(__dirname, '../public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const upload = multer({
  dest: 'uploads/'
})

app
  .get('/', (req, res) => {
    const preloadedState = {
    }

    const store = configureStore(preloadedState)

    const appBody = ReactDOMServer.renderToString(
      <Provider store={store}>
        <App />
      </Provider>
    )

    const preloadedStateScript = ` <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\x3c')}
        </script>`

    res.render('index.ejs', { appBody, preloadedStateScript })
  })
  .post('/', upload.single('file'), (req, res) => {
    console.log(req.body)
    console.log(req.file)

    const uploadedTo = path.resolve(__dirname, '../..', req.file.destination, req.file.filename)
    const saveTo = path.resolve(__dirname, '../../saved', req.file.originalname)

    fs.createReadStream(uploadedTo).pipe(fs.createWriteStream(saveTo))
    fs.unlink(uploadedTo)

    res.send('ok')
  })

app.listen(8888, () => {
  console.log('App is running on PORT 8888')
})
