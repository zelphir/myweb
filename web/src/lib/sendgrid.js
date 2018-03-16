const sendgrid = values =>
  fetch('http://localhost:8010/myweb-195810/us-central1/sendgrid', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ values })
  })

export default sendgrid
