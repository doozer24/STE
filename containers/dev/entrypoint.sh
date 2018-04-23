#!/usr/bin/env bash
umask 022
# This runs in the background so container does not close.
npm start >/dev/null 2>&1 &

if [[ $# -eq 1 && $1 == "bash" ]]; then
	$@;
else
	exec "$@";
fi
