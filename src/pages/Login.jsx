import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RecaptchaVerifier, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/config";

export function Login() {
  const [password, setPassword] = useState("");
   const [email,setEmail] = useState("")
   const [isLoading,setIsLoading] = useState(false);


     const navigate = useNavigate();



     const handleLogin = async (e) => {
       e.preventDefault();
       setIsLoading(true);
       try{
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;

          //save to localstorage

          localStorage.setItem("user",JSON.stringify(user));
          

          setIsLoading(false);
          navigate("/");
        }catch(error){
          setIsLoading(false);
          alert(error.message);
        }
      }


  return (
    <div
      className="flex items-center min-h-screen p-6 bg-gray-50 justify-center w-full text-white"
      style={{
        backgroundImage: `url("https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8bGlicmFyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60")`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Card
        color="transparent"
        shadow={false}
        className=""
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: " blur(10px)",
          borderRadius: "16px",
          padding: "20px",
        }}
      >
        <Typography variant="h4" color="white">
          Sign In
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleLogin}
        >
          <div className="mb-4 flex flex-col gap-6 text-white">
            <Input
              size="lg"
              label="Email"
              type="email"
              required
              className="text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              size="lg"
              label="password"
              type="password"
              className="text-white"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/* <Input size="lg" label="confirm password" className="text-white" 
             required
            /> */}
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Sign In
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Don't have an account?{" "}
            <Link
              to={"/register"}
              className="font-medium text-white transition-colors hover:text-blue-700"
            >
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
