#!/bin/bash -eu

PORT=8000 node -r esm api &
yarn react-scripts start
wait %1
