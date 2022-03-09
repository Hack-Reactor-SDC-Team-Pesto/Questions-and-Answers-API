const express = require('express');
const axios = require('axios');
const path = require('path');
const {getAllq, getAlla, reportQ, reportA, helpfulQ, helpfulA} = require ("../database/index.js")

const PORT = 3000;
const app = express();

// app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.json())

app.get('/qa/questions/', async(req, res) => {
  // console.log ('-----PARAMS-----', req)
  let product_id = req.query.product_id
  // console.log(getAllQ(product_id))
  try {
    const questions = await getAllq(product_id)
    res.status(200).send(questions)
  } catch(err){
    res.status(400).send(err)
  }
  // console.log('QUESTIONS FROM SERVER', questions)
});

app.get('/qa/questions/:question_id/answers', async(req, res) => {
  console.log ('-----PARAMS-----', req)
  let question_id = req.params.question_id

  try {
    const answers = await getAlla(question_id)
    res.status(200).send(answers)
  } catch(err){
    console.log('err', err)
    res.status(400).send(err)
  }
})

app.put('/qa/questions/:question_id/report', async (req, res) => {
  let question_id = req.params.question_id

  try {
    const reportedQ = await reportQ(question_id)
    res.status(204).send('Successfully Reported Question')
  } catch(err){
    res.status(404).send('Error Reporting Question')
  }
})

//! Report Question

// app.put('/qa/questions/:question_id/report', (req, res) => {
//   console.log('report question!!!!!!!!!!')
//   api.reportQuestion(req.params)
//     .then((success) => {
//       res.status(204);
//       res.send('Successfully Reported Question');
//     })
//     .catch((err) => {
//       console.log(err);
//       res.status(404);
//       res.send('Error Reporting Question');
//     })
// })

// const reportQuestion = (questionId) => {
//   return axios({
//     method: 'PUT',
//     url: `${url}/qa/questions/${questionId.question_id}/report`,
//     headers: {
//       'Authorization': `${TOKEN}`
//     }
//   })
// }

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  let answer_id = req.params.answer_id

  try{
    const reportedA = await reportA (()=>{
      res.status(204).send('Successfully Reported Answer')
    })
  } catch(err){
    res.status(404).send('Error Reporting Answer')
  }
})

//! Report Answer

// app.put('/qa/answers/:answer_id/report', (req, res) => {
//   api.reportAnswer(req.params)
//     .then((success) => {
//       res.status(204);
//       res.send('Successfully Reported Answer');
//     })
//     .catch((err) => {
//       res.status(404);
//       res.send('Error Reporting Answer');
//     })
// })

// const reportAnswer = (answerId) => {
//   return axios({
//     method: 'PUT',
//     url: `${url}/qa/answers/${answerId.answer_id}/report`,
//     headers: {
//       'Authorization': `${TOKEN}`
//     }
//   })
// }

app.post('/qa/questions', async(req, res) => {
  let question_body = req.body.question_body;
  let asker_name = req.body.asker_name;
  let asker_email = req.body.asker_email
  let product_id = req.query.product_id

  try {
    const addQuestion = await addQ ((question_body, asker_name, asker_email, product_id))
    res.status(201).send('Successfully Posted A Question')
  } catch (err) {
    res.status(404).send('Error Posting A Question')
  }
})

//! Add a question

// app.post('/qa/questions', (req, res) => {
//   api.addQuestion(req.body)
//     .then((success) => {
//       res.status(201);
//       res.send('Successfully Posted A Question');
//     })
//     .catch((err) => {
//       //console.log('Error Posting Question to API', err);
//       res.status(404);
//       res.send('Error Posting A Question');
//     })
// })

// const addQuestion = (data) => {
//   let options = {
//     url: `${url}/qa/questions`,
//     headers: {
//       'Authorization': `${TOKEN}`,
//       'Content-Type': 'application/json'
//     },
//   };
//   return axios.post(options.url, data, options)
// }

app.post('/qa/questions', async(req, res) => {
  let question_id = req.params.question_id;
  let answerer_name = req.body.answerer_name;
  let answerer_email = req.body.answerer_email
  let body = req.query.body

  try {
    const addQuestion = await addQ ((question_body, asker_name, asker_email, product_id))
    res.status(201).send('Successfully Posted an Answer')
  } catch (err) {
    res.status(404).send('Error Posting an Answer')
  }
})
//! Add an answer

// app.post('/qa/questions/:question_id/answers', (req, res) => {
//   api.addAnswer(req.params, req.body)
//     .then((success) => {
//       res.status(201);
//       res.send('Successfully Posted an Answer');
//     })
//     .catch((err) => {
//       res.status(404);
//       res.send('Error Posting an Answer');
//     })
// })

// const addAnswer = (questionId, data) => {

//   let options = {
//     url: `${url}/qa/questions/${questionId.question_id}/answers`,
//     headers: {
//       'Authorization': `${TOKEN}`,
//       'Content-Type': 'application/json'
//     },
//   };
//   return axios.post(options.url, data, options)
// }

app.put('/qa/question/:question_id/helpful', async(req, res) => {
  let question_id = req.params.question_id

  try {
    const helpfulQuestion = helpfulQ ((question_id) => {
      res.status(204).send('Successfully Marked Question Helpful')
    })
  } catch (err) {
    res.status(404).send('Error Marking Question Helpful')
  }
})
//! Mark Question as Helpful

// app.put('/qa/questions/:question_id/helpful', (req, res) => {
//   api.markQHelpful(req.params)
//     .then((success) => {
//       res.status(204);
//       res.send('Successfully Marked Question Helpful');
//     })
//     .catch((err) => {
//       res.status(404);
//       res.send('Error Marking Question Helpful');
//     })
// })

// const markQHelpful = (questionId) => {
//   return axios({
//     method: 'PUT',
//     url: `${url}/qa/questions/${questionId.question_id}/helpful`,
//     headers: {
//       'Authorization': `${TOKEN}`,
//       'Content-Type': 'application/json'
//     }
//   })
// }

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  let answer_id = req.params.answer_id
  try {
    const helpfulAnswer = helpfulA((answer_id) => {
      res.status(204).send('Successfully Marked Answer Helpful')
    })
  } catch {
    res.status(404).send('Error Marking Answer Helpful')
  }
})

//! Mark Answer as Helpful

// app.put('/qa/answers/:answer_id/helpful', (req, res) => {

//   api.markAHelpful(req.params)
//     .then((success) => {
//       res.status(204);
//       res.send('Successfully Marked Answer Helpful');
//     })
//     .catch((err) => {
//       res.status(404);
//       res.send('Error Marking Answer Helpful');
//     })
// })

// const markAHelpful = (answerId) => {
//    return axios({
//     method: 'PUT',
//     url: `${url}/qa/answers/${answerId.answer_id}/helpful`,
//     headers: {
//       'Authorization': `${TOKEN}`
//     }
//   })
// }



app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});