#!/bin/bash
cd /home/kavia/workspace/code-generation/recipe-journal-21395-21405/react_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

