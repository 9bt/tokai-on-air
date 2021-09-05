MYSQL = mysql -u root
CLOUDSQL_PROXY=$(HOME)/bin/cloud_sql_proxy

PRODUCTION_CLOUD_SQL_INSTANCE=tokai-on-air:asia-northeast1:tokai-on-air
PRODUCTION_MYSQL_DEPLOY_USER=github_actions

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

run: deps copy-service-account
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

prepare-secret:
	php secret.yaml.sample > secret.yaml

copy-service-account:
	cp ../credentials/youtube-accessor.json ./

deploy: copy-service-account prepare-secret
	GO111MODULE=on gcloud app deploy --quiet --project tokai-on-air

prod-migration:
	mkdir -p /tmp/cloudsql
	$(CLOUDSQL_PROXY) -dir=/tmp/cloudsql -instances=$(PRODUCTION_CLOUD_SQL_INSTANCE) -credential_file=../credentials/code-deployer.json &
	sleep 10
	echo use tokai_on_air | cat - migration/*.sql | mysql -u $(PRODUCTION_MYSQL_DEPLOY_USER) -S /tmp/cloudsql/$(PRODUCTION_CLOUD_SQL_INSTANCE) | perl -npe 's/Level\tCode\tMessage\n//' | perl -npe 's/Note\t1050\tTable.*already exists\n//' | wc -c | xargs -I{} test {} -le 1
