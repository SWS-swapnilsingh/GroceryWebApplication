from .instances import cache
from .models import Product, Category



def all_products():
    '''Hello world'''
    @cache.cached(timeout=50, key_prefix="all_productsKP")
    def function1():
        p = Product.query.all()
        return p
    
    return function1()


def all_categories():
    '''Hello world'''
    @cache.cached(timeout=50, key_prefix="all_categoriesKP")
    def function2():
        c = Category.query.all()
        return c
    
    return function2()


@cache.memoize(50)
def all_products_of_perticular_category(c):
    p1 = c.all_product
    return p1




