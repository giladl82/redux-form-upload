import axios from 'axios'

export const uploadFile = (file) => {
  return new Promise((resolve, reject) => {
    const data = new FormData()
    data.append('file', file)
    axios.post('/', data)
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        console.log(err)
      })
  })
}
