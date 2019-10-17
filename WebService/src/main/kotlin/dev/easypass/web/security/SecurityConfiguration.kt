package dev.easypass.web.security

import org.springframework.context.annotation.Configuration
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter



/**
 *
 *
 * @author Kacper Urbaniec
 * @version 2019-10-17
 */

@Configuration
class SecurityConfiguration : WebSecurityConfigurerAdapter() {

    @Throws(Exception::class)
    override fun configure(httpSecurity: HttpSecurity) {
        httpSecurity.authorizeRequests().antMatchers("/").permitAll()
    }

}