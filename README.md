# Setup and Installation

This guide will walk you through the steps to set up the backend and frontend of the project.

---

### Backend Installation

Follow these steps to get the backend running:

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Create and activate a virtual environment:**
    ```bash
    python -m venv env
    # On Windows:
    env\Scripts\activate
    # On macOS/Linux:
    source env/bin/activate
    ```

3.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

4.  **Run database migrations:**
    ```bash
    python manage.py makemigrations
    python manage.py migrate
    ```

5.  **Seed the database with sample data:**
    ```bash
    python seed_data.py
    ```

6.  **Create a superuser:**
    ```bash
    python manage.py createsuperuser
    ```

7.  **Start the development server:**
    ```bash
    python manage.py runserver
    ```

---

### Frontend Installation

Follow these steps to set up the frontend:

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm i
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```