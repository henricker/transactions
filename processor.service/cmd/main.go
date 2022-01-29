package main

import (
	"database/sql"
	"encoding/json"
	"log"

	ckafka "github.com/confluentinc/confluent-kafka-go/kafka"
	"github.com/henricker/processor.service/adapter/broker/kafka"
	"github.com/henricker/processor.service/adapter/presenter/transaction"
	"github.com/henricker/processor.service/domain/factory"
	"github.com/henricker/processor.service/usecase/process_transaction"
	_ "github.com/mattn/go-sqlite3"
)

func main() {

	//Create db
	db, err := sql.Open("sqlite3", "transactions.db")

	if err != nil {
		log.Fatal(err)
	}

	//Create repository
	repositoryFactory := factory.NewRepositoryDatabaseFactory(db)
	repository := repositoryFactory.CreateTransactionRepository()

	configMapProducer := &ckafka.ConfigMap{
		"bootstrap.servers": "kafka:9092",
	}

	//Create kafka utilities
	kafkaPresenter := transaction.NewTransactionKafkaPresenter()

	producer := kafka.NewKafkaProducer(configMapProducer, kafkaPresenter)

	var msgChan = make(chan *ckafka.Message)

	configMapConsumer := &ckafka.ConfigMap{
		"bootstrap.servers": "kafka:9092",
		"client.id":         "goapp",
		"group.id":          "goapp",
	}

	topics := []string{"transactions"}

	consumer := kafka.NewConsumer(configMapConsumer, topics)

	go consumer.Consume(msgChan) //Running on other thread

	usecase := process_transaction.NewProcessTransaction(repository, producer, "transactions_result")

	for msg := range msgChan {
		var input process_transaction.TransactionDtoInput
		json.Unmarshal(msg.Value, &input)
		usecase.Execute(input)
	}

}
