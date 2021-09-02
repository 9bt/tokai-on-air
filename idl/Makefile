deps:
	GO111MODULE=on go install github.com/grpc-ecosystem/grpc-gateway/v2/protoc-gen-openapiv2
	GO111MODULE=on go mod download

generate-swagger-idl: deps
	cd proto; buf mod update
	buf generate proto
