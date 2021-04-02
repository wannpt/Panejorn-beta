package resources

func HasLowercase(str string) bool {
	for _, c := range str {
		if (c >= 'a' && c <= 'z') {
			return true
		}
	}
	return false
}