#!/bin/bash
swagger-codegen generate -i http://localhost:3000 -l typescript-fetch -o client/src/app/api/mapper/swagger/v3/typescript-fetch-client
