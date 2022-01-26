package repository

import (
	"os"
	"testing"

	"github.com/henricker/processor.service/adapter/repository/fixture"
	entity "github.com/henricker/processor.service/domain/entities"
	"github.com/stretchr/testify/assert"
)

func TestTransactionRepositoryDbInsert(t *testing.T) {
	migrationsDir := os.DirFS("fixture/sql")
	db := fixture.Up(migrationsDir)
	defer fixture.Down(db, migrationsDir)

	repo := NewTransactionRepositoryDb(db)

	err := repo.Insert("1", "1", 12.1, entity.APPROVED, "")

	assert.Nil(t, err)
}
