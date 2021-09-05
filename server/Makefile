MYSQL = mysql -u root

GO_SWAGGER_VERSION = v0.24.0

bin/reflex:
	GOBIN=`pwd`/bin GO111MODULE=on go install github.com/cespare/reflex

bin/swagger:
	curl -o ./bin/swagger -L'#' https://github.com/go-swagger/go-swagger/releases/download/$(GO_SWAGGER_VERSION)/swagger_$(shell echo `uname`|tr '[:upper:]' '[:lower:]')_amd64
	chmod +x ./bin/swagger

generate-api-model: bin/swagger
	rm -rf generated; mkdir generated
	./bin/swagger generate model -f ../idl/generated/swagger/v1/apidocs.swagger.json -m model -t generated

deps:
	GO111MODULE=on go mod download

run: deps
	$(shell cat ../.env) \
	GO111MODULE=on go run main.go

serve: bin/reflex
	bin/reflex -r '(\.go|go\.mod)' -s make run

dev-create-db:
	$(MYSQL) -e 'CREATE DATABASE IF NOT EXISTS tokai_on_air_dev DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;'

dev-migration: dev-create-db
	ls migration/*.sql | xargs -t -n1 -I{} sh -c '$(MYSQL) tokai_on_air_dev < {}'

dev-drop-db:
	$(MYSQL) -e 'DROP DATABASE IF EXISTS tokai_on_air_dev'
