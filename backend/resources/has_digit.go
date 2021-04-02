package resources

func HasDigit(str string) bool {
	for _, c := range str {
		if c >= '1' && c <= '9' {
			return true
		}
	}
	return false
}
