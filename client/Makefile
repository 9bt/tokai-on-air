YARN := yarn
AUTOREST := npx autorest --version=2.0.4407

deps:
	$(YARN)

clean:
	test -d dist || mkdir dist
	cd dist && rm -rf *

build: clean deps
	ENV_FILE=.env.production $(YARN) run build

serve: clean deps
	$(YARN) run serve

deploy: build
	cp app.yaml .gcloudignore dist
	gcloud app deploy --quiet --project tokai-on-air dist

generate-api-client:
	rm -rf src/api-client/generated/*
	$(AUTOREST) \
	--add-credentials \
	--input-file=../idl/generated/swagger/v1/apidocs.swagger.json \
	--typescript \
	--enum-types=true \
	--output-folder=src/api-client \
	--source-code-folder-path=generated \
	--use=@microsoft.azure/autorest.typescript@4.2.3
