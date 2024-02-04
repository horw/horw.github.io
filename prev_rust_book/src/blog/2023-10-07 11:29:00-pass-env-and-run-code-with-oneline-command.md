# Pass enviroment variable and run code with oneline command


When I read the Rust book, I noticed a good way to pass variables into a program in the same line as code execution.
> [!WARNING]  
> This method of working with variables can only be used in a local debug environment because directly writing variables in this way can pose security issues.

Code example:
```rust
fn main() {
    let val = env!("SOMETHING", "Please set up variable: SOMETHING");
    println!("value was found {val}");
}
```

Terminal command:

```bash
SOMETHING=1 cargo run
```

Just place the vars before the executable script, and it will pass the environment vars to the program

---
Related: 
- [rust book](https://doc.rust-lang.org/book/ch09-01-unrecoverable-errors-with-panic.html)
---

> Publication Date: 2023-10-06 11:15:58
