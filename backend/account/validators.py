import os

def validate_file_extension(name):
    isValid = True

    ext = os.path.splitext(name)[1] # ('image', '.jpg')
    valid_extensions = ['.pdf']

    if not ext.lower() in valid_extensions:
        isValid = False

    return isValid