class Config(object):
    DEBUG = False
    TESTING = False
    CACHE_TYPE = "RedisCache"
    #unit of cache default timeout is 'sec'
    CACHE_DEFAULT_TIMEOUT = 300


class DevelopmentConfig(Config):
    DEBUG = True
    # SQLALCHEMY_DATABASE_URI = 'sqlite:///dev.db'
    # SQLALCHEMY_DATABASE_URI= 'postgresql://myuserone:PElbOd2HhXTLXxUlitMBnHHiv2C78ICW@dpg-cq9sngqju9rs73ba2f3g-a.oregon-postgres.render.com/mydatabaseone'
    SQLALCHEMY_DATABASE_URI = 'postgresql://myuserone:PElbOd2HhXTLXxUlitMBnHHiv2C78ICW@dpg-cq9sngqju9rs73ba2f3g-a/mydatabaseone'
    SECRET_KEY = "thisissecret"       #whenenver you are using sessions you need to use this secret_key otherwise it will throw an error and flask login uses session so if you are using flask login then it is must to use secret key
    SECURITY_PASSWORD_SALT = "thisissalt"    #this is used to encrypt the password
    SQLALCHEMY_TRACK_MODIFICATIONS = False    #if this is true then it will track the modification
    WTF_CSRF_ENABLED = False
    SECURITY_TOKEN_AUTHENTICATION_HEADER = 'Authentication-Token'


    # CACHE_REDIS_HOST = "oregon-redis.render.com"
    # CACHE_REDIS_PORT = 6379
    # #index of db is 3
    # CACHE_REDIS_DB = 0
    # CACHE_REDIS_PASSWORD = "tJtilMCBDMxhZsrMkeYsAchXhmsq0dFb"  # Add this line
    # CACHE_REDIS_URL = "rediss://red-cqa4hnlds78s739m96ag:tJtilMCBDMxhZsrMkeYsAchXhmsq0dFb@oregon-redis.render.com:6379/0"

    #deployemnt config
    CACHE_REDIS_HOST = "red-cqa4hnlds78s739m96ag"
    CACHE_REDIS_PORT = 6379
    CACHE_REDIS_DB = 0
