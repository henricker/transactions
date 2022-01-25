package entity

import "errors"

const (
	REJECTED = "rejected"
	APPROVED = "approved"
)

type Transaction struct {
	ID           string
	AccountID    string
	Amount       float64
	Status       string
	ErrorMessage string
	CreditCard   CreditCard
}

func NewTransaction() *Transaction {
	return &Transaction{}
}

func (t *Transaction) IsValid() error {

	if t.Amount > 1000 {
		return errors.New("You dont have limit for this transaction")
	}

	if t.Amount <= 1 {
		return errors.New("The amount must be greater than 1")
	}

	return nil
}

func (t *Transaction) SetCreditCard(card CreditCard) {
	t.CreditCard = card
}
