import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/config";
import { doc, setDoc } from "firebase/firestore";

export function Register() {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setIsLoading] = useState();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
     e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      localStorage.setItem( "user", JSON.stringify(userCredential.user));
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        phone,
        uid: user.uid,
      });
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };
  
    

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
          Sign Up
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Enter your details to register.
        </Typography>
        <form
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
          onSubmit={handleSubmit}
        >
          <div className="mb-4 flex flex-col gap-6 text-white">
            <Input
              placeholder=""
              required
              size="lg"
              value={name}
              onChange={(e) => setName(e.target.value)}
              label="Name"
              className="text-white"
            />
            <Input
              placeholder=""
              required
              type="email"
              size="lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              className="text-white"
            />
            <Input
              size="lg"
              label="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="text-white"
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
            <Input
              size="lg"
              type="password"
              label="confirm password"
              className="text-white"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <Button className="mt-6" fullWidth type="submit">
            Register
          </Button>
          <Typography color="white" className="mt-4 text-center font-normal">
            Already have an account?{" "}
            <Link
              to={"/login"}
              className="font-medium text-white transition-colors hover:text-blue-700"
            >
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>
    </div>
  );
}
