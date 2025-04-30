# Step 1: Build the React frontend
FROM node:16 as build_frontend

# Set the working directory for the frontend build
WORKDIR /app

# Copy package.json and package-lock.json for React app (inside bio folder)
COPY bio/package.json bio/package-lock.json /app/
RUN npm install

# Copy the rest of the React app files (from the bio folder)
COPY bio/ /app/

# Build the React app
RUN npm run build

# Step 2: Set up Python environment for FastAPI (backend)
FROM python:3.10-slim as build_backend

# Set the working directory for the backend
WORKDIR /app

# Copy the FastAPI app and requirements file (inside API_pipeline folder)
COPY API_pipeline/requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy FastAPI backend files (from the API_pipeline folder)
COPY API_pipeline/ /app/

# Step 3: Serve the FastAPI app with Uvicorn
EXPOSE 8000

# Copy the React build from the frontend build stage into the FastAPI static folder
COPY --from=build_frontend /app/build /app/static

# Command to run FastAPI app with Uvicorn
CMD ["uvicorn", "API_pipeline.main:app", "--host", "0.0.0.0", "--port", "8000"]
