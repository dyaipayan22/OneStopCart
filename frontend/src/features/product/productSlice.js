import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { config } from '../../constants/config';

const initialState = {
  products: null,
  selectedProduct: null,
  successReview: false,
  loading: false,
  error: null,
};

export const getAllProducts = createAsyncThunk(
  'product/getAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get('/api/product');
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (
    { name, category, description, image, price, countInStock },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await axios.post(
        '/api/product',
        { name, category, description, image, price, countInStock },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const getProductDetails = createAsyncThunk(
  'product/getProductDetails',
  async (productId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/product/${productId}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const reviewProduct = createAsyncThunk(
  'product/createReview',
  async ({ productId, rating, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `/api/product/${productId}/reviews`,
        { rating, comment },
        config
      );
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(createProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.loading = false;
      //   state.products.push(action.payload);
      state.selectedProduct = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(getProductDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProductDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.selectedProduct = action.payload;
    });
    builder.addCase(getProductDetails.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    builder.addCase(reviewProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(reviewProduct.fulfilled, (state, action) => {
      state.loading = true;
      state.successReview = true;
    });
    builder.addCase(reviewProduct.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default productSlice.reducer;
