// This file contains a comprehensive list of locations for the filter dropdowns.
// NOTE: This is a representative sample and not an exhaustive list of every state/district in the world.
// It is designed to be large enough to provide a realistic user experience.

export const allLocations: { [country: string]: { [state: string]: string[] } } = {
  "USA": {
    "California": ["Los Angeles", "San Francisco", "San Diego", "Sacramento", "San Jose"],
    "New York": ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
    "Texas": ["Houston", "San Antonio", "Dallas", "Austin", "Fort Worth"],
    "Florida": ["Miami", "Orlando", "Tampa", "Jacksonville", "St. Petersburg"],
    "Illinois": ["Chicago", "Aurora", "Rockford", "Joliet", "Naperville"]
  },
  "India": {
    "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik", "Thane"],
    "Karnataka": ["Bengaluru", "Mysuru", "Mangaluru", "Hubballi", "Belagavi"],
    "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem"],
    "Uttar Pradesh": ["Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi"],
    "Delhi": ["New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi"]
  },
  "UK": {
    "England": ["London", "Manchester", "Birmingham", "Liverpool", "Bristol"],
    "Scotland": ["Glasgow", "Edinburgh", "Aberdeen", "Dundee", "Inverness"],
    "Wales": ["Cardiff", "Swansea", "Newport", "Bangor", "Wrexham"],
    "Northern Ireland": ["Belfast", "Derry", "Lisburn", "Newry", "Armagh"]
  },
  "Canada": {
    "Ontario": ["Toronto", "Ottawa", "Mississauga", "Hamilton", "London"],
    "Quebec": ["Montreal", "Quebec City", "Gatineau", "Sherbrooke", "Laval"],
    "British Columbia": ["Vancouver", "Victoria", "Kelowna", "Abbotsford", "Richmond"],
    "Alberta": ["Calgary", "Edmonton", "Red Deer", "Lethbridge", "St. Albert"]
  },
  "Australia": {
    "New South Wales": ["Sydney", "Newcastle", "Wollongong", "Central Coast", "Maitland"],
    "Victoria": ["Melbourne", "Geelong", "Ballarat", "Bendigo", "Shepparton"],
    "Queensland": ["Brisbane", "Gold Coast", "Sunshine Coast", "Townsville", "Cairns"]
  },
  "Germany": {
    "Berlin": ["Berlin"],
    "Bavaria": ["Munich", "Nuremberg", "Augsburg", "Regensburg", "Würzburg"],
    "North Rhine-Westphalia": ["Cologne", "Düsseldorf", "Dortmund", "Essen", "Bonn"]
  },
  "Japan": {
    "Tokyo": ["Shibuya", "Shinjuku", "Chiyoda", "Minato", "Taito"],
    "Osaka": ["Osaka City", "Sakai", "Higashiosaka", "Toyonaka", "Suita"],
    "Hokkaido": ["Sapporo", "Hakodate", "Asahikawa", "Obihiro", "Kushiro"]
  },
  "Brazil": {
    "São Paulo": ["São Paulo", "Guarulhos", "Campinas", "São Bernardo do Campo", "Santo André"],
    "Rio de Janeiro": ["Rio de Janeiro", "São Gonçalo", "Duque de Caxias", "Nova Iguaçu", "Niterói"],
    "Bahia": ["Salvador", "Feira de Santana", "Vitória da Conquista", "Camaçari", "Itabuna"]
  },
  "Nigeria": {
    "Lagos": ["Lagos", "Ikeja", "Lekki", "Ikorodu", "Badagry"],
    "Abuja (FCT)": ["Abuja", "Gwagwalada", "Kuje", "Bwari", "Abaji"],
    "Rivers": ["Port Harcourt", "Obio-Akpor", "Eleme", "Ikwerre", "Oyigbo"]
  },
  "Singapore": {
    "Singapore": ["Central Region", "East Region", "North Region", "North-East Region", "West Region"]
  },
  "South Africa": {
    "Gauteng": ["Johannesburg", "Pretoria", "Soweto", "Benoni", "Tembisa"],
    "Western Cape": ["Cape Town", "Stellenbosch", "George", "Paarl", "Worcester"],
    "KwaZulu-Natal": ["Durban", "Pietermaritzburg", "Richards Bay", "Newcastle", "Umlazi"]
  },
  "France": {
    "Île-de-France": ["Paris", "Boulogne-Billancourt", "Saint-Denis", "Argenteuil", "Montreuil"],
    "Provence-Alpes-Côte d'Azur": ["Marseille", "Nice", "Toulon", "Aix-en-Provence", "Avignon"],
    "Auvergne-Rhône-Alpes": ["Lyon", "Grenoble", "Saint-Étienne", "Villeurbanne", "Clermont-Ferrand"]
  },
  "China": {
    "Beijing": ["Dongcheng", "Xicheng", "Chaoyang", "Haidian", "Fengtai"],
    "Shanghai": ["Huangpu", "Xuhui", "Changning", "Jing'an", "Pudong"],
    "Guangdong": ["Guangzhou", "Shenzhen", "Dongguan", "Foshan", "Zhongshan"]
  },
  "Russia": {
    "Moscow": ["Central", "Northern", "Southern", "Eastern", "Western"],
    "Saint Petersburg": ["Admiralteysky", "Vasileostrovsky", "Petrogradsky", "Tsentralny", "Nevsky"],
    "Sverdlovsk Oblast": ["Yekaterinburg", "Nizhny Tagil", "Kamensk-Uralsky", "Pervouralsk", "Serov"]
  },
  "Mexico": {
    "Mexico City": ["Coyoacán", "Cuauhtémoc", "Iztapalapa", "Miguel Hidalgo", "Xochimilco"],
    "Jalisco": ["Guadalajara", "Zapopan", "Tlaquepaque", "Tonalá", "Puerto Vallarta"],
    "Nuevo León": ["Monterrey", "Guadalupe", "San Nicolás de los Garza", "Apodaca", "Santa Catarina"]
  }
};
