export const products = [
  {
    id: 1,
    title: "Apple AirPods Pro (2nd Generation)",
    category: "Electronics",
    price: 249.99,
    images: [
      "https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/airpods-pro-2-hero-select-202409_FV1_FMT_WHH?wid=752&hei=636",
    ],
    description: "Experience premium sound with Apple AirPods Pro (2nd Gen), featuring advanced active noise cancellation and immersive spatial audio. Sweat and water-resistant design.",
    features: [
      "Active Noise Cancellation",
      "Personalized Spatial Audio",
      "MagSafe Charging Case",
      "IPX4 Sweat and Water Resistant"
    ],
    specifications: {
      brand: "Apple",
      batteryLife: "6 hours (30 with case)",
      connectivity: "Bluetooth 5.3",
      charging: "Lightning / MagSafe / Qi",
    },
    reviews: [
      { user: "Amina", rating: 5, comment: "Noise canceling is superb!" }
    ],
    stock: 35,
    rating: 4.8,
    numReviews: 240,
    store_name: "متجر خالد للأحذية",
  },
  {
    id: 2,
    title: "Sony WH-1000XM5 Wireless Headphones",
    category: "Electronics",
    price: 398.00,
    images: [
      "https://www.sony.com.sg/image/6145c1d32e6ac8e63a46c912dc33c5bb?fmt=pjpeg&wid=330"
    ],
    description: "Industry-leading noise canceling with up to 30 hours of battery life.",
    features: [
      "Auto NC Optimizer",
      "Speak-to-Chat",
      "30 Hours Battery",
      "Touch Controls"
    ],
    specifications: {
      brand: "Sony",
      wireless: true,
      microphone: "Built-in",
      weight: "250g"
    },
    reviews: [
      { user: "Liam", rating: 5, comment: "Top-tier ANC, very comfy." }
    ],
    stock: 22,
    rating: 4.7,
    numReviews: 300,
    store_name: "متجر خالد للأحذية",
  },
  {
    id: 3,
    title: "Samsung Galaxy Watch 6",
    category: "Wearables",
    price: 329.99,
    images: ["https://m.media-amazon.com/images/I/61GT3v2ztOL.jpg"],
    description: "Advanced health tracking and fitness features in a stylish smartwatch.",
    features: [
      "Heart Rate & Sleep Tracking",
      "GPS",
      "Custom Watch Faces"
    ],
    specifications: {
      brand: "Samsung",
      waterproof: "Yes (5ATM)",
      batteryLife: "Up to 40 hours",
    },
    reviews: [
      { user: "Zara", rating: 4, comment: "Tracks well, design is great." }
    ],
    stock: 15,
    rating: 4.6,
    numReviews: 110,
    store_name: "سماعة بلس"
  },
  {
    id: 4,
    title: "Logitech MX Master 3S Mouse",
    category: "Accessories",
    price: 99.99,
    images: ["https://www.robinsons.com.sg/cdn/shop/files/155631972_614x614.png?v=1732534673"],
    description: "Ergonomic wireless mouse with customizable buttons.",
    features: [
      "MagSpeed Electromagnetic Scrolling",
      "8000 DPI Sensor",
      "Quiet Clicks"
    ],
    specifications: {
      brand: "Logitech",
      wireless: true,
      compatibility: "Windows / macOS / Linux"
    },
    reviews: [
      { user: "Omar", rating: 5, comment: "Perfect for productivity." }
    ],
    stock: 42,
    rating: 4.9,
    numReviews: 190,
    store_name: "سوق الإلكترونيات الذكية",
  },
  {
    id: 5,
    title: "Bose SoundLink Flex Bluetooth Speaker",
    category: "Audio",
    price: 149.00,
    images: ["https://assets.bosecreative.com/transform/e0fd7e0a-2fb5-450b-a633-48bc70bce311/..."],
    description: "Portable waterproof speaker with great sound and deep bass.",
    features: [
      "IP67 Waterproof",
      "PositionIQ Technology",
      "12 Hours Playtime"
    ],
    specifications: {
      brand: "Bose",
      bluetoothRange: "30ft",
      charging: "USB-C"
    },
    reviews: [
      { user: "Nour", rating: 5, comment: "Rugged and clear sound." }
    ],
    stock: 18,
    rating: 4.7,
    numReviews: 105,
    store_name: "سوق الإلكترونيات الذكية",
  },
  {
    id: 6,
    title: "Razer BlackWidow V4 Keyboard",
    category: "Gaming",
    price: 169.99,
    images: ["https://assets2.razerzone.com/images/pnx.assets/7af66af528440bff2615617bba2d9af7/razer-blackwidow-v4-75-og-image-1200x630.webp"],
    description: "RGB mechanical keyboard with tactile switches and macro support.",
    features: [
      "Green Clicky Switches",
      "RGB Lighting",
      "Dedicated Media Roller"
    ],
    specifications: {
      brand: "Razer",
      connection: "Wired (USB-C)",
      programmableKeys: true
    },
    reviews: [
      { user: "Yusuf", rating: 4, comment: "Solid build, great for gaming." }
    ],
    stock: 10,
    rating: 4.5,
    numReviews: 89,
    store_name: "تكنو تايم"
  },
  {
    id: 7,
    title: "Kindle Paperwhite (11th Generation)",
    category: "E-Readers",
    price: 139.99,
    images: ["https://static1.xdaimages.com/wordpress/wp-content/uploads/2023/01/kindle-paperwhite-11th-gen-10-1.jpg"],
    description: "E-ink display with adjustable warm light and waterproof design.",
    features: [
      "300 ppi Display",
      "6.8-inch Screen",
      "Weeks of Battery"
    ],
    specifications: {
      brand: "Amazon",
      waterproof: "IPX8",
      storage: "8GB"
    },
    reviews: [
      { user: "Dana", rating: 5, comment: "Best for reading in bed." }
    ],
    stock: 30,
    rating: 4.8,
    numReviews: 320,
    store_name: "تكنو تايم",
  },
  {
    id: 8,
    title: "Fitbit Charge 5 Advanced Tracker",
    category: "Wearables",
    price: 129.95,
    images: ["https://down-sg.img.susercontent.com/file/1cc1ff7d9658605e8f98f8b5748f9f46"],
    description: "Health and fitness tracker with ECG, GPS, and stress management tools.",
    features: [
      "Built-in GPS",
      "Heart Rate Monitor",
      "Sleep Tracking"
    ],
    specifications: {
      brand: "Fitbit",
      batteryLife: "Up to 7 days",
      waterproof: "Yes (up to 50m)"
    },
    reviews: [
      { user: "Ali", rating: 4, comment: "Great for workouts and health." }
    ],
    stock: 28,
    rating: 4.6,
    numReviews: 154,
    store_name: "تكنو تايم",
  },
  {
    id: 9,
    title: "Instant Pot Duo 7-in-1",
    category: "Kitchen Appliances",
    price: 89.99,
    images: ["https://instantpot.com.sg/wp-content/uploads/2022/01/Duo-5.webp"],
    description: "7-in-1 multifunctional cooker with customizable programs.",
    features: [
      "Pressure Cooker",
      "Slow Cooker",
      "Rice & Yogurt Maker"
    ],
    specifications: {
      brand: "Instant Pot",
      capacity: "6 Quart",
      power: "1000W"
    },
    reviews: [
      { user: "Fatima", rating: 5, comment: "Game changer for cooking!" }
    ],
    stock: 13,
    rating: 4.9,
    numReviews: 98,
    store_name: "تكنو تايم",
  },
  {
    id: 10,
    title: "ASUS TUF Gaming GeForce RTX 4060",
    category: "PC Components",
    price: 299.99,
    images: ["https://m.media-amazon.com/images/I/51gf1d+FNfL.jpg"],
    description: "Reliable and efficient GPU for smooth gaming and creation.",
    features: [
      "8GB GDDR6",
      "Ray Tracing Support",
      "Dual Ball Fan Bearings"
    ],
    specifications: {
      brand: "ASUS",
      memory: "8GB",
      interface: "PCIe 4.0"
    },
    reviews: [
      { user: "Mohamed", rating: 4, comment: "Great performance for 1080p/1440p." }
    ],
    stock: 8,
    rating: 4.5,
    numReviews: 120,
    store_name: "تكنو تايم",
  }
];
