import { createAsyncThunk, createEntityAdapter, createSlice, SerializedError } from "@reduxjs/toolkit";

interface User {
  id: number;
  name: string;
  // Other user properties
}

interface FetchUsersResponse {
  data: User[];
  err?: string;
}

export const getUsers = createAsyncThunk<FetchUsersResponse, void, { rejectValue: SerializedError }>(
    "users/getUsers",
    async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users");
      const data = await res.json();
  
      if (Array.isArray(data)) {
        return { data };
      } else {
        throw new Error("some error");
      }
    }
  );

const usersState = createEntityAdapter<User>({
  selectId: (user) => user.id
});

const initialState = usersState.getInitialState({
  loading: "idle",
  error: ''
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.loading = "completed";
      if (action.payload.err === undefined) {
        usersState.addMany(state, action.payload.data);
      }else{
        state.loading = 'failed'
      }
    });
    builder.addCase(getUsers.rejected, (state, action) => {
        state.error = 'some roor';
        
    });
  }
});

export const {
    selectAll:selectAllUsers,
    selectById:selectByIdUsers,
    selectEntities:selectEntitiesUsers,
    selectIds:selectIdsUsers,
    selectTotal:selectTotalUsers
} =usersState.getSelectors((store:any)=>store.user)

export default userSlice.reducer