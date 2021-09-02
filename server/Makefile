MYSQL = mysql -u root

deps:
	GO111MODULE=on go mod download

run: deps
	$(shell cat ../.env) \
	GO111MODULE=on go run main.go

dev-create-db:
	$(MYSQL) -e 'CREATE DATABASE IF NOT EXISTS tokai_on_air_dev DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;'

dev-migration: dev-create-db
	ls migration/*.sql | xargs -t -n1 -I{} sh -c '$(MYSQL) tokai_on_air_dev < {}'

dev-drop-db:
	$(MYSQL) -e 'DROP DATABASE IF EXISTS tokai_on_air_dev'
