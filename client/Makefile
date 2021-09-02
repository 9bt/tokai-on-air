AUTOREST := npx autorest --version=2.0.4407

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
