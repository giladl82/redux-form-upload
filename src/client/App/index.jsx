import React, { Component } from 'react'
import PropTypes from 'prop-types'
import logo from './logo.svg'

import Form from '../Form'

import './App.scss'

import { uploadFile } from '../utils/uploader'

class App extends Component {
  constructor (props) {
    super(props)
    this.files = []
  }

  handleSubmit = (values) => {
    if (this.files && this.files.length) {
      let file = this.files.pop()
      uploadFile(file.file)
        .then((uploaded) => {
          Object.assign(values, { [file.fieldName]: uploaded })
          alert(JSON.stringify(values))
        })
    } else {
      alert(JSON.stringify(values))
    }
  }

  handleFileChange = (file, fieldName) => {
    this.files.push({'fieldName': fieldName, file})
  }

  render () {
    return (
      <div className='App'>
        <div className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <h2>Welcome to React</h2>
        </div>
        <section className='App-intro'>
          <Form onSubmit={this.handleSubmit} onFileChange={this.handleFileChange} />
        </section>
      </div>
    )
  }
}

App.propTypes = {
  change: PropTypes.func
}

export default App
