
import os

# Ruta del directorio raíz de tu proyecto
root_dir = 'C:\\Users\\juan0\\Digi\\node-experience\\src'

# Nombre del archivo de texto en el que se escribirán los nombres de las carpetas y archivos
output_file_name = 'estructura_proyecto.txt'

# Función recursiva para obtener los nombres de todas las carpetas y archivos en la estructura de proyecto
def get_structure(dir_path, parent_folder=''):
    # Lee los contenidos del directorio
    contents = os.listdir(dir_path)

    # Filtra solo los directorios y los archivos (ignora otros tipos de elementos)
    folders = [item for item in contents if os.path.isdir(os.path.join(dir_path, item))]
    files = [item for item in contents if os.path.isfile(os.path.join(dir_path, item))]

    # Escribe el nombre de la carpeta y los archivos en el archivo de texto
    with open(output_file_name, 'a') as f:
        full_folder_name = f"{parent_folder}/" if parent_folder else ""
        f.write(f"{full_folder_name}\n")
        for file in files:
            f.write(f"|   {file}\n")
        for folder in folders:
            folder_path = os.path.join(dir_path, folder)
            full_folder_name = f"{parent_folder}/{folder}" if parent_folder else folder
            f.write(f"|---{folder}\n")
            get_structure(folder_path, full_folder_name)

# Ejecuta la función para obtener los nombres de las carpetas y archivos en la estructura de proyecto
get_structure(root_dir)

print(f"La estructura de proyecto se ha escrito en el archivo \"{output_file_name}\"")
