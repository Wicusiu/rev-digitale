#!/bin/bash
swagger-codegen generate -i server/resolved.yaml -l typescript-fetch -o client/src/app/api/mapper/swagger/typescript-fetch-client
