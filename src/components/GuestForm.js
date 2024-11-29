import React, {useState, useEffect} from 'react'
import { Box, TextField, MenuItem, RadioGroup, FormControlLabel, Radio, FormLabel, Button } from '@mui/material'
import axios from 'axios';

const GuestForm = ({setResponse, setCode}) => {
    const [data, setData] = useState({'gradYear': new Date().getFullYear()});
    const handleSubmit = async e => {
        e.preventDefault();
        const postData = async () => {
            return await axios.post('http://localhost:8000/authenticate/guest', data)
                .then(res => res.data)
                .catch(err => setCode(err.status));
        }
        
        const code = await postData();
        console.log("Posted data");
        setResponse(true);
        setCode(code);
    }

  return (
    <Box sx={{border: "solid", borderColor: "lightgrey", borderWidth: 2.5, p: 3, borderRadius: 2, maxWidth: 1000}}>
        <form onSubmit={handleSubmit} className='flex flex-col gap-3 items-center content-center'>
            <h2 className="text-xl font-bold">Guest Login</h2>
            <p>If you don't want to make an account, you can use the guest sign-in form and fill it out digitally, but 
                if you plan on returning for future events, you should make an account.
            </p>
            <TextField id="outlined-basic" label="First Name" variant="outlined" onChange={e => setData({...data, firstName: e.target.value})} required/>
            <TextField id="outlined-basic" label="Last Name" variant="outlined" onChange={e => setData({...data, lastName: e.target.value})} required/>
            <TextField
                id="gradYear"
                select
                label="Select"
                defaultValue="2024"
                helperText="Please select your graduation year"
                onChange={e => setData({...data, gradYear: e.target.value})}
                >
                {[...Array.from(new Array(8), (x, i) => i + new Date().getFullYear()), 'Other'].map((option) => (
                    <MenuItem key={option} value={option}>
                        {option}
                    </MenuItem>
                ))}
            </TextField>
            {/* jewishness */}
            <FormLabel>Are you Jewish?</FormLabel>
            <RadioGroup row required onChange={e => setData({...data, jewishness: e.target.value})}>
                <FormControlLabel value={1} control={<Radio />} label="Yes"/>
                <FormControlLabel value={0} control={<Radio />} label="No"/>
                <FormControlLabel value={2} control={<Radio />} label="It's complicated"/>
            </RadioGroup>
            <Button type='submit' variant="contained">Submit</Button>
        </form>
    </Box>
  )
}

export default GuestForm