module.exports = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: 3000,
      database: 'dev_db'
    },
    seeds: {
      directory: './seeds/dev'
    }
  }
}
