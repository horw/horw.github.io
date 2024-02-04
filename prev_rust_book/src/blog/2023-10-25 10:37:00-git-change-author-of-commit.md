# Change the Git commit author

If you want to help create code for another person, you can change the author attribution for your commit
```bash
git commit --author="Someone Someone <someone@somemail.some>"
```
if you want to change the last commit, you can use
```bash
git commit --amend --author="Someone Someone <someone@somemail.some>" --no-edit
```


- --amend - the fast way to edit last commit
- --no-edit - don't change last commit

---

> Publication Date: 2023-10-20 10:25:00
