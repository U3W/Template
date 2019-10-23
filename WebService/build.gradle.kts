import com.moowork.gradle.node.npm.NpmTask
import com.moowork.gradle.node.yarn.YarnTask
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
    id("org.springframework.boot") version "2.2.0.RELEASE"
    id("io.spring.dependency-management") version "1.0.8.RELEASE"
    id("com.moowork.node") version "1.3.1"
    kotlin("jvm") version "1.3.50"
    kotlin("plugin.spring") version "1.3.50"
}

node {
    // Version of node to use.
    version = "12.12.0"
    // Version of npm to use.
    npmVersion = "6.11.3"
    // Version of Yarn to use.
    yarnVersion = "1.19.1"
    // Base URL for fetching node distributions (change if you have a mirror).
    distBaseUrl = "https://nodejs.org/dist"
    // If true, it will download node using above parameters.
    // If false, it will try to use globally installed node.
    download = true
    // Set the work directory for unpacking node
    workDir = file("${project.buildDir}/nodejs")
    // Set the work directory for NPM
    npmWorkDir = file("${project.buildDir}/npm")
    // Set the work directory for Yarn
    yarnWorkDir = file("${project.buildDir}/yarn")
    // Set the work directory where node_modules should be located
    nodeModulesDir = file("${project.projectDir}")
}

group = "dev.easypass"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_1_8

val developmentOnly by configurations.creating
configurations {
    runtimeClasspath {
        extendsFrom(developmentOnly)
    }
}

repositories {
    mavenCentral()
    maven { url = uri("https://repo.spring.io/milestone") }
}

extra["springCloudVersion"] = "Hoxton.M3"

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-thymeleaf")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
    implementation("org.springframework.cloud:spring-cloud-starter-netflix-eureka-client")
    developmentOnly("org.springframework.boot:spring-boot-devtools")
    testImplementation("org.springframework.boot:spring-boot-starter-test") {
        exclude(group = "org.junit.vintage", module = "junit-vintage-engine")
    }
    testImplementation("org.springframework.security:spring-security-test")
}

dependencyManagement {
    imports {
        mavenBom("org.springframework.cloud:spring-cloud-dependencies:${property("springCloudVersion")}")
    }
}

tasks.withType<Test> {
    useJUnitPlatform()
}

tasks.withType<KotlinCompile> {
    kotlinOptions {
        freeCompilerArgs = listOf("-Xjsr305=strict")
        jvmTarget = "1.8"
    }
}

task<NpmTask>("appInstall") {
    description = "Installs all dependencies from package.json"
    setWorkingDir(file("${project.projectDir}/src/main/app"))
    //rgs = listOf("install")
    setArgs(listOf("install"))
}

task<NpmTask>("appBuild") {
    description = "Builds production version of the webapp"
    setWorkingDir(file("${project.projectDir}/src/main/app"))
    setArgs(listOf("run", "build"))
}

task<NpmTask>("appTest") {
    description = "Runs all tests of the webapp"
    setWorkingDir(file("${project.projectDir}/src/main/app"))
    setArgs(listOf("test"))
}

task("appCopy") {
    copy {
        from("src/main/app/build")
        into("out/production/resources/main/static/")
        exclude("index.html")
    }
    copy {
        from("src/main/app/build")
        into("build/resources/main/static/")
        exclude("index.html")
    }
    copy {
        from("src/main/app/build")
        into("src/main/resources/static/")
        exclude("index.html")
    }
    copy {
        from(File("src/main/app/build/index.html"))
        into("out/production/resources/main/templates")
    }
    copy {
        from(File("src/main/app/build/index.html"))
        into("build/resources/main/templates")
    }

    copy {
        from(File("src/main/app/build/index.html"))
        into("src/main/resources/templates")
    }
}

task<Exec>("wasmBuild") {
    val folder = File("src/main/app/pkg")
    if( !folder.exists() ) {
        folder.mkdirs()
    }

    workingDir = File("src/main/rust")
    commandLine = if (System.getProperty("os.name").toLowerCase().contains("windows")) {
        listOf("cmd", "/c", "wasm-pack", "build")
    } else {
        listOf("wasm-pack", "build")
    }
    copy {
        from("src/main/rust/pkg")
        into("src/main/app/pkg")
    }
}



