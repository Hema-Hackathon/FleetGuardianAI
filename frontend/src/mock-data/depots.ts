import type { Depot } from "../types/domain";

export const depots: Depot[] = [
  { id: "DEP-DEL", name: "North Control Depot", city: "New Delhi", region: "North", coordinates: { x: 58, y: 37 }, manager: "Ritika Sinha" },
  { id: "DEP-GGN", name: "Gurugram Safety Hub", city: "Gurugram", region: "North", coordinates: { x: 52, y: 58 }, manager: "Anuj Mehta" },
  { id: "DEP-BLR", name: "Bengaluru EV Depot", city: "Bengaluru", region: "South", coordinates: { x: 54, y: 78 }, manager: "Priya Nair" },
  { id: "DEP-MUM", name: "Mumbai Logistics Yard", city: "Mumbai", region: "West", coordinates: { x: 30, y: 64 }, manager: "Karan Desai" },
  { id: "DEP-VAD", name: "Vadodara HazMat Base", city: "Vadodara", region: "West", coordinates: { x: 26, y: 52 }, manager: "Hema Iyer" },
  { id: "DEP-CHN", name: "Chennai Cold Chain Park", city: "Chennai", region: "South", coordinates: { x: 62, y: 87 }, manager: "Suresh Kumar" },
  { id: "DEP-HYD", name: "Hyderabad Fleet Center", city: "Hyderabad", region: "South", coordinates: { x: 48, y: 72 }, manager: "Meera Rao" },
  { id: "DEP-JAI", name: "Jaipur Fuel Terminal", city: "Jaipur", region: "North", coordinates: { x: 43, y: 34 }, manager: "Dev Malik" },
  { id: "DEP-KOL", name: "Kolkata Distribution Yard", city: "Kolkata", region: "East", coordinates: { x: 80, y: 55 }, manager: "Arindam Sen" },
  { id: "DEP-PUN", name: "Pune Maintenance Base", city: "Pune", region: "West", coordinates: { x: 34, y: 68 }, manager: "Nisha Patil" },
  { id: "DEP-LKO", name: "Lucknow Passenger Depot", city: "Lucknow", region: "North", coordinates: { x: 67, y: 42 }, manager: "Vivek Tiwari" },
  { id: "DEP-CJB", name: "Coimbatore Industrial Yard", city: "Coimbatore", region: "South", coordinates: { x: 49, y: 90 }, manager: "Ramesh Balan" }
];
