from django.shortcuts import render
from rest_framework.views import APIView
from . models import *
from rest_framework.response import Response
from . serializer import *
import json
import environ
from google import genai
import re

env = environ.Env()
environ.Env.read_env()

# set up Gemini
client = genai.Client(api_key=env("GOOGLE_API_KEY"))

# Create your views here.

class ReactView(APIView):
  
    serializer_class = ReactSerializer

    def get(self, request):
        detail = [ {"grid": detail.grid} 
        for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):

        grid_string = request.data.get('grid')
        serializer = ReactSerializer(data={'grid': grid_string})  
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Grid saved successfully"}, status=201)
        return Response(serializer.errors, status=400)


class PromptFormView(APIView):

    colour_to_code = {
        'colourless': 0,
        'red': 1,
        'green': 2,
        'blue': 3,
        'yellow': 4,
        'cyan': 5,
        'magenta': 6,
        'white': 7,
    }

    code_to_colour = {v: k for k, v in colour_to_code.items()}

    code_to_array = {
        0: [0, 0, 0],
        1: [1, 0, 0],
        2: [0, 1, 0],
        3: [0, 0, 1],
        4: [1, 1, 0],
        5: [0, 1, 1],
        6: [1, 0, 1],
        7: [1, 1, 1],
    }

    def post(self, request):
        data = json.loads(request.body.decode('utf-8'))
        print('PromptFormView:', data)

        # format input
        prompt_desc = data['prompt'].replace('\n', ' ')
        try:
            prompt_size = int(data['size'])
        except:
            prompt_size = 7

        # create list of terrain types
        prompt_terrains = ''
        for colour in self.colour_to_code.keys():
            if colour in data['terrains'].keys():
                prompt_terrains += f"- {self.colour_to_code[colour]}: {data['terrains'][colour]}"
            else:
                print(f'Colour {colour} does not have defined code')

        # i know this is hideous reebs im sorry
        prompt = f'''I have example input and output for the task of creating an N x N map of integers based on a room description. I will then provide the real input (the description). Your task is to create the real map (grid of integers) and return it in between the ``` delimiters. You may add more terrain types if needed - allowed terrain types are integers 0-7.

EXAMPLE INPUT: `A room with a river running through it. There are boulders that block the players on either side of the river. There is a bridge that allows passage over the river.`
The terrain types are:
- 0: Normal ground
- 1: River
- 2: Boulder
Map size: 4x4

EXAMPLE OUTPUT:
```
0 0 0 2
0 2 0 0
1 1 3 1
0 2 0 0
Terrain:
- 0: Normal ground
- 1: River
- 2: Boulder
- 3: Bridge
```

REAL INPUT: `{prompt_desc}`
{prompt_terrains}
Map size: {prompt_size}x{prompt_size}

REAL OUTPUT:
```
?
```
'''

        # prompt model
        print('Generating response...')
        response = client.models.generate_content(
            model="gemini-2.0-flash", contents=prompt
        )
        text = response.text
        # debug text
#         text = '''
# Okay, I understand the task. I need to create a 7x7 map based on the room description, using the provided terrain types and potentially adding more if necessary.

# Here's my attempt at creating the map:

# ```
# G G G X X X X
# G G G X X X X
# G G G G X X X
# G G G R G X X
# G G G G G G G
# G Y G G G G Y
# Y G G G G G Y
# Terrain:
# - G: Ground
# - R: Chest
# - X: Pit
# - Y: Pillar
# ```
# '''
        print('RESPONSE:\n', text)

        success = True
        parsed_grid = [[[1, 1, 1] for i in range(prompt_size)] for j in range(prompt_size)] # fill in grid of correct size
        parsed_terrains = {k: '' for k in self.colour_to_code.keys()}
        print("AAA:\n",  parsed_grid)

        try:
            # parse grid
            grid = re.search(r'```([^`]*)```', text).group(1).strip()
            grid = [col.strip().split() for col in grid.split('\n')]
            print('GRID:\n', grid)

            for x in range(len(parsed_grid)):
                for y in range(len(parsed_grid[x])):
                    print(grid[x][y])
                    # checks
                    if x >= len(grid) or y >= len(grid[x]):
                        print('a')
                        continue
                    if not(grid[x][y].isdigit()):
                        print('b')
                        continue
                    if int(grid[x][y]) not in self.code_to_array.keys(): 
                        print('c')
                        continue 
                    # update parsed grid with colour
                    print(f"> {x},{y}", self.code_to_array[int(grid[x][y])])
                    parsed_grid[x][y] = self.code_to_array[int(grid[x][y])]

                    print('PARSED GRID:\n', parsed_grid)

            # parse terrains
            terrains = re.search(r'(- [0-9]: [^\n]+\n)', text).group(1).strip()
            terrains = re.findall(r'- ([0-9]): (.+)', terrains)
            
            print('TERRAINS:\n', terrains)
            for (code, desc) in terrains:
                code_int = int(code)
                if code_int not in self.code_to_colour.keys():
                        continue
                parsed_terrains[self.code_to_colour[code_int]] = desc.strip()

            print('PARSED TERRAINS:\n', parsed_terrains)
        
        except Exception as e:
            print('PARSING ERROR:', Exception, e)
            success = False

        # send both grid and terrains back
        response = {
            'success': success, # signal to specify there was an error
            'grid': parsed_grid,
            'terrains': parsed_terrains,
        }

        return Response(response)
