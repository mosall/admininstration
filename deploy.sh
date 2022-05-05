#!/bin/bash

source=$1
dest=$2

if [ "(ls -A ${dest})" ]; then
	sudo rm -rv ${dest}/*
	sudo cp -rv ${source}/* ${dest}
fi