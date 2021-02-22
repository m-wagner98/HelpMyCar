#FROM maven:3.6-jdk-8 AS build
#COPY src /usr/src/app/src
#COPY pom.xml /usr/src/app
#RUN mvn -f /usr/src/app/pom.xml clean package

FROM openjdk:8u111-jdk-alpine
VOLUME /tmp
ADD /target/hmc-backend.jar hmc-backend.jar
ENTRYPOINT ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/hmc-backend.jar"]
