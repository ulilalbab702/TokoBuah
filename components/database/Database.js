export const COLOURS = {
    white: '#ffffff',
    black: '#000000',
    green: '#00AC76',
    red: '#C04345',
    blue: '#0043F9',
    biru: '#A3B8FE',
    bg: '#D9E5FE',
    backgroundLight: '#F0F0F3',
    backgroundMedium: '#B9B9B9',
    backgroundDark: '#777777',
  };
  
  export const Items = [
    {
      id: 1,
      category: 'product',
      productName: 'Durian Musang King',
      productPrice: 45000,
      description:
        'Durian jenis Musang King | Memiliki daging yang tebal | Rasa yang sangat enak | Dengan harga yang terjangkau',
      isOff: true,
      offPercentage: 10,
      productImage: require('../database/images/products/durian.png'),
      isAvailable: true,
      productImageList: [
        require('../database/images/products/durian.png'),
        require('../database/images/products/durian1.png'),
        require('../database/images/products/durian2.png'),
      ],
    },
    {
      id: 2,
      category: 'product',
      productName: 'Apel',
      productPrice: 15000,
      description:
        'Apel dari daerah Cilacap | Memiliki rasa yang segar | Mengandung banyak vitamin | Kaya akan nutrisi',
      isOff: false,
      productImage: require('../database/images/products/apple.png'),
      isAvailable: true,
      productImageList: [
        require('../database/images/products/apple.png'),
        require('../database/images/products/apel2.png'),
        require('../database/images/products/apel3.png'),
      ],
    },
    {
      id: 3,
      category: 'accessory',
      productName: 'Strawberry',
      productPrice: 30000,
      description:
        'Strawberry yang di Impor dari China | Kualitas terbaik | Harga lumayan terjangkau | Tambahan ekstrak corona',
      isOff: true,
      offPercentage: 15,
      productImage: require('../database/images/accessories/straw.png'),
      isAvailable: true,
      productImageList: [
        require('../database/images/accessories/straw.png'),
        require('../database/images/accessories/straw3.png'),
        require('../database/images/accessories/straw2.png'),
      ],
    },
    {
      id: 4,
      category: 'accessory',
      productName: 'Anggur',
      productPrice: 35000,
      description:
        'Anggur yang di impor dari China | Kualitas terbaik | Rasa yang manis | Harga ramah di kantong',
      isOff: false,
      productImage: require('../database/images/accessories/grap.png'),
      isAvailable: true,
      productImageList: [
        require('../database/images/accessories/grap.png'),
        require('../database/images/accessories/grap3.png'),
        require('../database/images/accessories/grap2.png'),
      ],
    },
    {
      id: 5,
      category: 'accessory',
      productName: 'Young Pineapple',
      productPrice: 37000,
      description:
        'Young Pineapple di import dari Australia | Memiliki banyak khasiat | Mengandung banyak vitamin | Harga yang terjangkau',
      isOff: false,
      productImage: require('../database/images/accessories/nanas.png'),
      isAvailable: false,
      productImageList: [
        require('../database/images/accessories/nanas.png'),
        require('../database/images/accessories/nanas3.png'),
        require('../database/images/accessories/nanas2.png'),
      ],
    },
    {
      id: 6,
      category: 'accessory',
      productName: 'Lemon',
      productPrice: 45000,
      description:
        'Lemon yang di Import dari Singapura | Kualitas terbaik | Harga ramah di kantong | Dan rasa yang segar',
      isOff: false,
      productImage: require('../database/images/accessories/lemon.png'),
      isAvailable: true,
      productImageList: [
        require('../database/images/accessories/lemon.png'),
        require('../database/images/accessories/lemon3.png'),
        require('../database/images/accessories/lemon2.png'),
      ],
    },
  ];