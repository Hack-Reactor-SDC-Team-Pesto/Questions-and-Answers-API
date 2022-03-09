const neo4j = require('neo4j-driver')
// import neo4j from 'neo4j-driver'

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('neo4j', 'G3niusch335e'))

// console.log('TEST', {driver: session})

driver.verifyConnectivity()

const getAllq = async (product_id) => {
  const session = driver.session()
  const res = await session.readTransaction(tx => {
    return tx.run(
      `MATCH (:Product {product_id: ${product_id}})--(q:Question)
      RETURN q LIMIT 500`
    )
  })
  await session.close()
  return res.records
}

const getAlla = async (question_id) => {
  const session = driver.session()
  const res = await session.readTransaction(tx => {
    return tx.run(
      `MATCH (:Question {question_id: ${question_id}})--(a:Answer)
      RETURN a`
    )
  })
  await session.close()
  return res
}

const reportQ = async (question_Id) => {
  const session = driver.session()
  const res = await session.writeTransation(tx => {
    return tx.run(
      `match (q:Question {question_id: ${question_id}) set q.reported = true`
    )
  })
  await session.close()
}

const reportA = async (answer_Id) => {
  const session = driver.session()
  const res = await session.writeTransation(tx => {
    return tx.run(
      `match (a:Answer {answer_id: ${answer_id}) set a.reported = true`
    )
  })
  await session.close()
}

const helpfulQ = async (question_id) => {
  const session = driver.session()
  const res = await session.writeTransation(tx => {
    return tx.run(
      `match (q:Question {question_id: ${question_id}) set q.question_helpfulness = +1`
    )
  })
  await session.close()
}

const helpfulA = async (answer_id) => {
  const session = driver.session()
  const res = await session.writeTransation(tx => {
    return tx.run(
      `match (a:Answer {answer_id: ${answer_id}) set a.helpfulness = +1`
    )
  })
  await session.close()
}

const addQ = async (question_body, asker_name, asker_email, product_id) => {
  const session = driver.session()
  const res = await session.writeTransation(tx => {
    return tx.run(
      `match (p:Product {product_id: ${product_id}) merge (q:Question {question_id : count(q)+1}) set q.question_body = ${question_body}, q.asker_name = ${asker_name}, q.asker_email = ${asker_email}`
    )
  })
  await session.close()
}

const addA = async (question_id, answerer_name, answerer_email, body) => {
  const session = driver.session()
  const res = await session.writeTransation(tx => {
    return tx.run(
      `match (q:Question {question_id: ${question_id}) merge (a:Answer {answer_id : count(a)+1}) set a.body = ${body}, a.answerer_name = ${answerer_name}, a.answerer_email = ${answerer_email}`
    )
  })
  await session.close()
}

// console.log('THIS IS getALLQ---->', typeof getAllQ)

module.exports = {
  getAllq,
  getAlla,
  reportQ,
  reportA,
  helpfulQ,
  helpfulA,
  addA,
  addQ
}


