ACCESS_TOKEN=75a54d82a5024752adb7204eab018067
ENVIRONMENT=production
LOCAL_USERNAME=`node`
REVISION=`git log -n 1 --pretty=format:"%H"`

curl https://api.rollbar.com/api/1/deploy/ \
  -F access_token=$ACCESS_TOKEN \
  -F environment=$ENVIRONMENT \
  -F revision=$REVISION \
  -F local_username=$LOCAL_USERNAME

pm2 restart 22 && pm2 logs 22 --lines 45