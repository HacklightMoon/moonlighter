module.exports = function(db){
  return db.insert([
    {
      'id': 9,
      'character_id': 5,
      'github_username': 'Gitty McGitface'
    }
  ]).into('users');
}
