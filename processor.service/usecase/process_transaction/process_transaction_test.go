package process_transaction

import (
	"testing"
	"time"

	"github.com/golang/mock/gomock"
	entity "github.com/henricker/processor.service/domain/entities"
	mock_repository "github.com/henricker/processor.service/domain/repository/mock"
	"github.com/stretchr/testify/assert"
)

func TestProcessTransactionExecuteInvalidCreditCard(t *testing.T) {
	input := TransactionDtoInput{
		ID:                        "1",
		AccountID:                 "1",
		CreditCardNumber:          "4000000000000000000000000",
		CreditCardExpirationMonth: 12,
		CreditCardExpirationYear:  time.Now().Year(),
		CreditCardName:            "Henrique Vieira",
		CreditCardCVV:             123,
		Amount:                    200,
	}

	expectedOutput := TransactionDtoOutput{
		ID:           "1",
		Status:       entity.REJECTED,
		ErrorMessage: "Invalid credit card number",
	}

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	/*To create mock using mockgen
	"mockgen -destination=domain/repository/mock/transaction_mock.go -source=domain/repository/repository.go"
	*/
	repositoryMock := mock_repository.NewMockTransactionRepository(ctrl)

	repositoryMock.EXPECT().
		Insert(input.ID, input.AccountID, input.Amount, expectedOutput.Status, expectedOutput.ErrorMessage).
		Return(nil)

	usecase := NewProcessTransaction(repositoryMock)

	output, err := usecase.Execute(input)

	assert.Nil(t, err)
	assert.Equal(t, expectedOutput, output)
}

func TestProcessTransactionExecuteRejectedTransaction(t *testing.T) {
	input := TransactionDtoInput{
		ID:                        "1",
		AccountID:                 "1",
		CreditCardNumber:          "4193523830170205",
		CreditCardExpirationMonth: 12,
		CreditCardExpirationYear:  time.Now().Year(),
		CreditCardName:            "Henrique Vieira",
		CreditCardCVV:             123,
		Amount:                    1200,
	}

	expectedOutput := TransactionDtoOutput{
		ID:           "1",
		Status:       entity.REJECTED,
		ErrorMessage: "You dont have limit for this transaction",
	}

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	/*To create mock using mockgen
	"mockgen -destination=domain/repository/mock/transaction_mock.go -source=domain/repository/repository.go"
	*/
	repositoryMock := mock_repository.NewMockTransactionRepository(ctrl)

	repositoryMock.EXPECT().
		Insert(input.ID, input.AccountID, input.Amount, expectedOutput.Status, expectedOutput.ErrorMessage).
		Return(nil)

	usecase := NewProcessTransaction(repositoryMock)

	output, err := usecase.Execute(input)

	assert.Nil(t, err)
	assert.Equal(t, expectedOutput, output)
}

func TestProcessTransactionExecuteApprovedTransaction(t *testing.T) {
	input := TransactionDtoInput{
		ID:                        "1",
		AccountID:                 "1",
		CreditCardNumber:          "4193523830170205",
		CreditCardExpirationMonth: 12,
		CreditCardExpirationYear:  time.Now().Year(),
		CreditCardName:            "Henrique Vieira",
		CreditCardCVV:             123,
		Amount:                    900,
	}

	expectedOutput := TransactionDtoOutput{
		ID:           "1",
		Status:       entity.APPROVED,
		ErrorMessage: "",
	}

	ctrl := gomock.NewController(t)
	defer ctrl.Finish()

	/*To create mock using mockgen
	"mockgen -destination=domain/repository/mock/transaction_mock.go -source=domain/repository/repository.go"
	*/
	repositoryMock := mock_repository.NewMockTransactionRepository(ctrl)

	repositoryMock.EXPECT().
		Insert(input.ID, input.AccountID, input.Amount, expectedOutput.Status, expectedOutput.ErrorMessage).
		Return(nil)

	usecase := NewProcessTransaction(repositoryMock)

	output, err := usecase.Execute(input)

	assert.Nil(t, err)
	assert.Equal(t, expectedOutput, output)
}
