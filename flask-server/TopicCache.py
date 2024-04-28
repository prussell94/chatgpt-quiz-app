class TopicCache:
    def __init__(self, max_size):
        self.max_size = max_size
        self.cache = {}

    def get(self, key):
        if key in self.cache:
            # Move the key to the end to maintain LRU order
            value = self.cache.pop(key)
            self.cache[key] = value
            return value
        else:
            return None

    def put(self, key, value):
        if len(self.cache) >= self.max_size:
            # Evict the least recently used key
            self.cache.pop(next(iter(self.cache)))
        self.cache[key] = value

    def length(self):
        return len(self.cache)
    
    def toString(self):
        for value in self.cache.values():
            print("value in cache")
            print(value)

# Example usage
cache = TopicCache(max_size=3)
cache.put("key1", "value10")
cache.put("key2", "value2")
cache.put("key3", "value3")

print(cache.get("key1"))  # Output: value1
print(cache.get("key2"))  # Output: value2
print(cache.get("key4"))  # Output: None (key not found)
