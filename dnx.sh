SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

deno run --allow-run tasks.ts $1 $SCRIPTPATH
