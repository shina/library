SCRIPTPATH="$( cd -- "$(dirname "$0")" >/dev/null 2>&1 ; pwd -P )"

deno test $SCRIPTPATH/../*.ts $SCRIPTPATH/../*.js
