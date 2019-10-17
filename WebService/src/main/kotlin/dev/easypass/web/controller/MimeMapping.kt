package dev.easypass.web.controller

import org.springframework.boot.web.server.MimeMappings
import org.springframework.boot.web.servlet.server.ConfigurableServletWebServerFactory
import org.springframework.boot.web.server.WebServerFactoryCustomizer
import org.springframework.context.annotation.Configuration


/**
 * Extra Mime-Mapping needs to be added for wasm, because Spring/Tomcat
 * server wasm files as "application/octet-stream" and not "application/wasm"
 * which leads to error on browser.
 *
 * @author Kacper Urbaniec
 * @version 2019-10-17
 */

@Configuration
class MimeMapping : WebServerFactoryCustomizer<ConfigurableServletWebServerFactory> {
    override fun customize(factory: ConfigurableServletWebServerFactory) {
        val mappings = MimeMappings(MimeMappings.DEFAULT)
        mappings.add("wasm", "application/wasm; charset=utf-8")
        factory.setMimeMappings(mappings)
    }
}