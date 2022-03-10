const express = require('express');
const axios = require('axios');
const path = require('path');
const {getAllq, getAlla, reportQ, reportA, helpfulQ, helpfulA, addQ, addA} = require ("../database/index.js")

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
  // console.log(req)
  try {
    const reportedQ = await reportQ(question_id)
    res.status(204).send('Successfully Reported Question')
  } catch(err){
    // console.log(err)
    res.status(404).send('Error Reporting Question')
  }
})

app.put('/qa/answers/:answer_id/report', async (req, res) => {
  let answer_id = req.params.answer_id

  try{
    const reportedA = await reportA(answer_id)
      res.status(204).send('Successfully Reported Answer')
  } catch(err){
    console.log(err)
    res.status(404).send('Error Reporting Answer')
  }
})

app.post('/qa/questions', async(req, res) => {

  let question_body = req.body.body;
  let asker_name = req.body.name;
  let asker_email = req.body.email
  let product_id = req.body.product_id
  // console.log('BODY REQUESTS------', req)
  // console.log('BODY REQUESTS------', req.body.question_body)
  try {
    // console.log('WITHIN TRY ONE', question_body, asker_name, asker_email, product_id )
    const addQuestion = await addQ (question_body, asker_name, asker_email, product_id)
    // console.log('WITHIN TRY', question_body, asker_name, asker_email, product_id )
    res.status(201).send('Successfully Posted A Question')
  } catch (err) {
    console.log(err)
    res.status(404).send('Error Posting A Question')
  }
})

app.post('/qa/questions/:question_id/answers', async(req, res) => {
  let question_id = req.params.question_id;
  let answerer_name = req.body.name;
  let answerer_email = req.body.email
  let body = req.body.body
  // let photos = req.body.photos
  console.log("WITHIN ANSWER POST", req)
  try {
    const addQuestion = await addA (question_id, answerer_name, answerer_email, body)
    res.status(201).send('Successfully Posted an Answer')
  } catch (err) {
    console.log(err)
    res.status(404).send('Error Posting an Answer')
  }
})

app.put('/qa/question/:question_id/helpful', async(req, res) => {
  let question_id = req.params.question_id

  try {
    const helpfulQuestion = helpfulQ (question_id)
      res.status(204).send('Successfully Marked Question Helpful')
  } catch (err) {
    console.log(err)
    res.status(404).send('Error Marking Question Helpful')
  }
})

app.put('/qa/answers/:answer_id/helpful', async (req, res) => {
  let answer_id = req.params.answer_id
  try {
    const helpfulAnswer = helpfulA(answer_id)
      res.status(204).send('Successfully Marked Answer Helpful')
  } catch {
    console.log(err)
    res.status(404).send('Error Marking Answer Helpful')
  }
})



app.listen(PORT, () => {
  console.log(`Server listening at localhost:${PORT}!`);
});