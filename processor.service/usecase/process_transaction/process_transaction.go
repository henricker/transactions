package process_transaction

import (
	"github.com/henricker/processor.service/adapter/broker"
	entity "github.com/henricker/processor.service/domain/entities"
	"github.com/henricker/processor.service/domain/repository"
)

type ProcessTransaction struct {
	Repository repository.TransactionRepository
	Producer   broker.ProducerInterface
	Topic      string
}

func NewProcessTransaction(repository repository.TransactionRepository, producer broker.ProducerInterface, topic string) *ProcessTransaction {
	return &ProcessTransaction{Repository: repository, Producer: producer, Topic: topic}
}

func (p *ProcessTransaction) Execute(input TransactionDtoInput) (TransactionDtoOutput, error) {
	transaction := entity.NewTransaction()
	transaction.ID = input.ID
	transaction.AccountID = input.AccountID
	transaction.Amount = input.Amount

	cc, invalidCC := entity.NewCreditCard(input.CreditCardNumber, input.CreditCardName, input.CreditCardExpirationMonth, input.CreditCardExpirationYear, input.CreditCardCVV)
	if invalidCC != nil {
		return p.RejectTransaction(transaction, invalidCC)
	}

	transaction.SetCreditCard(*cc)

	invalidTransaction := transaction.IsValid()

	if invalidTransaction != nil {
		return p.RejectTransaction(transaction, invalidTransaction)
	}

	return p.ApproveTransaction(input, transaction)
}

func (p *ProcessTransaction) ApproveTransaction(input TransactionDtoInput, transaction *entity.Transaction) (TransactionDtoOutput, error) {
	err := p.Repository.Insert(transaction.ID, transaction.AccountID, transaction.Amount, entity.APPROVED, "")

	if err != nil {
		return TransactionDtoOutput{}, err
	}

	output := TransactionDtoOutput{
		ID:           transaction.ID,
		Status:       entity.APPROVED,
		ErrorMessage: "",
	}

	err = p.Publish(output, []byte(transaction.ID))

	if err != nil {
		return TransactionDtoOutput{}, err
	}

	return output, nil
}

func (p *ProcessTransaction) RejectTransaction(transaction *entity.Transaction, invalidTransaction error) (TransactionDtoOutput, error) {
	err := p.Repository.Insert(transaction.ID, transaction.AccountID, transaction.Amount, entity.REJECTED, invalidTransaction.Error())

	if err != nil {
		return TransactionDtoOutput{}, err
	}

	output := TransactionDtoOutput{
		ID:           transaction.ID,
		Status:       entity.REJECTED,
		ErrorMessage: invalidTransaction.Error(),
	}

	err = p.Publish(output, []byte(transaction.ID))

	if err != nil {
		return TransactionDtoOutput{}, err
	}

	return output, nil
}

func (p *ProcessTransaction) Publish(output TransactionDtoOutput, key []byte) error {
	error := p.Producer.Publish(output, key, p.Topic)

	if error != nil {
		return error
	}

	return nil
}
