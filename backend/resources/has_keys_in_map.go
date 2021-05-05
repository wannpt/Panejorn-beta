package resources

func HasKeysInMap(map_ map[string]interface{}, keys []string) bool{
	for _, key := range keys {
		if _, ok := map_[key]; !ok {
			return false
		}
	}
	return true
}