export type Category = 'unstitched' | 'ready-to-wear' | 'prints' | 'accessories';

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  fabric: string;
  colors: string[];
  isNew?: boolean;
  isBestseller?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  selectedColor: string;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  description: string;
  image: string;
}

export const CONTACTS = {
  storeName: 'Eesha Eshal',
  tagline: 'We Deal In All Kinds Of Replica And Branded Prints',
  address: '81 G Uk Centre, Chuna Mandi Chowk, Lahore.',
  persons: [
    { name: 'M. Aqib', phone: '0320-2544522', raw: '+923202544522' },
    { name: 'M. Tayyab', phone: '0312-6267820', raw: '+923126267820' },
  ],
} as const;

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'unstitched',
    label: 'Unstitched',
    description: 'Premium unstitched fabrics for a tailored fit',
    image: 'https://images.pexels.com/photos/6045293/pexels-photo-6045293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'ready-to-wear',
    label: 'Ready to Wear',
    description: 'Effortless elegance, ready to grace your wardrobe',
    image: 'https://images.pexels.com/photos/15281126/pexels-photo-15281126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'prints',
    label: 'Branded Prints',
    description: 'Replica & branded prints — curated and collectible',
    image: 'https://images.pexels.com/photos/4566670/pexels-photo-4566670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    description: 'Finishing touches that complete the look',
    image: 'https://images.pexels.com/photos/17609847/pexels-photo-17609847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Royal Crimson Embroidered Suit',
    category: 'unstitched',
    price: 4200,
    originalPrice: 5200,
    image: 'https://images.pexels.com/photos/15281126/pexels-photo-15281126.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A regal three-piece unstitched suit featuring intricate thread embroidery on a rich crimson base. Includes printed dupatta and dyed trouser fabric.',
    fabric: 'Cotton Blend',
    colors: ['#9a2c2c', '#d04f4f', '#4d4436'],
    isBestseller: true,
  },
  {
    id: 'p2',
    name: 'Ivory Silk Unstitched Ensemble',
    category: 'unstitched',
    price: 5800,
    image: 'https://images.pexels.com/photos/7232503/pexels-photo-7232503.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Luminous ivory silk with delicate silver motifs. A timeless canvas for your personal tailoring — includes shirt, dupatta, and trouser fabric.',
    fabric: 'Pure Silk',
    colors: ['#ece9e2', '#d8d2c5', '#bdb4a0'],
    isNew: true,
  },
  {
    id: 'p3',
    name: 'Midnight Velvet Lawn Suit',
    category: 'unstitched',
    price: 3500,
    originalPrice: 4200,
    image: 'https://images.pexels.com/photos/8007347/pexels-photo-8007347.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Deep midnight velvet-touch lawn with a soft sheen. Printed with a botanical motif across the shirt and dupatta.',
    fabric: 'Velvet Lawn',
    colors: ['#322d24', '#1c1915', '#635744'],
  },
  {
    id: 'p4',
    name: 'Rose Petal Lawn Three-Piece',
    category: 'unstitched',
    price: 3900,
    image: 'https://images.pexels.com/photos/19856122/pexels-photo-19856122.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'Soft rose-petal lawn with a digitally printed floral spread. Includes dyed cambric trouser and a chiffon-printed dupatta.',
    fabric: 'Cotton Lawn',
    colors: ['#f6cccc', '#eea6a6', '#d8d2c5'],
    isBestseller: true,
  },
  {
    id: 'p5',
    name: 'Sapphire Blue Ready-to-Wear Kurti',
    category: 'ready-to-wear',
    price: 3200,
    originalPrice: 3800,
    image: 'https://images.pexels.com/photos/34155072/pexels-photo-34155072.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A flowing sapphire-blue kurti with a contrast yoke and side slits. Tailored for comfort and grace — ready to wear.',
    fabric: 'Viscose',
    colors: ['#627599', '#322d24', '#d8d2c5'],
    isNew: true,
  },
  {
    id: 'p6',
    name: 'Heritage Red Sari Dress',
    category: 'ready-to-wear',
    price: 6500,
    image: 'https://images.pexels.com/photos/17040985/pexels-photo-17040985.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A heritage-inspired draped dress in deep red with gold border detailing. A statement piece for festive occasions.',
    fabric: 'Georgette',
    colors: ['#9a2c2c', '#c08d3a', '#1c1915'],
    isBestseller: true,
  },
  {
    id: 'p7',
    name: 'Garden Bloom Ready Dress',
    category: 'ready-to-wear',
    price: 2800,
    originalPrice: 3400,
    image: 'https://images.pexels.com/photos/29006531/pexels-photo-29006531.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A breezy garden-bloom print dress with a cinched waist and flowing silhouette. Perfect for everyday elegance.',
    fabric: 'Cotton Poplin',
    colors: ['#a3bba5', '#7a9a7d', '#d8d2c5'],
  },
  {
    id: 'p8',
    name: 'Temple Trail Traditional Set',
    category: 'ready-to-wear',
    price: 4900,
    image: 'https://images.pexels.com/photos/31047326/pexels-photo-31047326.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'An earthy traditional set inspired by temple architecture. Includes tunic and matching trouser with woven trims.',
    fabric: 'Linen Blend',
    colors: ['#7d6f57', '#4d4436', '#bdb4a0'],
    isNew: true,
  },
  {
    id: 'p9',
    name: 'Jaipur Block-Print Replica',
    category: 'prints',
    price: 2400,
    originalPrice: 3000,
    image: 'https://images.pexels.com/photos/4566670/pexels-photo-4566670.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A faithful replica of classic Jaipur block prints — vivid pigments on breathable cotton. Sold as a printed shirt piece.',
    fabric: 'Cotton',
    colors: ['#d04f4f', '#c08d3a', '#322d24'],
    isBestseller: true,
  },
  {
    id: 'p10',
    name: 'Antigua Woven Print Fabric',
    category: 'prints',
    price: 2600,
    image: 'https://images.pexels.com/photos/2928381/pexels-photo-2928381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A vibrant woven-print fabric inspired by traditional Guatemalan textiles. Bold stripes and geometric motifs.',
    fabric: 'Cotton Blend',
    colors: ['#b93838', '#5c7d5f', '#c08d3a'],
    isNew: true,
  },
  {
    id: 'p11',
    name: 'African Wax Print Replica',
    category: 'prints',
    price: 2200,
    originalPrice: 2800,
    image: 'https://images.pexels.com/photos/38487458/pexels-photo-38487458.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A bold African wax-print replica with rich, saturated colors and symbolic patterns. Sold by the yard.',
    fabric: 'Wax Cotton',
    colors: ['#9a2c2c', '#635744', '#d2a652'],
  },
  {
    id: 'p12',
    name: 'Vintage Stack Print Collection',
    category: 'prints',
    price: 3000,
    image: 'https://images.pexels.com/photos/28303410/pexels-photo-28303410.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A curated set of vintage-inspired print fabrics with intricate patterns and rich textures. Three coordinated pieces.',
    fabric: 'Cotton Blend',
    colors: ['#635744', '#9a2c2c', '#5c7d5f'],
    isBestseller: true,
  },
  {
    id: 'p13',
    name: 'Ember Corduroy Shawl',
    category: 'accessories',
    price: 1800,
    originalPrice: 2200,
    image: 'https://images.pexels.com/photos/35009242/pexels-photo-35009242.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A warm ember-toned corduroy shawl with a soft, ribbed texture. The perfect layering companion for cooler evenings.',
    fabric: 'Corduroy',
    colors: ['#835626', '#6b4423', '#4d4436'],
    isNew: true,
  },
  {
    id: 'p14',
    name: 'Patterned Shawl Collection',
    category: 'accessories',
    price: 2000,
    image: 'https://images.pexels.com/photos/17609847/pexels-photo-17609847.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A set of vertically-hung patterned shawls with intricate designs and rich, jewel-toned colors. Sold as a pair.',
    fabric: 'Wool Blend',
    colors: ['#9a2c2c', '#322d24', '#c08d3a'],
    isBestseller: true,
  },
  {
    id: 'p15',
    name: 'Silk Tie Accessory Set',
    category: 'accessories',
    price: 1500,
    originalPrice: 1900,
    image: 'https://images.pexels.com/photos/34342977/pexels-photo-34342977.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'An elegant arrangement of silk ties with varied patterns. A versatile accessory set for formal occasions.',
    fabric: 'Silk',
    colors: ['#9a2c2c', '#322d24', '#627599'],
  },
  {
    id: 'p16',
    name: 'Lace & Textile Trim Bundle',
    category: 'accessories',
    price: 1200,
    image: 'https://images.pexels.com/photos/18587721/pexels-photo-18587721.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description: 'A curated bundle of delicate lace and textile trims for embellishing your creations. Multiple patterns included.',
    fabric: 'Cotton Lace',
    colors: ['#ece9e2', '#d8d2c5', '#bdb4a0'],
    isNew: true,
  },
];
