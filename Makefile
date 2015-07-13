test:
	node tests/functional/basictests.js

pushall:
	git push origin master && npm publish

run-scratch:
	node tools/scratch.js
