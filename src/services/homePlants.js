import axios from 'axios'

// HomePlants Service
const homePlantService = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/home-plants`,
});


//Get homeplant by ID
export function getHomePlantById(plantId) {
  return homePlantService.get(`/plants/${plantId}`).then(res => {
    // console.log('Found homeplant by ID', res)
    return res.data
  }).catch(err => console.log('Error from service', err))
}


//Get all homeplants by user
// Get all plants
export function getAllHomePlantsOfUser(userId) {
  return homePlantService.get(`/${userId}`).then(res => {
   // console.log('Response from api', res.data)
    return res.data
  });
} 

// Create new homeplant
export function addNewPlant(plant) {
  //console.log('HI FROM UPDATING!!!!')
  return homePlantService.post("/new", plant, {
    headers: {
      Authorization: localStorage.getItem("accessToken")
    },
  })
    .then(response => {
      return {
        status: true,
        data: response.data
      };
    })
    .catch(err => {
      //console.log("Error response", err.response)
      return {
        status: false,
        errorMessage: err.response.data.errorMessage
      };
    });
}

//Get homeplant by ID
export function updateHomePlant(plantId, plant) {
  return homePlantService.post(`/edit/${plantId}`, plant, {
    headers: {
      Authorization: localStorage.getItem("accessToken")
    }
  }).then(response => {
      // console.log(response)
      return {
        status: true,
        data: response.data
      };
    })
    .catch(err => {
      //console.log("Error response", err.response)
      return {
        status: false,
        errorMessage: err.response.data.errorMessage
      };
    });
}

//Delete homeplant by ID
export function deleteHomePlant(plantId, plant) {
  return homePlantService.post(`/delete/${plantId}`, plant, {
    headers: {
      Authorization: localStorage.getItem("accessToken")
    }
  }).then(response => {
       return {
        status: true,
        data: response.data
      };
    })
    .catch(err => {
      console.log("Error response", err.response)
      return {
        status: false,
        errorMessage: err.response.data.errorMessage
      };
    });
}