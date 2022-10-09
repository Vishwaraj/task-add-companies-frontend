import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { backend } from '../../global';
import style from './ListPage.module.css';

export default function ListPage() {

    const [list, setList] = useState(null);

    const getCompanies = async () => {
        try {
            const result = await fetch(`${backend}/companies/list`);

            const data = await result.json();

            setList(data.result);
            console.log(data.result);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCompanies();
    }, [])

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/');
    }

  return (
    <>
        <div className={style.container} >
        
        <div className={style.body} >
        <Button variant='contained' size='small' onClick={()=>handleClick()} >Add Companies</Button>
        <Table style={{border: '1px solid gray', marginTop: '3rem'}} >
            <TableHead>
                <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>CIN</TableCell>
                    <TableCell>Company</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                { list ? list.map((item) => {
                    return <TableRow>
                        <TableCell>{item.id}</TableCell>
                        <TableCell>{item.cin}</TableCell>
                        <TableCell>{item.name}</TableCell>
                    </TableRow>
                })
                
                
                 : <p>Loading...</p>}
                </TableBody>
        </Table>
        </div>
        </div>
    </>
  )
}
