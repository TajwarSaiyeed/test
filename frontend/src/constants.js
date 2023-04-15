
const order_status = [
    {label:'Supplier Sent', value:'supplierSent'},
    {label:'Arrived', value:'arrived'},
    {label:'Packed', value:'packed'},
    {label:'Dispatched', value:'dispatched'},
    {label:'Completed', value:'completed'},
    {label:'Issues', value:'issues'},
    {label:'Acknowledged', value:'acknowledged'},    
    {label:'Archived', value:'archived'},    
];

const api_link = "/api";

module.exports = { 
    order_status,
    api_link
};