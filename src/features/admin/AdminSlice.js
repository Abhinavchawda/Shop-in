import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBrand, createCategory } from './AdminApi';

const initialState = {
    brands: [],
    categories: [],
    temp: null,
    status: 'idle',
};

export const createBrandAsync = createAsyncThunk('admin/createBarnd',
    async (brand) => {
        const response = await createBrand(brand);
        return response.data;
    }
);

export const createCategoryAsync = createAsyncThunk('admin/createCategory',
    async (category) => {
        const response = await createCategory(category);
        return response.data;
    }
);

export const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        clearTemp: (state) => {
            state.temp = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createBrandAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createBrandAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.brands.push(action.payload);
            })

            .addCase(createCategoryAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createCategoryAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.categories.push(action.payload);
            })
    }
})

export const { clearTemp } = adminSlice.actions;

export default adminSlice.reducer;