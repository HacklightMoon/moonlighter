module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'moonlight'
    },
    seeds: {
      directory: './seeds'
    }
  }
}
