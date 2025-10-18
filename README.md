# Facebook Clone Project

## Overview
This project is a replication of the Facebook platform, developed exclusively for educational and practice purposes. It is not intended for production environments or commercial use.

## Prerequisites
To set up and run this project, ensure the following requirements are met:

- **Node.js**: Must be installed on your system. Download and install from [nodejs.org](https://nodejs.org) if not already present.
- **MongoDB**: Access to a MongoDB database, either hosted locally or through a cloud service (e.g., MongoDB Atlas), with a valid connection URI.

## Configuration
Follow these steps to configure the project:

1. **Environment Variables Setup**:
   - Create a file named `.env` in the project's root directory.
   - Add the following configurations, replacing `<your_mongo_uri>` with your MongoDB connection string:
     ```
     MONGO_URI=<your_mongo_uri>
     PORT=5000
     ```

2. **Project Build**:
   - Run the following command to build the project:
     ```
     npm run build
     ```

## Execution
To launch the application, execute:
```
npm run start
```

The server will run on the specified port (default: 5000). Ensure the MongoDB connection is active before starting the application.