import axios from 'axios'
export const uploadFiles = (files) => {
  return new Promise((resolve, reject) => {
    if (!files.length) {
      resolve('done')
    }

    const file = files.pop()
    const data = new FormData()
    data.append('file', file)
    axios.post('/', data)
      .then((res) => {
        uploadFiles(files)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
