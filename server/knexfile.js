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
  },
  production: {
    client: 'pg',
    connection: {
      host: 'ec2-50-16-230-234.compute-1.amazonaws.com',
      port: 5432,
      database: 'dcloeb9qk3ch8h'
    }
  }
}
