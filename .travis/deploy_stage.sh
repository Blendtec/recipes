#!/bin/sh
npm run build:ci https://s3-us-west-1.amazonaws.com/recipe-stage-client.blendtec.com/
echo "Deploying to Shopify..."
node ./.travis/shopify_stage.js
exit 0
