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

const getProfileDoctorByIdService = (id) => {
    return axios.get(`/api/get-profile-doctor-by-id?doctorId=${id}`);
};

const postPatientAppointment = (data) => {
    return axios.post(`/api/patient-book-appointment`, data);
};

const postVerifyBookingAppointment = (data) => {
    return axios.post(`/api/verify-book-appointment`, data);
};

const postCreateNewSpecialty = (data) => {
    return axios.post(`/api/create-new-specialty`, data);
};

const getAllSpecialtyService = () => {
    return axios.get('/api/get-all-specialty');
};

const getDetailSpecialtyByIdService = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}&location=${data.location}`);
};

const postCreateNewClinic = (data) => {
    return axios.post(`/api/create-new-clinic`, data);
};

const getAllClinicService = () => {
    return axios.get('/api/get-all-clinic');
};

const getDetailClinicByIdService = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
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
    getProfileDoctorByIdService,
    postPatientAppointment,
    postVerifyBookingAppointment,
    postCreateNewSpecialty,
    getAllSpecialtyService,
    getDetailSpecialtyByIdService,
    postCreateNewClinic,
    getAllClinicService,
    getDetailClinicByIdService,
};
