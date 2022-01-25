package repository

type TransactionRepository interface {
	Insert(id string, account string, ammount float64, status string, errorMessage string) error
}
