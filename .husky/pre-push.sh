#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

git diff HEAD --quiet && npm run test && npm run lint && npm run build