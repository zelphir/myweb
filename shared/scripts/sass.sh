node-sass \
  --quiet \
  --include-path "./src" \
  --include-path "./src/assets/scss" \
  --recursive \
  ./src/ -o ./src/ $@
