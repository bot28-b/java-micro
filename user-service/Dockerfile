FROM openjdk:21-jdk-slim

WORKDIR /app

COPY pom.xml .
COPY src ./src

RUN apt-get update && apt-get install -y maven && \
    mvn clean package -DskipTests && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

EXPOSE 8081

CMD ["java", "-jar", "target/user-service-1.0.0.jar"]
