#!/usr/bin/python

import os
import re
import sys
import requests

def fetch_user_id(username):
        """ Fetches the user_id of target user """
        url = 'https://www.instagram.com/{}/'

        try:
                request = requests.Session()
                response = request.get(url.format(username), 
                headers = { 
                        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:47.0) Gecko/20100101 Firefox/47.0' 
                })
                request.close()
                try:
                        userId = re.findall(r"user_id\":\"(.*?)\"", response.text)[0]
                except IndexError as indxError:
                        userId = 0
        except requests.ConnectionError as err:
                raise err

        return int(userId)

print(fetch_user_id(str(sys.argv[1])))