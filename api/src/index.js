const express = require('express')
const axios = require('axios').default
axios.defaults.headers.common.Authorization = 'Bearer aSuperSecretKey'

const URL = 'https://echo-serv.tbxnet.com/v1'
const app = express()
const port = 3000

app.get('/files/data', async (_, res) => {
  try {
    const { data: { files } } = await axios.get(URL + '/secret/files')
    const formattedFiles = []
    for (const file of files) {
      try {
        const { data: content } = await axios.get(URL + '/secret/file/' + file)
        const formattedFile = formatFile(content)
        if (formattedFile) formattedFiles.push(formattedFile)
      } catch {
        continue
      }
    }
    res.json(formattedFiles)
  } catch (err) {
    console.log(err)
  }
})

function formatFile (content) {
  const lines = content.split('\n')
  let fileName = ''
  const formattedlines = []

  for (const line of lines) {
    if (line === 'file,text,number,hex') { continue }
    const splittedLine = line.split(',')
    if (splittedLine.length !== 4) { continue }
    const [file, text, number, hex] = splittedLine

    fileName = file

    formattedlines.push({
      text,
      number: Number(number),
      hex
    })
  }

  if (!formattedlines.length) { return }

  return {
    file: fileName,
    lines: formattedlines
  }
}

app.get('/files/list', async (_, res) => {
  try {
    const { data } = await axios.get(URL + '/secret/files')
    res.json(data)
  } catch (err) {
    console.log(err)
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = {
  formatFile
}
