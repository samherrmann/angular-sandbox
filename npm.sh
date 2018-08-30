# This is a sample script for using the container to run npm commands.

args=()
[[ $@ == 'start'* || $@ == 'run start'* ]] && args+=('--publish 4200:4200')
[[ $@ == 'test'* || $@ == 'run test'* ]] && args+=('--publish 9876:9876')

docker run \
  -it \
  --rm \
  -v $(pwd):/code \
  ${args} \
  samherrmann/angular-cli:6.1.4 $@