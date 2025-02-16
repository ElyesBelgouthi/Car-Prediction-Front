import { useState } from "react";
import axios from "axios";
import "./App.css";

// Brands and their corresponding models
const brandModels = {
  "Alfa Romeo": ["Giulietta", "Brera", "Mito"],
  Alpina: [], // Add models if available
  Audi: [
    "A3",
    "A3 Berline",
    "A3 Sportback",
    "A4",
    "A5 Cabriolet",
    "A5 Coupé",
    "A5 Sportback",
    "A6",
    "A7 Sportback",
    "Q2",
    "Q3",
    "Q3 Sportback",
    "Q4 E-tron",
    "Q5",
    "Q7",
    "Q8",
  ],
  "BAIC YX": [], // Add models if available
  BMW: [
    "Série 1",
    "Série 2 Active Tourer",
    "Série 2 Coupé",
    "Série 2 Gran Coupé",
    "Série 3",
    "Série 3 coupé",
    "Série 4 Coupé",
    "Série 4 Gran Coupé",
    "Série 5",
    "Série 7",
    "X1",
    "X2",
    "X3",
    "X3 Hybride",
    "X4",
    "X5",
    "X6",
  ],
  BYD: [], // Add models if available
  Changan: [], // Add models if available
  Chery: [
    "Arrizo 3",
    "Tiggo 2",
    "Tiggo 3X",
    "Tiggo 4",
    "Tiggo 7 Pro",
    "Tiggo 8 Pro",
  ],
  Chevrolet: ["Aveo", "Camaro", "Captiva", "Cruze", "Spark", "Trax"],
  Citroën: [
    "C1",
    "C2",
    "C3",
    "C4",
    "C4 Cactus",
    "C4 Coupé",
    "C4 Picasso",
    "C5",
    "C5 Aircross",
    "C-Elysée",
    "Berlingo",
    "Berlingo Utilitaire",
    "Jumpy Fourgon",
  ],
  Cupra: ["Ateca", "Leon", "Leon SC", "Formentor"],
  DS: ["DS 3", "DS 4", "DS 5", "DS 7 Crossback"],
  Dacia: ["Duster", "Logan", "Sandero Stepway", "Dokker Van"],
  Dongfeng: [], // Add models if available
  Fiat: [
    "500",
    "500X",
    "Panda City Cross",
    "Punto",
    "Tipo 5 portes",
    "Tipo Berline",
    "Doblo",
    "Fiorino",
    "Freemont",
  ],
  Ford: [
    "Fiesta",
    "Focus",
    "Focus sedan",
    "Mustang",
    "Ranger",
    "Ranger Raptor",
    "Kuga",
    "Ecosport",
    "Transit",
    "Transporter Fourgon 6.1",
  ],
  Foton: [], // Add models if available
  Geely: ["GC6", "GS", "GX3", "Tugella"],
  "Great Wall": ["Haval H6", "Haval H9", "Poer MT", "Wingle 5"],
  Haval: ["H6", "H9", "Jolion"],
  Honda: ["Accord", "Civic", "Civic Type R", "CR-V", "HR-V", "Jazz"],
  Hummer: ["H2", "H3"],
  Hyundai: [
    "i10",
    "i20",
    "Accent",
    "Tucson",
    "Tucson Hybride",
    "Creta",
    "Kona",
    "Santa Fe",
    "Veloster",
  ],
  Infiniti: ["FX", "Q30", "Q50", "QX30", "QX50", "QX70"],
  Isuzu: ["D-Max Double Cabine", "D-Max Single Cabine"],
  Iveco: ["Daily Simple Cabine"],
  Jaguar: ["XE", "XF", "XJ", "XJL", "F-Pace", "E-Pace", "I-Pace"],
  Jeep: ["Cherokee", "Compass", "Grand Cherokee", "Renegade", "Wrangler"],
  KIA: [
    "Ceed",
    "Cerato",
    "Cerato 5p",
    "Picanto",
    "Rio 5p",
    "Rio Berline",
    "Seltos",
    "Sorento",
    "Sportage",
    "Sportage Hybride",
    "Stonic",
  ],
  Lada: ["Niva"],
  "Land Rover": [
    "Defender 110",
    "Discovery",
    "Discovery Sport",
    "Range Rover",
    "Range Rover Evoque",
    "Range Rover Sport",
    "Range Rover Velar",
  ],
  MG: ["HS", "ZS"],
  Mahindra: ["KUV 100", "Scorpio", "Thar"],
  Maserati: ["Ghibli", "Levante", "Quattroporte"],
  Mazda: ["CX-3", "CX-5", "CX-7", "CX-9", "Mazda2", "Mazda3", "Mazda6", "MX-5"],
  "Mercedes-Benz": [
    "Classe A",
    "Classe A Berline",
    "Classe B",
    "Classe C",
    "Classe C coupé",
    "Classe E",
    "Classe E coupé",
    "Classe G",
    "Classe GL",
    "Classe S",
    "Classe X",
    "GLA",
    "GLB",
    "GLC",
    "GLC Coupé",
    "GLC Plug-in Hybride",
    "GLE Coupé",
  ],
  Mini: ["Cooper", "Cooper S", "Clubman", "Countryman"],
  Mitsubishi: [
    "ASX",
    "L200 Double Cabine",
    "L200 Sportero",
    "Outlander",
    "Pajero",
  ],
  Nissan: [
    "Micra",
    "Note",
    "Qashqai",
    "X-Trail",
    "Navara",
    "Patrol",
    "Juke",
    "Leaf",
  ],
  Opel: ["Astra", "Corsa", "Insignia", "Mokka", "Crossland X", "Grandland X"],
  Peugeot: [
    "208",
    "308",
    "308 cc",
    "3008",
    "3008 GT",
    "5008",
    "2008",
    "508",
    "Rifter",
    "Expert",
    "Partner",
  ],
  Porsche: ["911", "Cayenne", "Cayenne Coupé", "Macan", "Panamera", "Taycan"],
  Renault: [
    "Clio",
    "Clio Campus",
    "Megane",
    "Megane Sedan",
    "Megane coupé",
    "Captur",
    "Kadjar",
    "Koleos",
    "Talisman",
    "Duster",
    "Arkana",
    "Kangoo",
  ],
  Seat: ["Ibiza", "Leon", "Leon SC", "Ateca", "Arona", "Tarraco"],
  Skoda: ["Fabia", "Octavia", "Superb", "Kodiaq", "Karoq", "Scala"],
  Smart: ["ForTwo", "ForFour"],
  Ssangyong: ["Korando", "Rexton", "Tivoli"],
  Suzuki: [
    "Alto",
    "Baleno",
    "Celerio",
    "Celerio Populaire",
    "Jimny 3 portes",
    "Swift",
    "Vitara",
  ],
  Tata: ["Harrier", "Nexon", "Safari"],
  Toyota: [
    "Yaris",
    "Corolla",
    "RAV4",
    "RAV4 Hybride",
    "C-HR",
    "Hilux Double Cabine",
    "Hilux Simple Cabine",
    "Land Cruiser",
    "Prado",
  ],
  Volkswagen: [
    "Golf 6",
    "Golf 7",
    "Golf 8",
    "Polo",
    "Polo Populaire",
    "Polo Sedan",
    "Passat",
    "Passat CC",
    "Tiguan",
    "T-Roc",
    "T-Cross",
    "Caddy",
    "Transporter Fourgon 6.1",
  ],
  Volvo: ["S60", "S90", "V60", "V90", "XC40", "XC60", "XC90"],
  Wallyscar: [], // Add models if available
};

const brands = Object.keys(brandModels); // Extract brands from the brandModels object
const transmissions = ["Intégrale", "Propulsion", "Traction"];
const fuels = [
  "Diesel",
  "Électrique",
  "Essence",
  "Hybride diesel",
  "Hybride essence",
  "Hybride rechargeable diesel",
  "Hybride rechargeable essence",
];
const gearboxes = ["Automatique", "Manuelle"];
const upholsteries = [
  "Alcantara",
  "Cuir intégral",
  "Cuir partiel",
  "Similicuir",
  "Tissu",
  "Velours",
];
const exterior_colors = [
  "Aubergine",
  "Autre",
  "Beige",
  "Blanc",
  "Bleu",
  "Gris anthracite",
  "Gris argent",
  "Gris shark",
  "Jaune",
  "Marron",
  "Noir",
  "Orange",
  "Rouge",
  "Vert",
];

const interior_colors = [
  "Autre",
  "Beige",
  "Gris",
  "Marron",
  "Nan",
  "Noir",
  "Rouge",
];

const locations = [
  "Ariana",
  "Ben Arous",
  "Bizerte",
  "Béja",
  "Gabès",
  "Gafsa",
  "Jendouba",
  "Kairouan",
  "Kasserine",
  "La Manouba",
  "Le Kef",
  "Mahdia",
  "Monastir",
  "Médenine",
  "Nabeul",
  "Sfax",
  "Sidi Bouzid",
  "Sousse",
  "Tataouine",
  "Tunis",
];

function App() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    mileage: "",
    year: "",
    horsepower: "",
    seats: "",
    doors: "",
    engineDisplacement: "",
    transmission: "",
    fuel: "",
    upholstery: "",
    gearbox: "",
  });
  const [price, setPrice] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [models, setModels] = useState([]); // State to store models based on selected brand

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If the brand is changed, update the models list
    if (name === "brand") {
      setModels(brandModels[value] || []); // Set models based on selected brand
      setFormData((prevData) => ({ ...prevData, model: "" })); // Reset model when brand changes
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    console.log(formData);
    try {
      const response = await axios.post(
        "http://localhost:5000/predict",
        formData
      );
      setPrice(response.data.price);
    } catch (err) {
      setError("Error fetching price. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Prédicteur de prix de voiture en Tunisie</h1>
      <form onSubmit={handleSubmit} className="form-grid">
        {[
          { label: "Marque", name: "brand", options: brands },
          { label: "Modèle", name: "model", options: models },
          { label: "Kilométrage", name: "mileage", type: "number" },
          { label: "Mise en circulation", name: "year", type: "number" },
          { label: "Puissance fiscale", name: "horsepower", type: "number" },
          { label: "Nombre de places", name: "seats", type: "number" },
          { label: "Nombre de portes", name: "doors", type: "number" },
          {
            label: "Cylindrée (cm3)",
            name: "engineDisplacement",
            type: "number",
          },
          {
            label: "Transmission",
            name: "transmission",
            options: transmissions,
          },
          { label: "Énergie", name: "fuel", options: fuels },
          { label: "Boite vitesse", name: "gearbox", options: gearboxes },
          { label: "Sellerie", name: "upholstery", options: upholsteries },
          {
            label: "Couleur Extérieur",
            name: "exterior_color",
            options: exterior_colors,
          },
          {
            label: "Couleur Interieur",
            name: "interior_color",
            options: interior_colors,
          },
          {
            label: "Gouvernorat",
            name: "location",
            options: locations,
          },
        ].map(({ label, name, type, options }) => (
          <div className="form-group" key={name}>
            <label>{label}:</label>
            {options ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              >
                <option value="">Select {label}</option>
                {options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type || "text"}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                required
              />
            )}
          </div>
        ))}

        <button type="submit" disabled={loading}>
          {loading ? "Predicting..." : "Get Price"}
        </button>
      </form>

      {error && <p className="error">{error}</p>}
      {price && <p className="price">Predicted Price: {price} TND</p>}
    </div>
  );
}

export default App;
