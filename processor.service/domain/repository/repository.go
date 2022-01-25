package repository

type TransactionRepository interface {
	insert(id string, account string, ammount float64, status string, errorMessage string) error
}
