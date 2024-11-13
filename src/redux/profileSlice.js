import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async actions for matching system

// Fetch matches for a user
export const fetchMatches = createAsyncThunk(
  'profile/fetchMatches',
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/matches?page=${page}&limit=${limit}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Create a match between two users
export const createMatch = createAsyncThunk(
  'profile/createMatch',
  async (userIds, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/matches', { userIds });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Fetch mutual matches for a user
export const fetchMutualMatches = createAsyncThunk(
  'profile/fetchMutualMatches',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/api/matches/mutual`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Reject a match
export const rejectMatch = createAsyncThunk(
  'profile/rejectMatch',
  async (matchId, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/api/matches/${matchId}/reject`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    filters: {
      religion: [],
      education: [],
      languages: [],
      distance: 0,
      financialStability: {
        netWorth: 0,
        annualIncome: 0,
        creditScore: 0,
      },
      travel: {
        transportation: [],
        passport: [],
      },
      musicGenres: [],
      movieGenres: [],
      household: {
        residingStatus: [],
        adultsInHouse: [],
        numAdults: 0,
        children: [],
        numChildren: 0,
        indoorPets: [],
        outdoorPets: [],
        numPets: 0,
      },
      humanDesign: {
        gender: [],
        race: [],
        skinTone: '',
        age: 0,
        height: 0,
        weight: 0,
        bodyType: [],
        sexualOrientation: [],
      },
      relationshipAndHealth: {
        relationshipStatus: [],
        relationshipGoals: [],
        alcoholUse: '',
        cannabisUse: '',
        otherDrugUse: '',
      },
    },
    matches: [],
    mutualMatches: [],
    matchStatus: null,
    loading: false,
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        religion: [],
        education: [],
        languages: [],
        distance: 0,
        financialStability: {
          netWorth: 0,
          annualIncome: 0,
          creditScore: 0,
        },
        travel: {
          transportation: [],
          passport: [],
        },
        musicGenres: [],
        movieGenres: [],
        household: {
          residingStatus: [],
          adultsInHouse: [],
          numAdults: 0,
          children: [],
          numChildren: 0,
          indoorPets: [],
          outdoorPets: [],
          numPets: 0,
        },
        humanDesign: {
          gender: [],
          race: [],
          skinTone: '',
          age: 0,
          height: 0,
          weight: 0,
          bodyType: [],
          sexualOrientation: [],
        },
        relationshipAndHealth: {
          relationshipStatus: [],
          relationshipGoals: [],
          alcoholUse: '',
          cannabisUse: '',
          otherDrugUse: '',
        },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.matches = action.payload.matches;
      })
      .addCase(fetchMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(createMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.matchStatus = 'Match created successfully';
      })
      .addCase(createMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(fetchMutualMatches.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMutualMatches.fulfilled, (state, action) => {
        state.loading = false;
        state.mutualMatches = action.payload.mutualMatches;
      })
      .addCase(fetchMutualMatches.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      })

      .addCase(rejectMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(rejectMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.matchStatus = 'Match rejected successfully';
      })
      .addCase(rejectMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export const { setFilters, clearFilters } = profileSlice.actions;
export default profileSlice.reducer;
