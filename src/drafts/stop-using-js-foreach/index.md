---
title: >-
  Please stop using .forEach
---

## Please stop using .forEach

```rb
items = nil
for x in items do
  puts x
end
# '<main>': undefined method 'each' for nil (NoMethodError)
```

```rb
items.each do |x|
  puts x
end
```
