args=()
[[ $@ == 'start'* || $@ == 'run start'* ]] && args+=('--publish 4200:4200')
[[ $@ == 'test'* || $@ == 'run test'* ]] && args+=('--publish 9876:9876')
[[ $@ == 'run e2e'* ]] && args+=('--publish 49152:49152')

docker run \
  -it \
  --rm \
  -v $(pwd):/code \
  -e HTTP_PROXY=$HTTP_PROXY \
  -e HTTPS_PROXY=$HTTPS_PROXY \
  -e NO_PROXY=$NO_PROXY \
  ${args} \
  samherrmann/angular-cli:8.3.19 $@