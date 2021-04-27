package resources

func HasUppercase(str string) bool {
	for _, c := range str {
		if c >= 'A' && c <= 'Z' {
			return true
		}
	}
	return false
}
