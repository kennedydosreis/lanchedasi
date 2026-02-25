# Use an official Python runtime as a parent image
FROM python:3.11-slim-bookworm AS builder

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=off \
    PIP_DISABLE_PIP_VERSION_CHECK=on

WORKDIR /build

# Install dependencies
# Copy requirements first for better caching
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Final stage
FROM python:3.11-slim-bookworm

WORKDIR /app

# Copy installed dependencies from builder
COPY --from=builder /install /usr/local

# Copy application code
COPY . .

# Expose port
EXPOSE 8000

# Run the application
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
