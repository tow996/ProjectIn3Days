Backend installation: 

cd backend
python -m venv env
env/scripts/activate
pip install -r requirements.txt
python manage.py makemigrations
python manage.py migrate 
python seed_data.py <- to create bunch of product data
python manage.py createsuperuser <- create superuser
python manage.py runserver 

Frontend installation:

cd frontend
npm i 
npm run dev
