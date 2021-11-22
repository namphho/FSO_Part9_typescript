import express from 'express'
import getBmiResult from './bmi_calculator'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('hello full stack!')
})

app.get('/bmi', (req, res) => {
  const height = req.query.height
  const weight = req.query.weight
  let values = new Array<string>()
  if (typeof height === 'string') {
    values.push(height)
  } else {
    res.json({ error: 'malformatted parameters' })
  }
  if (typeof weight === 'string') {
    values.push(weight)
  } else {
    res.json({ error: 'malformatted parameters' })
  }
  try {
    const bmi = getBmiResult(values)
    res.json({ height: height, weight: weight, bmi: bmi })
  } catch (e: unknown) {
    res.json({ error: 'malformatted parameters' })
  }
})

const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
