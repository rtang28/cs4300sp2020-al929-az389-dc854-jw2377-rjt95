import os
import re
from app import app

class SmartSearch:
    def __init__(self):
        #TODO implement me
        pass

    def search(self, query):
        #TODO implement me
        return []

class BasicSearch:
    def search(self, query):
        results = [
            {
                'name': 'McDonalds',
                'score': 1
            },
            {
                'name': 'Five Guys',
                'score': 0
            }
        ]
        return results