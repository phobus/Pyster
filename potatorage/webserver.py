#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""

"""
from lib.bottle import Bottle, static_file, request

from potatorage import setup
from potatorage.setup import app
from potatorage.indexer.themoviedb import TheMovieDb
from potatorage import database

if not app:
    app = Bottle()
    
def run():
    app.run(host=setup.HOST, port=setup.PORT)

# indexer_series = TheTvDb()
indexer = TheMovieDb()
s = database.Schema()
s.insert('indexer', indexer.info());

@app.get('/')
def _index():
    return static_file(setup.INDEX, root=setup.STATIC_DIR)
    
@app.get('/st/<filename:path>')
def _send_static(filename):
    return static_file(filename, root=setup.STATIC_DIR)

# config
@app.get('/api/config')
def _get_config():
    return indexer.info()
# indexer

@app.get('/api/idx/movie')
def _idx_search_movies():
    # try:
    query = request.query.query
    # except Exception, error:
    return indexer.search_movies(query)

@app.get('/api/idx/movie/<id>')
def _idx_get_movie(id):
    # try:
    # except Exception, error:
    return indexer.get_movie(id)

@app.get('/api/idx/tv')
def _idx_search_tv():
    # try:
    query = request.query.query
    # except Exception, error:
    return indexer.search_tv(query)

@app.get('/api/idx/tv/<id>')
def _idx_get_tv(id):
    # try:
    # except Exception, error:
    return indexer.get_tv(id)

"""class MyWSGIRefServer(ServerAdapter):
    # server = None

    def run(self, handler):
        from wsgiref.simple_server import make_server, WSGIRequestHandler
        if self.quiet:
            class QuietHandler(WSGIRequestHandler):
                def log_request(*args, **kw): pass
            self.options['handler_class'] = QuietHandler
        self.server = make_server(self.host, self.port, handler, **self.options)
        self.server.serve_forever()

    def stop(self):
        # self.server.server_close() <--- alternative but causes bad fd exception
        self.server.shutdown()"""
