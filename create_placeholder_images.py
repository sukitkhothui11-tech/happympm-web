from PIL import Image, ImageDraw, ImageFont
import os

# Create base directory
base_path = r'C:\Users\USER\Documents\New folder\happympm-web\public\images\join-business'

# Tool colors and names
tools = {
    'tool-1': {'name': 'Business Registration', 'color': (0, 67, 168)},
    'tool-2': {'name': 'Global Marketplace', 'color': (0, 137, 200)},
    'tool-3': {'name': 'Event Management', 'color': (76, 175, 80)},
    'tool-4': {'name': 'Community Network', 'color': (255, 152, 0)},
    'tool-5': {'name': 'Training Program', 'color': (156, 39, 176)}
}

for tool_id, tool_info in tools.items():
    tool_path = os.path.join(base_path, tool_id)
    
    for i in range(1, 4):  # Create 3 images per tool
        # Create image (16:10 aspect ratio)
        img = Image.new('RGB', (1200, 800), color=tool_info['color'])
        draw = ImageDraw.Draw(img)
        
        # Add text
        text = f"{tool_info['name']}\nImage {i}"
        try:
            font = ImageFont.truetype('arial.ttf', 80)
        except:
            font = ImageFont.load_default()
        
        # Get text bounding box
        bbox = draw.textbbox((0, 0), text, font=font)
        text_width = bbox[2] - bbox[0]
        text_height = bbox[3] - bbox[1]
        
        # Center text
        x = (1200 - text_width) // 2
        y = (800 - text_height) // 2
        
        draw.text((x, y), text, fill=(255, 255, 255), font=font)
        
        # Save image
        img_path = os.path.join(tool_path, f'image-{i}.jpg')
        img.save(img_path, 'JPEG', quality=85)
        print(f'Created: {img_path}')

print('All images created successfully!')
