import os

# Directory path
directory = r'C:\Users\ZAMPX\Downloads\Telegram Desktop\probot.io\Dashboard - ProBot_files'

# List all files in the directory
files = os.listdir(directory)

# Iterate over each file
for file_name in files:
    # Check if the file ends with .download
    if file_name.endswith('.download'):
        # Create the new file name by removing the .download extension
        new_file_name = file_name[:-9]
        # Construct full file paths
        old_file_path = os.path.join(directory, file_name)
        new_file_path = os.path.join(directory, new_file_name)
        # Rename the file
        os.rename(old_file_path, new_file_path)
        print(f'Renamed: {old_file_path} to {new_file_path}')

print('Renaming completed.')
