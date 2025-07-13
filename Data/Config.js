export let basic = {
}

export const setBasic = (data)=>{
   Object.keys(basic).forEach(key => delete basic[key]); // Clear existing properties
    Object.assign(basic, data); // Copy new properties into the same object
}