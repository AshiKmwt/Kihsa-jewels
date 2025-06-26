from flask import Flask, jsonify, request
from flask_cors import CORS
import json
import os

app = Flask(__name__)
CORS(app)

# Load product data from JSON file
def load_products():
    if os.path.exists('api/data/products.json'):
        with open('api/data/products.json', 'r') as f:
            return json.load(f)
    return []

# Save product data to JSON file
def save_products(products):
    os.makedirs('api/data', exist_ok=True)
    with open('api/data/products.json', 'w') as f:
        json.dump(products, f, indent=2)

# Initialize with sample data if file doesn't exist
if not os.path.exists('api/data/products.json'):
    sample_products = [
        {"id": "1", "name": "Diamond Eternity Ring", "category": "Rings", "price": 1299.99, "stock": 10, "image": "/images/rings/50E4SRFBC2137_1.webp"},
        {"id": "2", "name": "Pearl Pendant Necklace", "category": "Necklaces", "price": 899.99, "stock": 15, "image": "/images/necklace/50O4SS2AYDBA32_1.webp"},
        {"id": "3", "name": "Gold Bangle Set", "category": "Bangles", "price": 1499.99, "stock": 8, "image": "/images/bangles/512216VJR1B00_1.webp"},
        {"id": "4", "name": "Sapphire Drop Earrings", "category": "Earrings", "price": 1099.99, "stock": 12, "image": "/images/earings/510730VZA2B00_1.jpg"},
        {"id": "5", "name": "Emerald Tennis Bracelet", "category": "Bracelets", "price": 2499.99, "stock": 5, "image": "/images/bangles/511251VXB1A00.webp"},
        {"id": "6", "name": "Ruby Stud Earrings", "category": "Earrings", "price": 799.99, "stock": 20, "image": "/images/earings/513220VJP2A00_1.webp"},
        {"id": "7", "name": "Platinum Wedding Band", "category": "Rings", "price": 1899.99, "stock": 7, "image": "/images/rings/50E4SRFANA737_1.webp"},
        {"id": "8", "name": "Diamond Choker Necklace", "category": "Necklaces", "price": 3299.99, "stock": 3, "image": "/images/necklace/50O4SS2ATDBA32_1.webp"},
        {"id": "9", "name": "Vintage Inspired Ring", "category": "Rings", "price": 1599.99, "stock": 9, "image": "/images/rings/510122FAAAA00.webp"},
        {"id": "10", "name": "Gold Chain Necklace", "category": "Necklaces", "price": 1199.99, "stock": 14, "image": "/images/necklace/51O4DP2AI1BA00_1.webp"},
        {"id": "11", "name": "Silver Bangle with Diamonds", "category": "Bangles", "price": 999.99, "stock": 11, "image": "/images/bangles/513220VJP2A00_1.webp"},
        {"id": "12", "name": "Pearl Stud Earrings", "category": "Earrings", "price": 499.99, "stock": 25, "image": "/images/earings/510228VEA2B00_1.webp"},
        {"id": "13", "name": "Crystal Drop Necklace", "category": "Necklaces", "price": 1599.99, "stock": 8, "image": "/images/necklace/51O4MR2AF1BA00_1.webp"},
    ]
    save_products(sample_products)

# API Routes
@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category')
    products = load_products()
    
    if category and category != 'all':
        products = [p for p in products if p['category'].lower() == category.lower()]
    
    return jsonify(products)

@app.route('/api/products/<product_id>', methods=['GET'])
def get_product(product_id):
    products = load_products()
    product = next((p for p in products if p['id'] == product_id), None)
    
    if product:
        return jsonify(product)
    return jsonify({"error": "Product not found"}), 404

@app.route('/api/categories', methods=['GET'])
def get_categories():
    products = load_products()
    categories = list(set(p['category'] for p in products))
    
    category_data = [
        {
            "name": category,
            "slug": category.lower(),
            "count": len([p for p in products if p['category'] == category])
        }
        for category in categories
    ]
    
    return jsonify(category_data)

@app.route('/api/cart', methods=['POST'])
def add_to_cart():
    data = request.json
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    # In a real application, you would store this in a database
    # For this example, we'll just return a success message
    return jsonify({
        "success": True,
        "message": f"Added product {product_id} to cart (quantity: {quantity})"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 