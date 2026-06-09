from urllib.parse import quote

from app import app
from db import db
from models import Product


def commons_file(filename: str) -> str:
    """Build a stable Wikimedia Commons direct file URL."""
    return f"https://commons.wikimedia.org/wiki/Special:FilePath/{quote(filename, safe='')}"


def seed():
    products_data = [
        {
            "name": "Wireless Mouse",
            "price": 19.99,
            "image": commons_file("Microsoft-wireless-mouse.jpg"),
        },
        {
            "name": "Mechanical Keyboard",
            "price": 79.99,
            "image": commons_file("Mechanical Keyboard.jpg"),
        },
        {
            "name": "USB-C Hub",
            "price": 34.99,
            "image": commons_file("USB-C Hubb 5 portar.jpg"),
        },
        {
            "name": "Noise-Canceling Headphones",
            "price": 129.99,
            "image": commons_file("Bose QuietComfort 25 Acoustic Noise Cancelling Headphones.jpg"),
        },
        {
            "name": '27" 4K Monitor',
            "price": 349.99,
            "image": commons_file("Monitor-Eizo-CG277-BK-27inches-01.jpg"),
        },
        {
            "name": "Portable Bluetooth Speaker",
            "price": 44.99,
            "image": commons_file("Beats By Dr. Dre Pill Portable Bluetooth Speaker Black N2.jpg"),
        },
        {
            "name": "Webcam 1080p",
            "price": 59.99,
            "image": commons_file("Webcam 01.jpg"),
        },
        {
            "name": "Laptop Stand",
            "price": 29.99,
            "image": commons_file("Laptop stand.jpg"),
        },
        {
            "name": "Standing Desk with Treadmill",
            "price": 899.99,
            "image": commons_file("Treadmill Desk (17219566739).jpg"),
        },
        {
            "name": "Ergonomic Office Chair",
            "price": 399.99,
            "image": commons_file("ErgoFlip Active Ergonomic Chair eye view.jpg"),
        },
        {
            "name": "Blue Light Blocking Glasses",
            "price": 39.99,
            "image": commons_file("Glasses&Chart.jpg"),
        },
        {
            "name": "Desk LED Lamp with Wireless Charger",
            "price": 49.99,
            "image": commons_file("Dekala Arches™ Smart Lamp.jpg"),
        },
        {
            "name": "Soundproof Wall Panels (Set of 4)",
            "price": 89.99,
            "image": commons_file("Studio soundproofing panel.jpg"),
        },
        {
            "name": "Smart Coffee Mug (Temperature Control)",
            "price": 74.99,
            "image": commons_file("Ember Smart Mug (24477264215).jpg"),
        },
    ]

    with app.app_context():
        db.drop_all()
        db.create_all()

        for p in products_data:
            product = Product(name=p["name"], price=p["price"], image=p["image"])
            db.session.add(product)

        db.session.commit()
        print("Database seeded with stable, matching product images from Wikimedia Commons!")


if __name__ == "__main__":
    seed()