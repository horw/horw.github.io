# Permissions errors on linux with npm install global

You may encounter this error when installing a package globally because the current user does not have the necessary permissions to do so. You can try [changing the ownership](https://stackoverflow.com/questions/59663176/is-there-any-problem-if-i-chown-my-usr-lib-node-modules-will-there-be-any-secur) using the 'chown' command, but this is not the recommended approach. [It is better to change the directory where global packages are installed.](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally)

---
> Publication Date: 2023-09-23 11:52:58
