#!/bin/bash

ng build --prod

if [ $? -eq 0 ]
then
    echo 'Removing old backup...'
    rm -rf active-backup
    echo 'Backup up existing site...'
    mv active active-backup
    echo 'Moving site live...'
    mv dist active
    echo 'Complete'
else
  echo 'ANGULAR BUILD FAILED'
fi

