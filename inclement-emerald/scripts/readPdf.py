from os import path, getcwd
from pprint import pprint
from uuid import uuid4
import json
import re
import requests

FILE_PATH = path.join(getcwd(), 'docs', 'trainers.txt')
OUTPUT_PATH = path.join(getcwd(), 'trainers.json')
ROUTE_DELIMITER = '===================='
TRAINER_DELIMITER = '-----'
SKIP_LINES = [
    '',
	'-After Cut-',
	'-After Surf-',
	'-Verdanturf Side-',
	'PKMN Trainer Brendan/May',
	'Aqua Admin Matt',
	'Leader Roxanne',
	'Leader Brawly',
	'Leader Wattson',
	'Leader Flannery',
	'Leader Norman',
	'Leader Winona',
	'Leaders Tate & Liza',
	'Leader Juan',
	'Aqua Admin Shelly',
	'Magma Admin Courtney',
	'Magma Admin Tabitha',
	'Magma Leader Maxie',
	'Aqua Leader Archie',
	'-After Maxie-',
	'-After Weather Institute-',
	'-After Fortree Gym-',
	'-After Dive-',
	'-After Waterfall-',
]

def get_name(line: str) -> str:
    x = re.search('^\w+(\sAlolan)*', line)

    if x != None:
        return x.group().strip()
    
    return ''

def get_level(line: str) -> str:
    x = re.search('lvl\s-*\d', line)

    if x != None:
        return x.group().split(' ')[1].strip()
    
    return ''

def get_item(line: str) -> str:
    x = re.search('\(I\)\s\w+(\s\w+)*', line)

    if x != None:
        return x.group().strip('(I) ')
    
    return ''

def get_ability(line: str) -> str:
    x = re.search('\(A\)\s\w+(\s\w+)*', line)

    if x != None:
        return x.group().strip('(A) ')
    
    return ''

def get_nature(line: str) -> str:
    x = re.search('\(N\)\s\w+', line)

    if x != None:
        return x.group().strip('(N) ')
    
    return ''

def get_moves(line: str) -> str:
    # NAME lvl A I N // move, move, move, move
    return line.split(' // ')[1].split(', ') if line.split(' // ') else []

def main():
    f = open(FILE_PATH, 'r')
    file_contents = str(f.read())
    trainers = []

    # Divide the contents up by each section
    # Each section represents a different route / location that the trainer is found at
    # This will create a pattern of [route_name, trainers, route_name, trainers]
    sections = file_contents.split(ROUTE_DELIMITER)[1:]

    location_index = 0
    trainers_index = 1

    # Loop through each pair of route_name/trainers
    while location_index < len(sections) - 1:

        # Grab location info
        location = sections[location_index].strip()

        # Grab trainers section
        trainers_raw = sections[trainers_index].split(TRAINER_DELIMITER)
        trainers_raw = [x.strip() for x in trainers_raw]

        # Loop through each trainer
        for trainer in trainers_raw:
            lines = trainer.split('\n')
            
            trainer_name = lines[0].strip()
            trainer_notes = ''

            # If trainer name has a note, add it to the trainer information
            if '(' in trainer_name:
                trainer_notes = trainer_name.split('(')[1].strip(')')
                trainer_name = trainer_name.split('(')[0]

            # If trainer is empty, boss, or meta info then we skip
            if trainer_name in SKIP_LINES:
                continue
            else:
                pokemon_lines = lines[1:]
                pokemon = []

                for line in pokemon_lines:

                    # If line does not start with '-', ignore it
                    if line.startswith('-'):
                        line = line.strip('-')

                        # Parse the string for pokemon information
                        name = get_name(line)
                        ability = get_ability(line)
                        nature = get_nature(line)
                        level = get_level(line)
                        moves = get_moves(line)
                        item = get_item(line)

                        pokemon.append({
                            'id': str(uuid4()),
                            'name': name,
                            'ability': ability,
                            'nature': nature,
                            'level': level,
                            'moves': moves,
                            'item': item,
                            'evs': {
                                'hp': 0,
                                'atk': 0,
                                'def': 0,
                                'spa': 0,
                                'spd': 0,
                                'spe': 0
                            }
                        })

                trainers.append({
                    'id': str(uuid4()),
                    'location': location,
                    'notes': trainer_notes,
                    'name': trainer_name,
                    'pokemon': pokemon,
                })

        # Increment indices at the end of each loop
        location_index += 2
        trainers_index += 2

    f.close()

    json_object = json.dumps({ 'trainers': trainers })

    f = open(OUTPUT_PATH, 'w')

    f.write(json_object)

    f.close()

    

main()

    



