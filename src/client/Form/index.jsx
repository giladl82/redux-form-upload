import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm } from 'redux-form'

import {uploadFiles} from '../utils/uploader'
import FileUploader from './FileUploader'

import './Form.scss'

class Form extends React.PureComponent {
  constructor (props) {
    super(props)
    this.handleFileChange = this.handleFileChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.files = []
  }

  handleFileChange (file, fieldName) {
    this.files.push(file)
    this.props.change(fieldName, file.name)
  }

  handleSubmit (values) {
    const {handleSubmit} = this.props
    uploadFiles(this.files)
      .then(() => handleSubmit(values))
  }

  render () {
    const { pristine, submitting } = this.props

    return (
      <div className='form__container'>
        <form onSubmit={this.handleSubmit}>
          <div className='form__field'>
            <label>Title
              <Field
                name='title'
                component='input'
                type='text'
                placeholder='Story Title'
                />
            </label>
          </div>
          <div className='form__field'>
            <label>File
              <FileUploader
                name='file'
                onFileChange={this.handleFileChange}
                />
            </label>
          </div>
          <div className='buttons__container'>
            <button type='submit' disabled={pristine || submitting}>Submit</button>
          </div>
        </form>
      </div>
    )
  }
}

Form.propTypes = {
  change: PropTypes.func,
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'demoForm' // a unique identifier for this form
})(Form)
