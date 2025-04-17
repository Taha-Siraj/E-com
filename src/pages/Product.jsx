import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { MoonLoader } from "react-spinners"


const Product = () => {

  const products = [
    {
      "id": "prod-001",
      "title": "Nike Air Max 270",
      "description": "Comfortable and stylish sneakers with Air Max cushioning.",
      "price": 149.99,
      "discount": 10,
      "finalPrice": 134.99,
      "brand": "Nike",
      "category": "Shoes",
      "sizes": ["7", "8", "9", "10"],
      "colors": ["Black", "White"],
      "images": [
        "https://www.jd-sports.com.au/images/products/009289_jdsportsau.jpg"
      ],
      "rating": { "average": 4.5, "reviewsCount": 320 },
      "stockQuantity": 25,
      "inStock": true
    },
    {
      "id": "prod-002",
      "title": "Samsung Galaxy S23 Ultra",
      "description": "Flagship smartphone with a 200MP camera and powerful performance.",
      "price": 1399.99,
      "discount": 8,
      "finalPrice": 1287.99,
      "brand": "Samsung",
      "category": "Mobiles",
      "sizes": [],
      "colors": ["Phantom Black", "Green"],
      "images": [
        "https://fdn2.gsmarena.com/vv/pics/samsung/samsung-galaxy-s23-ultra-1.jpg"
      ],
      "rating": { "average": 4.7, "reviewsCount": 1500 },
      "stockQuantity": 30,
      "inStock": true
    },
    {
      "id": "prod-003",
      "title": "Sony WH-1000XM5",
      "description": "Industry-leading noise canceling wireless headphones.",
      "price": 399.99,
      "discount": 15,
      "finalPrice": 339.99,
      "brand": "Sony",
      "category": "Accessories",
      "sizes": [],
      "colors": ["Black", "Silver"],
      "images": [
        "https://m.media-amazon.com/images/I/71o8Q5XJS5L._AC_SL1500_.jpg"
      ],
      "rating": { "average": 4.6, "reviewsCount": 250 },
      "stockQuantity": 18,
      "inStock": true
    },
    {
      "id": "prod-004",
      "title": "Adidas Ultraboost 22",
      "description": "High-performance running shoes for comfort and support.",
      "price": 180,
      "discount": 12,
      "finalPrice": 158.40,
      "brand": "Adidas",
      "category": "Shoes",
      "sizes": ["6", "7", "8", "9", "10"],
      "colors": ["Black", "Grey", "Turbo"],
      "images": [
        "https://www.adidas.co.za/images/products/GX6640.jpg"
      ],
      "rating": { "average": 4.4, "reviewsCount": 100 },
      "stockQuantity": 20,
      "inStock": true
    },
    {
      "id": "prod-005",
      "title": "HP Envy x360",
      "description": "2-in-1 laptop with AMD Ryzen 7 and touchscreen display.",
      "price": 899.99,
      "discount": 10,
      "finalPrice": 809.99,
      "brand": "HP",
      "category": "Electronics",
      "sizes": [],
      "colors": ["Silver"],
      "images": [
        "https://www.hp.com/content/dam/sites/worldwide/laptops/envy-x360-15-2021.jpg"
      ],
      "rating": { "average": 4.3, "reviewsCount": 190 },
      "stockQuantity": 12,
      "inStock": true
    },
    {
      "id": "prod-006",
      "title": "Canon EOS R50 Mirrorless Camera",
      "description": "Compact, beginner-friendly camera with great image quality.",
      "price": 799.99,
      "discount": 7,
      "finalPrice": 743.99,
      "brand": "Canon",
      "category": "Cameras",
      "sizes": [],
      "colors": ["Black", "White"],
      "images": [
        "https://www.bhphotovideo.com/images/images2500x2500/canon_eos_r50_mirrorless_camera_1675278209_1750099.jpg"
      ],
      "rating": { "average": 4.5, "reviewsCount": 85 },
      "stockQuantity": 10,
      "inStock": true
    },
    {
      "id": "prod-007",
      "title": "Levi's 511 Slim Fit Jeans",
      "description": "Classic slim fit jeans made with stretch denim for comfort.",
      "price": 69.99,
      "discount": 20,
      "finalPrice": 55.99,
      "brand": "Levi's",
      "category": "Clothing",
      "sizes": ["30", "32", "34", "36"],
      "colors": ["Dark Blue", "Black"],
      "images": [
        "https://lsco.scene7.com/is/image/lsco/045114102-front-pdp"
      ],
      "rating": { "average": 4.4, "reviewsCount": 220 },
      "stockQuantity": 40,
      "inStock": true
    },
    {
      "id": "prod-008",
      "title": "Apple Watch Series 9",
      "description": "Advanced smartwatch with health features and new S9 chip.",
      "price": 399.99,
      "discount": 5,
      "finalPrice": 379.99,
      "brand": "Apple",
      "category": "Accessories",
      "sizes": ["41mm", "45mm"],
      "colors": ["Midnight", "Starlight"],
      "images": [
        "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-alum-midnight"
      ],
      "rating": { "average": 4.8, "reviewsCount": 310 },
      "stockQuantity": 22,
      "inStock": true
    },
  ]
  
  return(
    <>
   <div>
   </div>
  

    </>
  )
}

export default Product
