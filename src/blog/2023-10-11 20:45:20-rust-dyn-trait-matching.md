# Rust dyn Trait matching

For me it looks very common to use type checker in if condition.

And I found it some stange when I can not match "inhereted" struct in Rust.

This is code which you can check, main interest part in Post::content...
```rust
trait Stage{
    fn request_review(self: Box<Self>) -> Box<dyn Stage>;
    fn approve(self: Box<Self>) -> Box<dyn Stage>;
}

struct Post{
    stage: Option<Box<dyn Stage>>,
    content: String,
}

impl Post {
    fn new() -> Post{
        Post{
            stage: Some(Box::new(Draft{})),
            content: String::new(),
        }
    }
    fn add_text(&mut self, text: &str){
        self.content.push_str(text);
    }
    fn content(&mut self) -> &str{
        ""
    }
    fn request_review(&mut self){
        if let Some(s) = self.stage.take(){
            self.stage = Some(s.request_review());
        }
    }
    fn approve(&mut self){
        if let Some(s) = self.stage.take(){
            self.stage = Some(s.approve())
        }

    }
}


struct Draft{}
struct PendingReview{}
struct Published{}

impl Stage for Draft{
    fn request_review(self: Box<Self>) -> Box<dyn Stage> {
        Box::new(PendingReview{})
    }

    fn approve(self: Box<Self>) -> Box<dyn Stage> {
        self
    }
}
impl Stage for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn Stage> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn Stage> {
        Box::new(Published{})
    }
}

impl Stage for Published{
    fn request_review(self: Box<Self>) -> Box<dyn Stage> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn Stage> {
        self
    }
}



fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());

    post.request_review();
    assert_eq!("", post.content());

    post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}

```

I want to implement on some specific status get content, and I was confused it is not easy to implement type checking for trait...

Official solution is implementation for every struct "content" methods

```rust
trait Stage{
    fn request_review(self: Box<Self>) -> Box<dyn Stage>;
    fn approve(self: Box<Self>) -> Box<dyn Stage>;
    fn content<'a>(&self, post: &'a Post) -> &'a str{
        ""
    }
}

struct Post{
    stage: Option<Box<dyn Stage>>,
    content: String,
}

impl Post {
    fn new() -> Post{
        Post{
            stage: Some(Box::new(Draft{})),
            content: String::new(),
        }
    }
    fn add_text(&mut self, text: &str){
        self.content.push_str(text);
    }
    fn content(&mut self) -> &str{
        if let Some(s) = &self.stage{
            s.content(self)
        }
        else{
            ""
        }
    }
    fn request_review(&mut self){
        if let Some(s) = self.stage.take(){
            self.stage = Some(s.request_review());
        }
    }
    fn approve(&mut self){
        if let Some(s) = self.stage.take(){
            self.stage = Some(s.approve())
        }

    }
}


struct Draft{}
struct PendingReview{}
struct Published{}

impl Stage for Draft{
    fn request_review(self: Box<Self>) -> Box<dyn Stage> {
        Box::new(PendingReview{})
    }

    fn approve(self: Box<Self>) -> Box<dyn Stage> {
        self
    }
}
impl Stage for PendingReview {
    fn request_review(self: Box<Self>) -> Box<dyn Stage> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn Stage> {
        Box::new(Published{})
    }
}

impl Stage for Published{
    fn request_review(self: Box<Self>) -> Box<dyn Stage> {
        self
    }

    fn approve(self: Box<Self>) -> Box<dyn Stage> {
        self
    }
    fn content<'a>(&self, post: &'a Post) -> &'a str {
        &post.content
    }
}



fn main() {
    let mut post = Post::new();

    post.add_text("I ate a salad for lunch today");
    assert_eq!("", post.content());

    post.request_review();
    assert_eq!("", post.content());

    post.approve();
    assert_eq!("I ate a salad for lunch today", post.content());
}
```
If you have a some good solution please leave it in comment section.

> Publication Date: 2023-10-11 20:45:20
