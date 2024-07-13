import json

# Load the JSON data from the file
with open("Bot/src/database/help.json", "r") as file:
    data = json.load(file)

# Prepare a list to hold the formatted output lines
output_lines = []

# Iterate over each item in the JSON array
for command in data:
    # Get the command name (first key in the dictionary)
    command_name = next(iter(command))
    # Get the usage for the command
    usage = command["usage"]
    # Add the formatted output to the list
    output_lines.append(f"{command_name}: {usage}")

# Save the output to a file with utf-8 encoding
with open("output.txt", "w", encoding="utf-8") as output_file:
    for line in output_lines:
        output_file.write(line + "\n\n◤=================== ↟ ===================◢\n\n")
