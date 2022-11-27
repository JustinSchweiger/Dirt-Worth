#!/bin/bash

echo "Fetching updates from github ..."
git pull

echo "Stopping current pm2 process ..."
pm2 stop "DirtWorth" && pm2 delete "DirtWorth"

echo "Installing dependencies ..."
npm install \
    && echo "Starting new pm2 process ..." \
    && pm2 start start.json

