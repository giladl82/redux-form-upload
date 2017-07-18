import React from 'react'
import PropTypes from 'prop-types'

import { Field, reduxForm } from 'redux-form'

import FileUploader from './FileUploader'

import './Form.scss'

class Form extends React.PureComponent {
  render () {
    const { pristine, submitting, handleSubmit, onFileChange } = this.props

    return (
      <div className='form__container'>
        <form onSubmit={handleSubmit}>
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
                onFileChange={onFileChange}
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
  handleSubmit: PropTypes.func,
  onFileChange: PropTypes.func,
  pristine: PropTypes.bool,
  submitting: PropTypes.bool
}

export default reduxForm({
  form: 'demoForm' // a unique identifier for this form
})(Form)
