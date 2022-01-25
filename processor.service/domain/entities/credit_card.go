package entity

import (
	"errors"
	"regexp"
	"time"
)

type CreditCard struct {
	number          string
	name            string
	expirationMonth int
	expirationYear  int
	cvv             int
}

func NewCreditCard(number string, name string, expirationMonth int, expirationYear int, cvv int) (*CreditCard, error) {
	cc := &CreditCard{
		name:            name,
		number:          number,
		expirationMonth: expirationMonth,
		expirationYear:  expirationMonth,
		cvv:             cvv,
	}

	error := cc.IsValid()

	if error != nil {
		return nil, error
	}

	error = cc.ValidateMonth()

	if error != nil {
		return nil, error
	}

	return cc, nil
}

func (c *CreditCard) IsValid() error {
	error := c.ValidateNumber()

	if error != nil {
		return error
	}

	error = c.ValidateMonth()

	if error != nil {
		return error
	}

	error = c.ValidateYear()

	if error != nil {
		return error
	}

	return nil
}

func (c *CreditCard) ValidateNumber() error {
	re := regexp.MustCompile("^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$")

	if !re.MatchString(c.number) {
		return errors.New("Invalid credit card number")
	}

	return nil
}

func (c *CreditCard) ValidateMonth() error {
	if c.expirationMonth > 0 && c.expirationMonth < 13 {
		return nil
	}

	return errors.New("Invalid expiration month")
}

func (c *CreditCard) ValidateYear() error {
	if c.expirationYear >= time.Now().Year() {
		return nil
	}

	return errors.New("Invalid expiration year")
}
