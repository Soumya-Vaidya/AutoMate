import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";

const backend_api = import.meta.env.VITE_BACKEND_API;

// eslint-disable-next-line react/prop-types
export function RegisterForm({ className, ...props }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    age: "",
    gender: "",
    pgender: "",
    pagegrp: "",
    password: "",
  });
  // console.log(formData)
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  async function onSubmit(event) {
    event.preventDefault();
    // console.log(formData);

    try {
      console.log(backend_api);
      const response = await axios.post(`${backend_api}/register`, formData);

      navigate("/login");
    } catch (error) {
      console.error("Error:", error);
      setError(true);
      if (error.message && !error.response) {
        setErrorMsg(error.message);
      } else if (error.response.status == 400) {
        setErrorMsg(error.response.data.msg);
      } else {
        setErrorMsg("Something went wrong");
      }
    }
  }

  // Define a function to handle input changes
  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // console.log(event.target);
  }

  return (
    <>
      <form id="myForm" onSubmit={onSubmit}>
        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="form-control"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>

        <div className="row mb-3">
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="gender">
                Gender
              </label>
              <select
                id="gender"
                name="gender"
                className="form-control"
                value={formData.gender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
                <option value="Do not wish to disclose">
                  Do not wish to disclose
                </option>
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="age">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                className="form-control"
                value={formData.age}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="pgender">
                Preferred Gender
              </label>
              <select
                id="pgender"
                name="pgender"
                className="form-control"
                value={formData.pgender}
                onChange={handleInputChange}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="NA">Anyone works!</option>
              </select>
            </div>
          </div>
          <div className="col">
            <div className="form-outline">
              <label className="form-label" htmlFor="pagegrp">
                Preferred Age
              </label>
              <select
                id="pagegrp"
                name="pagegrp"
                className="form-control"
                value={formData.pagegrp}
                onChange={handleInputChange}
              >
                <option value="0">18-25</option>
                <option value="1">25-30</option>
                <option value="2">30-45</option>
                <option value="3">45+</option>
              </select>
            </div>
          </div>
        </div>

        <div className="form-outline mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="submit"
          form="myForm"
          style={{ backgroundColor: "#296E73" }}
          className="btn btn-primary btn-block"
        >
          Submit
        </button>
        {error ? (
          <Alert variant="danger" className="m-2">
            {errorMsg}
          </Alert>
        ) : null}
        <p className="mt-2 " style={{ color: "#296E73" }}>
          Already have an account?
          <Link
            to="/login"
            style={{ color: "#296E73", textDecoration: "underline" }}
          >
            Login
          </Link>
        </p>
      </form>
    </>
  );

  // return (
  //     <div className={cn("grid gap-6", className)} {...props}>
  //         <form onSubmit={onSubmit}>
  //             <div className="grid gap-2">
  //                 <div className="grid gap-1">
  //                     <Label htmlFor="email">Email</Label>
  //                     <Input
  //                         id="email"
  //                         name="email"
  //                         placeholder="name@example.com"
  //                         type="email"
  //                         autoCapitalize="none"
  //                         autoComplete="email"
  //                         autoCorrect="off"
  //                         value={formData.email}
  //                         onChange={handleInputChange}

  //                     />
  //                 </div>
  //                 <div className="grid gap-1">
  //                     <Label htmlFor="username">Username</Label>
  //                     <Input
  //                         id="username"
  //                         name="username"
  //                         type="text"
  //                         value={formData.username}
  //                         onChange={handleInputChange}
  //                     />
  //                 </div>
  //                 <div className="grid gap-1">
  //                     <Label htmlFor="gender">Gender</Label>
  //                     <select style={{
  //                         border: '1px solid #ccc',
  //                         boxShadow: '0 1px 1px #B7C9E2',
  //                         borderRadius: '4px',
  //                         padding: '8px',
  //                         width: '100%',
  //                     }}
  //                         id="gender"
  //                         name="gender"
  //                         value={formData.gender}
  //                         onChange={handleInputChange}>
  //                         <option value="Male">Male</option>
  //                         <option value="Female">Female</option>
  //                         <option value="Other">Other</option>
  //                         <option value="Do not wish to disclose">Do not wish to disclose</option>
  //                     </select>
  //                     {/* <Label htmlFor="gender">Gender</Label>
  //                     <Input
  //                         id="gender"
  //                         name="gender"
  //                         type="text"
  //                         value={formData.gender}
  //                         onChange={handleInputChange}
  //                     /> */}
  //                     {/* <Label htmlFor="gender">Gender</Label>
  //                     <Select id="gender"
  //                         name="gender"
  //                         onChange={handleInputChange}
  //                         value={formData.gender}>
  //                         <SelectTrigger>
  //                             <SelectValue placeholder="Gender" />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                             <SelectGroup>
  //                                 <SelectLabel>Gender</SelectLabel>
  //                                 <SelectItem value="Male">Male</SelectItem>
  //                                 <SelectItem value="Female">Female</SelectItem>
  //                                 <SelectItem value="Other">Other</SelectItem>
  //                                 <SelectItem value="Do not wish to Disclose">Do not wish to Disclose</SelectItem>
  //                             </SelectGroup>
  //                         </SelectContent>
  //                     </Select> */}
  //                 </div>
  //                 <div className="grid gap-1">
  //                     <Label htmlFor="age">Age</Label>
  //                     <Input
  //                         id="age"
  //                         name="age"
  //                         type="text"
  //                         value={formData.age}
  //                         onChange={handleInputChange}

  //                     />
  //                 </div>
  //                 <div className="grid gap-1">
  //                     <Label htmlFor="pgender">Preferred Gender</Label>
  //                     <select
  //                         style={{
  //                             border: '1px solid #ccc',
  //                             boxShadow: '0 1px 1px #B7C9E2',
  //                             borderRadius: '4px',
  //                             padding: '8px',
  //                             width: '100%',
  //                         }}
  //                         id="pgender"
  //                         name="pgender"
  //                         value={formData.pgender}
  //                         onChange={handleInputChange}>
  //                         <option value="Male">Male</option>
  //                         <option value="Female">Female</option>
  //                         <option value="NA">Anyone works!</option>
  //                     </select>
  //                     {/* <Label htmlFor="pgender">Preferred Gender for the Ride</Label>
  //                     <Select id="pgender"
  //                         name="pgender"
  //                         onChange={handleInputChange}>
  //                         <SelectTrigger>
  //                             <SelectValue placeholder="Gender" />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                             <SelectGroup>
  //                                 <SelectLabel>Preferred Gender</SelectLabel>
  //                                 <SelectItem value="Male">Male</SelectItem>
  //                                 <SelectItem value="Female">Female</SelectItem>
  //                             </SelectGroup>
  //                         </SelectContent>
  //                     </Select> */}
  //                 </div>
  //                 <div className="grid gap-1">
  //                     <Label htmlFor="pagegrp">Preferred Age</Label>
  //                     <select
  //                         id="pagegrp"
  //                         name="pagegrp"
  //                         value={formData.pagegrp}
  //                         onChange={handleInputChange}
  //                         style={{
  //                             border: '1px solid #ccc',
  //                             boxShadow: '0 1px 1px #B7C9E2',
  //                             borderRadius: '4px',
  //                             padding: '8px',
  //                             width: '100%',
  //                         }}
  //                     >
  //                         <option value="0">18-25</option>
  //                         <option value="1">25-30</option>
  //                         <option value="2">30-45</option>
  //                         <option value="3">45+</option>
  //                     </select>
  //                     {/* <Label htmlFor="page">Preferred Age for the Ride</Label>
  //                     <Select id="page"
  //                         name="page"
  //                         onChange={handleInputChange}>
  //                         <SelectTrigger>
  //                             <SelectValue placeholder="Age" />
  //                         </SelectTrigger>
  //                         <SelectContent>
  //                             <SelectGroup>
  //                                 <SelectLabel>Preferred Age Group</SelectLabel>
  //                                 <SelectItem value="0">18-25</SelectItem>
  //                                 <SelectItem value="1">25-30</SelectItem>
  //                                 <SelectItem value="2">30-45</SelectItem>
  //                                 <SelectItem value="3">45+</SelectItem>
  //                             </SelectGroup>
  //                         </SelectContent>
  //                     </Select> */}
  //                 </div>
  //                 <div className="grid gap-1">
  //                     <Label htmlFor="password">Password</Label>
  //                     <Input
  //                         id="password"
  //                         name="password"
  //                         type="password"
  //                         value={formData.password}
  //                         onChange={handleInputChange}

  //                     />
  //                 </div>
  //             </div>
  //             <br />
  //             <div className="grid gap-1">
  //                 <Button type="submit">Submit</Button>
  //             </div>
  //         </form>
  //     </div>
  // );
}
