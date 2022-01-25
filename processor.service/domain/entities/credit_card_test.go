package entity

import (
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
)

func TestCreditCardNumber(t *testing.T) {

	nextYear := time.Now().AddDate(1, 0, 0)

	_, err := NewCreditCard("4000000000000000000000000", "Jose da Silva", 12, nextYear.Year(), 123)
	assert.Equal(t, "Invalid credit card number", err.Error())

	_, err = NewCreditCard("4193523830170205", "Jose da Silva", 12, nextYear.Year(), 123)
	assert.Nil(t, err)
}

func TestCreditCardExpirationMonth(t *testing.T) {
	nextYear := time.Now().AddDate(1, 0, 0)

	_, err := NewCreditCard("4193523830170205", "Jose da Silva", 13, nextYear.Year(), 123)
	assert.Equal(t, "Invalid expiration month", err.Error())

	_, err = NewCreditCard("4193523830170205", "Jose da Silva", 0, nextYear.Year(), 123)
	assert.Equal(t, "Invalid expiration month", err.Error())

	_, err = NewCreditCard("4193523830170205", "Jose da Silva", 12, nextYear.Year(), 123)
	assert.Nil(t, err)
}

func TestCreditCardExpirationYear(t *testing.T) {
	lastYear := time.Now().AddDate(-1, 0, 0)

	_, err := NewCreditCard("4193523830170205", "Jose da Silva", 11, lastYear.Year(), 123)

	assert.Equal(t, "Invalid expiration year", err.Error())
}
