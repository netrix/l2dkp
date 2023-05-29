(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{5741:function(e,t,a){Promise.resolve().then(a.t.bind(a,2546,23)),Promise.resolve().then(a.t.bind(a,3552,23)),Promise.resolve().then(a.bind(a,2697)),Promise.resolve().then(a.bind(a,332))},332:function(e,t,a){"use strict";a.r(t),a.d(t,{basePath:function(){return d},default:function(){return l},loginPageUri:function(){return o},publicPaths:function(){return c}});var n=a(9268),r=a(6006),s=a(6008),i=a(4949),u=a(7659);let d="/app",o="/auth/login",c=[o,"/auth/register"];function l(e){let{children:t}=e,a=(0,i.C)(e=>e.authSliceReducer.authState),l=(0,i.C)(e=>e.authSliceReducer.initialized),h=(0,i.T)(),p=(0,s.useRouter)(),g=(0,s.usePathname)(),f=(0,s.useSearchParams)(),[m,y]=(0,r.useState)(!1);return((0,r.useEffect)(()=>{l||h((0,u.bV)())}),(0,r.useEffect)(()=>{l&&function(e){console.log("CHECK",g,f,m);let t=g.slice(d.length);a||c.includes(t)?y(!0):(y(!1),p.push(o))}(0)},[g,f,l]),l)?m&&t:(0,n.jsx)("div",{children:"Loading..."})}},7659:function(e,t,a){"use strict";a.d(t,{SA:function(){return i},TX:function(){return d},bV:function(){return o},pH:function(){return u}});var n=a(4214),r=a(6393);let s="/api",i=(0,r.createAsyncThunk)("auth/register",async(e,t)=>{let{rejectWithValue:a}=t;try{await n.Z.post("".concat(s,"/auth/v1/register"),e,{headers:{"Content-Type":"application/json"}})}catch(e){if(e.response&&e.response.data.message)return a(e.response.data.message);return a(e.message)}}),u=(0,r.createAsyncThunk)("auth/login",async(e,t)=>{let{rejectWithValue:a}=t;try{await n.Z.post("".concat(s,"/auth/v1/login"),e,{headers:{"Content-Type":"application/json"}})}catch(e){if(e.response&&e.response.data.message)return a(e.response.data.message);return a(e.message)}}),d=(0,r.createAsyncThunk)("auth/logout",async(e,t)=>{let{rejectWithValue:a}=t;try{await n.Z.post("".concat(s,"/auth/v1/logout"),e,{headers:{"Content-Type":"application/json"}})}catch(e){if(e.response&&e.response.data.message)return a(e.response.data.message);return a(e.message)}}),o=(0,r.createAsyncThunk)("auth/check",async(e,t)=>{let{rejectWithValue:a}=t;try{await n.Z.get("".concat(s,"/auth/v1/check"))}catch(e){if(e.response&&e.response.data.message)return a(e.response.data.message);return a(e.message)}})},4949:function(e,t,a){"use strict";a.d(t,{C:function(){return s},T:function(){return r}});var n=a(2462);let r=()=>(0,n.I0)(),s=n.v9},2697:function(e,t,a){"use strict";a.r(t),a.d(t,{Providers:function(){return p}});var n=a(9268),r=a(6393),s=a(4827),i=a(7659);let u=(0,r.createSlice)({name:"auth",initialState:{initialized:!1,authState:!1,loading:!1,error:null,success:!1},reducers:{setAuthState(e,t){console.log("setAuthState:",t.payload),e.authState=t.payload}},extraReducers:e=>{e.addCase(i.SA.pending,e=>{e.loading=!0,e.error=null}).addCase(i.SA.fulfilled,(e,t)=>{let{payload:a}=t;e.loading=!1,e.success=!0,e.initialized=!0,e.authState=!0}).addCase(i.SA.rejected,(e,t)=>{let{payload:a}=t;e.loading=!1,e.error=a,e.initialized=!0}).addCase(i.pH.pending,e=>{e.loading=!0,e.error=null}).addCase(i.pH.fulfilled,(e,t)=>{let{payload:a}=t;e.loading=!1,e.success=!0,e.authState=!0,e.initialized=!0}).addCase(i.pH.rejected,(e,t)=>{let{payload:a}=t;e.loading=!1,e.error=a,e.initialized=!0}).addCase(i.TX.pending,e=>{e.loading=!0,e.error=null}).addCase(i.TX.fulfilled,(e,t)=>{let{payload:a}=t;e.loading=!1,e.success=!0,e.authState=!1,e.initialized=!0}).addCase(i.TX.rejected,(e,t)=>{let{payload:a}=t;e.loading=!1,e.error=a,e.initialized=!0}).addCase(i.bV.pending,e=>{e.loading=!0,e.error=null}).addCase(i.bV.fulfilled,(e,t)=>{let{payload:a}=t;e.loading=!1,e.success=!0,e.authState=!0,e.initialized=!0}).addCase(i.bV.rejected,(e,t)=>{let{payload:a}=t;e.loading=!1,e.error=a,e.authState=!1,e.initialized=!0})}}),{setAuthState:d}=u.actions;var o=u.reducer,c=a(7010);let l=(0,r.configureStore)({reducer:{authSliceReducer:o,[s.db.reducerPath]:s.db.reducer},middleware:e=>e({}).concat([s.db.middleware]),devTools:!1});(0,c.setupListeners)(l.dispatch);var h=a(2462);function p(e){let{children:t}=e;return(0,n.jsx)(h.zt,{store:l,children:t})}},4827:function(e,t,a){"use strict";a.d(t,{Ub:function(){return u},db:function(){return s},q7:function(){return i}});var n=a(9764),r=a(1452);let s=(0,n.LC)({reducerPath:"raidsApi",refetchOnFocus:!0,baseQuery:(0,r.ni)({baseUrl:"/api"}),tagTypes:["Raid"],endpoints:e=>({getRaids:e.query({query:()=>"raids/v1",transformResponse:e=>e.raids,providesTags:["Raid"]}),addNewRaid:e.mutation({query:e=>({url:"raids/v1",method:"POST",body:e,header:{"Content-type":"application/json; charset=UTF-8"}}),invalidatesTags:["Raid"]})})}),{useGetRaidsQuery:i,useAddNewRaidMutation:u}=s},3552:function(){}},function(e){e.O(0,[462,281,964,764,838,667,139,560],function(){return e(e.s=5741)}),_N_E=e.O()}]);