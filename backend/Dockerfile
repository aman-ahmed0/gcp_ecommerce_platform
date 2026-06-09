# 1. Use an official Python image as our starting point
FROM python:3.11-slim

# 2. Set the working directory inside the container
WORKDIR /app

# 3. Copy only the requirements file first (better caching)
COPY requirements.txt .

# 4. Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy the rest of the backend code into the container
COPY . .

# 6. Document which port Flask will use (just for humans)
EXPOSE 5000

# 7. Start the Flask server
CMD ["python", "app.py"]