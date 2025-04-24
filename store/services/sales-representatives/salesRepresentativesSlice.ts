/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getSalesRepresentatives, inviteSalesRepresentatives, updateSalesRepresentatives } from "./salesRepresentativesApi";



const initialState:any = {

    loading: {
        invite: false,
        get:false,
        update:false
        
    },

    req_success: {
        invite: false,
        get:false,
        update:false

    },
    single_reps:null,
    sales_reps: [],
    temp_sales_reps:[],
    isEdit:false,

};

const SalesRepresentativesSlice = createSlice({
    name: "SalesRepresentativesSlice",
    initialState,
    reducers: {
        setIsEdit :(state,{payload}:PayloadAction<any>)=>{
            state.isEdit = true;
            state.single_reps = payload;
            // console.log(state.single_reps)
        },
        closeModal :(state)=>{
            state.isEdit = false;
        }
    },
    extraReducers: (builder) => {

        // Get All Sales Representatives 
        builder.addCase(getSalesRepresentatives.pending,(state)=>{
            state.loading.get = true;
            state.req_success.get = false;
            state.loading.invite = false;
            state.req_success.invite = false;
            state.loading.update = false;
            state.req_success.update = false;
        });
        builder.addCase(getSalesRepresentatives.fulfilled,(state,{payload}:PayloadAction<any>)=>{
            state.loading.get = false;
            state.req_success.get = true;
            state.loading.invite = false;
            state.req_success.invite = false;
            state.loading.update = false;
            state.req_success.update = false;
            state.sales_reps = payload?.data;
            state.temp_sales_reps = payload?.data;
        });
        builder.addCase(getSalesRepresentatives.rejected,(state)=>{
            state.loading.get = false;
            state.req_success.get = false;
            state.loading.invite = false;
            state.req_success.invite = false;
            state.loading.update = false;
            state.req_success.update = false;
        });
        // invite Sales Representatives 
        builder.addCase(inviteSalesRepresentatives.pending,(state)=>{
            state.loading.invite = true;
            state.req_success.invite = false;
      
        });
        builder.addCase(inviteSalesRepresentatives.fulfilled,(state)=>{
            state.loading.invite = false;
            state.req_success.invite = true;
            // console.log(payload?.data);
            // state.sales_reps = [payload?.data,...state.temp_sales_reps]
        });
        builder.addCase(inviteSalesRepresentatives.rejected,(state)=>{
            state.loading.invite = false;
            state.req_success.invite = false
        });
        // Update Sales Representatives 
        builder.addCase(updateSalesRepresentatives.pending,(state)=>{
            state.loading.update = true;
            state.req_success.update = false;
      
        });
        builder.addCase(updateSalesRepresentatives.fulfilled,(state)=>{
            state.loading.update = false;
            state.req_success.update = true;
            // console.log(payload?.data);
            // state.sales_reps = [payload?.data,...state.temp_sales_reps]
        });
        builder.addCase(updateSalesRepresentatives.rejected,(state)=>{
            state.loading.update = false;
            state.req_success.update = false
        });



    },
});

export const { setIsEdit,closeModal } = SalesRepresentativesSlice.actions;

export default SalesRepresentativesSlice.reducer;
