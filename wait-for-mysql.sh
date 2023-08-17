#!/bin/sh

set -e
host="$1"
port="$2"
shift 2
cmd="@"

until nc -z -v -w30 "$host" "$port"; do
    echo "Waiting for mysql available at $host:$port ..."
    sleep 1
done
>&2 echo "Mysql is up - execute command"
exec $cmd