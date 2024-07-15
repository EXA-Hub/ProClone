def calculate_level_xp(level):
    current_xp = 0  # Initial XP value
    total_xp = 0  # Total accumulated XP

    # Calculate XP for levels up to the specified level
    for i in range(1, level + 1):
        if i == 1:
            current_xp = 35  # Starting XP for level 1
        elif i == 2:
            current_xp = 103  # Starting XP for level 2
        else:
            current_xp += 70  # Increment by 70 for subsequent levels
        
        total_xp += current_xp  # Accumulate total XP
    
    return current_xp, total_xp

# Example usage:
level_input = int(input("Enter the level you want to check: "))
level_xp, accumulated_xp = calculate_level_xp(level_input)
print(f"XP for level {level_input}: {level_xp}")
print(f"Total accumulated XP up to level {level_input}: {accumulated_xp}")
