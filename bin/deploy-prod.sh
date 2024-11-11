#!/bin/bash

aws s3 sync out/_next s3://augurrank-blog/_next --size-only --delete --cache-control max-age=31536000 --profile justnote

aws s3 sync out/nextImageExportOptimizer s3://augurrank-blog/nextImageExportOptimizer --size-only --delete --cache-control max-age=31536000 --profile justnote

aws s3 sync out s3://augurrank-blog --exclude "_next/*" --exclude "nextImageExportOptimizer/*" --size-only --delete --cache-control max-age=86400 --profile justnote

aws cloudfront create-invalidation --distribution-id E1NAU0TT52OQKI --paths /index.html /index.txt --profile justnote
#aws cloudfront create-invalidation --distribution-id E1NAU0TT52OQKI --paths "/*" --profile justnote
