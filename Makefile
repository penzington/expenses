start-api: 
	cd api && npm install && npm start

start-graphql:
	cd graphql && yarn && yarn start

start-ui:
	cd ui && yarn && yarn start

start-storybook:
	cd ui && yarn && yarn storybook

dev:
	make -j5 start-api start-graphql start-ui start-storybook