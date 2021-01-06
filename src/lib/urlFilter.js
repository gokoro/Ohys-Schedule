const specialRegex = /[^a-z0-9\s-]/g
const spaceRegex = /\s/g

export const urlFilter = (str) => str.toLowerCase().replace(specialRegex, '').replace(spaceRegex, '-')