import axios from 'axios'

// HomePlants Service
const homePlantService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/home-plants`,
});

//Get all homeplants by user
// Get all plants
export function getAllHomePlantsOfUser(userId) {
  return homePlantService.get(`/${userId}`).then(res => {
    console.log('Response from api', res.data)
    return res.data
  });
} 