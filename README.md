# 🎉 Event Registration System API (Django REST Framework)

[![Python](https://img.shields.io/badge/Python-3.11-blue?style=flat-square\&logo=python\&logoColor=white)](https://www.python.org/)
[![Django](https://img.shields.io/badge/Django-4.2-green?style=flat-square\&logo=django\&logoColor=white)](https://www.djangoproject.com/)
[![DRF](https://img.shields.io/badge/DRF-3.15-blue?style=flat-square\&logo=django\&logoColor=white)](https://www.django-rest-framework.org/)
[![API](https://img.shields.io/badge/API-REST-red?style=flat-square)](https://www.django-rest-framework.org/)
[![License](https://img.shields.io/badge/License-MIT-lightgrey?style=flat-square)](https://opensource.org/licenses/MIT)

A simple and clean **Event Management System API** built using **Django** and **Django REST Framework (DRF)**.
This project allows users to view events, register for events, and manage their registrations.

---

## 📌 Features

### ✅ Public Endpoints

* **List all events**
* **View event details**

### 🔐 Authenticated Endpoints (Requires Login)

* **Register for an event**
* **View my registrations**
* **Delete my registration**

---

## 🛠️ Tech Stack

* **Backend:** Django, Django REST Framework
* **Authentication:** Django default auth system
* **Database:** SQLite (default) or MySQL/PostgreSQL

---

## 📂 Project Structure (Important Files)

```
📦 project
├── events
│   ├── models.py
│   ├── serializers.py
│   ├── views.py
│   ├── urls.py
│   └── admin.py
├── project
│   ├── settings.py
│   ├── urls.py
└── manage.py
```

---

## 📌 API Endpoints

### 📍 **Events**

| Method | Endpoint        | Description              |
| ------ | --------------- | ------------------------ |
| GET    | `/events/`      | List all events          |
| GET    | `/events/<id>/` | Get single event details |

### 📍 **Event Registrations (Public View)**

| Method | Endpoint                            | Description                            |
| ------ | ----------------------------------- | -------------------------------------- |
| GET    | `/events/<event_id>/registrations/` | List registrations of a specific event |

### 🔐 **User Registrations (Requires Login)**

| Method | Endpoint                     | Description            |
| ------ | ---------------------------- | ---------------------- |
| POST   | `/register/`                 | Register for an event  |
| GET    | `/my-registrations/`         | View my registrations  |
| DELETE | `/registration/<id>/delete/` | Delete my registration |

---

## 🧪 Example Registration Payload (POST `/register/`)

```json
{
  "event": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
```

---

## 🧱 Models Overview

### **Event**

* title
* description
* date
* location

### **Registration**

* event (FK)
* user (FK)
* name
* email
* phone
* registered_at

---

## 🔧 How to Run the Project

```bash
# Install dependencies
pip install -r requirements.txt

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Start server
python manage.py runserver
```

---

## 🔑 Authentication (Required for some APIs)

Use:

* `/admin` login to create users
* Obtain token using session login or JWT (if configured)

---

## 📬 Admin Panel

Access all events and registrations at:

```
http://localhost:8000/admin/
```

---

## 📘 Serializer Overview

### EventSerializers

* returns all event fields

### RegisterSerializers

* user (read-only)
* event (PK field)
* event_title (read-only)

---

## ✔️ Notes

* `registered_at` is auto-generated
* Users must be authenticated to register or delete a registration

---

## ⭐ Author

**Raghu Ram** – Event Management API using Django & DRF
