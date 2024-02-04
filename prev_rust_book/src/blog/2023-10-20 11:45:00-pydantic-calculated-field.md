# Pydantic calculated field


For example, if you have a field with an unknown value that you want to add to serialization in Pydantic to obtain JSON output, you can use the `@calculated_field` decorator. 

In the example of initializing an object, you don't need to precalculate the area value and pass it to the object.

```python

from pydantic import computed_field, BaseModel


class Square(BaseModel):
    width: int
    height: int

    @computed_field
    @property
    def area(self) -> int:
        return self.width * self.height


s = Square(width=10, height=20)
print(s.model_dump_json())

```

Here is an example showcasing dynamic data, where the values are generated at runtime and used to extend the object.

```python
import requests

from pydantic import computed_field, BaseModel


class DynamicContent(BaseModel):
    url: str

    @computed_field
    @property
    def get_content(self) -> str:
        content = requests.get(self.url)
        return content.text


s = DynamicContent(url='https://loripsum.net/generate.php?p=3&l=medium&d=1&a=1')
print(s.model_dump_json())
print(s.model_dump_json())
```


---

Related: 
- [Pydantic](https://docs.pydantic.dev/2.0/usage/computed_fields/)
---

> Publication Date: 2023-10-20 11:45:00
