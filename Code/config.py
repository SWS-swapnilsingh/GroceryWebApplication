class Config(object):
    DEBUG = False
    TESTING = False
    CACHE_TYPE = "RedisCache"
    #unit of cache default timeout is 'sec'
    CACHE_DEFAULT_TIMEOUT = 300


class DevelopmentConfig(Config):
    DEBUG = True
    SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    SECRET_KEY = "thisissecret"       #whenenver you are using sessions you need to use this secret_key otherwise it will throw an error and flask login uses session so if you are using flask login then it is must to use secret key
    SECURITY_PASSWORD_SALT = "thisissalt"    #this is used to encrypt the password
    SQLALCHEMY_TRACK_MODIFICATIONS = False    #if this is true then it will track the modification
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'


    CACHE_REDIS_HOST = "localhost"
    CACHE_REDIS_PORT = 6379
    #index of db is 3
    CACHE_REDIS_DB = 3
