import json

def remove_duplicates(input_file, output_file):
    try:
        # Read the JSON array from the input file
        with open(input_file, 'r') as file:
            data = json.load(file)

        # Check if the data is a list
        if not isinstance(data, list):
            raise ValueError("The input JSON file does not contain an array.")

        # Remove duplicates by converting the list to a set and back to a list
        unique_data = list(set(data))

        # Sort the unique data to maintain a consistent order
        unique_data.sort()

        # Write the unique array back to the output file
        with open(output_file, 'w') as file:
            json.dump(unique_data, file, indent=4)

        print(f"Processed JSON saved to {output_file}")

    except FileNotFoundError:
        print(f"File {input_file} not found.")
    except json.JSONDecodeError:
        print("Invalid JSON format.")
    except Exception as e:
        print(f"An error occurred: {e}")

# File paths
input_file = 'express/urls.json'
output_file = 'express/urls_non.json'

# Call the function
remove_duplicates(input_file, output_file)
