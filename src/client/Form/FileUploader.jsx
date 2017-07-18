import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

class FileUploader extends PureComponent {
  constructor (props) {
    super(props)
    this.handleFileChange = this.handleFileChange.bind(this)
  }
  handleFileChange (e) {
    if (e.target.files.length) {
      const file = e.target.files[ 0 ]
      const { name, maxSize, onFileChange } = this.props
      if (!maxSize || maxSize < file.size) {
        onFileChange(file, name)
      }
    }
  }
  render () {
    const { name } = this.props
    return <input type='file' name={name} onChange={this.handleFileChange} />
  }
}

FileUploader.propTypes = {
  name: PropTypes.string,
  maxSize: PropTypes.number,
  onFileChange: PropTypes.func
}

export default FileUploader
