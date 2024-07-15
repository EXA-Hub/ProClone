# Load the text data from the file with UTF-8 encoding
with open("output.txt", "r", encoding="utf-8") as file:
    lines = file.readlines()

# Define the text to search for
search_text = "◤=================== ↟ ===================◢"

# Initialize the count
count = 0

# Count the number of lines containing the search text
for line in lines:
    if search_text in line:
        count += 1

print(f"The number of lines containing the specified text: {count}")
