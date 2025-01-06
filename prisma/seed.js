import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const products = [
    {
      productName: "Spiced Mint",
      image: "/products-images/image1.png",
      stock: 50,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
    {
      productName: "Sweet Straweberry",
      image: "/products-images/image2.png",
      stock: 60,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
    {
      productName: "Cool Blueberries",
      image: "/products-images/image3.png",
      stock: 50,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
    {
      productName: "Juicy Lemon",
      image: "/products-images/image4.png",
      stock: 50,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
    {
      productName: "Orange dream",
      image: "/products-images/image5.png",
      stock: 2,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
    {
      productName: "Fragrant Cinnamon",
      image: "/products-images/image6.png",
      stock: 0,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
    {
      productName: "Summer Cherries",
      image: "/products-images/image6.png",
      stock: 80,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
    {
      productName: "Clean Lavander",
      image: "/products-images/image6.png",
      stock: 10,
      wax: "Top grade Soy wax that delivers a smoke less, consistent burn",
      fragrance: "Premium quality ingredients with natural essential oils ",
      burningTime: "70-75",
      dimension: "10cm x 5cm",
      weight: "400",
      price: 9.99
    },
  ];

  for (const product of products) {
    await prisma.product.upsert({
      where: { productName: product.productName },
      update: {},
      create: product,
    });
    console.log(`Product "${product.productName}" was added/updated.`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
