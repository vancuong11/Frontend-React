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

const getDetailInfoDoctorService = (id) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${id}`);
};

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data);
};

const getScheduleDoctorService = (id, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${id}&date=${date}`);
};

const getExtraInfoDoctorByIdService = (id) => {
    return axios.get(`/api/get-extra-infor-doctor-by-id?doctorId=${id}`);
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
    getDetailInfoDoctorService,
    saveBulkScheduleDoctor,
    getScheduleDoctorService,
    getExtraInfoDoctorByIdService,
};
