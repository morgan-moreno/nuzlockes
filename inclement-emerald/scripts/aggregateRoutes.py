from typing import List
from uuid import uuid4

from os import path, listdir, getcwd
from pprint import pprint

import json

ROUTES_PATH = path.join(getcwd(), 'routes')
DESTINATION_PATH = path.join(getcwd(), 'trainers.json')
BOSSES = []
TRAINERS = []

def sanitize_moves(moves):
    sanitized_moves = []

    for move in moves:
        if move == 'U-Turn':
            move = 'U-turn'
        elif move == 'NightShade':
            move = 'Night Shade'
        elif move == 'Double Edge':
            move = 'Double-Edge'
        elif move == 'Soft Boiled':
            move = 'Soft-Boiled'
        elif move == 'Self Destruct':
            move = 'Self-Destruct'

        sanitized_moves.append(move)

    return sanitized_moves

def sanitize_pokemon(pokemon):
    sanitized_pokemon = []

    for p in pokemon:
        evs = {
            'hp': 0,
            'atk': 0,
            'def': 0,
            'spa': 0,
            'spd': 0,
            'spe': 0
        }
        
        if 'evs' in p:
            evs = p['evs']

        sanitized_pokemon.append({
            'id': str(uuid4()),
            'name': p['name'],
            'item': p['item'],
            'level': p['level'],
            'nature': p['nature'],
            'evs': evs,
            'ability': p['ability'],
            'moves': sanitize_moves(p['moves'])
        })

    return sanitized_pokemon

def main():
    files = listdir(ROUTES_PATH)

    for file in files:
        FILE_PATH = path.join(ROUTES_PATH, file)
        location = file.replace('.json', '')
                
        f = open(FILE_PATH)

        data = json.load(f)

        has_trainers = len(data['trainers']) > 0
        has_bosses = len(data['bosses']) > 0

        if(has_trainers):
            trainers = data['trainers']

            for trainer in trainers:
                print('Adding Trainer: ')
                pprint(trainer)

                TRAINERS.append({
                    'id': str(uuid4()),
                    'name': trainer['name'],
                    'location': location,
                    'pokemon': sanitize_pokemon(trainer['pokemon'])
                })

        if(has_bosses):
            bosses = data['bosses']

            for boss in bosses:
                print('Adding boss: ')
                pprint(boss)

                BOSSES.append({
                    'id': str(uuid4()),
                    'name': boss['name'],
                    'location': location,
                    'pokemon': sanitize_pokemon(boss['pokemon'])
                })


    json_object = json.dumps({
        'trainers': TRAINERS,
        'bosses': BOSSES
    })

    with open(DESTINATION_PATH, 'w') as output:
        output.write(json_object)

main()
