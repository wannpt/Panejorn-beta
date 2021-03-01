package models

type Michelin struct {
	MichelinId string `json:"typeId"`
	Name       string `json:"name"`
	Year       int    `json:"year"`
}
