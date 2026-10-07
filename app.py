from flask import Flask, render_template, jsonify, request

app = Flask(__name__, template_folder='.')

# Mock Database / Product Store
PRODUCTS = [
    # Women Eastern Wear
    {
        "id": 1,
        "title": "Embroidered Velvet 3-Piece Suit",
        "category": "women",
        "sub_category": "velvet",
        "price": 12990,
        "old_price": 15000,
        "image": "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80",
        "badge": "New"
    },
    {
        "id": 2,
        "title": "Winter Khaddar 2-Piece RTW",
        "category": "women",
        "sub_category": "winter",
        "price": 6990,
        "old_price": 8500,
        "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=600&q=80",
        "badge": "Sale"
    },
    {
        "id": 3,
        "title": "Chiffon Festive Lawn Unstitched",
        "category": "women",
        "sub_category": "unstitched",
        "price": 9990,
        "old_price": 11500,
        "image": "https://images.unsplash.com/photo-1583391733975-f831969e6b6f?auto=format&fit=crop&w=600&q=80",
        "badge": "Featured"
    },
    
    # Men's Wear
    {
        "id": 4,
        "title": "Men Cotton Kurta Shalwar",
        "category": "men",
        "sub_category": "kurta",
        "price": 4990,
        "old_price": 6000,
        "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=600&q=80",
        "badge": "Hot"
    },
    {
        "id": 5,
        "title": "Men Embroidered Waistcoat",
        "category": "men",
        "sub_category": "waistcoat",
        "price": 5990,
        "old_price": 7500,
        "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        "badge": "Popular"
    },

    # Accessories & Watches
    {
        "id": 6,
        "title": "Classic Chronograph Watch",
        "category": "accessories",
        "sub_category": "watches",
        "price": 8500,
        "old_price": 10500,
        "image": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
        "badge": "Trending"
    },
    {
        "id": 7,
        "title": "Luxury Handcrafted Handbag",
        "category": "accessories",
        "sub_category": "bags",
        "price": 6500,
        "old_price": 8000,
        "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80",
        "badge": "Exclusive"
    },

    # Footwear
    {
        "id": 8,
        "title": "Traditional Leather Khussa",
        "category": "footwear",
        "sub_category": "khussa",
        "price": 3490,
        "old_price": 4500,
        "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80",
        "badge": "Best Seller"
    }
]

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/api/products', methods=['GET'])
def get_products():
    category = request.args.get('category', 'all').lower()
    
    if category == 'all' or not category:
        return jsonify({"status": "success", "data": PRODUCTS})
    
    filtered_products = [p for p in PRODUCTS if p.get('category') == category]
    return jsonify({"status": "success", "data": filtered_products})

if __name__ == '__main__':
    app.run(debug=True, port=5000)