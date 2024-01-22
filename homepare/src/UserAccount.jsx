import axios from "axios";
import { useState } from "react";
import { TextInput, Button } from "@mantine/core";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "@mantine/form";
import { IconAt, IconUserCircle, IconAsterisk } from "@tabler/icons-react";


export function UserAccount() {

   const [error, setError] = useState(null);

   const form = useForm({
      initialValues: {
      username: '',
      password: '',
      email: ''
      },

      validate: {

      },
  })

  const handleSubmit = (values) => {
   const { username, email, password } = values;
   console.log(username);
   console.log(password);
   console.log(email);
   axios.put('https://homepare-backend.onrender.com/user', {
      "username": username,
      "password": password,
      "email": email
   }).then((res) => {
      console.log(res)
      Navigate('/login')
   })
  }

   return (
    <>
    <div className="w-full h-screen flex justify-center items-center">
    <div className="w-3/12"> 
    <h1>Your account details:</h1>
    <br></br>
    <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
    <TextInput
    label="Update E-mail address:"
    placeholder="New E-mail address"
    leftSection={<IconAt size={16}/>}
    {...form.getInputProps('email')}
    />
    <TextInput
    label="Update Username:"
    placeholder="New Username"
    leftSection={<IconUserCircle size={16}/>}
    {...form.getInputProps('username')}
    />
    <TextInput
    label="Update Password:"
    placeholder="New Password:"
    leftSection={<IconAsterisk size={16}/>}
    {...form.getInputProps('password')}
    />
    <br></br>
    <Button type="submit">Save</Button>
    &nbsp;
    <Link to="/logout"><Button>Logout?</Button></Link>
    </form>
    </div>
    </div>
    </>
   )
}