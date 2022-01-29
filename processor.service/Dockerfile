FROM golang:1.17

WORKDIR /go/src

RUN apt-get update && apt-get install build-essential librdkafka-dev -y
RUN apt-get install sqlite3 && cat ./adapter/repository/fixture/sql/1-Transactions.up.sql | sqlite3 transactions.db

CMD ["tail", "-f", "/dev/null"]
