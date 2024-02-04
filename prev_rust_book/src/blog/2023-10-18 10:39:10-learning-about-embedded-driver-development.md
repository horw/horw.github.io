# Learning about embedded driver development

This is my note on the 30-day masterclass by Pantech Solutions YouTube channel on how to write drivers for embedded systems. I will update this post part by part...

Step 1
--- 

[The EV Engineer gpio example](https://www.youtube.com/watch?v=QrJf6CF_g_8)


This time, I caught the idea of 'The EV Engineer' and implemented a driver for ESP32C3. It had some differences. Please take a [look.](https://github.com/horw/esp32-drivers-from-scratch/tree/main/1.%20gpio-driver)

```c
#include <stdint.h>
#include <stdio.h>
#include <inttypes.h>
#include "freertos/FreeRTOS.h" 
#include "freertos/task.h"

#define GPIO_BASE_ADDR        0x60004000
#define GPIO_OUT_REG         (GPIO_BASE_ADDR+0x004)
#define GPIO_OUT_W1TS_REG    (GPIO_BASE_ADDR+0x0008)
#define GPIO_OUT_W1TC_REG    (GPIO_BASE_ADDR+0x000C)
#define GPIO_ENABLE_REG      (GPIO_BASE_ADDR+0x0020)

#define IO_MUX_GPIO_BASE      0x60009000
#define IO_MUX_GPIO5_REG     (IO_MUX_GPIO_BASE+0x18)

#define DELAY_MS 3000


void app_main(void)
{   
    volatile uint32_t* gpio_enable_reg = (volatile uint32_t*) GPIO_ENABLE_REG;
    volatile uint32_t* gpio_out_reg = (volatile uint32_t*) GPIO_OUT_REG;
    volatile uint32_t* gpio_out_w1ts_reg = (volatile uint32_t*) GPIO_OUT_W1TS_REG;
    volatile uint32_t* gpio_out_w1tc_reg = (volatile uint32_t*) GPIO_OUT_W1TC_REG;

    volatile uint32_t* io_mux_gpio5_reg = (volatile uint32_t*) IO_MUX_GPIO5_REG;

    // enable gpio
    *gpio_enable_reg = (1<<5);
    // ESP32 PIN CAN BE USED FOR DIFFERENT PURPOSES, SETUP PIN AS GPIO
    *io_mux_gpio5_reg |= 1<<12;

    while (1){
        // set up value to 1 on 5th gpio - power on
        *gpio_out_w1ts_reg = (1<<5); //1
        printf("1. %lu - gpio out reg value\n", *gpio_out_reg);
        vTaskDelay(pdMS_TO_TICKS(DELAY_MS));
        // set up value to 0 on 5th gpio - power off
        *gpio_out_w1tc_reg = (1<<5); //0
        printf("2. %lu - gpio out reg value\n", *gpio_out_reg);
        vTaskDelay(pdMS_TO_TICKS(DELAY_MS));

    }
}
```

Step 2
---
coming soon

---

Related: 
- [Read more code than you write](https://death.andgravity.com/aosa)
- [Mastering Microcontroller and Embedded Driver Development](https://www.udemy.com/course/mastering-microcontroller-with-peripheral-driver-development/)
- [Linux Device Drivers, Third Edition](https://lwn.net/Kernel/LDD3/)
- ['osdev](https://wiki.osdev.org/Main_Page)
- [The EV Engineer gpio example](https://www.youtube.com/watch?v=QrJf6CF_g_8)
---

> Publication Date: 2023-10-18 10:39:10
