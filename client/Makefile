YARN := yarn

deps:
	$(YARN)

build: deps
	cp ../.env.production .env
	$(YARN) run build

serve: deps
	cp ../.env.development .env
	$(YARN) run dev

deploy: build
	gcloud app deploy --quiet --project tokai-on-air

new:
	npx openapi-generator-cli generate -g typescript-fetch -i ../idl/generated/swagger/v1/apidocs.swagger.json -o src/api/generated --additional-properties=modelPropertyNaming=camelCase,supportsES6=true,withInterfaces=true,typescriptThreePlus=true
