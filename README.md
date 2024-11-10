# **DataCascade**

**DataCascade** is a real-time data streaming platform designed to visualize and process time-series data. The system utilizes a modern technology stack, combining frontend and backend technologies like **React**, **Next.js**, **Node.js**, **Kafka**, and **AWS** to create a dynamic, scalable solution for live data monitoring, ingestion, transformation, and storage. The project simulates a real-world data pipeline by leveraging event-driven architecture and provides real-time analytics through a visual dashboard.

## **Table of Contents**

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Project Structure](#project-structure)
- [Frontend Setup](#frontend-setup)
- [Backend Setup](#backend-setup)
- [Kafka Setup](#kafka-setup)
- [AWS Integration](#aws-integration)
- [Running the Project](#running-the-project)
- [License](#license)

## **Project Overview**

The goal of **DataCascade** is to provide a real-time, interactive platform for visualizing time-series data using **React** & **Next.js** on the frontend, and streamlining data ingestion, transformation, and storage with **Node.js**, **Kafka**, and **AWS** on the backend. The platform consists of several components that work together to provide a seamless flow of data:

- **Frontend**: A React & Next.js dashboard that visualizes time-series data using a line chart, with real-time updates streamed via WebSocket.
- **Backend**: A Node.js server that ingests data and streams it through Kafka. It also processes the data with an ETL pipeline and stores it in AWS services like DynamoDB.
- **Kafka**: A distributed streaming platform used for handling real-time data flow.
- **AWS**: Utilized for storing and processing data, using services like DynamoDB and Lambda.

The project demonstrates a scalable solution for handling big data, implementing an ETL pipeline, and visualizing time-series data in real-time.

## **Technologies Used**

This project combines a number of modern technologies to create a real-time data pipeline with efficient data streaming and visualization:

### **Frontend:**

- **React**: A JavaScript library for building user interfaces, specifically the time-series data dashboard.
- **Next.js**: A React framework that enables server-side rendering (SSR) for better performance and SEO optimization.
- **Chart.js**: A JavaScript charting library to visualize time-series data.
- **Socket.io**: A WebSocket library to enable real-time communication between the server and the frontend.

### **Backend:**

- **Node.js**: A JavaScript runtime environment used for the backend server that handles data ingestion and streaming.
- **Kafka**: A distributed event streaming platform to manage and stream the time-series data.
- **Express**: A web framework for Node.js to build the server that handles incoming requests.
- **Socket.io**: For managing real-time WebSocket communication between the backend and frontend.
  
### **Data Storage & Processing:**

- **AWS DynamoDB**: A NoSQL database service for storing and retrieving time-series data efficiently.
- **AWS Lambda**: Used for serverless computation and data processing.

### **Other Tools:**

- **Docker**: Containerization for easier development and deployment of the entire stack.

## **Features**

- **Real-Time Data Streaming**: Data updates are pushed to the frontend via WebSocket and displayed in real-time on the dashboard.
- **Time-Series Visualization**: The data is visualized in an interactive line chart, making it easy to track trends and patterns over time.
- **Event-Driven Architecture**: Kafka handles the streaming and distribution of data in an efficient, fault-tolerant manner.
- **Scalable Backend**: The system is designed to handle large-scale data ingestion and storage using AWS services.
- **Alert System**: Data-driven alerts can be triggered and streamed via Kafka for real-time notifications based on events in the data.

## **Project Structure**

The project is divided into two main directories:

```
DataCascade/
├── frontend/               # React & Next.js frontend
│   ├── components/         # UI components like TimeSeriesChart
│   ├── pages/              # Next.js pages (including the home page)
│   └── public/             # Static files (e.g., images)
├── backend/                # Node.js backend
│   ├── services/           # Logic for Kafka, AWS integration
│   ├── models/             # Data models (e.g., DynamoDB schemas)
│   └── server.js           # Main server setup (Express, WebSocket, Kafka)
└── kafka/                  # Kafka configurations and scripts
    ├── producer.js         # Kafka producer to simulate data generation
    ├── consumer.js         # Kafka consumer for streaming data to frontend
    └── config.js           # Kafka configuration file
```

### **Frontend:**

- **components/**: Contains reusable React components such as the `TimeSeriesChart` component that handles the rendering of the line chart and data updates.
- **pages/**: Contains the application’s pages. The main page is `index.js`, which integrates the `TimeSeriesChart`.
  
### **Backend:**

- **services/**: Contains logic for handling Kafka messages, data ingestion, and integration with AWS DynamoDB.
- **models/**: Contains data models used in the backend, such as how data is structured when stored in DynamoDB.
- **server.js**: The main server file where Express, WebSocket, and Kafka connections are configured.

### **Kafka:**

- **producer.js**: A Kafka producer script that generates random time-series data and sends it to the Kafka topic.
- **consumer.js**: A Kafka consumer that listens to the topic and sends the data to the frontend via WebSocket.
  
## **Frontend Setup**

To set up the frontend, follow these steps:

1. Install the necessary dependencies:

```bash
npx create-next-app data-cascade-frontend
cd data-cascade-frontend
npm install chart.js react-chartjs-2 socket.io-client
```

2. Add the `TimeSeriesChart` component and integrate it with `Next.js`:

```jsx
// components/TimeSeriesChart.js
import { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import io from 'socket.io-client';

const socket = io('http://localhost:4000'); // Backend server

const TimeSeriesChart = () => {
  const [data, setData] = useState({ labels: [], datasets: [{ data: [] }] });

  useEffect(() => {
    socket.on('data-update', (newData) => {
      setData((prevData) => ({
        labels: [...prevData.labels, newData.time],
        datasets: [
          {
            ...prevData.datasets[0],
            data: [...prevData.datasets[0].data, newData.value],
          },
        ],
      }));
    });

    return () => socket.disconnect();
  }, []);

  return <Line data={data} />;
};

export default TimeSeriesChart;
```

3. Run the frontend server:

```bash
npm run dev
```

## **Backend Setup**

To set up the backend:

1. Install the required dependencies:

```bash
mkdir backend
cd backend
npm init -y
npm install express socket.io kafka-node aws-sdk
```

2. Set up the Kafka producer and consumer, and handle the WebSocket connection in `server.js`.

3. Run the backend server:

```bash
node server.js
```

## **Kafka Setup**

Kafka should be installed and running on your machine. To configure Kafka:

1. Download and install Kafka.
2. Start the Kafka server.
3. Create the necessary topics for streaming data:

```bash
bin/kafka-topics.sh --create --topic data-stream --bootstrap-server localhost:9092 --partitions 1 --replication-factor 1
```

4. Configure the Kafka producer to send data and the consumer to listen for data.

## **AWS Integration**

To integrate AWS:

1. Set up **AWS DynamoDB** and configure your AWS SDK with IAM credentials.
2. In the backend, use the `aws-sdk` to save the data to DynamoDB.

## **Running the Project**

1. Make sure Kafka and the backend server are running.
2. Run the frontend:

```bash
cd frontend
npm run dev
```

3. Open the application in your browser at `http://localhost:3000` to see the real-time data stream.
