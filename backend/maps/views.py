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
        detail = [ {"name": detail.name,"detail": detail.detail} 
        for detail in React.objects.all()]
        return Response(detail)

    def post(self, request):

        serializer = ReactSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return  Response(serializer.data)

class PromptFormView(APIView):

    colour_to_code = {
        'red': 'R',
        'green': 'G',
        'blue': 'B',
        'yellow': 'Y',
        'cyan': 'C',
        'magenta': 'M',
        'white': 'W',
        'colourless': 'X',
    }

    code_to_colour = {v: k for k, v in colour_to_code.items()}

    code_to_array = {
        'R': [1, 0, 0],
        'G': [0, 1, 0],
        'B': [0, 0, 1],
        'Y': [1, 1, 0],
        'C': [0, 1, 1],
        'M': [1, 0, 1],
        'W': [1, 1, 1],
        'X': [0, 0, 0],
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
        prompt = f'''I have example input and output for the task of creating an N x N map of integers based on a room description. I will then provide the real input (the description). Your task is to create the real map (grid of integers) and return it in between the ``` delimiters. You may add more terrain types if needed - terrain types may be R, G, B, Y, C, M, W, X.

EXAMPLE INPUT: `A room with a river running through it. There are boulders that block the players on either side of the river. There is a bridge that allows passage over the river.`
The terrain types are:
- G: Normal ground
- B: River
- M: Boulder
Map size: 4x4

EXAMPLE OUTPUT:
```
G G G M
G M G G
B B W B
G M G G
Terrain:
- G: Normal ground
- B: River
- M: Boulder
- W: Bridge
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
        # response = client.models.generate_content(
        #     model="gemini-2.0-flash", contents=prompt
        # )
        # text = response.text
        text = '''
Okay, I understand the task. I need to create a 7x7 map based on the room description, using the provided terrain types and potentially adding more if necessary.

Here's my attempt at creating the map:

```
G G G X X X X
G G G X X X X
G G G G X X X
G G G R G X X
G G G G G G G
G Y G G G G Y
Y G G G G G Y
Terrain:
- G: Ground
- R: Chest
- X: Pit
- Y: Pillar
```
'''
        print(text)

        # parse response
        try:
            grid = re.search(r'```([^`]*)Terrain:', text).group().strip()
            terrains = re.search(r'Terrain:([^`]*)```', text).group().strip()

            grid = [col.split() for col in grid.split('\n')]

            print(grid)
            print(terrains)

            for x in range(len(grid)):
                for y in range(len(grid[0])):
                    grid[x][y] = self.code_to_array(grid[x][y])

            print(grid)

            response = grid
        except:
            print(':(((((')


        return Response(response)
