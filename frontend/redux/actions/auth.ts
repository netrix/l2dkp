import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';


const BASE_URL = process.env.NODE_ENV == "development" ? "http://127.0.0.1:5000/api" : "/api"


type RegisterBody = {
    login: string;
    password: string;
};


type LoginBody = {
    login: string;
    password: string;
};


type LogoutBody = {

};



export const signUpUser = createAsyncThunk(
    'auth/register',
    async (body: RegisterBody, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(`${BASE_URL}/auth/v1/register`, body, config);
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
);


export const loginUser = createAsyncThunk(
    'auth/login',
    async (body: LoginBody, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(`${BASE_URL}/auth/v1/login`, body, config);
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)


export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (body: LogoutBody, { rejectWithValue }) => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
            await axios.post(`${BASE_URL}/auth/v1/logout`, body, config);
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)


export const checkSession = createAsyncThunk(
    'auth/check',
    async (param, { rejectWithValue }) => {
        try {
            await axios.get(`${BASE_URL}/auth/v1/check`);
        } catch (error: any) {
            if (error.response && error.response.data.message) {
                return rejectWithValue(error.response.data.message);
            } else {
                return rejectWithValue(error.message);
            }
        }
    }
)
