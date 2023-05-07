import axios from '../axios';

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password });
};

const getAllUsers = (id) => {
    return axios.get(`/api/get-all-users?id=${id}`, { id: id });
};

const createNewUserService = (data) => {
    return axios.post('/api/create-new-user', data);
};

const deleteUserService = (id) => {
    return axios.delete('/api/delete-user', { data: { id: id } });
};

const editUserService = (data) => {
    return axios.put('/api/edit-user', data);
};

const getAllCodeService = (inputData) => {
    return axios.get(`/api/allcode?type=${inputData}`);
};

const getTopDoctorService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
};

const getAllDoctorService = () => {
    return axios.get('/api/get-all-doctor');
};

const saveDetailDoctorService = (data) => {
    return axios.post('/api/save-info-doctors', data);
};
export {
    handleLogin,
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorService,
    getAllDoctorService,
    saveDetailDoctorService,
};
