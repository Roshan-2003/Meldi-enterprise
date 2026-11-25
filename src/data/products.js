export const fallbackProducts = [
  {
    _id: "prod-bandsaw-m42",
    sku: "IM-BS-M42-01",
    name: "Bi-Metal M42 Bandsaw Machine Blade",
    category: {
      name: "Bandsaw Machine Blade",
      slug: "bandsaw-machine-blade",
    },
    description:
      "High-speed steel M42 cobalt-alloy tooth edge welded to a fatigue-resistant spring steel backing for clean, vibration-free cutting of stainless steel, alloy steels, and structural profiles.",
    unit: "Pieces",
    minOrderQty: 5,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800&auto=format&fit=crop",
    ],
    features: [
      "8% Cobalt M42 HSS tooth edge for superior wear resistance",
      "Variable tooth pitch (4/6, 5/8, 8/12 TPI) to reduce harmonic vibration",
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
    name: "Carbide Tipped Heavy-Duty Bandsaw Blade",
    category: {
      name: "Bandsaw Machine Blade",
      slug: "bandsaw-machine-blade",
    },
    description:
      "Triple-chip ground tungsten carbide tipped bandsaw blade engineered for high-production cutting of titanium, Inconel, hardened tool steels, and abrasive castings.",
    unit: "Pieces",
    minOrderQty: 2,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?w=800&auto=format&fit=crop",
    ],
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
    _id: "prod-blower-centrifugal",
    sku: "IM-BL-CF-03",
    name: "Centrifugal High-Pressure Industrial Blower",
    category: {
      name: "Industrial Blower",
      slug: "industrial-blower",
    },
    description:
      "Dynamically balanced backward-curved centrifugal blower designed for continuous-duty dust extraction, combustion air supply, pneumatic conveying, and fume ventilation.",
    unit: "Units",
    minOrderQty: 1,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop",
    ],
    features: [
      "Heavy-gauge powder-coated MS / SS304 housing",
      "Precision dynamically balanced impeller per ISO 1940 G2.5",
      "TEFC IP55 industrial induction motor with low noise operation",
      "Available in direct-drive and V-belt drive configurations",
    ],
    specifications: [
      { label: "Airflow Capacity", value: "1,200 to 18,000 CFM" },
      { label: "Static Pressure", value: "Up to 450 mmWG" },
      { label: "Motor Power", value: "1.5 HP to 30 HP (3-Phase, 415V)" },
      { label: "Operating Temp", value: "Up to 180 °C (High-temp option)" },
    ],
  },
  {
    _id: "prod-blower-axial",
    sku: "IM-BL-AX-04",
    name: "Axial Flow Exhaust & Ventilation Blower",
    category: {
      name: "Industrial Blower",
      slug: "industrial-blower",
    },
    description:
      "High-volume tubular axial fan engineered for factory shed ventilation, paint booth exhaust, cooling towers, and warehouse air circulation.",
    unit: "Units",
    minOrderQty: 1,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1565043589221-1a6fd9ae45c7?w=800&auto=format&fit=crop",
    ],
    features: [
      "Cast aluminum aerofoil blades with adjustable pitch angle",
      "Flanged cylindrical casing for easy duct installation",
      "Corrosion-resistant epoxy finish for harsh industrial zones",
    ],
    specifications: [
      { label: "Fan Diameter", value: "300 mm to 1,200 mm" },
      { label: "Air Volume", value: "2,500 to 45,000 m³/hr" },
      { label: "Power Supply", value: "230V / 415V, 50 Hz" },
      { label: "Mounting", value: "Wall / Duct / Pedestal" },
    ],
  },
  {
    _id: "prod-heater-ceramic-band",
    sku: "IM-HT-CB-05",
    name: "Ceramic Insulated Industrial Band Heater",
    category: {
      name: "Industrial Heater",
      slug: "industrial-heater",
    },
    description:
      "Energy-efficient ceramic band heater with stainless steel sheath and ceramic fiber insulation blanket for extrusion barrels, injection molding machines, and pipe heating.",
    unit: "Pieces",
    minOrderQty: 4,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&auto=format&fit=crop",
    ],
    features: [
      "Operates reliably at sheath temperatures up to 760 °C",
      "Internal ceramic fiber insulation reduces heat loss by up to 25%",
      "High-grade NiCr 80/20 resistance heating coil",
      "Custom diameters, widths, cutouts, and terminal boxes available",
    ],
    specifications: [
      { label: "Voltage", value: "230V / 415V AC" },
      { label: "Watt Density", value: "Up to 45 W/in²" },
      { label: "Diameter Range", value: "50 mm to 600 mm" },
      { label: "Termination", value: "Terminal Box / Armored Cable / Plug" },
    ],
  },
  {
    _id: "prod-heater-tubular-finned",
    sku: "IM-HT-TF-06",
    name: "Tubular Finned Air Duct Heater",
    category: {
      name: "Industrial Heater",
      slug: "industrial-heater",
    },
    description:
      "SS304/SS316 helical finned tubular heating element built for forced-air drying ovens, curing chambers, HVAC air ducts, and industrial shrink tunnels.",
    unit: "Pieces",
    minOrderQty: 2,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&auto=format&fit=crop",
    ],
    features: [
      "Continuous spiral-wound fins maximize convective heat transfer",
      "Compacted MgO insulation ensures high dielectric strength",
      "Available in U-shape, W-shape, and flanged duct bank assemblies",
    ],
    specifications: [
      { label: "Sheath Material", value: "SS304 / SS316 / Incoloy 800" },
      { label: "Tube Diameter", value: "8 mm / 11 mm / 16 mm" },
      { label: "Power Rating", value: "500 W to 12 kW per element" },
      { label: "Mounting", value: "Brass / SS Threaded Bush or Flange" },
    ],
  },
  {
    _id: "prod-tools-torque-wrench",
    sku: "IM-TL-TW-07",
    name: "Heavy-Duty Industrial Torque Wrench Set",
    category: {
      name: "Industrial Tools",
      slug: "industrial-tools",
    },
    description:
      "Calibrated click-type industrial torque wrench with chrome-vanadium ratchet head for heavy machinery assembly, flange bolting, and plant maintenance.",
    unit: "Sets",
    minOrderQty: 1,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&auto=format&fit=crop",
    ],
    features: [
      "Factory calibrated to ±3% accuracy with traceable certificate",
      "Dual-scale laser-etched Nm and ft-lb markings",
      "Positive locking collar prevents accidental torque setting drift",
    ],
    specifications: [
      { label: "Drive Size", value: "1/2 inch & 3/4 inch Square Drive" },
      { label: "Torque Range", value: "40 – 340 Nm / 100 – 800 Nm" },
      { label: "Material", value: "Drop-Forged Cr-V Alloy Steel" },
      { label: "Standard", value: "DIN EN ISO 6789" },
    ],
  },
  {
    _id: "prod-tools-vernier-kit",
    sku: "IM-TL-VK-08",
    name: "Precision Digital Caliper & Micrometer Kit",
    category: {
      name: "Industrial Tools",
      slug: "industrial-tools",
    },
    description:
      "IP67 coolant-proof digital vernier caliper and external micrometer inspection kit for CNC machine shops, QA laboratories, and tool rooms.",
    unit: "Sets",
    minOrderQty: 1,
    inStock: true,
    images: [
      "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?w=800&auto=format&fit=crop",
    ],
    features: [
      "Hardened stainless steel measuring jaws with lapped faces",
      "Instant mm / inch conversion with zero-setting at any position",
      "IP67 protection against cutting fluids and shop-floor dust",
    ],
    specifications: [
      { label: "Measuring Range", value: "0–300 mm (Caliper), 0–25 mm (Mic)" },
      { label: "Resolution", value: "0.01 mm / 0.001 mm" },
      { label: "Protection", value: "IP67 Water & Coolant Resistant" },
      { label: "Packaging", value: "Blow-Molded Protective Carry Case" },
    ],
  },
];
