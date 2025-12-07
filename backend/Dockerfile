# 1) Image Python officielle
FROM python:3.11-slim

# 2) Définit le répertoire de travail dans le container
WORKDIR /app

# 3) Copier les fichiers nécessaires
COPY requirements.txt .

# 4) Installer les dépendances
RUN pip install --no-cache-dir -r requirements.txt

# 5) Copier tout le projet Django
COPY . .

# 6) Exposer le port utilisé par Django
EXPOSE 8000

# 7) Commande de lancement
# - migrate pour créer la DB SQLite (db.sqlite3)
# - collectstatic si ton projet a des fichiers statiques
# - lancer Django en mode "0.0.0.0" pour être accessible depuis docker
CMD ["sh", "-c", "python manage.py migrate && python manage.py collectstatic --noinput && python manage.py runserver 0.0.0.0:8000"]
