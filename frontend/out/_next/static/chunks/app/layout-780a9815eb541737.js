(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[185],{268:function(e,t,r){Promise.resolve().then(r.t.bind(r,2546,23)),Promise.resolve().then(r.t.bind(r,3552,23)),Promise.resolve().then(r.bind(r,2915))},187:function(e,t,r){"use strict";r.d(t,{oJ:function(){return i}});var n=r(6393);let u=(0,n.createSlice)({name:"auth",initialState:{authState:!1},reducers:{setAuthState(e,t){e.authState=t.payload}}}),{setAuthState:i}=u.actions;t.ZP=u.reducer},2915:function(e,t,r){"use strict";r.r(t),r.d(t,{Providers:function(){return o}});var n=r(9268),u=r(6393),i=r(4827),c=r(187),s=r(7010);let a=(0,u.configureStore)({reducer:{authSliceReducer:c.ZP,[i.d.reducerPath]:i.d.reducer},middleware:e=>e({}).concat([i.d.middleware])});(0,s.setupListeners)(a.dispatch);var d=r(2462);function o(e){let{children:t}=e;return(0,n.jsx)(d.zt,{store:a,children:t})}},4827:function(e,t,r){"use strict";r.d(t,{d:function(){return i},q:function(){return c}});var n=r(9764),u=r(1452);let i=(0,n.LC)({reducerPath:"raidsApi",refetchOnFocus:!0,baseQuery:(0,u.ni)({baseUrl:"http://127.0.0.1:5000/api"}),endpoints:e=>({getRaids:e.query({query:()=>"raids"})})}),{useGetRaidsQuery:c}=i},3552:function(){}},function(e){e.O(0,[216,764,838,667,139,744],function(){return e(e.s=268)}),_N_E=e.O()}]);