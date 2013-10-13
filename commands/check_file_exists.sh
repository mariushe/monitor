#! /bin/bash

if [ -e "commands/important.txt" ];
then
	echo "File exists"
	exit 0
fi

echo "CRITICAL: File doesnt exist";
exit 1

