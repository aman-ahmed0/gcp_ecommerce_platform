from fastapi import APIRouter
from ..database import db
from ..models import Product

router = APIRouter()

@router.get("/products", response_model=list[Product])
async def get_products():
    products = []
    async for doc in db.products.find():
        doc["id"] = str(doc.pop("_id"))
        products.append(doc)
    return products

@router.post("/products", response_model=Product)
async def create_product(product: Product):
    doc = product.model_dump(exclude={"id"})
    result = await db.products.insert_one(doc)
    product.id = str(result.inserted_id)
    return product

@router.post("/seed")
async def seed_products():
    samples = [
        {"name": "Wireless Headphones", "price": 59.99, "description": "Noise cancelling, 20h battery", "image_url": "https://picsum.photos/seed/headphones/200/150"},
        {"name": "Smart Watch", "price": 129.99, "description": "Fitness tracking, waterproof", "image_url": "https://picsum.photos/seed/watch/200/150"},
        {"name": "Mechanical Keyboard", "price": 89.99, "description": "RGB backlit, tactile switches", "image_url": "https://picsum.photos/seed/keyboard/200/150"},
        {"name": "USB-C Hub", "price": 34.99, "description": "7-in-1 adapter, 4K HDMI", "image_url": "https://picsum.photos/seed/hub/200/150"},
    ]
    await db.products.insert_many(samples)
    return {"message": "4 sample products added"}