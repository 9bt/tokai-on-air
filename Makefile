env-production:
	php .env.production > .env

env-development:
	php .env.development > .env

generate-api:
	cd idl; make generate-swagger-idl
	cd client; make generate-api-client
