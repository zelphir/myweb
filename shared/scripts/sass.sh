node-sass \
  --quiet \
  --importer "../node_modules/node-sass-json-importer/dist/node-sass-json-importer.js" \
  --include-path "./src" \
  --include-path "./src/assets/scss" \
  --recursive \
  ./src/ -o ./src/ $@
