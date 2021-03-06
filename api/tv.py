#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
"""

import os, sys, logging, json

log = logging.getLogger()

from bottle import route, get, put, post, delete, request, response, abort
import api

from controllers import tvAPIController

prefix = api.prefix + '/tv'  # + TODO: FILL THIS IN

# Collection URI - List
@get(prefix)
def list(media):
    return tvAPIController.query_media(media, request.query.query, request.query.page)
    
# Element URI - Retrieve element
@get(prefix + '/<id>')
def element(media, id):
    return tvAPIController.get_media(media, id)