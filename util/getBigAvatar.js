module.exports = (user) => {
  return user.avatarURL.split('?')[0]
}