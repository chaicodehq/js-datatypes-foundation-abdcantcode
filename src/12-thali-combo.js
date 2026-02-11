/**
 * 🍽️ Thali Combo Platter - Mixed Methods Capstone
 *
 * Grand Indian Thali restaurant mein combo platter system banana hai.
 * String, Number, Array, aur Object — sab methods mila ke ek complete
 * thali banao. Yeh capstone challenge hai — sab kuch combine karo!
 *
 * Data format: thali = {
 *   name: "Rajasthani Thali",
 *   items: ["dal baati", "churma", "papad"],
 *   price: 250,
 *   isVeg: true
 * }
 *
 * Functions:
 *
 *   1. createThaliDescription(thali)
 *      - Template literal, .join(", "), .toUpperCase(), .toFixed(2) use karo
 *      - Format: "{NAME} (Veg/Non-Veg) - Items: {items joined} - Rs.{price}"
 *      - name ko UPPERCASE karo, price ko 2 decimal places tak
 *      - isVeg true hai toh "Veg", false hai toh "Non-Veg"
 *      - Agar thali object nahi hai ya required fields missing hain, return ""
 *      - Required fields: name (string), items (array), price (number), isVeg (boolean)
 *      - Example: createThaliDescription({name:"Rajasthani Thali", items:["dal","churma"], price:250, isVeg:true})
 *                 => "RAJASTHANI THALI (Veg) - Items: dal, churma - Rs.250.00"
 *
 *   2. getThaliStats(thalis)
 *      - Array of thali objects ka stats nikalo
 *      - .filter() se veg/non-veg count
 *      - .reduce() se average price
 *      - Math.min/Math.max se cheapest/costliest
 *      - .map() se saare names
 *      - Return: { totalThalis, vegCount, nonVegCount, avgPrice (2 decimal string),
 *                  cheapest (number), costliest (number), names (array) }
 *      - Agar thalis array nahi hai ya empty hai, return null
 *
 *   3. searchThaliMenu(thalis, query)
 *      - .filter() + .includes() se search karo (case-insensitive)
 *      - Thali match karti hai agar name ya koi bhi item query include kare
 *      - Agar thalis array nahi hai ya query string nahi hai, return []
 *      - Example: searchThaliMenu(thalis, "dal") => thalis with "dal" in name or items
 *
 *   4. generateThaliReceipt(customerName, thalis)
 *      - Template literals + .map() + .join("\n") + .reduce() se receipt banao
 *      - Format:
 *        "THALI RECEIPT\n---\nCustomer: {NAME}\n{line items}\n---\nTotal: Rs.{total}\nItems: {count}"
 *      - Line item: "- {thali name} x Rs.{price}"
 *      - customerName UPPERCASE mein
 *      - Agar customerName string nahi hai ya thalis array nahi hai/empty hai, return ""
 *
 * @example
 *   createThaliDescription({name:"Rajasthani Thali", items:["dal"], price:250, isVeg:true})
 *   // => "RAJASTHANI THALI (Veg) - Items: dal - Rs.250.00"
 */
export function createThaliDescription(thali) {
  if(typeof thali!=='object'||Array.isArray(thali)||thali===null||Object.values(thali).length!==4) return ""
  return `${thali.name.toUpperCase()} (${thali.isVeg?"Veg":"Non-Veg"}) - Items: ${thali.items.join(", ")} - Rs.${thali.price.toFixed(2)}`
}

export function getThaliStats(thalis) {
  if(!Array.isArray(thalis)||thalis.length===0) return null;
  let totalThalis=thalis.length;
  let prices=thalis.map(e=>e.price)
  let cheapest=Math.min(...prices)
  let costliest=Math.max(...prices);
  let veg=thalis.filter(e=>e.isVeg===true);
  let vegCount=veg.length;
  let nonveg=thalis.filter(e=>e.isVeg===false);
  let nonVegCount=nonveg.length;
  let totalprice=thalis.reduce((acc,num)=>(acc+num.price),0)
  let avgPrice=(totalprice/totalThalis).toFixed(2);
  let names=thalis.map(e=>e.name);
  return {totalThalis, vegCount, nonVegCount, avgPrice, cheapest, costliest , names}
}

export function searchThaliMenu(thalis, query) {
  if(!Array.isArray(thalis)||typeof query!=='string') return []
  let filteredresult=thalis.filter(thali=>thali.name.toUpperCase().includes(query.toUpperCase())||thali.items.join(',').toUpperCase().includes(query.toUpperCase()));
  return filteredresult;
}

export function generateThaliReceipt(customerName, thalis) {
  if(typeof customerName!=='string'||!Array.isArray(thalis)||thalis.length===0) return ""
  let total=thalis.reduce((acc,sum)=>(acc+sum.price),0)
  let lineitems=thalis.map(e=>`- ${e.name} x Rs.${e.price}`).join('\n')
  return `THALI RECEIPT\n---\nCustomer: ${customerName.toUpperCase()}\n${lineitems}\n---\nTotal: Rs.${total}\nItems: ${thalis.length}`
}
