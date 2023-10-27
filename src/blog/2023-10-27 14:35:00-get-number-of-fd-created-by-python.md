# Debug Python created File Descriptors(fd)


There was a file descriptor leak in the Python program.

To debug it, the first step is to identify with which file descriptor (fd) it occurs. I did this using the following script.
```python
def get_fd():
    import os
    fls = []
    # You can use listdir without readlink, but then there will be one 'fake' file descriptor, which 'proc/self/fd' opens by itself.
    for f in os.listdir('/proc/self/fd'):
        try:
            link = os.readlink(f'/proc/self/fd/{f}')
            fls.append(f)
        except Exception as e:
            pass
   return fls, len(fls)
print(get_fd())
```
After you identify which pipe appears to be the issue, you can use `strace` to capture file read and write.

```bash
sudo strace -e trace=open,read,write -p YOUR_PID -f -o YOUR_OUTPUT_FILE -s 10000
``````

> Publication Date: 2023-10-27 14:35:00
