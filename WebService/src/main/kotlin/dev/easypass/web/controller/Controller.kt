package dev.easypass.web.controller

import org.springframework.stereotype.Controller
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.ResponseBody

/**
 *
 *
 * @author Kacper Urbaniec
 * @version 2019-10-17
 */

@Controller
class Controller {

    @RequestMapping(value = ["/"])
    fun index(): String {
        return "index"
    }

    @RequestMapping(value = ["/baum"])
    @ResponseBody
    fun index2(): String {
        print("baum")
        return "index4"
    }


}