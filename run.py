from flask import Flask
from flask_cors import CORS
from app.database import init_app
from app.views import *

app = Flask(__name__)

# Configurar la aplicación Flask
# app.config.from_pyfile('config/development.py')

# Inicializar la base de datos con la aplicación Flask
init_app(app)
#permitir solicitudes desde cualquier origen
CORS(app)
#permitir solicitudes desde un origen específico
# CORS(app, resources={r"/api/*": {"origins": "http://127.0.0.1:5000"}})

# Rutas para el CRUD de la entidad Suscripcion
app.route('/', methods=['GET'])(index)
app.route('/api/suscripciones/', methods=['POST'])(create_suscripcion)
app.route('/api/suscripciones/', methods=['GET'])(get_all_suscripciones)
app.route('/api/suscripciones/<int:id_suscripcion>', methods=['GET'])(get_suscripcion)
app.route('/api/suscripciones/<int:id_suscripcion>', methods=['PUT'])(update_suscripcion)
app.route('/api/suscripciones/<int:id_suscripcion>', methods=['DELETE'])(delete_suscripcion)

#from app.views import index # --aca importamos la funcion que creamos en el archivo "views" de la carpeta "app"
# si queremos importar todo lo que hay en ese archivo, ponemos "from app.views import*"

#app = Flask(__name__) # --> Es una variable de tipo string, que es el nombre que le voy a pasar al constructor de Flask
# Entonces ahora la variable "app" paso a ser un objeto de tipo "flask"

# Rutas de la API-REST
#app.route("/", methods=["GET"])(index) # --> eso es, de la raiz ("/") usamos el "metodo GET" y de ahi la "funcion index"

if __name__ == "__main__":
    app.run(debug = True)

# Ejemplo de clase, lo dejo comentado
#@app.route("/") #--> Esto se denomina "decoradores" --> para indicar la ruta o donde queremos llegar
#def index():
#    return "Hola desde Flask"

#@app.route("/hello")
#def saludo():
#    return "Buenas tardes"

#if __name__ == "__main__":
#    app.run(debug = True) #--> llamamos al método "run", ese run va a empezar a inicializar nuestro servidor

# para correrlo y poder verlo en pagina web podemos poner en la consola (Parados sobre "entorno24184") python nombredelarchivo.py(en este caso fue run.py) y ahi sabemos que el servidor esta activo

# para crear variable de entorno, vamos a la terminal/consola y usamos : "pip install python-dotenv" para instalar la librería y de esta forma gestionamos un modulo que tiene que ver con almacenar datos que son sensibles y no deben ser vistos
# Despues de eso volvemos a colocar "pip freeze > requeriments.txt" para que pise el archivo "requirements.txt" que ya teniamos

# Tambien tenemos que instalar el modulo que nos permita conectar con la base de datos, para eso hacemos: "pip install mysql-connector-python"
