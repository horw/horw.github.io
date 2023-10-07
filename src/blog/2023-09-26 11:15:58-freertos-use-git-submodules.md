# FreeRTOS use github submodules


Get started on linux: https://www.freertos.org/FreeRTOS-simulator-for-Linux.html
<br>
The installation is well explained in the 'Building the Posix/Linux Simulator Demos' section. However, when I tried to build the FreeRTOS [repository] (https://github.com/FreeRTOS/FreeRTOS/tree/main/FreeRTOS/Demo/Posix_GCC) for the first time, I was confused because I encountered a 'FreeRTOS didn't find' error when attempting to build the example. I found a [solution](https://forums.freertos.org/t/linux-simulator-build-fails-freertos-h-no-such-file-or-directory/12571) on the FreeRTOS Official webpage. TL;TR it involves using GitHub submodules. Just go to the root directory of FreeRTOS and run this command.
```
git submodule update --init --recursive
```

---
Related: 
- [git submodules](https://git-scm.com/book/en/v2/Git-Tools-Submodules)
---
> Publication Date: 2023-09-26 11:15:58
