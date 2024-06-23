import axios from 'axios'

const apiURL = 'http://localhost:5000/users'

export async function getAllUsers(){
    return await axios.get(`${apiURL}/getAllUsers`)
}

export async function getOrderAllUsersByAge(){
    return await axios.get(`${apiURL}/getOrderAllUsersByAge`)
}

export async function getUserBetweenXAndY(minAge, maxAge){ //?minAge=18&maxAge=28
    return await axios.post(`${apiURL}/getUserBetweenXAndY`,{minAge, maxAge})
}


export async function deleteUser(id){
    return await axios.delete(`${apiURL}/deleteUser/${id}`,id)
}

// Fonction pour récupérer un utilisateur par son ID
export async function getUserById (userId) {
    try {
      const response = await axios.get(`${apiURL}/getUsersById/${userId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Fonction pour ajouter un nouvel utilisateur
  export const addUser = async (userData) => {
    try {
      const response = await axios.post(`${apiURL}/addUser`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
  
  // Fonction pour mettre à jour un utilisateur existant
  export const updateUser = async (userId, userData) => {
    try {
      const response = await axios.put(`${apiURL}/updateUser/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw error;
    }
}