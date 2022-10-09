import { Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import style from './Search.module.css';
import { API, backend } from '../../global.js';
import { Navigate, useNavigate } from 'react-router-dom';

export default function Search() {

    const searchStyle = {
        width: '35vw'
    }


    //required states for functionality
    const [search, setSearch] = useState(null);

    const [apiData, setData] = useState(null);

    const [text, setText] = useState('');

    const [object, setObject] = useState({});

    //navigation
    const navigate = useNavigate();


    //function to handle search
    const handleSearch = async () => {

        const searchTerm = {
            search: search,
            filter: 'company'
        }

        try {

        
            const result = await fetch(`${backend}/companies/find`, {
                method: 'POST',
                // mode: 'no-cors',
                body: JSON.stringify(searchTerm),
                headers: {
                    'Content-type': 'application/json',
                }
            })
            
           let data = await result.json();
           let arr = data.result.split('</div>');

           //operation to create objects
           arr = arr.map((string) => {
           let temp = string.slice(60, string.length-1);
            temp = temp.split('>');
            let value = temp[0].split('/');
            let object = {
                name: temp[1],
                cin: value[value.length-1]
            }
            return object
           })

           setData(arr);
         

        } catch (error) {
            console.log(error);
        }
    }


    //function to send data to backend
    const sendData = async () => {
        try {
            const result = await fetch(`${backend}/companies/add`, {
                method: 'POST',
                body: JSON.stringify(object),
                headers: {
                    'Content-type': 'application/json'
                }
            })

            const data = await result.json();

            console.log(data);

            setTimeout(() => {
                navigate('/companies')
            }, 2000)

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        handleSearch();
    }, [search]);


  return (
    <>
        <div className={style.container} >
        <div className={style.body} >
        <TextField value={text} onChange={(e)=>{setSearch(e.target.value); setText(e.target.value)}} style={searchStyle} size='small' label='search' variant='outlined'/>
        <Button onClick={() => sendData()} variant='contained' >Submit
        </Button>
        </div>
        {/* <div className={style.results}  dangerouslySetInnerHTML={apiData} >
            
        </div> */}

        <div className={style.results} >
         {apiData ? apiData.map((company) => {
            return <p onClick={() => {setText(company.name); setObject(company)}} >{company.name}</p>
         })
         
          :  <p>Loading...</p>}
        </div>

        </div>
    </>
  )
}
