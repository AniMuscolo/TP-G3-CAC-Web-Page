# esta carpeta "app" al tener dentro un archivo __init__.py hace que python la reconozca como un "paquete" y no solo un modulo
# El __init__.py suele ser un archivo vacío pero tiene que existir si queremos que sea considerado un paquete de Python

from app.database import get_db

class Suscripcion:
    def __init__(self, id_suscripcion=None, nombre=None, edad=None, mail=None, telefono=None):
        self.id_suscripcion = id_suscripcion
        self.nombre = nombre
        self.edad = edad
        self.mail = mail
        self.telefono = telefono

    def save(self):
        db = get_db()
        cursor = db.cursor()
        if self.id_suscripcion:
            cursor.execute("""
                UPDATE suscripciones SET nombre = %s, edad = %s, mail = %s, telefono = %s
                WHERE id_suscripcion = %s
            """, (self.nombre, self.edad, self.mail, self.telefono, self.id_suscripcion))
        else:
            cursor.execute("""
                INSERT INTO suscripciones (nombre, edad, mail, telefono) VALUES (%s, %s, %s, %s)
            """, (self.nombre, self.edad, self.mail, self.telefono))
            self.id_suscripcion = cursor.lastrowid
        db.commit()
        cursor.close()

    @staticmethod
    def get_all():
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM suscripciones")
        rows = cursor.fetchall()
        suscripciones = [Suscripcion(id_suscripcion=row[0], nombre=row[1], edad=row[2], mail=row[3], telefono=row[4]) for row in rows]
        cursor.close()
        return suscripciones

    @staticmethod
    def get_by_id(id_suscripcion):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("SELECT * FROM suscripciones WHERE id_suscripcion = %s", (id_suscripcion,))
        row = cursor.fetchone()
        cursor.close()
        if row:
            return Suscripcion(id_suscripcion=row[0], nombre=row[1], edad=row[2], mail=row[3], telefono=row[4])
        return None

    def delete(self):
        db = get_db()
        cursor = db.cursor()
        cursor.execute("DELETE FROM suscripciones WHERE id_suscripcion = %s", (self.id_suscripcion,))
        db.commit()
        cursor.close()

    def serialize(self):
        return {
            'id_suscripcion': self.id_suscripcion,
            'nombre': self.nombre,
            'edad': self.edad,
            'mail': self.mail,
            'telefono': self.telefono
        }
