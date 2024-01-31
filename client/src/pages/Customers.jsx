import React, { useState } from 'react'
import {Box,Tooltip,Typography} from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { DataGrid  } from '@mui/x-data-grid';
import { getBadge, getOrderStatus } from '../lib/utils/StatusHandler';
import { useQuery } from 'react-query';
import axios from 'axios'

export const Customers = () => {
  
  const {isLoading,data,error,isError}=useQuery('customers',() => {

    return  axios.get('http://localhost:4000/api/customers')
  }
  )
  console.log(data?.data[3])

  
  
  const [opendeleteModel, setopendeleteModel] = useState(false)
  const columns = [
    
    { field: 'firstName', headerName: 'Prénom', width: 110, align: 'center', headerAlign: 'center' },
    { field: 'lastName', headerName: 'Nom', width: 110, align: 'center', headerAlign: 'center' },
    { field: 'phoneNumber', headerName: 'Télephone', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'badge', headerName: 'Badge', width: 100, align: 'center', headerAlign: 'center',renderCell: (params) => {
      return <div dangerouslySetInnerHTML={{ __html: params.value }} />;
    }, },
    { field: 'address', headerName: 'Addresse', width:150, align: 'center', headerAlign: 'center', },
    { field: 'city', headerName: 'Ville', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'postalCode', headerName: 'CodePostal', width: 100, align: 'center', headerAlign: 'center' },
    { field: 'createdAt', headerName: 'Date',  width: 110, align: 'center', headerAlign: 'center' },
    { field: 'ordersNumber', headerName: 'Commandes',  width: 100, align: 'center', headerAlign: 'center' },
    {
      field: 'Actions',
      headerName: 'Actions',
      width:  200,
      flex: 1,
      sortable: false,
      align: 'center',
      headerAlign: 'center',
      filterable: false,
      renderCell: (params) => (
        <div className="flex justify-center items-center ">
          <Tooltip title="Voir les commandes">

          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"   viewBox="0 0 20 22"   className='cursor-pointer mr-4'><path d="M15 12c0 1.654-1.346 3-3 3s-3-1.346-3-3 1.346-3 3-3 3 1.346 3 3zm9-.449s-4.252 8.449-11.985 8.449c-7.18 0-12.015-8.449-12.015-8.449s4.446-7.551 12.015-7.551c7.694 0 11.985 7.551 11.985 7.551zm-7 .449c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5 5-2.243 5-5z"/></svg>
          </Tooltip>
          <Tooltip title="mise a jour">
          <svg  width="19" height="19" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer mr-5'><path  d="M14.8787 0.87868L6.29289 9.46447C6.10536 9.652 6 9.90636 6 10.1716V14.1716C6 14.7239 6.44772 15.1716 7 15.1716H11C11.2652 15.1716 11.5196 15.0662 11.7071 14.8787L20.2929 6.29289C21.4645 5.12132 21.4645 3.22183 20.2929 2.05025L19.1213 0.87868C17.9497 -0.292893 16.0503 -0.292893 14.8787 0.87868ZM18.8787 3.46447L18.9619 3.55867C19.2669 3.95096 19.2392 4.5182 18.8787 4.87868L10.584 13.1716H8V10.5856L16.2929 2.29289C16.6834 1.90237 17.3166 1.90237 17.7071 2.29289L18.8787 3.46447ZM10.0308 2.17157C10.0308 1.61929 9.5831 1.17157 9.03081 1.17157H5L4.78311 1.17619C2.12231 1.28975 0 3.48282 0 6.17157V16.1716L0.00461951 16.3885C0.118182 19.0493 2.31125 21.1716 5 21.1716H15L15.2169 21.167C17.8777 21.0534 20 18.8603 20 16.1716V11.2533L19.9933 11.1366C19.9355 10.6393 19.5128 10.2533 19 10.2533C18.4477 10.2533 18 10.701 18 11.2533V16.1716L17.9949 16.3478C17.9037 17.9227 16.5977 19.1716 15 19.1716H5L4.82373 19.1665C3.24892 19.0752 2 17.7693 2 16.1716V6.17157L2.00509 5.9953C2.09634 4.42049 3.40232 3.17157 5 3.17157H9.03081L9.14743 3.16485C9.64477 3.10708 10.0308 2.68441 10.0308 2.17157Z" fill="#0A1629"></path></svg>

          </Tooltip>
          <Tooltip title="Effacer">
          <svg onClick={()=>setopendeleteModel(true)} width="19" height="19" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg" className='cursor-pointer'><path  d="M12 0C13.5977 0 14.9037 1.24892 14.9949 2.82373L15 3V4H17H19C19.5523 4 20 4.44772 20 5C20 5.51284 19.614 5.93551 19.1166 5.99327L19 6H18V19C18 20.5977 16.7511 21.9037 15.1763 21.9949L15 22H5C3.40232 22 2.09634 20.7511 2.00509 19.1763L2 19V6H1C0.447715 6 0 5.55228 0 5C0 4.48716 0.38604 4.06449 0.883379 4.00673L1 4H3H5V3C5 1.40232 6.24892 0.0963391 7.82373 0.00509269L8 0H12ZM4 6V19C4 19.5128 4.38604 19.9355 4.88338 19.9933L5 20H15C15.5128 20 15.9355 19.614 15.9933 19.1166L16 19V6H14H6H4ZM13 4H7V3L7.00673 2.88338C7.06449 2.38604 7.48716 2 8 2H12L12.1166 2.00673C12.614 2.06449 13 2.48716 13 3V4ZM8 9C8.51284 9 8.93551 9.38604 8.99327 9.88338L9 10V16C9 16.5523 8.55229 17 8 17C7.48716 17 7.06449 16.614 7.00673 16.1166L7 16V10C7 9.44771 7.44772 9 8 9ZM12.9933 9.88338C12.9355 9.38604 12.5128 9 12 9C11.4477 9 11 9.44771 11 10V16L11.0067 16.1166C11.0645 16.614 11.4872 17 12 17C12.5523 17 13 16.5523 13 16V10L12.9933 9.88338Z" fill="#F65160"></path></svg>

          </Tooltip>

        </div>)
      
    },
  ];
 
  
  const rows  = data?.data?.map((customer) => ({
    
    id: customer._id,
    lastName: customer.lastName,
    firstName: customer.firstName,
    ordersNumber: customer.ordersNumber,
    phoneNumber: customer.phoneNumber,
    badge: getBadge(customer.badge), 
    address: customer.address,
    city: customer.city,
    createdAt: customer.createdAt?.split('T')[0],
    postalCode: customer.postalCode,
  }));
  if (isLoading) return <div> ...Loading</div>
  if (isError) return <div> {error.message}</div>

  return (
    <>

    
    <Box sx={{
      height: 500,
      width: '100%',
    }}>
    <div className='flex justify-center items-center '>
    <Typography
        variant="h3"
        component="h3"
        sx={{ textAlign: 'center', mt: 3, mb: 5 }}
        className='flex-1'
      >
       Vos Clients
       </Typography>
      <button  className='bg-[#713fff] text-white rounded-lg shadow-md hover:shadow-lg focus:outline-none px-8 py-2 font-semibold cursor-pointer text-base '>
          
            <AddIcon />


          
          Nouveau client
        </button>
        

    </div>
    
      {
        rows &&(
          <DataGrid
        rows={rows.reverse()}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15]}
        
        
        
      />

        )
      }
      
    </Box>

    
    {/* DELETE MODAL */}
    {opendeleteModel && (
      <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-50"'>
        <div className='bg-white rounded-3xl shadow-xl p-16 min-h-200px w-2/5 mx-auto my-24'>
          <div className='mx-auto max-w-300px'>
            <p className='text-black text-2xl font-semibold leading-6 text-center'>Are you sure you want to delete this task?</p>
            <div className='flex justify-center gap-6 mt-8'>
              <button  className='bg-[#713fff] rounded-lg shadow-md text-white cursor-pointer text-base font-semibold outline-none py-3 px-8'>Delete</button>
              
              <button onClick={()=>setopendeleteModel(false)}  className=' rounded-lg border border-solid border-[#d8e0f0] text-[#7d8592] cursor-pointer  shadow-sm font-normal outline-none py-3 px-8'>Cancel</button>

            </div>

          </div>

        </div>

        </div>


    )}
    
    </>
  )
}
