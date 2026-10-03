const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');
const { PrismaClient } = require('./server/node_modules/@prisma/client');

const firebaseConfig = {
  apiKey: "AIzaSyD24TnKh7pXlhlkHrYsrg3S1Hw1pSopVfK",
  authDomain: "kalki-arcues.firebaseapp.com",
  projectId: "kalki-arcues",
  storageBucket: "kalki-arcues.firebasestorage.app",
  messagingSenderId: "600974562072",
  appId: "1:600974562072:web:4c67084bdb359fb5da046d",
  measurementId: "G-YEL7XPCH1J"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const prisma = new PrismaClient();

async function main() {
  console.log('🔥 Uploading all catalog data to Firebase Cloud Firestore...');

  const categories = await prisma.category.findMany();
  console.log(`Found ${categories.length} categories.`);
  for (const cat of categories) {
    await setDoc(doc(db, 'categories', cat.slug), {
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      image: cat.image,
      updatedAt: new Date().toISOString()
    }, { merge: true });
  }
  console.log('✓ Categories uploaded to Firestore.');

  const products = await prisma.product.findMany({
    include: { category: true }
  });
  console.log(`Found ${products.length} products to store in Firebase.`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    await setDoc(doc(db, 'products', p.id), {
      id: p.id,
      title: p.title,
      slug: p.slug,
      description: p.description,
      price: p.price,
      discountPrice: p.discountPrice,
      stock: p.stock,
      rating: p.rating,
      categorySlug: p.category.slug,
      categoryName: p.category.name,
      images: JSON.parse(p.images),
      specs: JSON.parse(p.specs),
      isFeatured: p.isFeatured,
      updatedAt: new Date().toISOString()
    }, { merge: true });

    if ((i + 1) % 25 === 0 || i === products.length - 1) {
      console.log(`[${i + 1}/${products.length}] Uploaded to Firebase Firestore`);
    }
  }

  console.log('\n=================================================');
  console.log('🎉 SUCCESS: All catalog data stored permanently in Firebase Firestore!');
  console.log('=================================================\n');

  await prisma.$disconnect();
  process.exit(0);
}

main().catch(err => {
  console.error('Firestore upload error:', err);
  process.exit(1);
});
