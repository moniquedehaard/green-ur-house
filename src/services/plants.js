import axios from 'axios'

// Plant Service
const plantService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/plants`,
});

// Get all plants
export function getAllPlants() {
  return plantService.get('/').then(res => {
    console.log('Response', res)
    return res.data
  });
} 

// Get plant with specific id
export function getPlantByID(id) {
  return plantService.get(`/${id}`).then(res => res.data);
}
