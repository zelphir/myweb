const instagram = (req, res) => {
  res.set({ 'Content-Type': 'application/json' })
  res.status(200).send(JSON.stringify({ hello: 'world' }))
}

export default instagram
