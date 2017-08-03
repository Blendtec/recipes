#!/bin/sh
npm run build:ci https://s3-us-west-1.amazonaws.com/recipe-client.blendtec.com/
echo "Deploying to Shopify..."
node ./.travis/shopify.js
exit 0
