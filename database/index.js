const neo4j = require('neo4j-driver')

const driver = neo4j.driver('bolt://localhost:7687', neo4j.auth.basic('Neo4J', 'G3niusch335e'))
const session = driver.session()

console.log('TEST', {driver: session})


// test = () => {
//   console.log('TEST FROM DATABASE')
// }


// on application exit:
// await driver.close()


module.exports = {}


