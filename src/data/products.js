import blade from "../components/blade-221.png";
import heater from "../assets/blower01.jpeg";
import tools from "../assets/industrial-tool001.jpeg";
import blade2 from "../assets/blade22.jpeg";
import blade3 from "../assets/blade33.jpeg";
import blower from "../assets/blower22.jpeg";
import blower33 from "../assets/BLOWER33.jpeg";
import blower44 from "../assets/blower44.jpeg";
import toolss from "../assets/industrial-tool01.jpeg";
import toolss2 from "../assets/tools3.jpeg"
export const fallbackProducts = [
  {
    _id: "prod-bandsaw-m42",
    sku: "IM-BS-M42-01",
    name: "Bi-Metal  Bandsaw Machine Blade - Nachi",
    category: {
      name: "Bandsaw Machine Blade",
      slug: "bandsaw-machine-blade",
    },
    description:
      "High-speed steel M42 cobalt-alloy tooth edge welded to a fatigue-resistant spring steel backing for clean, vibration-free cutting of stainless steel, alloy steels, and structural profiles.",
    unit: "Pieces",
    minOrderQty: 5,
    inStock: true,
    images: [blade],
    features: [
      "8% Cobalt M42 HSS tooth edge for superior wear resistance",
      "Variable tooth pitch ( 2/3, 3/4, 4/6, 5/7 ) TPI ",
      "Precision CNC-ground gullets for faster chip evacuation",
      "Custom welded lengths available as per machine specifications",
    ],
    specifications: [
      { label: "Blade Width", value: "27 mm / 34 mm / 41 mm" },
      { label: "Thickness", value: "0.90 mm / 1.10 mm / 1.30 mm" },
      { label: "Tooth Material", value: "M42 High-Speed Steel (68-69 HRC)" },
      { label: "Application", value: "Mild Steel, SS304/316, Tool Steel" },
    ],
  },
  {
    _id: "prod-bandsaw-carbide",
    sku: "IM-BS-CT-02",
    name: "Bandsaw Machine Blade - Honsberg",
    category: {
      name: "Bandsaw Machine Blade",
      slug: "bandsaw-machine-blade",
    },
    description:
      "Tungsten Carbide reinforced M42 bi-metal bandsaw blade delivers superior wear resistance, strength, and precision cutting across steel, stainless steel, alloys, and non-ferrous metals for demanding industrial applications.",
    unit: "Pieces",
    minOrderQty: 2,
    inStock: true,
    images: [blade2],
    features: [
      "Micro-grain tungsten carbide tips for extreme heat resistance",
      "Triple-chip tooth geometry delivers smooth surface finish",
      "Up to 4x longer blade life compared to standard bi-metal blades",
    ],
    specifications: [
      { label: "Blade Width", value: "34 mm / 41 mm / 54 mm" },
      { label: "Tooth Pitch", value: "2/3 TPI & 3/4 TPI" },
      { label: "Core Material", value: "Heat-treated Alloy Spring Steel" },
      { label: "Application", value: "Nickel Alloys, Titanium, Cast Iron" },
    ],
  },
  {
    _id: "prod-bandsaw-muteki",
    sku: "IM-BS-CT-03",
    name: "Bandsaw Machine Blade - Muteki",
    category: {
      name: "Bandsaw Machine Blade",
      slug: "bandsaw-machine-blade",
    },
    description:
      "M51 Grade 4/5/8 TPI Universal Bandsaw Blade – One Blade for Multiple Materials and Sizes, 2 Blades’ Cutting Versatility in 1, Longer Blade Life, Cost Savings, Smooth & Accurate Cutting, Faster Productivity, and All Blade Sizes Available.",
    minOrderQty: 2,
    inStock: true,
    images: [blade3],
    features: [
      "Micro-grain tungsten carbide tips for extreme heat resistance",
      "Triple-chip tooth geometry delivers smooth surface finish",
      "Up to 4x longer blade life compared to standard bi-metal blades",
    ],
    specifications: [
      { label: "Blade Width", value: "27 mm / 34 mm / 41 mm / 54 mm / 67 mm" },
      { label: "Tooth Pitch", value: "4/5/8 TPI " },
      { label: "Core Material", value: "M51" },
      { label: "Application", value: "MS, SS, Aluminum" },
    ],
  },
  {
    _id: "prod-blower-centrifugal",
    sku: "IM-BL-CF-03",
    name: " Single Inlet Centrifugal Blowers",
    category: {
      name: "Industrial Blower",
      slug: "industrial-blower",
    },
    description:
      "A single inlet centrifugal blower draws air through one suction opening and uses its rotating impeller to accelerate and pressurize the air, directing it through a scroll-shaped housing to the discharge outlet.Its compact, single-sided design delivers efficient airflow against duct resistance, making it ideal for industrial ventilation and air-handling applications",
    unit: "Units",
    minOrderQty: 1,
    inStock: true,
    images: [blower],
    features: [
      "Original Raw Materials",
      " In-House Blower & Motor Manufacturing ",
      "60°C Heat-Resistant Performance",
      "Customized Solutions with Trusted Quality",
    ],
    specifications: [
      { label: "Airflow Capacity", value: "82 to 1705 CFM" },
      { label: "speed", value: "1400 to 2800" },
      { label: "Motor Power", value: "50 to 550 W" },
      { label: "Operating Temp", value: "Up to 60 °C (High-temp option)" },
    ],
  },
  {
    _id: "prod-blower-axial",
    sku: "IM-BL-AX-04",
    name: "Double Inlet Centrifugal Blowers",
    category: {
      name: "Double Inlet Centrifugal Blowers",
      slug: "industrial-blower",
    },
    description:
      "A double inlet centrifugal blower draws air from both sides of a single impeller, delivering higher airflow with improved energy efficiency.Ideal for large HVAC systems, paint booths, and heavy-duty industrial ventilation applications.",
    unit: "Units",
    minOrderQty: 1,
    inStock: true,
    images: [blower33],
    features: [
      "High Airflow & Balanced Dual Inlet: Delivers powerful, uniform airflow for efficient ventilation",
      "Forward Curve Impellers: Provide high static pressure at low speeds with reduced noise.",
      "Durable, Vibration-Free Construction: Premium materials and dynamic balancing ensure reliable performance",
      "Energy-Efficient & Customizable: Low operating costs with flexible impeller, housing, and motor options.",
    ],
    specifications: [
      // { label: "Fan Diameter", value: "300 mm to 1,200 mm" },
      { label: "Air Flow", value: "235 to 2030 cfm" },
      { label: "Power Supply", value: "230V / 415V, 50 Hz" },
      { label: "Phase", value: "Single and 3-Phase" },
    ],
  },
  {
    _id: "prod-blower-dsd",
    sku: "IM-BL-AX-05",
    name: "Axial Fans",
    category: {
      name: "Double Inlet Centrifugal Blowers",
      slug: "industrial-blower",
    },
    description:
      "Industrial axial fans are widely used in factories, warehouses, cold storage, food and pharma plants, and commercial buildings for efficient ventilation, cooling, and removal of hot air, dust, and fumes..",
    unit: "Units",
    minOrderQty: 1,
    inStock: true,
    images: [blower44],
    features: [
      "Hard, high-quality blades that stay strong and last longer",
      "Imported material for a durable, dependable build.",
      "Wide size range: 200 mm to 630 mm",
      "Strong airflow: 450 m³/hr to 11,785 m³/hr",
    ],
    specifications: [
      // { label: "Fan Diameter", value: "300 mm to 1,200 mm" },
      { label: "Air Flow", value: "500 to 6882 cfm" },
      { label: "Power Supply", value: "230V / 415V, 50 Hz" },
      { label: "Phase", value: "Single and 3-Phase" },
    ],
  },
  {
    _id: "prod-heater-ceramic-band",
    sku: "IM-HT-CB-05",
    name: "Mica Band Heater",
    category: {
      name: "Industrial Heater",
      slug: "industrial-heater",
    },
    description:
      "Mica Band Heaters feature nickel-chrome resistance ribbons insulated with mica and enclosed in a stainless-steel sheath. Designed for dies, barrels, and nozzles, they offer customizable sizes, shapes, cutouts, and flexible terminal options for easy installation and reliable heating.",
    unit: "Pieces",
    minOrderQty: 4,
    inStock: true,
    images: [heater],
    features: [
      "Working temperature upto 250° C",
      "Element: Nichrome strip/wire.",
      "High quality Mica having excellent Dielectric strength",
      " Screw type/plug type Terminal connection available.",
    ],
    specifications: [
      { label: "Voltage", value: "230V / 415V AC" },
      { label: "Watt Density", value: "Up to 45 W/in²" },
      { label: "Diameter Range", value: "50 mm to 600 mm" },
      { label: "Termination", value: "Terminal Box / Armored Cable / Plug" },
    ],
  },
  // {
  //   _id: "prod-heater-tubular-finned",
  //   sku: "IM-HT-TF-06",
  //   name: "Tubular Finned Air Duct Heater",
  //   category: {
  //     name: "Industrial Heater",
  //     slug: "industrial-heater",
  //   },
  //   description:
  //     "SS304/SS316 helical finned tubular heating element built for forced-air drying ovens, curing chambers, HVAC air ducts, and industrial shrink tunnels.",
  //   unit: "Pieces",
  //   minOrderQty: 2,
  //   inStock: true,
  //   images: [
  //     "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
  //   ],
  //   features: [
  //     "Continuous spiral-wound fins maximize convective heat transfer",
  //     "Compacted MgO insulation ensures high dielectric strength",
  //     "Available in U-shape, W-shape, and flanged duct bank assemblies",
  //   ],
  //   specifications: [
  //     { label: "Sheath Material", value: "SS304 / SS316 / Incoloy 800" },
  //     { label: "Tube Diameter", value: "8 mm / 11 mm / 16 mm" },
  //     { label: "Power Rating", value: "500 W to 12 kW per element" },
  //     { label: "Mounting", value: "Brass / SS Threaded Bush or Flange" },
  //   ],
  // },
  {
    _id: "prod-tools-torque-wrench",
    sku: "IM-TL-TW-07",
    name: "Welding Electrodes 6013",
    category: {
      name: "Industrial Tools",
      slug: "industrial-tools",
    },
    description:
      "E6013 electrodes are ideal for general-purpose welding on mild steel, offering excellent arc stability, smooth weld finishes, low spatter, and easy slag removal. Suitable for fabrication, repair, and maintenance, they deliver reliable performance on both thin and thick materials.",
    unit: "Sets",
    minOrderQty: 1,
    inStock: true,
    images: [toolss],
    features: [
      "Excellent Arc Stability: Ensures smooth and easy welding with consistent performance.",
      "Smooth Weld Finish: Produces clean, uniform welds with minimal spatter.",
      "Easy Slag Removal: Allows quick cleaning and improves welding efficiency.",
      "Versatile Applications: Ideal for mild steel fabrication, repairs, maintenance, and general-purpose welding.",
    ],
    specifications: [
      { label: "Length ", value: "350 mm & 450 mm" },
      { label: "Material", value: "Mild Steel" },
      { label: "Size/Diameter", value: "3.15 mm" },
      { label: "Grade ", value: "6013" },
      { label: "Packaging Type & Size", value: "20 Kg Box" },
    ],
  },

  {
    _id: "prod-tools-vernier-kit",
    sku: "IM-TL-VK-08",
    name: "HSS Tap Set",
    category: {
      name: "Industrial Tools",
      slug: "industrial-tools",
    },
    description:
      "TOTEM , YG , ADDISON ,MIRANDA etc",
    unit: "Sets",
    minOrderQty: 1,
    inStock: true,
    images: [
      toolss2,
    ],
    features: [
      "Thread Standard Metric",
      "Tap Type Machine Tap",
      "Size Range M3-M10","Rugged design, Fine finish, Durable"
    ],
    specifications: [
      { label: "Usage", value: "In workshop" },
      { label: "Size", value: "As per client's" },
   
    ],
  },
];
