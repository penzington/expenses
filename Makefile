start-api: 
	cd api && npm install && npm start

start-graphql:
	cd graphql && yarn && yarn start

start-ui:
	cd ui && yarn && yarn start

dev:
	make -j4 start-api start-graphql start-ui