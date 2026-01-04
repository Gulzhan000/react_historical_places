// src/api/tourService.js
const STORAGE_KEY = 'historical_tours';

// Начальные данные
const initialTours = [
  {
    id: 1,
    title: "Great Pyramid of Giza",
    description: "The last surviving wonder of the ancient world",
    fullInfo: "The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex bordering present-day Giza in Greater Cairo, Egypt. It is the oldest of the Seven Wonders of the Ancient World, and the only one to remain largely intact.",
    country: "Egypt",
    year: "2560 BC",
    duration: "7 days",
    price: "$2,500",
    image: "https://miro.medium.com/v2/resize:fit:1200/1*VhDpUbuZQC4tLoP9qQ6W5A.jpeg",
    createdAt: "2025-01-15T10:30:00Z"
  },
  {
    id: 2,
    title: "Colosseum",
    description: "Ancient Roman amphitheater in the center of Rome",
    fullInfo: "The Colosseum is an oval amphitheater in the center of the city of Rome, Italy, just east of the Roman Forum. It is the largest ancient amphitheater ever built, and is still the largest standing amphitheater in the world today, despite its age.",
    country: "Italy",
    year: "80 AD",
    duration: "5 days",
    price: "$1,800",
    image: "https://images.unsplash.com/photo-1529260830199-42c24126f198?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    createdAt: "2025-01-20T14:45:00Z"
  },
  {
    id: 3,
    title: "Parthenon",
    description: "Ancient temple dedicated to the goddess Athena",
    fullInfo: "The Parthenon is a former temple on the Athenian Acropolis, Greece, dedicated to the goddess Athena, whom the people of Athens considered their patron. Construction began in 447 BC when the Athenian Empire was at the peak of its power.",
    country: "Greece",
    year: "432 BC",
    duration: "6 days",
    price: "$2,100",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    createdAt: "2025-01-25T09:15:00Z"
  }
];

const getToursFromStorage = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTours));
    return initialTours;
  }
  try {
    return JSON.parse(stored);
  } catch {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTours));
    return initialTours;
  }
};

export const tourService = {
  getAllTours: async () => {
    return getToursFromStorage();
  },

  getTourById: async (id) => {
    const tours = getToursFromStorage();
    return tours.find(tour => tour.id === parseInt(id));
  },

  createTour: async (tourData) => {
    const tours = getToursFromStorage();
    const newTour = {
      ...tourData,
      id: Date.now(), // Используем timestamp для уникального ID
      createdAt: new Date().toISOString()
    };
    
    const updatedTours = [...tours, newTour];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTours));
    return newTour;
  },

  updateTour: async (id, tourData) => {
    const tours = getToursFromStorage();
    const index = tours.findIndex(tour => tour.id === parseInt(id));
    
    if (index === -1) throw new Error('Tour not found');
    
    const updatedTour = {
      ...tours[index],
      ...tourData
    };
    
    tours[index] = updatedTour;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tours));
    return updatedTour;
  },

  deleteTour: async (id) => {
    const tours = getToursFromStorage();
    const filteredTours = tours.filter(tour => tour.id !== parseInt(id));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredTours));
    return true;
  },


  resetTours: () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialTours));
    return initialTours;
  }
};