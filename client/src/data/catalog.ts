// Arceus Gear Offline & Cloud Fallback Hardware Catalog
// 100 Authentic Products across 6 Categories
import { Category, Product } from '../types';

export const INITIAL_CATEGORIES: Category[] = [
  {
    "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "name": "Gaming Laptops",
    "slug": "gaming-laptops",
    "description": "Ultra-high performance portable battlestations with high refresh rates and NVIDIA RTX GPUs.",
    "image": "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=800&q=80",
    "_count": {
      "products": 20
    }
  },
  {
    "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "name": "GPUs & Desktops",
    "slug": "gpus-and-desktops",
    "description": "Graphics cards, custom liquid-cooled towers, and barebone workstations.",
    "image": "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80",
    "_count": {
      "products": 20
    }
  },
  {
    "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "name": "Esports Displays",
    "slug": "esports-displays",
    "description": "Ultrawide OLED, Mini-LED, and 360Hz-540Hz competitive esports panels.",
    "image": "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80",
    "_count": {
      "products": 15
    }
  },
  {
    "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "name": "Mechanical Keyboards",
    "slug": "mechanical-keyboards",
    "description": "Hall effect magnetic switches, custom gasket-mounted boards, and low-latency wireless.",
    "image": "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    "_count": {
      "products": 15
    }
  },
  {
    "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "name": "Pro Gaming Audio",
    "slug": "pro-gaming-audio",
    "description": "Audiophile planar magnetic drivers, spatial sound tracking, and broadcast microphones.",
    "image": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    "_count": {
      "products": 15
    }
  },
  {
    "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "name": "Consoles & Handhelds",
    "slug": "consoles-and-handhelds",
    "description": "Next-gen consoles, OLED handhelds, and mobile PC gaming devices.",
    "image": "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80",
    "_count": {
      "products": 15
    }
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    "id": "rare-rog-zephyrus-g14-2026",
    "title": "ASUS ROG Zephyrus G14 (2026 Rare Launch)",
    "slug": "asus-rog-zephyrus-g14-2026-rare",
    "description": "2026 Ultra-rare launch edition. Performance meets precision with AMD Ryzen AI 9 CPU (50 TOPS NPU), NVIDIA GeForce RTX 5060, gorgeous 3K OLED display, and high-density 73 Whr long-life battery.",
    "price": 199990,
    "discountPrice": 189990,
    "stock": 5,
    "rating": 5.0,
    "reviewCount": 42,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/rare-laptop.png"
    ],
    "specs": {
      "Processor": "AMD Ryzen™ AI 9 HX 370 (12 Cores, 50 TOPS)",
      "GPU": "NVIDIA GeForce RTX 5060 8GB GDDR6",
      "RAM": "32GB LPDDR5X-7500MHz",
      "Storage": "2TB PCIe 4.0 NVMe SSD",
      "Display": "14-inch 3K (2880x1800) OLED 120Hz 0.2ms 500 nits",
      "Battery": "73 Whr Fast Charge",
      "Weight": "1.50 kg"
    },
    "isFeatured": true,
    "createdAt": "2026-10-03T14:40:00.000Z"
  },
  {
    "id": "3fa803fd-1991-4abc-ac26-106637a3b737",
    "title": "ASUS ROG Strix SCAR 18 (2024)",
    "slug": "asus-rog-strix-scar-18-2024",
    "description": "The pinnacle of portable power. Features the Intel Core i9-14900HX processor and NVIDIA GeForce RTX 4090 16GB GPU with 175W max TGP, paired with a gorgeous 2.5K 240Hz Nebula HDR Mini-LED display.",
    "price": 349990,
    "discountPrice": 329990,
    "stock": 6,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-3fa803fd-1991-4abc-ac26-106637a3b737.jpg?v=1791018108287"
    ],
    "specs": {
      "Processor": "Intel Core i9-14900HX (24 cores)",
      "GPU": "NVIDIA GeForce RTX 4090 16GB GDDR6 (175W)",
      "RAM": "32GB DDR5-5600MHz",
      "Storage": "2TB PCIe 4.0 NVMe SSD",
      "Display": "18-inch 2.5K (2560x1600) Mini-LED 240Hz 3ms",
      "Weight": "3.10 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.876Z"
  },
  {
    "id": "4f7ee118-8669-44c5-bf40-d77352cc3a50",
    "title": "Lenovo Legion Pro 7i Gen 9",
    "slug": "lenovo-legion-pro-7i-gen-9",
    "description": "AI-tuned competitive gaming laptop with Legion ColdFront Vapor thermal technology and dedicated Lenovo LA-2 AI engine for dynamic wattage distribution.",
    "price": 269990,
    "discountPrice": 249990,
    "stock": 9,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-4f7ee118-8669-44c5-bf40-d77352cc3a50.jpg?v=1791018111240"
    ],
    "specs": {
      "Processor": "Intel Core i9-14900HX",
      "GPU": "NVIDIA GeForce RTX 4080 12GB GDDR6 (175W)",
      "RAM": "32GB DDR5-5600MHz",
      "Storage": "1TB PCIe 4.0 NVMe SSD",
      "Display": "16-inch WQXGA 240Hz 500 nits 100% DCI-P3",
      "Weight": "2.62 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.889Z"
  },
  {
    "id": "599ec531-04d9-4102-b790-dd619ea4a97c",
    "title": "Razer Blade 16 Dual-Mode Mini-LED",
    "slug": "razer-blade-16-dual-mode",
    "description": "Precision milled CNC aluminum chassis housing the worlds first Dual-Mode Mini-LED display: switch instantly between UHD+ 120Hz for creators and FHD+ 240Hz for esports.",
    "price": 369990,
    "discountPrice": null,
    "stock": 4,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-599ec531-04d9-4102-b790-dd619ea4a97c.jpg?v=1791018115466"
    ],
    "specs": {
      "Processor": "Intel Core i9-14900HX",
      "GPU": "NVIDIA GeForce RTX 4090 16GB GDDR6",
      "RAM": "32GB DDR5-5600MHz",
      "Storage": "2TB NVMe SSD",
      "Display": "16-inch Dual-Mode Mini-LED (4K 120Hz / FHD+ 240Hz)",
      "Weight": "2.45 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.901Z"
  },
  {
    "id": "d8b91c6a-10a9-42dc-aa4e-28cff704a515",
    "title": "Alienware m18 R2 Titan",
    "slug": "alienware-m18-r2-titan",
    "description": "Desktop caliber performance in an 18-inch desktop replacement form factor. Vapor chamber cooling with Element 31 thermal interface on CPU and GPU.",
    "price": 334990,
    "discountPrice": 319990,
    "stock": 5,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-d8b91c6a-10a9-42dc-aa4e-28cff704a515.jpg?v=1791018118949"
    ],
    "specs": {
      "Processor": "Intel Core i9-14900HX",
      "GPU": "NVIDIA GeForce RTX 4090 16GB",
      "RAM": "64GB DDR5-5200MHz",
      "Storage": "4TB (2x2TB RAID 0) NVMe SSD",
      "Display": "18-inch QHD+ 165Hz G-SYNC ComfortView Plus",
      "Weight": "4.04 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.915Z"
  },
  {
    "id": "ba3b5589-2c3d-4ce2-98d4-d73cdbe31273",
    "title": "MSI Stealth 16 AI Studio",
    "slug": "msi-stealth-16-ai-studio",
    "description": "Ultra-slim magnesium-aluminum alloy chassis certified for NVIDIA Studio. Powered by Intel Core Ultra 9 with dedicated neural processing unit (NPU).",
    "price": 219990,
    "discountPrice": 199990,
    "stock": 8,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-ba3b5589-2c3d-4ce2-98d4-d73cdbe31273.jpg?v=1791018122364"
    ],
    "specs": {
      "Processor": "Intel Core Ultra 9 185H (16 cores, NPU)",
      "GPU": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM": "32GB DDR5",
      "Storage": "1TB NVMe Gen4 SSD",
      "Display": "16-inch OLED UHD+ 120Hz 100% DCI-P3",
      "Weight": "1.99 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.927Z"
  },
  {
    "id": "5de9537d-44f0-4fd4-a64a-d15658e8f93f",
    "title": "ASUS ROG Zephyrus G14 (2024 OLED)",
    "slug": "asus-rog-zephyrus-g14-2024",
    "description": "Ultra-compact 14-inch battlestation featuring a stunning 3K 120Hz ROG Nebula OLED display, Slash Lighting rear matrix, and AMD Ryzen 9 8945HS with Ryzen AI.",
    "price": 189990,
    "discountPrice": 179990,
    "stock": 12,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-5de9537d-44f0-4fd4-a64a-d15658e8f93f.jpg?v=1791018126067"
    ],
    "specs": {
      "Processor": "AMD Ryzen 9 8945HS (8C/16T, Ryzen AI)",
      "GPU": "NVIDIA GeForce RTX 4070 8GB GDDR6",
      "RAM": "32GB LPDDR5X-6400MHz",
      "Storage": "1TB PCIe 4.0 SSD",
      "Display": "14-inch 3K (2880x1800) OLED 120Hz 0.2ms G-SYNC",
      "Weight": "1.50 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.940Z"
  },
  {
    "id": "82031076-8e84-43c1-b02a-5cca304e2958",
    "title": "Acer Predator Helios 16",
    "slug": "acer-predator-helios-16",
    "description": "Dual 5th Gen AeroBlade 3D metal fans, liquid metal thermal paste, and MagKey 3.0 mechanical switches for the ultimate tactical edge.",
    "price": 169990,
    "discountPrice": 154990,
    "stock": 14,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-82031076-8e84-43c1-b02a-5cca304e2958.jpg?v=1791018128665"
    ],
    "specs": {
      "Processor": "Intel Core i7-14700HX",
      "GPU": "NVIDIA GeForce RTX 4070 8GB (140W)",
      "RAM": "16GB DDR5-5600MHz",
      "Storage": "1TB PCIe Gen4 SSD",
      "Display": "16-inch WQXGA 240Hz 500 nits Mini-LED",
      "Weight": "2.60 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.953Z"
  },
  {
    "id": "b039db0b-073b-4d14-911f-35801bbc52d6",
    "title": "HP Omen Transcend 14",
    "slug": "hp-omen-transcend-14",
    "description": "The worlds lightest 14-inch gaming laptop with customizable RGB lattice keyboard, IMAX Enhanced certified OLED screen, and tempest cooling.",
    "price": 159990,
    "discountPrice": 147990,
    "stock": 11,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-b039db0b-073b-4d14-911f-35801bbc52d6.jpg?v=1791018131410"
    ],
    "specs": {
      "Processor": "Intel Core Ultra 7 155H",
      "GPU": "NVIDIA GeForce RTX 4060 8GB",
      "RAM": "16GB LPDDR5X",
      "Storage": "1TB Gen4 SSD",
      "Display": "14-inch 2.8K 120Hz OLED 0.2ms",
      "Weight": "1.63 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.965Z"
  },
  {
    "id": "9a849c09-0974-4ee5-99a5-b07a4e4f42ad",
    "title": "MSI Titan 18 HX Dragon Edition",
    "slug": "msi-titan-18-hx-dragon",
    "description": "Uncompromising colossus featuring Cherry MX Ultra-Low Profile mechanical keyboard, 400W system thermal headroom, and seamless haptic RGB touchpad.",
    "price": 489990,
    "discountPrice": 469990,
    "stock": 3,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-9a849c09-0974-4ee5-99a5-b07a4e4f42ad.jpg?v=1791018134495"
    ],
    "specs": {
      "Processor": "Intel Core i9-14900HX",
      "GPU": "NVIDIA GeForce RTX 4090 16GB (175W)",
      "RAM": "128GB DDR5 (4x Slots)",
      "Storage": "4TB NVMe PCIe Gen5 SSD",
      "Display": "18-inch 4K Mini-LED 120Hz 1000 nits",
      "Weight": "3.60 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.982Z"
  },
  {
    "id": "58691041-2087-406b-99ec-221e9905e3da",
    "title": "Alienware x16 R2 Stealth",
    "slug": "alienware-x16-r2-stealth",
    "description": "Ultra-thin luxury gaming notebook crafted from anodized aluminum and magnesium with Lunar Silver finish and micro-LED perimeter stadium lighting.",
    "price": 279990,
    "discountPrice": 259990,
    "stock": 7,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-58691041-2087-406b-99ec-221e9905e3da.jpg?v=1791018137480"
    ],
    "specs": {
      "Processor": "Intel Core Ultra 9 185H",
      "GPU": "NVIDIA GeForce RTX 4080 12GB",
      "RAM": "32GB LPDDR5X-7467MHz",
      "Storage": "2TB PCIe Gen4 SSD",
      "Display": "16-inch QHD+ 240Hz 3ms 100% DCI-P3",
      "Weight": "2.66 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:19.996Z"
  },
  {
    "id": "f136b122-6b6d-4257-afc4-d5e68c4430e4",
    "title": "Gigabyte AORUS 17X (2024)",
    "slug": "gigabyte-aorus-17x-2024",
    "description": "Windforce Infinity full-coverage vapor chamber with 4 large fans, CNC milled structural unibody, and RGB Fusion individual key illumination.",
    "price": 289990,
    "discountPrice": 269990,
    "stock": 5,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-f136b122-6b6d-4257-afc4-d5e68c4430e4.jpg?v=1791018140673"
    ],
    "specs": {
      "Processor": "Intel Core i9-14900HX",
      "GPU": "NVIDIA GeForce RTX 4090 16GB (175W)",
      "RAM": "32GB DDR5-5600",
      "Storage": "2TB Gen4 SSD",
      "Display": "17.3-inch QHD 240Hz 100% sRGB",
      "Weight": "2.80 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.011Z"
  },
  {
    "id": "103d0c8f-b62a-4e81-9902-aad42038ae61",
    "title": "ASUS ROG Flow Z13 Gaming Tablet PC",
    "slug": "asus-rog-flow-z13-2024",
    "description": "The worlds most powerful gaming tablet. Detachable RGB keyboard, kickstand, and external XG Mobile GPU connector for desktop-grade firepower.",
    "price": 174990,
    "discountPrice": 164990,
    "stock": 9,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-103d0c8f-b62a-4e81-9902-aad42038ae61.jpg?v=1791018142994"
    ],
    "specs": {
      "Processor": "Intel Core i9-13900H",
      "GPU": "NVIDIA GeForce RTX 4060 8GB",
      "RAM": "16GB LPDDR5",
      "Storage": "1TB M.2 2230 SSD",
      "Display": "13.4-inch ROG Nebula 165Hz Touchscreen",
      "Weight": "1.18 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.023Z"
  },
  {
    "id": "110648b5-715a-4630-97fe-1aa57576f8e9",
    "title": "Lenovo Legion 9i Liquid Cooled",
    "slug": "lenovo-legion-9i-liquid-cooled",
    "description": "Self-contained integrated liquid cooling pump co-engineered with Cooler Master, forged carbon A-cover where every unit has a unique weave pattern.",
    "price": 419990,
    "discountPrice": 399990,
    "stock": 4,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-110648b5-715a-4630-97fe-1aa57576f8e9.jpg?v=1791018146093"
    ],
    "specs": {
      "Processor": "Intel Core i9-14900HX",
      "GPU": "NVIDIA GeForce RTX 4090 16GB",
      "RAM": "64GB Overclocked DDR5-6400MHz",
      "Storage": "2TB PCIe 4.0 SSD",
      "Display": "16-inch 3.2K Mini-LED 165Hz 100% Adobe RGB",
      "Weight": "2.56 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.036Z"
  },
  {
    "id": "a964a1ec-db30-44d5-a370-6ffbdecba9d0",
    "title": "Dell Alienware m16 R2 Performance",
    "slug": "alienware-m16-r2-perf",
    "description": "Redesigned for everyday portability with Stealth Mode hotkey, Cryo-tech cooling, and 15% smaller footprint than previous generation.",
    "price": 179990,
    "discountPrice": 169990,
    "stock": 15,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-a964a1ec-db30-44d5-a370-6ffbdecba9d0.jpg?v=1791018149667"
    ],
    "specs": {
      "Processor": "Intel Core Ultra 7 155H",
      "GPU": "NVIDIA GeForce RTX 4070 8GB (140W)",
      "RAM": "16GB DDR5",
      "Storage": "1TB PCIe NVMe SSD",
      "Display": "16-inch QHD+ 240Hz 3ms G-SYNC",
      "Weight": "2.55 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.052Z"
  },
  {
    "id": "ec9d8a4c-7140-4aac-8240-b154eeda9f59",
    "title": "Framework Laptop 16 DIY Gaming",
    "slug": "framework-laptop-16-diy",
    "description": "Fully modular, upgradable, and repairable gaming notebook with swappable Graphics Module bay and customizable input matrix modules.",
    "price": 189990,
    "discountPrice": null,
    "stock": 8,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-ec9d8a4c-7140-4aac-8240-b154eeda9f59.jpg?v=1791018151991"
    ],
    "specs": {
      "Processor": "AMD Ryzen 7 7840HS",
      "GPU": "AMD Radeon RX 7700S Modular 8GB",
      "RAM": "32GB DDR5-5600",
      "Storage": "1TB Western Digital Black SN850X",
      "Display": "16-inch 2560x1600 165Hz 100% DCI-P3",
      "Weight": "2.40 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.064Z"
  },
  {
    "id": "6bdb6842-356a-4cf9-bb5b-b88c891108de",
    "title": "Acer Nitro 17 Black Edition",
    "slug": "acer-nitro-17-black-edition",
    "description": "Budget-defying powerhouse with dual fans, quad exhaust ports, and NitroSense command center for granular performance tuning.",
    "price": 109990,
    "discountPrice": 99990,
    "stock": 20,
    "rating": 4.5,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-6bdb6842-356a-4cf9-bb5b-b88c891108de.jpg?v=1791018154667"
    ],
    "specs": {
      "Processor": "AMD Ryzen 7 7840HS",
      "GPU": "NVIDIA GeForce RTX 4060 8GB (140W)",
      "RAM": "16GB DDR5",
      "Storage": "512GB PCIe Gen4 SSD",
      "Display": "17.3-inch FHD 165Hz IPS sRGB 100%",
      "Weight": "3.00 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.080Z"
  },
  {
    "id": "cbcfafba-5356-4300-bed6-db0f338bff48",
    "title": "Razer Blade 14 Mercury White",
    "slug": "razer-blade-14-mercury-white",
    "description": "Anodized Mercury white finish, ultrathin 17.99mm profile, AMD Ryzen 9 8945HS with 16 TOPS NPU, and up to 10 hours battery life.",
    "price": 249990,
    "discountPrice": null,
    "stock": 6,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-cbcfafba-5356-4300-bed6-db0f338bff48.jpg?v=1791018157106"
    ],
    "specs": {
      "Processor": "AMD Ryzen 9 8945HS",
      "GPU": "NVIDIA GeForce RTX 4070 8GB (140W)",
      "RAM": "32GB DDR5-5600",
      "Storage": "1TB NVMe SSD",
      "Display": "14-inch QHD+ 240Hz 16:10 IPS",
      "Weight": "1.84 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.092Z"
  },
  {
    "id": "c8d3e947-a1e8-48c1-890e-0fe62430d415",
    "title": "Lenovo LOQ 15 Essential Gamer",
    "slug": "lenovo-loq-15-essential",
    "description": "Engineered for students and entry-level competitive gaming. Military-grade MIL-STD 810H durability rating with LA1 AI cooling chip.",
    "price": 74990,
    "discountPrice": 69990,
    "stock": 23,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-c8d3e947-a1e8-48c1-890e-0fe62430d415.jpg?v=1791018159489"
    ],
    "specs": {
      "Processor": "Intel Core i5-13450HX",
      "GPU": "NVIDIA GeForce RTX 4050 6GB (95W)",
      "RAM": "16GB DDR5",
      "Storage": "512GB PCIe Gen4 SSD",
      "Display": "15.6-inch FHD 144Hz 100% sRGB G-SYNC",
      "Weight": "2.40 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.106Z"
  },
  {
    "id": "41b075cb-da2b-47cf-8e9f-aab44db6d4a1",
    "title": "ASUS TUF Gaming A15 Mecha Gray",
    "slug": "asus-tuf-gaming-a15-mecha",
    "description": "High-durability esports laptop with 90Wh battery, Dolby Atmos audio, and high airflow 84-blade Arc Flow Fans.",
    "price": 89990,
    "discountPrice": 84990,
    "stock": 18,
    "rating": 4.5,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-41b075cb-da2b-47cf-8e9f-aab44db6d4a1.jpg?v=1791018162046"
    ],
    "specs": {
      "Processor": "AMD Ryzen 7 7735HS",
      "GPU": "NVIDIA GeForce RTX 4060 8GB (140W)",
      "RAM": "16GB DDR5",
      "Storage": "1TB PCIe 4.0 SSD",
      "Display": "15.6-inch FHD 144Hz IPS Level G-SYNC",
      "Weight": "2.20 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.120Z"
  },
  {
    "id": "2115cc23-1e56-4e8e-9e6f-1c89db3c109b",
    "title": "MSI Katana 17 B13V",
    "slug": "msi-katana-17-b13v",
    "description": "Crafted with the honor of the dragon blade. Cooler Boost 5 with shared-pipe design for CPU and GPU guarantees stable frames in long sessions.",
    "price": 119990,
    "discountPrice": 109990,
    "stock": 14,
    "rating": 4.4,
    "reviewCount": 28,
    "categoryId": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
    "category": {
      "id": "2fa3a020-fcbf-42ba-bd7c-b818c869fde3",
      "name": "Gaming Laptops",
      "slug": "gaming-laptops"
    },
    "images": [
      "/products/prod-2115cc23-1e56-4e8e-9e6f-1c89db3c109b.jpg?v=1791018164726"
    ],
    "specs": {
      "Processor": "Intel Core i7-13620H",
      "GPU": "NVIDIA GeForce RTX 4060 8GB GDDR6",
      "RAM": "16GB DDR5-5200",
      "Storage": "1TB NVMe PCIe SSD",
      "Display": "17.3-inch FHD 144Hz IPS Thin Bezel",
      "Weight": "2.60 kg"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.133Z"
  },
  {
    "id": "d5a35217-ad24-4276-a2ce-db3babff803e",
    "title": "ASUS ROG Strix GeForce RTX 4090 OC 24GB",
    "slug": "asus-rog-strix-rtx-4090-oc-24gb",
    "description": "The supreme gaming graphics card. Diecast shroud, 3.5-slot patented vapor chamber, and Axial-tech fans scaled up for 23% more airflow.",
    "price": 219990,
    "discountPrice": null,
    "stock": 5,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-d5a35217-ad24-4276-a2ce-db3babff803e.jpg?v=1791018167121"
    ],
    "specs": {
      "Architecture": "Ada Lovelace 4nm",
      "CUDA_Cores": "16,384",
      "VRAM": "24GB GDDR6X 384-bit",
      "BoostClock": "2640 MHz (OC Mode)",
      "PowerDraw": "450W (Up to 600W limit)",
      "Outputs": "2x HDMI 2.1a, 3x DisplayPort 1.4a"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.148Z"
  },
  {
    "id": "e2261707-c8ca-42b6-aab0-6ef692f841e4",
    "title": "NVIDIA GeForce RTX 4080 Super Founders Edition",
    "slug": "nvidia-geforce-rtx-4080-super-fe",
    "description": "Authentic NVIDIA dual-axial flow-through cooling design in stealth gunmetal finish. Delivers blistering 4K ray tracing and DLSS 3 frame generation.",
    "price": 104990,
    "discountPrice": null,
    "stock": 8,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-e2261707-c8ca-42b6-aab0-6ef692f841e4.jpg?v=1791018169111"
    ],
    "specs": {
      "Architecture": "Ada Lovelace",
      "CUDA_Cores": "10,240",
      "VRAM": "16GB GDDR6X 256-bit",
      "MemorySpeed": "23 Gbps",
      "PowerDraw": "320W",
      "RecommendedPSU": "750W"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.159Z"
  },
  {
    "id": "4a1e77a0-a169-4dae-9ab8-c5f8be8a2339",
    "title": "AMD Radeon RX 7900 XTX 24GB Nitro+ Vapor-X",
    "slug": "sapphire-nitro-rx-7900-xtx-24gb",
    "description": "Sapphire flagship with Vapor-X chamber cooling, 20-phase digital power delivery, and dual BIOS with dedicated software switch.",
    "price": 109990,
    "discountPrice": 99990,
    "stock": 7,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-4a1e77a0-a169-4dae-9ab8-c5f8be8a2339.jpg?v=1791018171267"
    ],
    "specs": {
      "Architecture": "RDNA 3 Chiplet",
      "StreamProcessors": "6,144",
      "VRAM": "24GB GDDR6 384-bit",
      "InfinityCache": "96MB",
      "BoostClock": "2680 MHz",
      "DisplayPort": "2x DisplayPort 2.1 UHBR13.5"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.175Z"
  },
  {
    "id": "25911a41-787b-4ab2-9115-a6389a48e278",
    "title": "Arceus Chimera V3 Liquid Gaming PC",
    "slug": "arceus-chimera-v3-liquid-pc",
    "description": "Custom boutique workstation handcrafted by Arceus engineers. Hardline crystal acrylic tubing, distro-plate reservoir, and custom cable sleeving.",
    "price": 449990,
    "discountPrice": 429990,
    "stock": 3,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-25911a41-787b-4ab2-9115-a6389a48e278.jpg?v=1791018173653"
    ],
    "specs": {
      "CPU": "Intel Core i9-14900KS Special Edition",
      "GPU": "NVIDIA GeForce RTX 4090 24GB Watercooled",
      "Motherboard": "ASUS ROG Maximus Z790 Dark Hero",
      "RAM": "64GB G.Skill Trident Z5 RGB DDR5-7200",
      "Storage": "4TB Samsung 990 PRO NVMe SSD",
      "PSU": "Seasonic PRIME TX-1300W Titanium"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.189Z"
  },
  {
    "id": "89f0a66e-90ad-40f9-8b4f-38d40c94f749",
    "title": "Corsair ONE i500 Compact Battlestation",
    "slug": "corsair-one-i500-battlestation",
    "description": "Real wood front panel with touch-sensitive underglow lighting. Convection liquid-cooled dual radiators crammed into a space-saving micro-tower.",
    "price": 389990,
    "discountPrice": null,
    "stock": 4,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-89f0a66e-90ad-40f9-8b4f-38d40c94f749.jpg?v=1791018175492"
    ],
    "specs": {
      "CPU": "Intel Core i9-14900K",
      "GPU": "NVIDIA GeForce RTX 4090 24GB Liquid Cooled",
      "RAM": "64GB DDR5-6000",
      "Storage": "2TB NVMe SSD",
      "Chassis": "16-Liter FSC Certified Real Wood + Aluminum",
      "PSU": "1000W SFX-L Gold"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.205Z"
  },
  {
    "id": "bb6f5f37-955a-4793-a4d9-a79c628ce575",
    "title": "NZXT Player Three Prime Custom Rig",
    "slug": "nzxt-player-three-prime",
    "description": "Showcase glass panoramic dual-chamber H9 Elite case with NZXT Kraken Elite 360 LCD AIO cooler displaying custom GIFs and real-time CPU temps.",
    "price": 339990,
    "discountPrice": 319990,
    "stock": 5,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-bb6f5f37-955a-4793-a4d9-a79c628ce575.jpg?v=1791018178983"
    ],
    "specs": {
      "CPU": "AMD Ryzen 7 7800X3D (3D V-Cache)",
      "GPU": "NVIDIA GeForce RTX 4090 24GB",
      "RAM": "32GB TeamGroup T-Force Delta RGB DDR5",
      "Storage": "2TB NVMe Gen4 SSD",
      "Cooling": "NZXT Kraken Elite 360 LCD",
      "PSU": "NZXT C1200 1200W Gold ATX 3.0"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.221Z"
  },
  {
    "id": "5e4fa0b9-e81f-4e17-8bc2-ef467f6ff806",
    "title": "Origin PC Millennium 5000X",
    "slug": "origin-pc-millennium-5000x",
    "description": "Engineered for tournament esports organizers and broadcast production. Custom UV-printed side glass with ARGB variable fan profiles.",
    "price": 299990,
    "discountPrice": 279990,
    "stock": 6,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-5e4fa0b9-e81f-4e17-8bc2-ef467f6ff806.jpg?v=1791018182132"
    ],
    "specs": {
      "CPU": "Intel Core i7-14700K",
      "GPU": "NVIDIA GeForce RTX 4080 Super 16GB",
      "RAM": "32GB Corsair Dominator Titanium DDR5",
      "Storage": "2TB Samsung 990 EVO",
      "Case": "Corsair iCUE 5000X RGB Glass",
      "PSU": "Corsair RM1000x Gold"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.235Z"
  },
  {
    "id": "a49494ea-de11-4c83-bff7-64ef42ffc74e",
    "title": "HP Omen 45L Cryo Chamber Gaming Desktop",
    "slug": "hp-omen-45l-cryo-chamber",
    "description": "Patented Cryo Chamber sits atop the main interior to draw cooler ambient air directly into the liquid cooler radiator, slashing CPU thermals by 6 degrees.",
    "price": 259990,
    "discountPrice": 239990,
    "stock": 7,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-a49494ea-de11-4c83-bff7-64ef42ffc74e.jpg?v=1791018184616"
    ],
    "specs": {
      "CPU": "Intel Core i9-13900K",
      "GPU": "NVIDIA GeForce RTX 4080 16GB",
      "RAM": "32GB Kingston FURY Beast RGB DDR5",
      "Storage": "2TB WD Black NVMe SSD",
      "Cooling": "Omen Cryo Chamber 360mm AIO",
      "PSU": "1000W 80 Plus Gold"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.251Z"
  },
  {
    "id": "3eca9771-828e-471d-bdd6-68709d662d52",
    "title": "Alienware Aurora R16 Legend 3",
    "slug": "alienware-aurora-r16-legend-3",
    "description": "Redesigned acoustic architecture yields 20% quieter operation and 7% lower CPU temperatures with stadium loop airflow.",
    "price": 224990,
    "discountPrice": 209990,
    "stock": 8,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-3eca9771-828e-471d-bdd6-68709d662d52.jpg?v=1791018187114"
    ],
    "specs": {
      "CPU": "Intel Core i7-14700F",
      "GPU": "NVIDIA GeForce RTX 4070 Ti Super 16GB",
      "RAM": "32GB DDR5-5600",
      "Storage": "1TB NVMe SSD + 1TB HDD",
      "Cooling": "Alienware 240mm Liquid Cooling",
      "PSU": "1000W Platinum ATX 3.0"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.263Z"
  },
  {
    "id": "96984436-8c06-4239-882f-a65c08bd125d",
    "title": "MSI GeForce RTX 4070 Ti Super Gaming X Slim",
    "slug": "msi-geforce-rtx-4070-ti-super-gaming-x-slim",
    "description": "Slimmer 2.5-slot profile without sacrificing thermal headroom. Tri Frozr 3 thermal design with Torx Fan 5.0 and copper baseplate.",
    "price": 84990,
    "discountPrice": 79990,
    "stock": 12,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-96984436-8c06-4239-882f-a65c08bd125d.jpg?v=1791018189651"
    ],
    "specs": {
      "CUDA_Cores": "8,448",
      "VRAM": "16GB GDDR6X 256-bit",
      "BoostClock": "2685 MHz",
      "PowerDraw": "285W",
      "Dimensions": "307 x 125 x 51 mm",
      "RecommendedPSU": "700W"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.278Z"
  },
  {
    "id": "cbdd186d-46cb-4091-be6f-afc3746af1d3",
    "title": "Lian Li O11 Vision Chrome Battlestation",
    "slug": "lian-li-o11-vision-chrome",
    "description": "Three sides of borderless tempered glass provide an unobstructed panoramic view. Co-designed with PC Master Race (PCMR).",
    "price": 269990,
    "discountPrice": 249990,
    "stock": 5,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-cbdd186d-46cb-4091-be6f-afc3746af1d3.jpg?v=1791018191831"
    ],
    "specs": {
      "CPU": "AMD Ryzen 7 7800X3D",
      "GPU": "NVIDIA GeForce RTX 4080 Super 16GB",
      "RAM": "32GB Corsair Vengeance RGB DDR5-6000",
      "Storage": "2TB Crucial T700 Gen5 NVMe",
      "Case": "Lian Li O11 Vision Mirrored Chrome",
      "Fans": "6x Lian Li UNI FAN TL LCD Reverse"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.290Z"
  },
  {
    "id": "a0d8ceab-6a75-4d5d-8a51-a64b259d9b31",
    "title": "ZOTAC Gaming GeForce RTX 4070 Super Twin Edge",
    "slug": "zotac-rtx-4070-super-twin-edge",
    "description": "Compact dual-slot card tailored for small-form-factor (SFF) ITX builds. IceStorm 2.0 advanced cooling and SPECTRA RGB lighting.",
    "price": 61990,
    "discountPrice": 58990,
    "stock": 16,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-a0d8ceab-6a75-4d5d-8a51-a64b259d9b31.jpg?v=1791018194441"
    ],
    "specs": {
      "CUDA_Cores": "7,168",
      "VRAM": "12GB GDDR6X 192-bit",
      "Length": "234.1 mm (Fits 99% ITX Cases)",
      "PowerDraw": "220W",
      "PowerConnector": "1x 12VHPWR"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.300Z"
  },
  {
    "id": "d3b5d09e-4446-4d25-884d-28cfad53aaf9",
    "title": "ASRock Taichi Radeon RX 7900 XT White OC",
    "slug": "asrock-taichi-rx-7900-xt-white",
    "description": "All-white mechanical steampunk aesthetic with center RGB gear ring, striped ring fans, and 3x 8-pin power connectors for extreme overclocking.",
    "price": 84990,
    "discountPrice": 79990,
    "stock": 8,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-d3b5d09e-4446-4d25-884d-28cfad53aaf9.jpg?v=1791018196216"
    ],
    "specs": {
      "StreamProcessors": "5,376",
      "VRAM": "20GB GDDR6 320-bit",
      "BoostClock": "2560 MHz",
      "PowerDraw": "330W",
      "DisplayPort": "3x DP 2.1, 1x HDMI 2.1"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.315Z"
  },
  {
    "id": "b26cfd9d-2ebe-42ae-80e0-564446a18122",
    "title": "MSI MEG Trident X2 AI Master",
    "slug": "msi-meg-trident-x2-ai-master",
    "description": "Features a 4.5-inch HMI 2.0 touchscreen on the front bezel allowing users to cycle system modes, monitor hardware temps, and launch games directly.",
    "price": 379990,
    "discountPrice": null,
    "stock": 3,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-b26cfd9d-2ebe-42ae-80e0-564446a18122.jpg?v=1791018198545"
    ],
    "specs": {
      "CPU": "Intel Core i9-14900KF",
      "GPU": "NVIDIA GeForce RTX 4090 24GB",
      "RAM": "64GB DDR5-5600",
      "Storage": "2TB PCIe Gen5 SSD",
      "Touchscreen": "4.5-inch IPS Color Display with Touch Control",
      "PSU": "1000W 80 PLUS Gold"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.326Z"
  },
  {
    "id": "03fedf58-ac43-4680-bc0a-e8632dce8ff8",
    "title": "Thermaltake Tower 500 Showcase Rig",
    "slug": "thermaltake-tower-500-showcase",
    "description": "Vertical chimney effect case displaying internal components upright with 3 tempered glass windows and dual-chamber thermal compartmentalization.",
    "price": 199990,
    "discountPrice": 184990,
    "stock": 7,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-03fedf58-ac43-4680-bc0a-e8632dce8ff8.jpg?v=1791018201887"
    ],
    "specs": {
      "CPU": "AMD Ryzen 7 7700X",
      "GPU": "NVIDIA GeForce RTX 4070 Ti Super 16GB",
      "RAM": "32GB Thermaltake Toughram RGB DDR5",
      "Storage": "1TB NVMe SSD",
      "FormFactor": "Vertical Tower ITX/ATX",
      "PSU": "850W Platinum"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.338Z"
  },
  {
    "id": "a5867fc2-68c5-4128-b90a-952315feb566",
    "title": "ASUS Dual GeForce RTX 4060 Ti EVO 16GB",
    "slug": "asus-dual-rtx-4060-ti-16gb",
    "description": "Massive 16GB VRAM buffer ideal for local LLM inference, Stable Diffusion image generation, and high-res texture packs without frame stutter.",
    "price": 46990,
    "discountPrice": 43990,
    "stock": 18,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-a5867fc2-68c5-4128-b90a-952315feb566.jpg?v=1791018203956"
    ],
    "specs": {
      "CUDA_Cores": "4,352",
      "VRAM": "16GB GDDR6 128-bit",
      "PowerDraw": "165W",
      "Cooling": "Dual Axial-Tech 0dB Fans",
      "RecommendedPSU": "650W"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.352Z"
  },
  {
    "id": "21e28089-b24f-48ce-8c0c-e2df309442d4",
    "title": "PowerColor Hellhound Radeon RX 7800 XT 16GB",
    "slug": "powercolor-hellhound-rx-7800-xt",
    "description": "Ice Blue and Amethyst Purple dual LED lighting, copper base direct touch cooling, and metallic reinforced backplate.",
    "price": 52990,
    "discountPrice": 49990,
    "stock": 14,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-21e28089-b24f-48ce-8c0c-e2df309442d4.jpg?v=1791018206366"
    ],
    "specs": {
      "StreamProcessors": "3,840",
      "VRAM": "16GB GDDR6 256-bit",
      "GameClock": "2213 MHz",
      "PowerDraw": "263W",
      "RecommendedPSU": "750W"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.363Z"
  },
  {
    "id": "36e52e78-cdf2-4f47-a4b5-e0afb89c23d4",
    "title": "Arceus Forge ITX Stealth Cube",
    "slug": "arceus-forge-itx-stealth-cube",
    "description": "Dense 11-liter sandwich layout small-form-factor PC packing desktop flagship hardware with zero RGB for executive gamers.",
    "price": 219990,
    "discountPrice": null,
    "stock": 6,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-36e52e78-cdf2-4f47-a4b5-e0afb89c23d4.jpg?v=1791018208986"
    ],
    "specs": {
      "CPU": "AMD Ryzen 7 7800X3D",
      "GPU": "NVIDIA GeForce RTX 4070 Super 12GB",
      "RAM": "32GB G.Skill Ripjaws S5 DDR5",
      "Storage": "2TB Samsung 990 PRO",
      "Chassis": "FormD T1 CNC Aluminum",
      "PSU": "Corsair SF750 Platinum"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.379Z"
  },
  {
    "id": "15ff4fbd-bca7-4647-823f-967062516a30",
    "title": "Intel Arc A770 Phantom Gaming 16GB",
    "slug": "asrock-intel-arc-a770-16gb",
    "description": "Full DirectX 12 Ultimate hardware support with dedicated XMX AI engines, AV1 hardware encoding, and generous 16GB VRAM.",
    "price": 29990,
    "discountPrice": 27990,
    "stock": 22,
    "rating": 4.4,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-15ff4fbd-bca7-4647-823f-967062516a30.jpg?v=1791018213779"
    ],
    "specs": {
      "Xe_Cores": "32",
      "VRAM": "16GB GDDR6 256-bit",
      "GraphicsClock": "2200 MHz",
      "TDP": "225W",
      "VideoEncoding": "AV1 Hardware Dual Encode"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.392Z"
  },
  {
    "id": "ae2c7b5c-1b33-4348-8eef-9b3a79842e3c",
    "title": "Corsair Vengeance i7500 Gaming Desktop",
    "slug": "corsair-vengeance-i7500-desktop",
    "description": "Streamlined prebuilt utilizing standard off-the-shelf Corsair components for easy future upgrades with iCUE RGB lighting integration.",
    "price": 214990,
    "discountPrice": 199990,
    "stock": 9,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
    "category": {
      "id": "728b2679-bbfe-4d3c-9b71-937997aee9a8",
      "name": "GPUs & Desktops",
      "slug": "gpus-and-desktops"
    },
    "images": [
      "/products/prod-ae2c7b5c-1b33-4348-8eef-9b3a79842e3c.jpg?v=1791018217736"
    ],
    "specs": {
      "CPU": "Intel Core i7-14700KF",
      "GPU": "NVIDIA GeForce RTX 4070 Ti Super 16GB",
      "RAM": "32GB Corsair Vengeance DDR5",
      "Storage": "1TB M.2 NVMe SSD",
      "Cooling": "Corsair H100i RGB Liquid Cooler",
      "PSU": "750W 80 PLUS Gold"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.408Z"
  },
  {
    "id": "1796bcc9-59d0-4aa0-b57c-6e8c246abb40",
    "title": "Samsung Odyssey OLED G9 (49-inch Curved)",
    "slug": "samsung-odyssey-oled-g9",
    "description": "Dual QHD 32:9 super ultrawide curved monitor with 0.03ms response time, 240Hz refresh rate, and Neo Quantum Processor Pro.",
    "price": 139990,
    "discountPrice": 124990,
    "stock": 5,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-1796bcc9-59d0-4aa0-b57c-6e8c246abb40.jpg?v=1791018222391"
    ],
    "specs": {
      "Panel": "49-inch QD-OLED 1800R Curved",
      "Resolution": "Dual QHD (5120 x 1440)",
      "RefreshRate": "240Hz",
      "ResponseTime": "0.03ms (GtG)",
      "HDR": "DisplayHDR True Black 400",
      "Connectivity": "HDMI 2.1, Micro HDMI, DisplayPort 1.4"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.420Z"
  },
  {
    "id": "1e734989-bad9-4337-b802-dda2f4876b1a",
    "title": "ASUS ROG Swift PG32UCDM 4K 240Hz OLED",
    "slug": "asus-rog-swift-pg32ucdm-4k-oled",
    "description": "The holy grail of gaming displays: 32-inch 4K QD-OLED panel running at 240Hz with custom heatsink and graphene film to eliminate burn-in risk.",
    "price": 134990,
    "discountPrice": null,
    "stock": 4,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-1e734989-bad9-4337-b802-dda2f4876b1a.jpg?v=1791018225483"
    ],
    "specs": {
      "Panel": "32-inch 3rd Gen QD-OLED",
      "Resolution": "4K UHD (3840 x 2160)",
      "RefreshRate": "240Hz",
      "ResponseTime": "0.03ms",
      "BurnInProtection": "Graphene film + Custom Heatsink + ASUS OLED Care",
      "PowerDelivery": "USB-C 90W PD"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.433Z"
  },
  {
    "id": "a49b1e07-5745-44e5-a020-e29166580384",
    "title": "LG UltraGear 27GR95QE 240Hz QHD OLED",
    "slug": "lg-ultragear-27gr95qe-oled",
    "description": "Worlds first 240Hz OLED gaming monitor with anti-glare low reflection coating, 0.03ms response time, and 1,500,000:1 contrast ratio.",
    "price": 74990,
    "discountPrice": 69990,
    "stock": 12,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-a49b1e07-5745-44e5-a020-e29166580384.jpg?v=1791018228055"
    ],
    "specs": {
      "Panel": "27-inch OLED Anti-Glare",
      "Resolution": "QHD (2560 x 1440)",
      "RefreshRate": "240Hz",
      "ColorGamut": "DCI-P3 98.5%",
      "Sync": "NVIDIA G-SYNC Compatible, AMD FreeSync Premium"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.448Z"
  },
  {
    "id": "e0545436-6c85-4519-9f92-24905831d6b8",
    "title": "Alienware AW3423DW QD-OLED Curved 175Hz",
    "slug": "alienware-aw3423dw-qd-oled",
    "description": "Iconic Legend 2.0 design with native G-SYNC Ultimate hardware module, 1800R curvature, and quantum dot color reproduction.",
    "price": 99990,
    "discountPrice": 91990,
    "stock": 8,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-e0545436-6c85-4519-9f92-24905831d6b8.jpg?v=1791018231430"
    ],
    "specs": {
      "Panel": "34.18-inch Quantum Dot OLED Curved",
      "Resolution": "WQHD (3440 x 1440)",
      "RefreshRate": "175Hz",
      "PeakBrightness": "1000 nits",
      "Warranty": "3-Year Burn-In Protection Included"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.460Z"
  },
  {
    "id": "7ef961ae-7e92-4dac-8ce9-4904ea4dfc76",
    "title": "BenQ ZOWIE XL2566K 360Hz Esports Monitor",
    "slug": "benq-zowie-xl2566k-360hz",
    "description": "The definitive weapon for professional CS2 and VALORANT athletes featuring DyAc+ proprietary dynamic accuracy technology for zero motion blur.",
    "price": 54990,
    "discountPrice": 49990,
    "stock": 15,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-7ef961ae-7e92-4dac-8ce9-4904ea4dfc76.jpg?v=1791018234172"
    ],
    "specs": {
      "Panel": "24.5-inch Fast TN Esports Panel",
      "Resolution": "Full HD (1920 x 1080)",
      "RefreshRate": "360Hz",
      "Tech": "DyAc+ Dynamic Accuracy Technology",
      "Accessories": "S-Switch Remote Control + Shielding Hoods"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.474Z"
  },
  {
    "id": "62fbfa3b-e2a1-4d1d-a229-dc2c52cafa29",
    "title": "Corsair XENEON FLEX 45WQHD240 Bendable OLED",
    "slug": "corsair-xeneon-flex-bendable",
    "description": "Revolutionary bendable OLED panel allows you to manually adjust curvature from completely flat for productivity up to an immersive 800R for flight simulators.",
    "price": 169990,
    "discountPrice": null,
    "stock": 3,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-62fbfa3b-e2a1-4d1d-a229-dc2c52cafa29.jpg?v=1791018237980"
    ],
    "specs": {
      "Panel": "45-inch Bendable LG W-OLED",
      "Curvature": "Adjustable from Flat to 800R",
      "Resolution": "3440 x 1440 (21:9)",
      "RefreshRate": "240Hz",
      "ResponseTime": "0.03ms GtG"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.488Z"
  },
  {
    "id": "ff53c6db-c981-4197-bb3e-ab74259c8a51",
    "title": "MSI MAG 321UPX QD-OLED 4K 240Hz",
    "slug": "msi-mag-321upx-qd-oled",
    "description": "Quantum Dot OLED display featuring MSI OLED Care 2.0 with multi-logo detection, taskbar detection, and boundary detection.",
    "price": 114990,
    "discountPrice": 104990,
    "stock": 7,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-ff53c6db-c981-4197-bb3e-ab74259c8a51.jpg?v=1791018245823"
    ],
    "specs": {
      "Panel": "31.5-inch QD-OLED",
      "Resolution": "3840 x 2160 (4K)",
      "RefreshRate": "240Hz",
      "DeltaE": "<= 2 Factory Calibrated",
      "Ports": "HDMI 2.1 48Gbps, DP 1.4a, Type-C 15W"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.501Z"
  },
  {
    "id": "4618baac-e2d3-43bc-8344-b375ca4b38f8",
    "title": "Gigabyte AORUS FO32U2P DisplayPort 2.1",
    "slug": "gigabyte-aorus-fo32u2p-dp21",
    "description": "Worlds first tactical gaming monitor featuring full-bandwidth DisplayPort 2.1 UHBR20 (80Gbps) for uncompressed 4K 240Hz HDR without DSC.",
    "price": 144990,
    "discountPrice": null,
    "stock": 4,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-4618baac-e2d3-43bc-8344-b375ca4b38f8.jpg?v=1791018250485"
    ],
    "specs": {
      "Panel": "31.5-inch QD-OLED",
      "Resolution": "4K UHD (3840x2160)",
      "RefreshRate": "240Hz",
      "Interface": "DisplayPort 2.1 UHBR20 (Daisy Chain support)",
      "TacticalFeatures": "Night Vision, Aim Stabilizer, Black Equalizer"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.516Z"
  },
  {
    "id": "02ec7e54-6e38-4a26-8694-d3cd46f6f762",
    "title": "Acer Predator X45 Curved OLED",
    "slug": "acer-predator-x45-curved-oled",
    "description": "Immense 45-inch 800R curved gaming panel enveloping your peripheral vision with 99% DCI-P3 color spectrum and HDR10.",
    "price": 129990,
    "discountPrice": 119990,
    "stock": 5,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-02ec7e54-6e38-4a26-8694-d3cd46f6f762.jpg?v=1791018256561"
    ],
    "specs": {
      "Panel": "44.5-inch OLED 800R Deep Curve",
      "Resolution": "UWQHD (3440 x 1440)",
      "RefreshRate": "240Hz",
      "ResponseTime": "0.01ms PRT",
      "KVM": "Integrated KVM Switch with 90W Type-C"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.530Z"
  },
  {
    "id": "2a741e9b-44f7-4c78-9ac6-82bdaf81519d",
    "title": "Sony INZONE M9 4K 144Hz HDR600",
    "slug": "sony-inzone-m9-4k",
    "description": "Engineered for PlayStation 5 and high-end PC gamers. Full Array Local Dimming with Auto HDR Tone Mapping and tripod-style space-saving stand.",
    "price": 64990,
    "discountPrice": 59990,
    "stock": 11,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-2a741e9b-44f7-4c78-9ac6-82bdaf81519d.jpg?v=1791018259617"
    ],
    "specs": {
      "Panel": "27-inch IPS Full Array Local Dimming",
      "Resolution": "4K UHD (3840 x 2160)",
      "RefreshRate": "144Hz",
      "DimmingZones": "96 Zones",
      "PS5Features": "Auto Genre Picture Mode, Auto HDR"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.547Z"
  },
  {
    "id": "34660d2d-a0ee-4df7-a5f4-e6153168f084",
    "title": "AOC AGON PRO AG274QZM Mini-LED 240Hz",
    "slug": "aoc-agon-pro-ag274qzm-mini-led",
    "description": "576 local dimming zones delivering peak 1200 nits HDR brightness without OLED organic degradation risks.",
    "price": 69990,
    "discountPrice": 64990,
    "stock": 9,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-34660d2d-a0ee-4df7-a5f4-e6153168f084.jpg?v=1791018262801"
    ],
    "specs": {
      "Panel": "27-inch Fast IPS Mini-LED",
      "LocalDimming": "576 Individual Dimming Zones",
      "Resolution": "QHD (2560 x 1440)",
      "RefreshRate": "240Hz",
      "PeakHDR": "VESA DisplayHDR 1000"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.561Z"
  },
  {
    "id": "16595bfa-6069-406c-953b-325989927279",
    "title": "ViewSonic Elite XG320U 4K 150Hz Gaming",
    "slug": "viewsonic-elite-xg320u-4k",
    "description": "Equipped with Quantum Dot technology, PureXP blur reduction, built-in mouse bungee, and headphone hook.",
    "price": 79990,
    "discountPrice": 72990,
    "stock": 10,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-16595bfa-6069-406c-953b-325989927279.jpg?v=1791018267547"
    ],
    "specs": {
      "Panel": "32-inch IPS Quantum Dot",
      "Resolution": "4K UHD (3840 x 2160)",
      "RefreshRate": "150Hz Overclocked",
      "HDR": "DisplayHDR 600",
      "Audio": "Dual 5W Built-in Stereo Speakers"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.576Z"
  },
  {
    "id": "7bf7f350-4e92-4288-bd2f-34ba70a56d6e",
    "title": "Philips Evnia 34M2C8600 QD-OLED Curved",
    "slug": "philips-evnia-34m2c8600-qd-oled",
    "description": "Distinctive clean white aesthetic with 4-sided Ambiglow mood lighting syncing with on-screen game actions.",
    "price": 89990,
    "discountPrice": 82990,
    "stock": 8,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-7bf7f350-4e92-4288-bd2f-34ba70a56d6e.jpg?v=1791018272653"
    ],
    "specs": {
      "Panel": "34-inch QD-OLED 175Hz",
      "Resolution": "3440 x 1440 (21:9)",
      "Curvature": "1800R",
      "Ambiglow": "4-Sided Dynamic Halo Lights",
      "Speakers": "DTS Sound 2x 5W"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.590Z"
  },
  {
    "id": "5bac0473-a49b-45a4-b81c-5c6de891699f",
    "title": "Dell UltraSharp 32 6K U3224KB Pro",
    "slug": "dell-ultrasharp-32-6k-u3224kb",
    "description": "Worlds first 6K monitor with IPS Black technology delivering 2000:1 contrast and integrated 4K HDR Sony STARVIS webcam.",
    "price": 219990,
    "discountPrice": null,
    "stock": 4,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-5bac0473-a49b-45a4-b81c-5c6de891699f.jpg?v=1791018277016"
    ],
    "specs": {
      "Panel": "31.5-inch IPS Black 6K",
      "Resolution": "6144 x 3456 (6K)",
      "Webcam": "Built-in 4K Dual Gain HDR Sensor",
      "Thunderbolt": "Thunderbolt 4 Hub with 140W PD"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.604Z"
  },
  {
    "id": "ed0e8b51-522f-42c4-b456-8ddd5b0ebb5c",
    "title": "ASUS ROG Strix XG27AQMR 300Hz Fast IPS",
    "slug": "asus-rog-strix-xg27aqmr-300hz",
    "description": "Blistering 300Hz QHD gaming monitor with 1ms GtG response time and ELMB-Sync eliminating ghosting and tearing simultaneously.",
    "price": 58990,
    "discountPrice": 53990,
    "stock": 14,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
    "category": {
      "id": "d06bc9a7-5e04-4f26-a4a9-7693ba86837e",
      "name": "Esports Displays",
      "slug": "esports-displays"
    },
    "images": [
      "/products/prod-ed0e8b51-522f-42c4-b456-8ddd5b0ebb5c.jpg?v=1791018280170"
    ],
    "specs": {
      "Panel": "27-inch Fast IPS",
      "Resolution": "QHD (2560 x 1440)",
      "RefreshRate": "300Hz",
      "ResponseTime": "1ms (GtG)",
      "HDR": "DisplayHDR 600"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.620Z"
  },
  {
    "id": "2a2859a2-9a73-4a4b-9465-6f2c009533b5",
    "title": "Wooting 60HE+ Rapid Trigger Magnetic",
    "slug": "wooting-60he-plus-magnetic",
    "description": "The undisputed king of tactical shooter keyboards. Lekker Hall Effect magnetic switches with 0.1mm to 4.0mm adjustable actuation and continuous Rapid Trigger.",
    "price": 18990,
    "discountPrice": 17490,
    "stock": 15,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-2a2859a2-9a73-4a4b-9465-6f2c009533b5.jpg?v=1791018288545"
    ],
    "specs": {
      "Switches": "Gateron x Lekker L60 Magnetic Hall Effect",
      "ActuationRange": "0.1mm - 4.0mm granular",
      "RapidTrigger": "0.1mm reset accuracy",
      "Layout": "60% Compact ANSI",
      "PollingRate": "1000Hz Tachyon Mode"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.633Z"
  },
  {
    "id": "542655c1-52e4-4497-8a98-3cb57d525b60",
    "title": "Keychron Q1 Pro Custom Wireless",
    "slug": "keychron-q1-pro-wireless",
    "description": "Fully aluminum CNC-machined body with double-gasket mount design, screw-in PCB stabilizers, KSA profile PBT keycaps, and QMK/VIA key remapping.",
    "price": 17990,
    "discountPrice": 16490,
    "stock": 12,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-542655c1-52e4-4497-8a98-3cb57d525b60.jpg?v=1791018293688"
    ],
    "specs": {
      "Body": "Full CNC Anodized Aluminum 6063",
      "Layout": "75% with Rotary Encoder Knob",
      "Connectivity": "Bluetooth 5.1 + Type-C Wired",
      "Switches": "Keychron K Pro Red Mechanical Pre-Lubed",
      "HotSwap": "South-Facing 5-Pin RGB"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.648Z"
  },
  {
    "id": "b4b48dd4-3b2b-49a9-9272-62348bde60c6",
    "title": "SteelSeries Apex Pro TKL Gen 3 Wireless",
    "slug": "steelseries-apex-pro-tkl-gen3",
    "description": "OmniPoint 3.0 HyperMagnetic switches with 40 levels of per-key actuation (0.1mm to 4.0mm), Rapid Tap priority mode, and smart OLED display.",
    "price": 24990,
    "discountPrice": 22990,
    "stock": 10,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-b4b48dd4-3b2b-49a9-9272-62348bde60c6.jpg?v=1791018299027"
    ],
    "specs": {
      "Switches": "OmniPoint 3.0 Hall Effect Magnetic",
      "OLED": "Smart Display for settings & Discord notifications",
      "Wireless": "Quantum 2.0 Dual Wireless 2.4GHz + BT",
      "Plate": "Aircraft Grade 5000 Series Aluminum"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.661Z"
  },
  {
    "id": "ea2d8ba1-93b2-4588-b07a-38a22d50d8e6",
    "title": "Razer Huntsman V3 Pro TKL Esports",
    "slug": "razer-huntsman-v3-pro-tkl",
    "description": "Second-gen analog optical switches with Rapid Trigger, onboard LED array display for instant actuation point calibration, and magnetic leatherette wrist rest.",
    "price": 21990,
    "discountPrice": null,
    "stock": 14,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-ea2d8ba1-93b2-4588-b07a-38a22d50d8e6.jpg?v=1791018304242"
    ],
    "specs": {
      "Switches": "Razer Gen-2 Analog Optical",
      "Actuation": "0.1mm - 4.0mm with Rapid Trigger",
      "TopPlate": "Brushed Aluminum 5052",
      "Keycaps": "Textured Doubleshot PBT"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.677Z"
  },
  {
    "id": "a5ad5601-ee2c-41f1-8fd6-036d749bc3d0",
    "title": "Corsair K70 MAX RGB Magnetic-Mechanical",
    "slug": "corsair-k70-max-rgb",
    "description": "MGX adjustable magnetic switches with dual-point actuation (press halfway to walk, bottom out to sprint) and high-density acoustic dampening foam.",
    "price": 20990,
    "discountPrice": 18990,
    "stock": 8,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-a5ad5601-ee2c-41f1-8fd6-036d749bc3d0.jpg?v=1791018306944"
    ],
    "specs": {
      "Switches": "Corsair MGX Magnetic Switches",
      "PollingRate": "8000Hz Hyper-Polling AXON",
      "DualPointActuation": "Two actions per single keypress",
      "WristRest": "Magnetic Memory Foam"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.691Z"
  },
  {
    "id": "dcf41325-bd1f-431b-b7bd-607f89013f7d",
    "title": "Logitech G PRO X TKL LIGHTSPEED Pink Edition",
    "slug": "logitech-g-pro-x-tkl-lightspeed",
    "description": "Designed with esports pros to eliminate barriers to victory. Dual-shot PBT keycaps, standard bottom row layout, game mode switch, and media rollers.",
    "price": 18990,
    "discountPrice": 16990,
    "stock": 16,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-dcf41325-bd1f-431b-b7bd-607f89013f7d.jpg?v=1791018309401"
    ],
    "specs": {
      "Switches": "GX Brown Tactile / GX Red Linear",
      "BatteryLife": "Up to 50 hours per charge",
      "Wireless": "LIGHTSPEED 1ms Gaming Wireless",
      "Port": "USB-C Fast Charging"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.707Z"
  },
  {
    "id": "c5672c06-f5ac-4394-a547-1e982f483b53",
    "title": "ASUS ROG Azoth OLED 75% Custom",
    "slug": "asus-rog-azoth-oled-75",
    "description": "Silicon gasket mount with three layers of dampening foam, hot-swappable pre-lubed ROG NX switches, 2-inch OLED panel with three-way control knob, and switch lube kit.",
    "price": 23990,
    "discountPrice": 21990,
    "stock": 9,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-c5672c06-f5ac-4394-a547-1e982f483b53.jpg?v=1791018312380"
    ],
    "specs": {
      "Gasket": "Silicone Gaskets + 3 Foam Layers",
      "Screen": "2-inch OLED Monochrome Display",
      "Battery": "Over 2,000 hours (OLED/RGB off)",
      "KitIncluded": "Krytox GPL-205-GD0 Lube + Opener"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.724Z"
  },
  {
    "id": "19fa55b2-6ad0-4b05-b177-e7e90d119b0d",
    "title": "NuPhy Air75 V2 Ultra-Slim Wireless",
    "slug": "nuphy-air75-v2-ultra-slim",
    "description": "Worlds fastest low-profile mechanical keyboard with 1000Hz polling rate in 2.4G wireless mode, Gateron low-profile switches, and QMK/VIA firmware.",
    "price": 13990,
    "discountPrice": 12490,
    "stock": 18,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-19fa55b2-6ad0-4b05-b177-e7e90d119b0d.jpg?v=1791018316521"
    ],
    "specs": {
      "Thickness": "13.5mm Ultra-Thin",
      "Switches": "Gateron Low-Profile Cowberry Linear",
      "Keycaps": "Coast PBT Dye-Sub",
      "Polling": "1000Hz 2.4GHz Wireless"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.741Z"
  },
  {
    "id": "a773e293-da86-48d4-ba32-8f07255c89f0",
    "title": "Glorious GMMK PRO 75% Barebones Black Slate",
    "slug": "glorious-gmmk-pro-75-black-slate",
    "description": "Modular mechanical keyboard with integrated programmable rotary encoder knob, factory-lubed GOAT stabilizers, and 16.8 million per-key RGB.",
    "price": 15490,
    "discountPrice": 13990,
    "stock": 11,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-a773e293-da86-48d4-ba32-8f07255c89f0.jpg?v=1791018319509"
    ],
    "specs": {
      "Chassis": "CNC Machined Anodized Aluminum",
      "Layout": "75% Compact 82-Key",
      "Sockets": "5-Pin Universal Kailh Hot-Swap",
      "RGB": "Per-Key Backlight + Side Diffused Accent Bars"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.755Z"
  },
  {
    "id": "3fc6e9fc-7e7f-4a5f-93e1-7859b758b09f",
    "title": "Ducky One 3 RGB Matcha TKL",
    "slug": "ducky-one-3-rgb-matcha-tkl",
    "description": "QUACK Mechanics design philosophy: true PBT double-shot keycaps, optimized weight distribution, multi-layered EVA foam dampening, and Cherry MX switches.",
    "price": 12990,
    "discountPrice": 11990,
    "stock": 20,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-3fc6e9fc-7e7f-4a5f-93e1-7859b758b09f.jpg?v=1791018321838"
    ],
    "specs": {
      "Switches": "Cherry MX Speed Silver",
      "Keycaps": "Seamless Double-Shot PBT",
      "Stabilizers": "V2 Ducky Factory-Lubed",
      "Cable": "Detachable Braided Type-C"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.767Z"
  },
  {
    "id": "76c632a1-166f-4eac-bda8-68e42a8f7c83",
    "title": "Epomaker RT100 Retro with Mini Display",
    "slug": "epomaker-rt100-retro",
    "description": "Vintage 90s aesthetic keyboard with a detachable retro mini TV smart display showing system clock, CPU temp, battery level, and custom animations.",
    "price": 9990,
    "discountPrice": 8990,
    "stock": 22,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-76c632a1-166f-4eac-bda8-68e42a8f7c83.jpg?v=1791018325029"
    ],
    "specs": {
      "Display": "Detachable Mini TV Smart Screen",
      "Layout": "97-Key Compact Full-Size",
      "Connectivity": "Bluetooth 5.0, 2.4GHz, Type-C",
      "Battery": "5000mAh Massive Cell"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.781Z"
  },
  {
    "id": "3514865a-1e7a-4d3a-8a65-5d1e9f22b977",
    "title": "Akko 5075B Plus Multi-Mode ISO Nordic",
    "slug": "akko-5075b-plus-multi-mode",
    "description": "Gasket-mounted keyboard with polycarbonate plate, Akko V3 Cream Yellow Pro switches, and side RGB ambient light strip diffuser.",
    "price": 8490,
    "discountPrice": 7790,
    "stock": 25,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-3514865a-1e7a-4d3a-8a65-5d1e9f22b977.jpg?v=1791018328674"
    ],
    "specs": {
      "Mount": "Gasket Mount Structure",
      "Switches": "Akko V3 Cream Yellow Pro Linear",
      "Plate": "Polycarbonate with Poron Foam",
      "Battery": "3000mAh"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.793Z"
  },
  {
    "id": "fc3f435c-d132-4c6b-a1fa-779482bd8730",
    "title": "Angry Miao Cyberboard R4 Mech-Suit",
    "slug": "angry-miao-cyberboard-r4",
    "description": "Cyberpunk inspired bespoke keyboard featuring a 200-LED customizable matrix panel on the rear, CNC milled aerospace aluminum, and leaf spring mount.",
    "price": 64990,
    "discountPrice": null,
    "stock": 2,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-fc3f435c-d132-4c6b-a1fa-779482bd8730.jpg?v=1791018331505"
    ],
    "specs": {
      "Matrix": "200 Individual Micro-LED Rear Display",
      "Mount": "3-Stage Adjustable Leaf Spring",
      "Weight": "2.95 kg (Solid Aluminum)",
      "Wireless": "Bluetooth 5.1 with Qi Wireless Charging"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.805Z"
  },
  {
    "id": "bfee8aa7-f51a-4a0a-8d0c-81aa3fef0470",
    "title": "Higround Basecamp 65 Summit Edition",
    "slug": "higround-basecamp-65-summit",
    "description": "High-art limited designer keyboard with five-sided dye-sublimated graphics, aluminum switch plate, and pre-lubed White Flame switches.",
    "price": 13490,
    "discountPrice": 11990,
    "stock": 14,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-bfee8aa7-f51a-4a0a-8d0c-81aa3fef0470.jpg?v=1791018334916"
    ],
    "specs": {
      "Switches": "TTC x Higround White Flame (Pre-Lubed)",
      "Dampening": "Dual Dual-Layer Silicone Dampeners",
      "Keycaps": "1.5mm Thick PBT 5-Sided Dye-Sub",
      "HotSwap": "TTC Universal Sockets"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.820Z"
  },
  {
    "id": "f7b3aebd-f954-4dc6-8572-d2de17d22fe0",
    "title": "Keychron V1 QMK Custom 75%",
    "slug": "keychron-v1-qmk-custom-75",
    "description": "The definitive gateway custom mechanical keyboard. Translucent frosted body, screw-in stabilizers, and full QMK/VIA key reprogramming support.",
    "price": 7490,
    "discountPrice": 6990,
    "stock": 30,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
    "category": {
      "id": "08e0cdbf-a737-4763-a1bd-ad51dd475755",
      "name": "Mechanical Keyboards",
      "slug": "mechanical-keyboards"
    },
    "images": [
      "/products/prod-f7b3aebd-f954-4dc6-8572-d2de17d22fe0.jpg?v=1791018339207"
    ],
    "specs": {
      "Switches": "Keychron K Pro Red Linear",
      "Keycaps": "OSA Profile Double-Shot PBT",
      "OS_Support": "Mac and Windows Hardware Toggle",
      "PollingRate": "1000Hz Wired Type-C"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.832Z"
  },
  {
    "id": "12115ca3-21b1-48b4-b67e-8303b2d34052",
    "title": "Audeze Maxwell Wireless Audiophile Gaming",
    "slug": "audeze-maxwell-wireless",
    "description": "Massive 90mm planar magnetic drivers deliver studio-reference audio with zero distortion, 80+ hour battery life, and AI-powered noise-filtering microphone.",
    "price": 32990,
    "discountPrice": 29990,
    "stock": 8,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-12115ca3-21b1-48b4-b67e-8303b2d34052.jpg?v=1791018342150"
    ],
    "specs": {
      "Drivers": "90mm Planar Magnetic Neodymium",
      "FrequencyResponse": "10Hz - 50,000Hz",
      "BatteryLife": "80+ Hours with Fast Charge (20min = 24hr)",
      "Wireless": "Ultra-low Latency 2.4GHz + BT 5.3 LE Audio LDAC",
      "Microphone": "Detachable Hypercardioid with Hardware AI Filter"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.845Z"
  },
  {
    "id": "93d8dcd6-5004-48b5-a3cd-7a686ad213de",
    "title": "Sennheiser HD 660S2 Open-Back Reference",
    "slug": "sennheiser-hd-660s2",
    "description": "Precision engineered in Ireland. Sub-bass tuning calibrated for deep, impactful acoustic presence and unmatched pinpoint spatial imaging in competitive games.",
    "price": 49990,
    "discountPrice": 44990,
    "stock": 6,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-93d8dcd6-5004-48b5-a3cd-7a686ad213de.jpg?v=1791018345173"
    ],
    "specs": {
      "Transducer": "38mm Dynamic Open-Back",
      "Impedance": "300 Ohms",
      "SoundPressureLevel": "104 dB (1 kHz / 1 Vrms)",
      "THD": "< 0.05% (1 kHz, 100 dB)",
      "Cable": "Detachable 6.35mm + 4.4mm Balanced Pentaconn"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.857Z"
  },
  {
    "id": "9acb6918-bfa0-4dc8-8a72-dfc87bd91d81",
    "title": "SteelSeries Arctis Nova Pro Wireless",
    "slug": "steelseries-arctis-nova-pro-wireless",
    "description": "Infinity Power System featuring dual hot-swappable batteries, active noise cancellation, and multi-system base station connecting to PC and console simultaneously.",
    "price": 34990,
    "discountPrice": 31990,
    "stock": 10,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-9acb6918-bfa0-4dc8-8a72-dfc87bd91d81.jpg?v=1791018348416"
    ],
    "specs": {
      "BaseStation": "OLED Dual USB Multi-System Hub",
      "ANC": "4-Mic Hybrid Active Noise Cancellation",
      "AudioResolution": "Hi-Res 96kHz/24-Bit",
      "Software": "Sonar Audio Parametric EQ Suite"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.870Z"
  },
  {
    "id": "d4d9fdf8-1772-4bab-98d9-2e1cd69767c6",
    "title": "Beyerdynamic DT 990 PRO 250 Ohm Black Edition",
    "slug": "beyerdynamic-dt-990-pro-black",
    "description": "Handcrafted in Germany. The open-back benchmark for positional audio cues, footstep discernment, and wide natural soundstage.",
    "price": 14990,
    "discountPrice": 13490,
    "stock": 16,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-d4d9fdf8-1772-4bab-98d9-2e1cd69767c6.jpg?v=1791018352297"
    ],
    "specs": {
      "AcousticDesign": "Open-Back Circumaural",
      "Impedance": "250 Ohms (Requires Amp/DAC)",
      "EarPads": "Soft Velour Memory Foam",
      "Cable": "Coiled 3.0m Single-Sided"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.884Z"
  },
  {
    "id": "d44a8d6f-c01f-49a7-988a-9bad1071509d",
    "title": "Sony WH-1000XM5 Wireless Noise-Canceling",
    "slug": "sony-wh-1000xm5-wireless",
    "description": "Industry-leading noise cancelation powered by two processors and 8 microphones, carbon fiber composite drivers, and crystal-clear hands-free calling.",
    "price": 29990,
    "discountPrice": 26990,
    "stock": 14,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-d44a8d6f-c01f-49a7-988a-9bad1071509d.jpg?v=1791018355340"
    ],
    "specs": {
      "Processors": "HD Noise Canceling QN1 + V1 Integrated",
      "Battery": "30 Hours with ANC On",
      "Codecs": "LDAC, AAC, SBC",
      "VoicePickup": "4 Beamforming Mics with AI Noise Reduction"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.897Z"
  },
  {
    "id": "1e099341-654f-4032-a157-22eb4f8beb6d",
    "title": "Audio-Technica ATH-M50xBT2 Professional",
    "slug": "audio-technica-ath-m50xbt2",
    "description": "Legendary M50x studio sound profile with wireless freedom, AK4331 DAC, low latency mode for gaming, and dual microphones for voice pickup.",
    "price": 16990,
    "discountPrice": 15490,
    "stock": 18,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-1e099341-654f-4032-a157-22eb4f8beb6d.jpg?v=1791018358904"
    ],
    "specs": {
      "Drivers": "45mm Large-Aperture Rare-Earth Neodymium",
      "Battery": "50 Hours Continuous Playback",
      "InternalDAC": "Asahi Kasei AK4331",
      "App": "A-T Connect App with Parametric EQ"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.911Z"
  },
  {
    "id": "b30cd022-3148-4642-a4a7-37f510948af7",
    "title": "Razer BlackShark V2 Pro (2024 Edition)",
    "slug": "razer-blackshark-v2-pro-2024",
    "description": "Equipped with HyperClear Super Wideband 9.6kHz mic, onboard tuned FPS audio profiles for Apex, CS2 and CoD, and TriForce Titanium 50mm drivers.",
    "price": 19990,
    "discountPrice": 17990,
    "stock": 12,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-b30cd022-3148-4642-a4a7-37f510948af7.jpg?v=1791018362403"
    ],
    "specs": {
      "Drivers": "TriForce Titanium 50mm Diaphragms",
      "Microphone": "Razer HyperClear Super Wideband 9.6kHz",
      "BatteryLife": "Up to 70 Hours",
      "EarCushions": "Ultra-Soft FlowKnit Memory Foam"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.923Z"
  },
  {
    "id": "be18dd11-f93b-432f-a264-92ea5b9bc038",
    "title": "Logitech G PRO X 2 LIGHTSPEED Wireless",
    "slug": "logitech-g-pro-x-2-lightspeed",
    "description": "Worlds first pro gaming headset with 50mm Graphene drivers for unmatched audio clarity, speed, and reduced distortion across all frequencies.",
    "price": 24990,
    "discountPrice": 22490,
    "stock": 10,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-be18dd11-f93b-432f-a264-92ea5b9bc038.jpg?v=1791018364918"
    ],
    "specs": {
      "Drivers": "50mm Pure Graphene Diaphragm",
      "WirelessRange": "Up to 30 Meters via LIGHTSPEED",
      "Connectivity": "LIGHTSPEED, Bluetooth, 3.5mm Wired",
      "BatteryLife": "Up to 50 Hours"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.936Z"
  },
  {
    "id": "9b74b60c-69f3-41d5-8381-1c14c98ea95f",
    "title": "HyperX Cloud III Wireless 120-Hour Battery",
    "slug": "hyperx-cloud-iii-wireless",
    "description": "Legendary signature Cloud comfort with an astounding 120 hours of battery life on a single charge and DTS Headphone:X spatial audio.",
    "price": 14990,
    "discountPrice": 13490,
    "stock": 20,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-9b74b60c-69f3-41d5-8381-1c14c98ea95f.jpg?v=1791018367688"
    ],
    "specs": {
      "Battery": "Up to 120 Hours",
      "Drivers": "Angled 53mm Dynamic Drivers",
      "Mic": "10mm Ultra-Clear with Mesh Filter",
      "SpatialAudio": "DTS Headphone:X Lifetime Activation"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.950Z"
  },
  {
    "id": "a7a9d101-07bb-48e1-90d0-647536bf472d",
    "title": "Corsair HS80 RGB Wireless Spatial Audio",
    "slug": "corsair-hs80-rgb-wireless",
    "description": "Broadcast-grade omnidirectional microphone paired with custom-tuned 50mm high-density neodymium drivers and Dolby Atmos spatial surround.",
    "price": 13990,
    "discountPrice": 12490,
    "stock": 15,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-a7a9d101-07bb-48e1-90d0-647536bf472d.jpg?v=1791018371892"
    ],
    "specs": {
      "SpatialAudio": "Dolby Atmos PC Included",
      "Wireless": "Slipstream 24-bit/96kHz Fidelity",
      "Headband": "Floating Stress-Relief Ski Goggle Strap",
      "Lighting": "Subtle Corsair Logo RGB"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.962Z"
  },
  {
    "id": "0caab1bf-5a13-44c6-abca-0765e91d8672",
    "title": "Rode NTH-100 Professional Studio Monitor",
    "slug": "rode-nth-100-professional",
    "description": "Acoustically matched 40mm drivers, memory foam earcups infused with CoolTech gel to reduce wearing fatigue during marathon game development sessions.",
    "price": 12990,
    "discountPrice": 11490,
    "stock": 17,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-0caab1bf-5a13-44c6-abca-0765e91d8672.jpg?v=1791018375238"
    ],
    "specs": {
      "AcousticDesign": "Closed-Back Passive Isolation",
      "EarPads": "Alcantara with CoolTech Heat Dissipating Gel",
      "CableLock": "FitLok Headband Locking System",
      "FrequencyRange": "5Hz - 35kHz"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.978Z"
  },
  {
    "id": "3aa70499-33fc-4572-8b8a-a6d31c7193e1",
    "title": "Bose QuietComfort Ultra Spatial Headphones",
    "slug": "bose-qc-ultra-spatial",
    "description": "World-class active noise cancellation with breakthrough Bose Immersive Audio that takes what you are hearing out of your head and places it in front of you.",
    "price": 34990,
    "discountPrice": 31990,
    "stock": 9,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-3aa70499-33fc-4572-8b8a-a6d31c7193e1.jpg?v=1791018377837"
    ],
    "specs": {
      "SpatialTech": "Bose Immersive Audio Spatializer",
      "Battery": "Up to 24 Hours (18 hrs Immersive)",
      "Calibration": "CustomTune Sound Personalization",
      "Codec": "Snapdragon Sound with aptX Adaptive"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:20.993Z"
  },
  {
    "id": "25e35632-441c-45d7-85db-6cfa83c7c831",
    "title": "Shure SRH1840 Open-Back Mastering Cans",
    "slug": "shure-srh1840-open-back",
    "description": "Individually matched 40mm neodymium drivers, aircraft-grade aluminum alloy yoke, and stainless steel grilles for pristine acoustic transparency.",
    "price": 44990,
    "discountPrice": 39990,
    "stock": 5,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-25e35632-441c-45d7-85db-6cfa83c7c831.jpg?v=1791018381187"
    ],
    "specs": {
      "Drivers": "40mm Neodymium Matched Pairs",
      "Impedance": "65 Ohms",
      "Frame": "Aircraft Aluminum Alloy Yoke",
      "Cables": "Dual-Exit Detachable Kevlar Reinforced"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.012Z"
  },
  {
    "id": "fcb3b50d-0ca2-43c2-bc96-dd35c979dce0",
    "title": "Drop + Sennheiser PC38X Gaming Headset",
    "slug": "drop-sennheiser-pc38x",
    "description": "Widely praised by esports audio analysts as the finest analog gaming headset on earth. Angled drivers give natural speaker-like sound positioning.",
    "price": 16990,
    "discountPrice": 15490,
    "stock": 14,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-fcb3b50d-0ca2-43c2-bc96-dd35c979dce0.jpg?v=1791018384445"
    ],
    "specs": {
      "AcousticDesign": "Open-Back Angled Transducers",
      "Impedance": "28 Ohms (Easy to Drive on PC & Console)",
      "Mic": "Broadcast Quality Noise-Canceling with Flip-to-Mute",
      "Pads": "Velour and Breathable Knit Mesh Included"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.026Z"
  },
  {
    "id": "9eb832d8-45d8-4b18-bd44-0dd246342c8a",
    "title": "EPOS H3PRO Hybrid Low-Latency ANC",
    "slug": "epos-h3pro-hybrid-anc",
    "description": "Triple connectivity (Low-latency dongle, Bluetooth, USB) with dual-audio mixing: answer phone calls via Bluetooth while playing PC games without interruption.",
    "price": 21990,
    "discountPrice": 18990,
    "stock": 11,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
    "category": {
      "id": "e7eb4a52-5f99-49d5-bc72-047e9652d7d5",
      "name": "Pro Gaming Audio",
      "slug": "pro-gaming-audio"
    },
    "images": [
      "/products/prod-9eb832d8-45d8-4b18-bd44-0dd246342c8a.jpg?v=1791018388187"
    ],
    "specs": {
      "AudioMixing": "Simultaneous Bluetooth and 2.4GHz Game Audio",
      "NoiseCancellation": "Built-in ANC slider",
      "Mic": "Magnetic Detachable Boom Arm",
      "Battery": "Up to 38 Hours"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.042Z"
  },
  {
    "id": "bfc674e5-7c26-40e2-a409-c7188a870646",
    "title": "Steam Deck OLED 1TB Special Edition",
    "slug": "steam-deck-oled-1tb-special",
    "description": "The premier PC handheld gaming machine. 7.4-inch 90Hz HDR OLED display with 1,000 nits peak brightness, 6nm AMD APU, Wi-Fi 6E, and 50Wh battery.",
    "price": 64990,
    "discountPrice": 59990,
    "stock": 8,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-bfc674e5-7c26-40e2-a409-c7188a870646.jpg?v=1791018391059"
    ],
    "specs": {
      "Processor": "6nm AMD APU (Zen 2 4C/8T, 8 RDNA 2 CUs)",
      "RAM": "16GB LPDDR5-6400MHz",
      "Storage": "1TB NVMe SSD + MicroSD Slot",
      "Display": "7.4-inch 1280x800 HDR OLED 90Hz",
      "Battery": "50Wh (3 to 12 hours playtime)",
      "Wireless": "Wi-Fi 6E + Bluetooth 5.3"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.055Z"
  },
  {
    "id": "778bd5b8-561f-418c-96fd-8e1325af6809",
    "title": "ASUS ROG Ally X Gaming Handheld (2024)",
    "slug": "asus-rog-ally-x-handheld",
    "description": "Upgraded with colossal 80Wh battery, 24GB high-speed LPDDR5X RAM, full-size 2280 1TB SSD slot, dual USB-C ports with USB4 40Gbps, and refined ergonomic grips.",
    "price": 79990,
    "discountPrice": 74990,
    "stock": 10,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-778bd5b8-561f-418c-96fd-8e1325af6809.jpg?v=1791018393324"
    ],
    "specs": {
      "Processor": "AMD Ryzen Z1 Extreme (8C/16T, 12 RDNA 3 CUs)",
      "RAM": "24GB LPDDR5X-7500MHz",
      "Storage": "1TB PCIe 4.0 NVMe M.2 2280",
      "Display": "7-inch FHD 120Hz 500 nits FreeSync Premium",
      "Battery": "80Wh (Double the original capacity)",
      "Weight": "678 grams"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.068Z"
  },
  {
    "id": "e5889a0e-0e70-4327-a8d2-fb174d19db9e",
    "title": "Lenovo Legion Go 8.8-inch Detachable",
    "slug": "lenovo-legion-go-detachable",
    "description": "Massive 8.8-inch QHD+ 144Hz display with detachable TrueStrike controllers featuring optical sensor FPS mouse mode and hall-effect joysticks.",
    "price": 69990,
    "discountPrice": 64990,
    "stock": 7,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-e5889a0e-0e70-4327-a8d2-fb174d19db9e.jpg?v=1791018396330"
    ],
    "specs": {
      "Processor": "AMD Ryzen Z1 Extreme",
      "RAM": "16GB LPDDR5X-7500",
      "Storage": "512GB PCIe Gen4 SSD",
      "Display": "8.8-inch WQXGA (2560x1600) 144Hz 500 nits",
      "Controllers": "Detachable with Hall Effect Joysticks + FPS Trackpad"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.084Z"
  },
  {
    "id": "338c888b-a6db-42cd-8e9d-42c286aee512",
    "title": "PlayStation 5 Pro 2TB Console",
    "slug": "playstation-5-pro-2tb",
    "description": "PlayStation Spectral Super Resolution (PSSR) AI upscaling, upgraded GPU with 67% more compute units, advanced ray tracing hardware, and 2TB high-speed SSD.",
    "price": 69990,
    "discountPrice": null,
    "stock": 6,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-338c888b-a6db-42cd-8e9d-42c286aee512.jpg?v=1791018398878"
    ],
    "specs": {
      "AI_Upscaling": "PlayStation Spectral Super Resolution (PSSR)",
      "Storage": "2TB Custom High-Speed NVMe SSD",
      "RayTracing": "Advanced 2x-3x Ray Tracing Hardware",
      "FrameRates": "Target 4K 60FPS / 120FPS Performance Mode"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.095Z"
  },
  {
    "id": "d7bb79ac-2a8d-4d90-a967-a6bf02c3dab4",
    "title": "Xbox Series X 2TB Galaxy Black Special",
    "slug": "xbox-series-x-2tb-galaxy-black",
    "description": "Galaxy Black chassis with celestial green speckles, 12 teraflops of graphical processing horsepower, Quick Resume, and double internal storage.",
    "price": 59990,
    "discountPrice": 56990,
    "stock": 8,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-d7bb79ac-2a8d-4d90-a967-a6bf02c3dab4.jpg?v=1791018401331"
    ],
    "specs": {
      "Storage": "2TB Custom NVMe SSD",
      "ComputePower": "12 Teraflops Custom RDNA 2 GPU",
      "Resolution": "True 4K Gaming up to 120 FPS",
      "Audio": "Dolby Atmos & DTS:X Spatial Sound"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.109Z"
  },
  {
    "id": "ea58c1c2-eaf9-4c11-883c-3144d32ffde9",
    "title": "Nintendo Switch OLED Model Mario Red",
    "slug": "nintendo-switch-oled-mario-red",
    "description": "Vibrant 7-inch OLED screen, wide adjustable tabletop kickstand, dock with wired LAN port, and 64GB of internal storage in iconic Mario Red finish.",
    "price": 32990,
    "discountPrice": 29990,
    "stock": 14,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-ea58c1c2-eaf9-4c11-883c-3144d32ffde9.jpg?v=1791018404640"
    ],
    "specs": {
      "Display": "7.0-inch OLED Multi-Touch 720p (1080p Docked)",
      "Storage": "64GB Internal + MicroSD Support",
      "Dock": "Wired LAN Port + HDMI + USB",
      "Battery": "4.5 to 9 Hours"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.121Z"
  },
  {
    "id": "20b907ba-7e14-4982-8782-ffd2eb97ba85",
    "title": "Ayaneo KUN 8.4-inch Handheld (AMD 7840U)",
    "slug": "ayaneo-kun-handheld-7840u",
    "description": "Flagship handheld with dual intelligent touchpads, 54W TDP peak thermal dissipation, Windows Hello facial recognition, and 75Wh battery.",
    "price": 94990,
    "discountPrice": 89990,
    "stock": 4,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-20b907ba-7e14-4982-8782-ffd2eb97ba85.jpg?v=1791018409351"
    ],
    "specs": {
      "Processor": "AMD Ryzen 7 7840U (Up to 54W TDP)",
      "RAM": "32GB LPDDR5X",
      "Storage": "1TB M.2 2280 PCIe 4.0 SSD",
      "Display": "8.4-inch 2560x1600 IPS 500 nits",
      "Biometrics": "Windows Hello IR Face Recognition + Fingerprint"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.134Z"
  },
  {
    "id": "5d3e768e-9ae1-4b72-a702-b22308db110d",
    "title": "GPD WIN 4 (2024) Slide Keyboard Handheld",
    "slug": "gpd-win-4-2024-slide",
    "description": "Pocket-sized PC handheld with slide-up 6-inch screen revealing a physical backlit QWERTY thumb keyboard, optical finger mouse, and Oculink 63Gbps port.",
    "price": 82990,
    "discountPrice": null,
    "stock": 4,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-5d3e768e-9ae1-4b72-a702-b22308db110d.jpg?v=1791018411906"
    ],
    "specs": {
      "Processor": "AMD Ryzen 7 8840U with Ryzen AI",
      "RAM": "32GB LPDDR5X",
      "Storage": "2TB NVMe SSD",
      "Screen": "6-inch 1080p Native Landscape 60Hz",
      "Keyboard": "Slide-up Hardware QWERTY Keyboard",
      "Port": "Oculink eGPU Direct Interface"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.149Z"
  },
  {
    "id": "4108ee8a-d7d8-4399-9d1e-94ecf0ff602b",
    "title": "Meta Quest 3 512GB Mixed Reality VR",
    "slug": "meta-quest-3-512gb",
    "description": "Next-gen breakthrough mixed reality headset featuring 4K+ Infinite Display, pancake optics, color passthrough cameras, and Snapdragon XR2 Gen 2 chip.",
    "price": 54990,
    "discountPrice": 49990,
    "stock": 11,
    "rating": 4.9,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-4108ee8a-d7d8-4399-9d1e-94ecf0ff602b.jpg?v=1791018414225"
    ],
    "specs": {
      "Chipset": "Qualcomm Snapdragon XR2 Gen 2 (2x GPU perf)",
      "Resolution": "2064 x 2208 per eye 4K+ Infinite Display",
      "Passthrough": "Dual RGB Color Cameras for Mixed Reality",
      "Storage": "512GB High-Speed Flash"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.161Z"
  },
  {
    "id": "969e29cc-14aa-4fe6-8954-342dce22be80",
    "title": "PlayStation Portal Remote Player",
    "slug": "playstation-portal-remote-player",
    "description": "Stream games from your PS5 over home Wi-Fi directly to an 8-inch 1080p 60Hz LCD screen with integrated DualSense wireless controller haptics.",
    "price": 19990,
    "discountPrice": 18490,
    "stock": 12,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-969e29cc-14aa-4fe6-8954-342dce22be80.jpg?v=1791018416998"
    ],
    "specs": {
      "Display": "8.0-inch 1080p LCD 60Hz",
      "Features": "DualSense Adaptive Triggers & Haptic Feedback",
      "Connectivity": "Wi-Fi 5GHz Remote Play Stream",
      "Audio": "PlayStation Link Lossless Audio"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.175Z"
  },
  {
    "id": "fb767b86-9b29-4ae5-b16e-5b57b07b6482",
    "title": "Analogue Pocket FPGA Handheld Black",
    "slug": "analogue-pocket-fpga-black",
    "description": "Multi-video-game-system portable. Out of the box, Pocket is compatible with the 2,780+ Game Boy, GBC & GBA game cartridge library via hardware FPGA emulation.",
    "price": 28990,
    "discountPrice": null,
    "stock": 6,
    "rating": 5,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-fb767b86-9b29-4ae5-b16e-5b57b07b6482.jpg?v=1791018422744"
    ],
    "specs": {
      "Hardware": "Dual Altera Cyclone V & IV FPGA Chips",
      "Display": "3.5-inch 1600x1440 615ppi Gorilla Glass LCD",
      "Compatibility": "Native GB, GBC, GBA Cartridges (Atari Lynx/Neo Geo via adapters)",
      "Battery": "4300mAh Li-ion (6 to 10 hours)"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.189Z"
  },
  {
    "id": "353b5006-8053-4074-ab08-d8289d016fc6",
    "title": "Anbernic RG556 OLED Android Handheld",
    "slug": "anbernic-rg556-oled",
    "description": "Ergonomic retro powerhouse featuring a 5.48-inch AMOLED display, Unisoc T820 6nm processor, hall joysticks, active cooling fan, and Android 13.",
    "price": 18990,
    "discountPrice": 16990,
    "stock": 18,
    "rating": 4.7,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-353b5006-8053-4074-ab08-d8289d016fc6.jpg?v=1791018426138"
    ],
    "specs": {
      "Processor": "Unisoc T820 6nm Octa-Core",
      "RAM": "8GB LPDDR4X",
      "Display": "5.48-inch AMOLED 1080x1920 Touch",
      "Battery": "5500mAh (Up to 8 hours)",
      "OS": "Android 13 with Key Mapping Engine"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.202Z"
  },
  {
    "id": "89518ccc-ed29-441a-aaf6-248566df18ea",
    "title": "Retroid Pocket 4 Pro Handheld Console",
    "slug": "retroid-pocket-4-pro",
    "description": "Pocketable emulation juggernaut powered by Dimensity 1100, analog hall effect triggers, active cooling system, and video-out via USB-C.",
    "price": 19990,
    "discountPrice": 17990,
    "stock": 5,
    "rating": 4.8,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-89518ccc-ed29-441a-aaf6-248566df18ea.jpg?v=1791018429950"
    ],
    "specs": {
      "Processor": "MediaTek Dimensity 1100 6nm",
      "RAM": "8GB LPDDR4x",
      "Storage": "128GB UFS 3.1",
      "Display": "4.7-inch 750x1334 60Hz 500 nits",
      "VideoOutput": "DisplayPort 1080p via USB-C"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.217Z"
  },
  {
    "id": "be2b7945-3f56-4c89-a8c2-6763e371f883",
    "title": "Logitech G Cloud Gaming Handheld",
    "slug": "logitech-g-cloud-handheld",
    "description": "Precision cloud streaming handheld optimized for Xbox Cloud Gaming and NVIDIA GeForce NOW with over 12 hours of continuous battery life.",
    "price": 27990,
    "discountPrice": 24990,
    "stock": 15,
    "rating": 4.5,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-be2b7945-3f56-4c89-a8c2-6763e371f883.jpg?v=1791018433395"
    ],
    "specs": {
      "Display": "7-inch IPS 1080p 60Hz Touchscreen",
      "Battery": "Over 12 Hours Runtime",
      "Weight": "463 grams Ultralight Ergonomics",
      "Services": "Xbox Game Pass, GeForce NOW, Steam Link Preloaded"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.227Z"
  },
  {
    "id": "596d6ae3-0539-496c-a86b-6193cdb1b7be",
    "title": "Razer Edge 5G Snapdragon G3x Tablet",
    "slug": "razer-edge-5g-handheld",
    "description": "Dedicated Snapdragon G3x Gen 1 chipset with active cooling, 144Hz AMOLED screen, and bundled Razer Kishi V2 Pro controller with hyper-realistic haptics.",
    "price": 36990,
    "discountPrice": 32990,
    "stock": 9,
    "rating": 4.6,
    "reviewCount": 28,
    "categoryId": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
    "category": {
      "id": "9ef0605f-616f-47c8-ba1d-5bb60c40c97d",
      "name": "Consoles & Handhelds",
      "slug": "consoles-and-handhelds"
    },
    "images": [
      "/products/prod-596d6ae3-0539-496c-a86b-6193cdb1b7be.jpg?v=1791018435128"
    ],
    "specs": {
      "Processor": "Snapdragon G3x Gen 1 Gaming Platform",
      "Display": "6.8-inch FHD+ AMOLED 144Hz",
      "Controller": "Razer Kishi V2 Pro with 3.5mm Passthrough",
      "Connectivity": "Wi-Fi 6E + Sub 6 / mmWave 5G"
    },
    "isFeatured": false,
    "createdAt": "2026-10-03T06:17:21.244Z"
  }
];
