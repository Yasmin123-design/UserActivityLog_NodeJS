# Scalable User Activity Log Microservice

A real-time user activity logging microservice built with Node.js, Express, Kafka, and MongoDB.

## Architecture Description

This service follows **Domain-Driven Design (DDD)** principles and an **Event-Driven Architecture**:

- **Domain Layer**: Contains the core business logic (`UserActivityLog` entity) and repository interfaces. It is independent of external frameworks.
- **Application Layer**: Contains use cases (`LogUserActivity`, `FetchUserActivityLogs`) that orchestrate the flow of data using domain entities.
- **Infrastructure Layer**: Implements technical details like MongoDB persistence and Kafka messaging.
- **Interface Layer**: Express.js REST API providing clean endpoints for interaction.

### Event-Driven Flow

1. **Producer**: When a `POST /api/logs` request arrives, the service validates the data and publishes a message to a Kafka topic.
2. **Consumer**: A background consumer listens to the Kafka topic and asynchronously persists the activity logs to MongoDB. This decoupling ensures the API remains fast and scalable.

## Setup Instructions

### Prerequisites

- Docker & Docker Compose
- (Optional) Node.js 18+ for local development

### Running with Docker Compose

1. Clone the repository.
2. Ensure Docker is running.
3. Run:
   ```bash
   docker-compose up --build
   ```
4. The API will be available at `http://localhost:3000`.

### Local Development Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set up a local MongoDB and Kafka instance (or use the one in `docker-compose.yml`).
3. Create/update the `.env` file with your local credentials.
4. Start the service:
   ```bash
   npm start
   ```

## REST API Documentation

### 1. Log User Activity

- **URL**: `/api/logs`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "userId": "user123",
    "activity": "login",
    "metadata": { "device": "mobile" }
  }
  ```
- **Response**: `202 Accepted` (Activity is being processed).

### 2. Fetch User Activity Logs (with Pagination & Filtering)

- **URL**: `/api/logs`
- **Method**: `GET`
- **Query Parameters**:
  - `userId` (optional): Filter by user ID.
  - `activity` (optional): Filter by activity type.
  - `startDate` (optional/ISO): Filter from date.
  - `endDate` (optional/ISO): Filter to date.
  - `page` (default 1): Pagination page number.
  - `limit` (default 10): Logs per page.
- **Response**: `200 OK` with logs and total count.

## Kubernetes Deployment

Kubernetes manifests are located in the `k8s/` directory.

```bash
kubectl apply -f k8s/k8s-manifests.yaml
```
