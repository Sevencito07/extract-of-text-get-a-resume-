#!/bin/bash


SERVER_IP="localServerIp"
SERVER_PORT="3001"
PREVIOUS_CONTENT=""

while true; do
    
    RESPONSE=$(curl -s http://${SERVER_IP}:${SERVER_PORT})

    
    if [ "$RESPONSE" != "$PREVIOUS_CONTENT" ]; then
        echo "*****************************************"
        echo "$RESPONSE"
        PREVIOUS_CONTENT="$RESPONSE"
       
    else
        echo "________________________________________"
    fi

    sleep 7
done
