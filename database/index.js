const neo4j = require('neo4j-driver')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('Neo4J', 'G3niusch335e'))
const session = driver.session()

console.log('TEST', {driver: session})


const getAllQ = async (product_id) => {
  const session = this.driver.session()
  const res = await session.getAllQ(tx => {
    return tx.run(
      `MATCH (:Product {product_id: ${product_id})--(q:Question)
      RETURN q LIMIT 500`
    )
  })
  await session.close()
}


module.exports = {getAllQ}


