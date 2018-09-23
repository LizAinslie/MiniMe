module.exports = (user) => {
  return user.avatarURL.split('?')[0] + '?size=2048'
}