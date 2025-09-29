#!/bin/bash
cd /home/kavia/workspace/code-generation/portfolio-tracker-169178-169187/portfolio_tracker_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

