# Django + React Starter Project

This is a ready to use starter project using Django as backend and React as frontend.
It aims to provide a minimal full-stack setup where React is built into Django’s static files folder for easy deployment.

The project is ideal for developers who have some knowledge of Django and React and want to explore how these technologies can be combined.

---

## Table of Contents

- [Requirements](#requirements)
- [Project Structure](#project-structure)
- [Backend Setup (Django)](#backend-setup-django)
- [Frontend Setup (React)](#frontend-setup-react)
- [Development Workflow](#development-workflow)
- [Serving React with Django](#serving-react-with-django)
- [Next Steps & Enhancements](#next-steps--enhancements)
- [License](#license)

---

## Requirements

- Python >= 3.7
- Node.js >= 16.x (recommend using [nvm](https://github.com/nvm-sh/nvm) version manager)
- npm (comes with Node.js)
- Git (optional, for cloning repo)

---

## Project Structure

```
root/
├── backend/
│   ├── frontend/           # React build output (static files served by Django)
│   ├── manage.py
│   ├── requirements.txt
│   └── ...                 # Django app files and settings
└── frontend/
    └── app/                # React app source code
```

---

## Backend Setup (Django)

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Create a Python virtual environment:

   ```bash
   python -m venv venv
   ```

3. Activate the virtual environment:

   - macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - Windows (PowerShell):
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - Windows (CMD):
     ```cmd
     venv\Scripts\activate.bat
     ```

4. Install Python dependencies:

   ```bash
   pip install -r requirements.txt
   ```

5. Run database migrations:

   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Create a superuser for admin access:

   ```bash
   python manage.py createsuperuser
   ```

---

## Frontend Setup (React)

1. Navigate to the React app directory:

   ```bash
   cd ../frontend/app
   ```

2. Install Node.js dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in `frontend/app` with the following content to specify the React build output folder:

   ```env
   BUILD_PATH=../../backend/assets
   ```

4. Build the React app for production:

   ```bash
   npm run build
   ```

5. (Optional) If you encounter build issues, clean dependencies and reinstall:

   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

---

## Development Workflow

- **Run Django backend server**

  From the `backend` directory (with virtualenv activated):

  ```bash
  python manage.py runserver
  ```

  This will serve Django at [http://localhost:8000](http://localhost:8000).

- **Run React development server**

  From the `frontend/app` directory:

  ```bash
  npm start
  ```

  React will serve your frontend with hot reload at [http://localhost:3000](http://localhost:3000).

- **Notes:**

  - During development, run both servers concurrently in separate terminals.
  - Configure React to proxy API requests to Django backend (e.g., via `"proxy": "http://localhost:8000"` in React's `package.json`) for seamless API calls during development.

---

## Serving React with Django

- After running `npm run build`, React's static files will be output into `backend/assets`.
- Django `settings.py` is configured to serve these static files as follow into settings.py:

```python
STATIC_URL = '/static/'
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'frontend'),
]
```

The app Home is used to set React as TemplateView routing, this is the home\views.py:

```python
class React(TemplateView):
    """A view that renders the React frontend"""
    template_name = 'index.html'
```

Then this is loaded into app\urls.py as:
```python
from home.views import React

urlpatterns = [
    ...,
    re_path(r'^.*', React.as_view(), name='frontend'),  
]

```

---

## On 26/06/2025 Implementated:
- Integration of **Django-Ninja** for API creation.
- **JWT authentication** for secure API access.
-  React global state management.

---

## License

This project is open source and free to use under the MIT License.

---

## Questions or Contributions?

Feel free to open issues or pull requests.\
Happy coding! 🚀